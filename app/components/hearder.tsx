"use client";

import Image from "next/image";

export default function Header() {
  const handleClose = () => {
    if (window.confirm("Voulez-vous vraiment quitter cette page ?")) {
      window.close();
    }
  };

  return (
    <header className="fixed top-0 z-20 flex h-16 w-full items-center px-4 bg-white/70 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="relative h-9 w-9 overflow-hidden rounded-xl shadow-sm ring-1 ring-slate-200">
          <Image
            src="/180665068.png"
            alt="Logo BKMind"
            fill
            sizes="36px"
            className="object-cover"
          />
        </div>
        <h1 className="text-xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-indigo-600 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            BKMind
          </span>
        </h1>
      </div>

      <button
        onClick={handleClose}
        className="ml-auto rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-rose-500 hover:text-white active:scale-95"
      >
        Quitter
      </button>
    </header>
  );
}
