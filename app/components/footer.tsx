import { KeyboardEvent } from "react";
import Image from "next/image";
import { FaArrowUp, FaTrash } from "react-icons/fa";

interface FooterProps {
  input: string;
  setInput: (input: string) => void;
  handleSend: () => void;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  setMessages: (messages: any[]) => void;
}

export default function Footer({
  input,
  setInput,
  handleSend,
  handleKeyDown,
  setMessages,
}: FooterProps) {
  return (
    <footer className="bg-white shadow-lg w-full md:w-3/4 max-w-2xl mx-auto rounded-xl h-auto min-h-20 flex flex-col md:flex-row items-center justify-between px-2 md:px-4 py-2 fixed bottom-0 left-1/2 transform -translate-x-1/2 gap-2 md:gap-0 z-20">
      <input
        type="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow w-full md:w-auto text-black border border-gray-300 rounded-full px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all mb-2 md:mb-0"
        placeholder="Votre question ici..."
      />
      <div className="flex flex-row gap-2 w-full md:w-auto justify-end ml-2">
        <button
          onClick={() => {
            alert("Votre discussion va être supprimer!")
            localStorage.removeItem("chatMessages");
            setMessages([]);
          }}
          className="p-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-all flex items-center justify-center"
          aria-label="Nettoyer"
        >
          <FaTrash size={24} />
        </button>
        <button
          onClick={handleSend}
          className="p-3 hidden md:block bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-all flex items-center justify-center"
          aria-label="Soumettre"
        >
          <FaArrowUp size={24} />
        </button>
      </div>
    </footer>
  );
}
