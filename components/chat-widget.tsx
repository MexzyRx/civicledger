"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string; mode?: "ai" | "fallback" };

const starters = ["Which promises are still outstanding?", "What is happening with the Ring Road?", "Show me the healthcare commitments"];

function relatedSources(question: string) {
  const q = question.toLowerCase();
  if (q.includes("education") || q.includes("school")) return [{ label: "Public school rehabilitation", href: "/promises/rehabilitate-public-schools" }];
  if (q.includes("health") || q.includes("clinic")) return [{ label: "Primary healthcare upgrades", href: "/promises/upgrade-primary-healthcare" }];
  if (q.includes("ring road") || q.includes("infrastructure")) return [{ label: "Port Harcourt Ring Road", href: "/projects/port-harcourt-ring-road" }, { label: "Connected promise", href: "/promises/complete-ring-road" }];
  return [];
}

function ChatIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5.5h14v10H9l-4 3v-13Z"/><path d="M8 9h8M8 12h5"/></svg>;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: "Hello. I can help you explore the officials, promises and projects CivicLedger tracks in Port Harcourt. What would you like to know?" }]);
  const [loading, setLoading] = useState(false);
  const [lastQuestion, setLastQuestion] = useState("");
  const messageEnd = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    messageEnd.current?.scrollIntoView({ behavior: "smooth" });
    if (messages.length === 1) inputRef.current?.focus();
  }, [open, messages, loading]);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) { if (event.key === "Escape") setOpen(false); }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

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

  return <>
    <button type="button" className="ask-nav chat-header-trigger" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open}><ChatIcon/> Ask CivicLedger</button>
    <button type="button" className={`chat-launcher ${open ? "is-open" : ""}`} onClick={() => setOpen(value => !value)} aria-label={open ? "Close Ask CivicLedger" : "Open Ask CivicLedger"} aria-expanded={open}><ChatIcon/><span>Ask CivicLedger</span></button>
    {open && <section className="chat-widget" role="dialog" aria-modal="false" aria-labelledby="chat-widget-title">
      <header className="chat-widget-head"><div><span className="chat-widget-mark"><ChatIcon/></span><div><strong id="chat-widget-title">Ask CivicLedger</strong><small><i/> Civic information assistant</small></div></div><button type="button" onClick={() => setOpen(false)} aria-label="Close chat">×</button></header>
      <div className="chat-widget-messages" aria-live="polite">
        {messages.map((message, index) => <div key={`${message.role}-${index}`} className={`widget-message ${message.role}`}><span>{message.role === "assistant" ? "CL" : "You"}</span><div><p>{message.content}</p>{message.mode === "fallback" && <small>Using CivicLedger’s built-in record lookup</small>}</div></div>)}
        {loading && <div className="widget-message assistant"><span>CL</span><div><p className="widget-typing"><i/><i/><i/></p></div></div>}
        <div ref={messageEnd}/>
      </div>
      {messages.length === 1 && <div className="chat-widget-starters">{starters.map(starter => <button type="button" key={starter} onClick={() => void ask(starter)}>{starter}</button>)}</div>}
      {sources.length > 0 && !loading && <div className="chat-widget-sources"><strong>Related records</strong>{sources.map(source => <Link key={source.href} href={source.href} onClick={() => setOpen(false)}>{source.label} <span>→</span></Link>)}</div>}
      <form onSubmit={submit} className="chat-widget-form"><input ref={inputRef} required maxLength={800} value={query} onChange={event => setQuery(event.target.value)} placeholder="Ask about a promise or project…" aria-label="Message Ask CivicLedger"/><button type="submit" disabled={loading || !query.trim()} aria-label="Send message">↑</button></form>
      <p className="chat-widget-note">Answers are grounded in CivicLedger’s demonstration records.</p>
    </section>}
  </>;
}
