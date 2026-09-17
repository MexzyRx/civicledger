import { generateText } from "ai";
import { promises, projects } from "@/lib/data";

type ChatMessage = { role: "user" | "assistant"; content: string };

const civicContext = JSON.stringify({
  promises: promises.map(({ slug, title, quote, sector, level, leader, location, status, confidence, progress, why, projectSlugs, change }) => ({ slug, title, quote, sector, level, leader, location, status, confidence, progress, why, projectSlugs, change })),
  projects: projects.map(({ slug, name, description, location, status, promiseSlug, unpromised, progress, budget, fundedBy, implementedBy, contractor, evidence }) => ({ slug, name, description, location, status, promiseSlug, unpromised, progress, budget, fundedBy, implementedBy, contractor, evidence })),
});

function fallback(question: string) {
  const q = question.toLowerCase();
  if (q.includes("education") || q.includes("school")) return "CivicLedger tracks one education promise affecting Port Harcourt City: “Rehabilitate public primary schools.” It currently has Insufficient Evidence and low confidence because no sufficiently specific implementation project has been verified.";
  if (q.includes("ring road") || q.includes("infrastructure")) return "The Port Harcourt Ring Road is marked In Progress at 46% verified progress. CivicLedger has two supporting records, but the road is not yet documented as open end-to-end.";
  if (q.includes("health") || q.includes("clinic")) return "The primary healthcare upgrade promise is marked Modified. Several facilities have completion evidence, but the wider programme moved to phased delivery and facility-level reporting remains incomplete.";
  return "CivicLedger does not have enough evidence yet to answer that question. Try asking about education, primary healthcare, the Port Harcourt Ring Road, or how CivicLedger assesses evidence.";
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
      model: "openai/gpt-5.4-mini",
      system: `You are Ask CivicLedger, a concise civic-information assistant for Port Harcourt City, Rivers State. Answer only from the CIVICLEDGER RECORDS below. Use plain, neutral language and keep answers under 140 words. Never assess whether a politician is good or bad. Never allege corruption, crime, intent, or wrongdoing. Distinguish who promised, funded and implemented a project. State uncertainty clearly. If the records cannot support an answer, say exactly: “CivicLedger does not have enough evidence yet.” When useful, mention the record title the citizen should open.\n\nCIVICLEDGER RECORDS:\n${civicContext}`,
      messages,
      maxOutputTokens: 240,
      providerOptions: { gateway: { tags: ["feature:ask-civicledger", "dataset:demo"] } },
    });
    return Response.json({ answer: text, mode: "ai" });
  } catch (error) {
    console.error("Ask CivicLedger model unavailable", error);
    return Response.json({ answer: fallback(messages.at(-1)?.content || ""), mode: "fallback" });
  }
}
