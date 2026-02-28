"use client";

import { useState, useCallback, useEffect } from "react";
import { ethers } from "ethers";
import { useWallet } from "@/lib/useWallet";
import {
  getYokiNFTContract,
  getArenaContract,
  ARENA_IFACE,
  type YokiAttributes,
} from "@/lib/contracts";
import { getYokiTokenIdsForOwner } from "@/lib/yokiTokens";
import { graphqlClient, GET_ALL_COMBAT_RESOLVED_EVENTS } from "@/lib/graphql";

const YOKI_ADDRESS = process.env.NEXT_PUBLIC_YOKI_NFT_ADDRESS ?? "";
const ARENA_ADDRESS = process.env.NEXT_PUBLIC_ARENA_ADDRESS ?? "";
const COMBAT_RESULT_ADDRESS = process.env.NEXT_PUBLIC_COMBAT_RESULT_NFT_ADDRESS ?? "";

type YokiWithId = YokiAttributes & { tokenId: string };

export default function Home() {
  const { address, signer, provider, loading: walletLoading, error: walletError, connect, disconnect } = useWallet();

  const [mintForm, setMintForm] = useState({
    to: "",
    name: "",
    force: 128,
    rapidite: 128,
    dexterite: 128,
    resistance: 128,
    intelligence: 128,
  });
  const [mintTx, setMintTx] = useState<string | null>(null);
  const [mintError, setMintError] = useState<string | null>(null);
  const [mintLoading, setMintLoading] = useState(false);

  const [searchAddress, setSearchAddress] = useState("");
  const [yokiList, setYokiList] = useState<YokiWithId[]>([]);
  const [yokiListLoading, setYokiListLoading] = useState(false);
  const [yokiListError, setYokiListError] = useState<string | null>(null);

  const [arenaFighter1, setArenaFighter1] = useState<{ owner: string; tokenId: bigint; totalScore: bigint } | null>(null);
  const [arenaFighter2, setArenaFighter2] = useState<{ owner: string; tokenId: bigint; totalScore: bigint } | null>(null);
  const [combatInProgress, setCombatInProgress] = useState(false);
  const [registerTokenId, setRegisterTokenId] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [resolveLoading, setResolveLoading] = useState(false);
  const [resolveError, setResolveError] = useState<string | null>(null);
  const [lastCombatResult, setLastCombatResult] = useState<{
    winnerTokenId: string;
    loserTokenId: string;
    winner: string;
    loser: string;
    winnerScore: string;
    loserScore: string;
    txHash: string;
  } | null>(null);

  const [combatHistory, setCombatHistory] = useState<
    Array<{
      winnerTokenId: string;
      loserTokenId: string;
      winner: string;
      loser: string;
      winnerScore: string;
      loserScore: string;
      transactionHash: string;
    }>
  >([]);
  const [combatHistoryLoading, setCombatHistoryLoading] = useState(false);

  const loadArenaState = useCallback(async () => {

console.log("ARENA_ADDRESS", ARENA_ADDRESS);

    if (!provider || !ARENA_ADDRESS) return;
    const arena = getArenaContract(ARENA_ADDRESS, provider);
    const [f1, f2, inProgress] = await Promise.all([
      arena.fighter1(),
      arena.fighter2(),
      arena.combatInProgress(),
    ]);
    setArenaFighter1(f1.owner !== ethers.ZeroAddress ? { owner: f1.owner, tokenId: f1.tokenId, totalScore: f1.totalScore } : null);
    setArenaFighter2(f2.owner !== ethers.ZeroAddress ? { owner: f2.owner, tokenId: f2.tokenId, totalScore: f2.totalScore } : null);
    setCombatInProgress(inProgress);
  }, [provider]);

  useEffect(() => {
    loadArenaState();
    const t = setInterval(loadArenaState, 8000);
    return () => clearInterval(t);
  }, [loadArenaState]);

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signer || !YOKI_ADDRESS) {
      setMintError("Connectez le wallet et configurez NEXT_PUBLIC_YOKI_NFT_ADDRESS.");
      return;
    }
    setMintError(null);
    setMintTx(null);
    setMintLoading(true);
    try {
      const contract = getYokiNFTContract(YOKI_ADDRESS, signer);
      const to = mintForm.to || address;
      if (!to) throw new Error("Indiquez une adresse (to) ou connectez le wallet.");
      const tx = await contract.mint(
        to,
        mintForm.name || "Yoki",
        Number(mintForm.force),
        Number(mintForm.rapidite),
        Number(mintForm.dexterite),
        Number(mintForm.resistance),
        Number(mintForm.intelligence)
      );
      await tx.wait();
      setMintTx(tx.hash);
      setMintForm((f) => ({ ...f, name: "" }));
    } catch (err) {
      setMintError(err instanceof Error ? err.message : "Erreur mint");
    } finally {
      setMintLoading(false);
    }
  };

  const loadYokiList = useCallback(async () => {
    const addr = searchAddress.trim() || address;
    if (!addr || !provider || !YOKI_ADDRESS) {
      setYokiListError("Indiquez une adresse ou connectez le wallet.");
      return;
    }
    setYokiListError(null);
    setYokiListLoading(true);
    try {
      const ids = await getYokiTokenIdsForOwner(YOKI_ADDRESS, addr, provider);
      const contract = getYokiNFTContract(YOKI_ADDRESS, provider);
      const list: YokiWithId[] = [];
      for (const id of ids) {
        const attrs = await contract.getAttributes(id);
        list.push({
          tokenId: id.toString(),
          name: attrs.name,
          force: Number(attrs.force),
          rapidite: Number(attrs.rapidite),
          dexterite: Number(attrs.dexterite),
          resistance: Number(attrs.resistance),
          intelligence: Number(attrs.intelligence),
        });
      }
      setYokiList(list);
    } catch (err) {
      setYokiListError(err instanceof Error ? err.message : "Erreur chargement Yoki");
      setYokiList([]);
    } finally {
      setYokiListLoading(false);
    }
  }, [searchAddress, address, provider]);

  const handleRegister = async () => {
    if (!signer || !ARENA_ADDRESS || !registerTokenId.trim()) {
      setRegisterError("Connectez le wallet et choisissez un tokenId.");
      return;
    }
    setRegisterError(null);
    setRegisterLoading(true);
    try {
      const arena = getArenaContract(ARENA_ADDRESS, signer);
      const tx = await arena.register(ethers.toBigInt(registerTokenId.trim()));
      await tx.wait();
      await loadArenaState();
      setRegisterTokenId("");
    } catch (err) {
      setRegisterError(err instanceof Error ? err.message : "Erreur enregistrement");
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleResolve = async () => {
    if (!signer || !ARENA_ADDRESS) {
      setResolveError("Connectez le wallet.");
      return;
    }
    setResolveError(null);
    setLastCombatResult(null);
    setResolveLoading(true);
    try {
      const arena = getArenaContract(ARENA_ADDRESS, signer);
      const tx = await arena.resolveCombat();
      const receipt = await tx.wait();
          const log = receipt?.logs?.find((l: { topics?: string[] }) =>
            l.topics?.[0] === ARENA_IFACE.getEvent("CombatResolved")?.topicHash
          );
          if (log) {
            const parsed = ARENA_IFACE.parseLog({ topics: log.topics as string[], data: log.data });
            if (parsed?.args) {
              setLastCombatResult({
                winnerTokenId: parsed.args.winnerTokenId?.toString() ?? "",
                loserTokenId: parsed.args.loserTokenId?.toString() ?? "",
                winner: parsed.args.winner ?? "",
                loser: parsed.args.loser ?? "",
                winnerScore: parsed.args.winnerScore?.toString() ?? "",
                loserScore: parsed.args.loserScore?.toString() ?? "",
                txHash: receipt.hash,
              });
            }
          }
      await loadArenaState();
    } catch (err) {
      setResolveError(err instanceof Error ? err.message : "Erreur résolution combat");
    } finally {
      setResolveLoading(false);
    }
  };

  const loadCombatHistory = useCallback(async () => {
    setCombatHistoryLoading(true);
    try {
      const data = await graphqlClient.request(GET_ALL_COMBAT_RESOLVED_EVENTS, { first: 50 });
      const nodes = (data as { combatResolvedEvents?: { nodes: unknown[] } }).combatResolvedEvents?.nodes ?? [];
      setCombatHistory(
        nodes.map((n) => {
          const r = n as Record<string, unknown>;
          return {
          winnerTokenId: String(r.winnerTokenId ?? ""),
          loserTokenId: String(r.loserTokenId ?? ""),
          winner: String(r.winner ?? ""),
          loser: String(r.loser ?? ""),
          winnerScore: String(r.winnerScore ?? ""),
          loserScore: String(r.loserScore ?? ""),
          transactionHash: String(r.transactionHash ?? ""),
        };
        })
      );
    } catch {
      setCombatHistory([]);
    } finally {
      setCombatHistoryLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCombatHistory();
  }, [loadCombatHistory]);

  const noContracts = !YOKI_ADDRESS || !ARENA_ADDRESS;

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 p-6 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-700 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-amber-400">Yoki Arena</h1>
          <div className="flex items-center gap-3">
            {address ? (
              <>
                <span className="text-stone-400 text-sm truncate max-w-[180px]" title={address}>
                  {address.slice(0, 6)}…{address.slice(-4)}
                </span>
                <button
                  onClick={disconnect}
                  className="px-3 py-1.5 rounded bg-stone-700 hover:bg-stone-600 text-sm"
                >
                  Déconnecter
                </button>
              </>
            ) : (
              <button
                onClick={connect}
                disabled={walletLoading}
                className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-stone-900 font-medium"
              >
                {walletLoading ? "Connexion…" : "Connecter le wallet"}
              </button>
            )}
          </div>
        </header>
        {walletError && <p className="text-red-400 text-sm">{walletError}</p>}
        {noContracts && (
          <p className="text-amber-200/90 bg-amber-950/40 border border-amber-800 rounded-lg p-4">
            Configurez <code className="bg-stone-800 px-1 rounded">NEXT_PUBLIC_YOKI_NFT_ADDRESS</code>,{" "}
            <code className="bg-stone-800 px-1 rounded">NEXT_PUBLIC_ARENA_ADDRESS</code> et{" "}
            <code className="bg-stone-800 px-1 rounded">NEXT_PUBLIC_COMBAT_RESULT_NFT_ADDRESS</code> dans{" "}
            <code className="bg-stone-800 px-1 rounded">.env.local</code>.
          </p>
        )}

        {/* 1. Mint Yoki */}
        <section className="rounded-xl border border-stone-700 bg-stone-900/50 p-6">
          <h2 className="text-xl font-semibold text-amber-400/90 mb-4">1. Minter un NFT Yoki</h2>
          <p className="text-stone-400 text-sm mb-4">Réservé au propriétaire du contrat (onlyOwner).</p>
          <form onSubmit={handleMint} className="space-y-4 max-w-md">
            <div>
              <label className="block text-stone-400 text-sm mb-1">Adresse destinataire (vide = wallet connecté)</label>
              <input
                type="text"
                value={mintForm.to}
                onChange={(e) => setMintForm((f) => ({ ...f, to: e.target.value }))}
                placeholder={address ?? "0x…"}
                className="w-full rounded bg-stone-800 border border-stone-600 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-stone-400 text-sm mb-1">Nom</label>
              <input
                type="text"
                value={mintForm.name}
                onChange={(e) => setMintForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Yoki"
                className="w-full rounded bg-stone-800 border border-stone-600 px-3 py-2 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {(["force", "rapidite", "dexterite", "resistance", "intelligence"] as const).map((key) => (
                <div key={key}>
                  <label className="block text-stone-400 text-xs mb-0.5">{key}</label>
                  <input
                    type="number"
                    min={0}
                    max={255}
                    value={mintForm[key]}
                    onChange={(e) => setMintForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full rounded bg-stone-800 border border-stone-600 px-2 py-1 text-sm"
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              disabled={mintLoading || !signer || noContracts}
              className="px-4 py-2 rounded bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-stone-900 font-medium"
            >
              {mintLoading ? "Mint en cours…" : "Minter"}
            </button>
          </form>
          {mintError && <p className="text-red-400 text-sm mt-2">{mintError}</p>}
          {mintTx && (
            <p className="text-green-400 text-sm mt-2">
              Mint OK — Tx: <span className="font-mono text-xs">{mintTx}</span>
            </p>
          )}
        </section>

        {/* 2. Afficher les Yoki d'une adresse */}
        <section className="rounded-xl border border-stone-700 bg-stone-900/50 p-6">
          <h2 className="text-xl font-semibold text-amber-400/90 mb-4">2. Yoki dans un wallet</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <input
              type="text"
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              placeholder={address ? `${address.slice(0, 8)}…` : "Adresse (ex: 0x…)"}
              className="flex-1 min-w-[200px] rounded bg-stone-800 border border-stone-600 px-3 py-2 text-sm"
            />
            <button
              onClick={loadYokiList}
              disabled={yokiListLoading || !provider || noContracts}
              className="px-4 py-2 rounded bg-stone-600 hover:bg-stone-500 disabled:opacity-50"
            >
              {yokiListLoading ? "Chargement…" : "Rafraîchir"}
            </button>
          </div>
          {yokiListError && <p className="text-red-400 text-sm mb-2">{yokiListError}</p>}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {yokiList.map((y) => (
              <div
                key={y.tokenId}
                className="rounded-lg border border-stone-600 bg-stone-800/80 p-4"
              >
                <p className="font-medium text-amber-300">#{y.tokenId} — {y.name}</p>
                <ul className="text-stone-400 text-xs mt-2 space-y-0.5">
                  <li>Force {y.force} · Rapidité {y.rapidite} · Dextérité {y.dexterite}</li>
                  <li>Résistance {y.resistance} · Intelligence {y.intelligence}</li>
                </ul>
                <p className="text-stone-500 text-xs mt-1">Score total: {y.force + y.rapidite + y.dexterite + y.resistance + y.intelligence}</p>
              </div>
            ))}
          </div>
          {!yokiListLoading && yokiList.length === 0 && (searchAddress || address) && !yokiListError && (
            <p className="text-stone-500 text-sm">Aucun Yoki pour cette adresse.</p>
          )}
        </section>

        {/* 3. Enregistrer dans l'arène + résoudre */}
        <section className="rounded-xl border border-stone-700 bg-stone-900/50 p-6">
          <h2 className="text-xl font-semibold text-amber-400/90 mb-4">3. Enregistrer un Yoki dans un combat</h2>
          <p className="text-stone-400 text-sm mb-4">
            Deux Yoki doivent être enregistrés pour lancer le combat. Ensuite, n&apos;importe qui peut appeler &quot;Résoudre le combat&quot;.
          </p>
          <div className="mb-4 flex flex-wrap gap-2 items-end">
            <div>
              <label className="block text-stone-400 text-sm mb-1">TokenId Yoki à enregistrer</label>
              <input
                type="text"
                value={registerTokenId}
                onChange={(e) => setRegisterTokenId(e.target.value)}
                placeholder="0"
                className="w-28 rounded bg-stone-800 border border-stone-600 px-3 py-2 text-sm"
              />
            </div>
            <button
              onClick={handleRegister}
              disabled={registerLoading || !signer || noContracts}
              className="px-4 py-2 rounded bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-stone-900 font-medium"
            >
              {registerLoading ? "Enregistrement…" : "Enregistrer dans l&apos;arène"}
            </button>
          </div>
          {registerError && <p className="text-red-400 text-sm mb-2">{registerError}</p>}
          <div className="rounded-lg bg-stone-800/60 p-4 mb-4">
            <p className="text-stone-400 text-sm mb-2">État de l&apos;arène</p>
            <p>Combattant 1: {arenaFighter1 ? `Token #${arenaFighter1.tokenId} (score ${arenaFighter1.totalScore})` : "—"}</p>
            <p>Combattant 2: {arenaFighter2 ? `Token #${arenaFighter2.tokenId} (score ${arenaFighter2.totalScore})` : "—"}</p>
            <p>Combat en cours: {combatInProgress ? "Oui" : "Non"}</p>
            {combatInProgress && (
              <button
                onClick={handleResolve}
                disabled={resolveLoading || !signer}
                className="mt-3 px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium"
              >
                {resolveLoading ? "Résolution…" : "Résoudre le combat"}
              </button>
            )}
          </div>
          {resolveError && <p className="text-red-400 text-sm">{resolveError}</p>}
        </section>

        {/* 4. Issue du combat */}
        <section className="rounded-xl border border-stone-700 bg-stone-900/50 p-6">
          <h2 className="text-xl font-semibold text-amber-400/90 mb-4">4. Issue du combat</h2>
          {lastCombatResult && (
            <div className="rounded-lg border border-amber-800 bg-amber-950/30 p-4 mb-6">
              <p className="text-amber-300 font-medium mb-2">Dernier combat résolu (cette session)</p>
              <p>Gagnant: Token #{lastCombatResult.winnerTokenId} (score {lastCombatResult.winnerScore}) — {lastCombatResult.winner.slice(0, 10)}…</p>
              <p>Perdant: Token #{lastCombatResult.loserTokenId} (score {lastCombatResult.loserScore}) — {lastCombatResult.loser.slice(0, 10)}…</p>
              <p className="text-stone-500 text-xs mt-1 font-mono">{lastCombatResult.txHash}</p>
            </div>
          )}
          <p className="text-stone-400 text-sm mb-2">Historique des combats (indexer SubQuery)</p>
          <button
            onClick={loadCombatHistory}
            disabled={combatHistoryLoading}
            className="mb-3 px-3 py-1.5 rounded bg-stone-600 hover:bg-stone-500 disabled:opacity-50 text-sm"
          >
            {combatHistoryLoading ? "Chargement…" : "Rafraîchir"}
          </button>
          <ul className="space-y-2">
            {combatHistory.map((c, i) => (
              <li key={`${c.transactionHash}-${i}`} className="rounded bg-stone-800/60 p-3 text-sm">
                <span className="text-green-400">#{c.winnerTokenId}</span> (score {c.winnerScore}) bat{" "}
                <span className="text-red-400">#{c.loserTokenId}</span> (score {c.loserScore})
                <span className="text-stone-500 ml-2 font-mono text-xs">{c.transactionHash.slice(0, 18)}…</span>
              </li>
            ))}
          </ul>
          {!combatHistoryLoading && combatHistory.length === 0 && (
            <p className="text-stone-500 text-sm">Aucun combat indexé ou indexer non disponible.</p>
          )}
        </section>
      </div>
    </main>
  );
}
