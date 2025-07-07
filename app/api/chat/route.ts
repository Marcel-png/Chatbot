import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message) {
      return NextResponse.json(
        { reply: "Veuillez poser une question." },
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

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [{ role: "user", content: message }],
      }),
    });

    let data;
    try {
      data = await res.json();
    } catch (jsonError) {
      return NextResponse.json(
        { reply: "Erreur lors de la lecture de la réponse de l'API." },
        { status: 500 }
      );
    }

    if (!res.ok) {
      return NextResponse.json(
        {
          reply: `Erreur API : ${
            data?.error?.message || "Réponse invalide."
          }`,
        },
        { status: res.status }
      );
    }

    return NextResponse.json({
      reply: data?.choices?.[0]?.message?.content || "Réponse non disponible.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { reply: "Erreur interne du serveur : " + (error?.message || error) },
      { status: 500 }
    );
  }
}
