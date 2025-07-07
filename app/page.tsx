"use client";
import { useState, useEffect, KeyboardEvent } from "react";
import Header from "./components/hearder";
import Footer from "./components/footer";
import MainSection from "./components/section";

// Définition du type Message
type Message = {
  sender: "user" | "bot";
  text: string;
};

export default function App() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storedMessages = JSON.parse(
        localStorage.getItem("chatMessages") || "[]"
      ) as Message[];
      if (Array.isArray(storedMessages)) {
        setMessages(storedMessages);
      }
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
    if (!input.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { sender: "user", text: input },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.reply || `Erreur serveur (${res.status})`);
      }

      const data = await res.json();
      setMessages([
        ...newMessages,
        { sender: "bot", text: data.reply || "Je ne comprends pas." },
      ]);
    } catch (error: any) {
      setMessages([
        ...newMessages,
        { sender: "bot", text: error.message || "Erreur de communication avec le serveur." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <Header />
      <MainSection messages={messages} loading={loading} />
      <Footer
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        handleKeyDown={handleKeyDown}
        setMessages={setMessages}
      />
    </div>
  );
}
