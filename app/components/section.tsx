"use client";

import { useEffect, useRef } from "react";
import { Message } from "../types";

interface MainSectionProps {
  messages: Message[];
  loading: boolean;
}

export default function MainSection({ messages, loading }: MainSectionProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  return (
    <main className="flex-grow overflow-y-auto px-4 pt-20 pb-28">
      <div className="mx-auto flex max-w-2xl flex-col gap-4">
        {messages.length === 0 && !loading && (
          <div className="mt-16 flex flex-col items-center gap-3 text-center text-slate-400 animate-fade-in">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-2xl shadow-lg shadow-indigo-200">
              💬
            </div>
            <p className="text-lg font-semibold text-slate-500">
              Pose-moi une question pour démarrer
            </p>
            <p className="max-w-xs text-sm">
              BKMind répond en français, instantanément et directement dans ton navigateur.
            </p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={`flex flex-col gap-1 animate-slide-up ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
            style={{ animationDelay: `${Math.min(index, 5) * 30}ms` }}
          >
            <span
              className={`text-xs font-bold uppercase tracking-wide ${
                msg.sender === "user" ? "text-indigo-500" : "text-fuchsia-500"
              }`}
            >
              {msg.sender === "user" ? "Moi" : "BKMind"}
            </span>
            <p
              className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-base leading-relaxed shadow-sm ${
                msg.sender === "user"
                  ? "rounded-br-sm bg-gradient-to-br from-indigo-500 to-violet-500 text-white"
                  : "rounded-bl-sm bg-white text-slate-700 ring-1 ring-slate-200"
              }`}
            >
              {msg.text}
            </p>
          </div>
        ))}

        {loading && (
          <div className="flex flex-col items-start gap-1 animate-slide-up">
            <span className="text-xs font-bold uppercase tracking-wide text-fuchsia-500">
              BKMind
            </span>
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
              <span className="h-2 w-2 animate-bounce rounded-full bg-fuchsia-400 [animation-delay:-0.3s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-fuchsia-400 [animation-delay:-0.15s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-fuchsia-400" />
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>
    </main>
  );
}
