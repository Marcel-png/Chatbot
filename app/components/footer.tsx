"use client";

import { KeyboardEvent } from "react";
import { Message } from "../types";

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  handleSend: () => void;
  loading: boolean;
  setMessages: (messages: Message[]) => void;
}

export default function ChatInput({
  input,
  setInput,
  handleSend,
  loading,
  setMessages,
}: ChatInputProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      handleSend();
    }
  };

  const handleClear = () => {
    if (window.confirm("Voulez-vous vraiment supprimer la conversation ?")) {
      localStorage.removeItem("chatMessages");
      setMessages([]);
    }
  };

  return (
    <footer className="fixed bottom-0 left-1/2 z-20 w-full -translate-x-1/2 px-3 pb-3 md:max-w-2xl">
      <div className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-xl ring-1 ring-slate-200">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          className="flex-grow rounded-xl border border-transparent bg-slate-100 px-4 py-3 text-base text-slate-800 outline-none transition-all focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-200 disabled:opacity-60"
          placeholder="Écris ton message..."
        />

        <button
          onClick={handleClear}
          aria-label="Effacer la conversation"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400 transition-all hover:bg-rose-500 hover:text-white active:scale-95"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18" />
            <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
            <path d="M19 6l-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6" />
          </svg>
        </button>

        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          aria-label="Envoyer"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-md transition-all hover:shadow-lg active:scale-95 disabled:opacity-40 disabled:shadow-none"
        >
          {loading ? (
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5" />
              <path d="M5 12l7-7 7 7" />
            </svg>
          )}
        </button>
      </div>
    </footer>
  );
}
