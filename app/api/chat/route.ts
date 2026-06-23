import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT =
  "Tu es BKMind, un assistant conversationnel sympathique, clair et concis. Réponds en français sauf si l'utilisateur écrit dans une autre langue.";


const RATE_LIMIT_WINDOW_MS = 60_000; 
const RATE_LIMIT_MAX = 15; 
const ipHits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);

  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { reply: "Trop de messages envoyés. Réessaie dans une minute." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const message = body?.message;

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { reply: "Veuillez poser une question." },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { reply: "Message trop long (2000 caractères maximum)." },
        { status: 400 }
      );
    }

    const API_KEY = process.env.OPENROUTER_API_KEY;
    if (!API_KEY) {
      return NextResponse.json(
        { reply: "Erreur serveur : clé API manquante." },
        { status: 500 }
      );
    }

    const model = process.env.OPENROUTER_MODEL || "openrouter/free";

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
      }),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      return NextResponse.json(
        { reply: "Erreur lors de la lecture de la réponse de l'API." },
        { status: 500 }
      );
    }

    if (!res.ok) {
      return NextResponse.json(
        { reply: `Erreur API : ${data?.error?.message || "Réponse invalide."}` },
        { status: res.status }
      );
    }

    return NextResponse.json({
      reply: data?.choices?.[0]?.message?.content || "Réponse non disponible.",
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { reply: "Erreur interne du serveur : " + msg },
      { status: 500 }
    );
  }
}
