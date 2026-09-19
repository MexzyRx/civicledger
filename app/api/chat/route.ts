import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { promises, projects } from "@/lib/data";

type ChatMessage = { role: "user" | "assistant"; content: string };

const civicContext = JSON.stringify({
  promises: promises.map(({ slug, title, quote, sector, level, leader, location, status, confidence, progress, why, projectSlugs, change, origin, target, sourceUrl, sourcePage, officialSlugs }) => ({ slug, title, quote, sector, level, leader, location, status, confidence, progress, why, projectSlugs, change, origin, target, sourceUrl, sourcePage, officialSlugs })),
  projects: projects.map(({ slug, name, description, location, status, promiseSlug, unpromised, progress, budget, fundedBy, implementedBy, contractor, evidence }) => ({ slug, name, description, location, status, promiseSlug, unpromised, progress, budget, fundedBy, implementedBy, contractor, evidence })),
});

function fallback(question: string) {
  const q = question.toLowerCase();
  const sector = q.includes("health") || q.includes("clinic") ? "Healthcare" : q.includes("education") || q.includes("school") ? "Education" : q.includes("road") || q.includes("infrastructure") ? "Infrastructure" : undefined;
  const matching = promises.filter(p => sector ? p.sector === sector : q.includes(p.title.toLowerCase()));
  if (matching.length) return "These are simulated hackathon assessments, not verified political claims. " + matching.slice(0,3).map(p => `${p.title}: ${p.status}, ${p.progress}% simulated progress. Open /promises/${p.slug}.`).join(" ");
  return "CivicLedger does not have enough evidence yet. Explore an official profile for simulated campaign commitments and delivery statistics.";
}

export async function POST(request: Request) {
  let messages: ChatMessage[] = [];
  try {
    const body = await request.json();
    messages = Array.isArray(body.messages)
      ? body.messages
          .filter((message: ChatMessage) => message && ["user", "assistant"].includes(message.role) && typeof message.content === "string")
          .slice(-8)
          .map((message: ChatMessage) => ({ ...message, content: message.content.slice(0, 800) }))
      : [];
    const question = messages.at(-1)?.content?.trim();
    if (!question) return Response.json({ error: "Ask a question first." }, { status: 400 });

    const { text } = await generateText({
      model: anthropic("claude-haiku-4-5-20251001"),
      system: `You are Ask CivicLedger, a concise civic-information assistant for Port Harcourt City, Rivers State. Answer only from the CIVICLEDGER RECORDS below. All progress, statuses, project evidence and fulfilment assessments are SIMULATED hackathon scenarios, not verified political claims. Always disclose this when discussing delivery. Only commitments marked origin=sourced have a real public source; others are invented examples, not actual statements by those officials. Use plain, neutral language and keep answers under 140 words. Never assess whether a politician is good or bad. Never allege corruption, crime, intent, or wrongdoing. Distinguish who promised, funded and implemented a project. State uncertainty clearly. If the records cannot support an answer, say exactly: “CivicLedger does not have enough evidence yet.” When useful, mention the record title the citizen should open.\n\nCIVICLEDGER RECORDS:\n${civicContext}`,
      messages,
      maxOutputTokens: 240,
    });
    return Response.json({ answer: text, mode: "ai" });
  } catch (error) {
    console.error("Ask CivicLedger model unavailable", error);
    return Response.json({ answer: fallback(messages.at(-1)?.content || ""), mode: "fallback" });
  }
}
