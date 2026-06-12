"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import ChatInput from "./components/ChatInput";
import MainSection from "./components/MainSection";
import { Message } from "./types";

export default function App() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("chatMessages") || "[]"
      ) as Message[];
      if (Array.isArray(stored)) setMessages(stored);
    } catch (error) {
      console.error("Erreur lors du chargement des messages :", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des messages :", error);
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      sender: "user",
      text: input,
      id: crypto.randomUUID(),
    };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.reply || `Erreur serveur (${res.status})`);
      }

      setMessages([
        ...newMessages,
        {
          sender: "bot",
          text: data.reply || "Je ne comprends pas.",
          id: crypto.randomUUID(),
        },
      ]);
    } catch (error: unknown) {
      const msg =
        error instanceof Error
          ? error.message
          : "Erreur de communication avec le serveur.";
      setMessages([
        ...newMessages,
        { sender: "bot", text: msg, id: crypto.randomUUID() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-indigo-50 via-white to-fuchsia-50">
      <Header />
      <MainSection messages={messages} loading={loading} />
      <ChatInput
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        loading={loading}
        setMessages={setMessages}
      />
    </div>
  );
}
