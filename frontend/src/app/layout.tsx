import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "App - Frontend",
  description: "Interface intégrant contrats Solidity et indexer SubQuery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
