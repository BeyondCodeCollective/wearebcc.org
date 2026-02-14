import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { messages, context } = await request.json();

    const systemPrompt = `You're a career mentor at Beyond Code Collective. Keep it real, keep it SHORT.

User's result:
- ${context.personalityName}: "${context.tagline}"
- Role: ${context.role} (~$${context.salary?.toLocaleString()}/yr)
- Training: ${context.timeToComplete} months at ${context.hoursPerDay}hrs/day
- Start with: ${context.courses?.join(", ")}

CRITICAL RULES:
- MAX 2-3 sentences per response. Seriously.
- Talk like a text message, not an essay
- No corporate speak. No "I understand..." or "Great question!"
- Be direct. Be real. Skip the fluff.
- Use "you" not "one might consider"
- It's okay to use casual language, contractions, even slang
- If they need more detail, they'll ask

Examples of good responses:
- "Yeah that salary is typical for entry level. Stick with it 2-3 years and you're looking at $80-90k easy."
- "Real talk - it's not for everyone. If you hate spreadsheets, this might be rough."
- "100%. Start with the free courses, see if it clicks before committing."

BCC info (only if asked): wearebcc.org, offers CompTIA, Salesforce, AWS certs`;

    const response = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      })),
    });

    const textContent = response.content.find((block) => block.type === "text");
    const text = textContent && "text" in textContent ? textContent.text : "";

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to get response" },
      { status: 500 }
    );
  }
}
