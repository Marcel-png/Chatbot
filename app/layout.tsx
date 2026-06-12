import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BKMind - Chatbot intelligent",
  description:
    "BKMind est un chatbot intelligent offrant une interface de conversation fluide et accessible directement depuis le navigateur.",
  keywords: "chatbot, IA, assistant, BKMind",
  authors: [{ name: "Baba Marcel" }],
  openGraph: {
    title: "BKMind - Chatbot intelligent",
    description:
      "Discute avec BKMind, un assistant IA rapide et accessible depuis ton navigateur.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
