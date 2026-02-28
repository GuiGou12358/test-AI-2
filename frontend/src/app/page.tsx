"use client";

import { useState } from "react";

export default function Home() {
  const [connected, setConnected] = useState(false);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Frontend</h1>
      <p className="mb-4">
        Interface intégrant les contrats Solidity et l&apos;indexer SubQuery GraphQL.
      </p>
      <button
        onClick={() => setConnected(!connected)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {connected ? "Déconnecté" : "Connecter Wallet"}
      </button>
    </main>
  );
}
