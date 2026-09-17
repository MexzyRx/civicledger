"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import "./chat.css";

type Message = { role: "user" | "assistant"; content: string; mode?: "ai" | "fallback" };

const starters = ["Which education promises are still outstanding?", "What is happening with the Ring Road?", "Were healthcare targets changed?"];

function relatedSources(question: string) {
  const q = question.toLowerCase();
  if (q.includes("education") || q.includes("school")) return [{ label: "Rehabilitate public primary schools", href: "/promises/rehabilitate-public-schools" }];
  if (q.includes("health") || q.includes("clinic")) return [{ label: "Upgrade primary healthcare facilities", href: "/promises/upgrade-primary-healthcare" }];
  if (q.includes("ring road") || q.includes("infrastructure")) return [{ label: "Port Harcourt Ring Road project", href: "/projects/port-harcourt-ring-road" }, { label: "Connected promise", href: "/promises/complete-ring-road" }];
  return [];
}

export default function Ask() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: "Ask me about the promises and projects CivicLedger currently tracks in Port Harcourt City." }]);
  const [loading, setLoading] = useState(false);
  const [lastQuestion, setLastQuestion] = useState("");

  async function ask(question: string) {
    const clean = question.trim();
    if (!clean || loading) return;
    const next: Message[] = [...messages, { role: "user", content: clean }];
    setMessages(next);
    setQuery("");
    setLastQuestion(clean);
    setLoading(true);
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to answer");
      setMessages(current => [...current, { role: "assistant", content: data.answer, mode: data.mode }]);
    } catch {
      setMessages(current => [...current, { role: "assistant", content: "Ask CivicLedger is temporarily unavailable. Please try again shortly.", mode: "fallback" }]);
    } finally {
      setLoading(false);
    }
  }

  function submit(event: FormEvent) { event.preventDefault(); void ask(query); }
  const sources = relatedSources(lastQuestion);

  return <div className="ask-page"><div className="page-intro"><span className="kicker">Grounded civic chatbot</span><h1>Ask CivicLedger</h1><p>Have a short conversation about tracked promises, projects and evidence. Answers stay within the CivicLedger record.</p></div><div className="chat-panel"><div className="chat-messages" aria-live="polite">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`chat-message ${message.role}`}><span>{message.role === "assistant" ? "CL" : "You"}</span><div><p>{message.content}</p>{message.mode === "fallback" && <small>Using CivicLedger’s built-in evidence lookup</small>}</div></div>)}{loading && <div className="chat-message assistant"><span>CL</span><div><p className="typing">Reviewing the ledger…</p></div></div>}</div>{sources.length > 0 && !loading && <div className="chat-sources"><strong>Relevant records</strong>{sources.map(source => <Link key={source.href} href={source.href}>{source.label} →</Link>)}</div>}<form onSubmit={submit} className="ask-box"><input required maxLength={800} value={query} onChange={event => setQuery(event.target.value)} placeholder="Ask about a promise, project or evidence…"/><button className="button" disabled={loading}>{loading ? "Thinking…" : "Ask →"}</button></form></div><div className="suggestions"><span>Try:</span>{starters.map(starter => <button key={starter} disabled={loading} onClick={() => void ask(starter)}>{starter}</button>)}</div><p className="note">Ask CivicLedger can explain available records. It does not judge leaders or infer wrongdoing. This hackathon dataset is for demonstration and must be source-verified before public use.</p></div>;
}
