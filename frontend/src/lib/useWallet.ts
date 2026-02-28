"use client";

import { useState, useCallback, useEffect } from "react";
import { BrowserProvider, Signer, type Eip1193Provider } from "ethers";

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [signer, setSigner] = useState<Signer | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      if (typeof window === "undefined" || !window.ethereum) {
        throw new Error("Aucun wallet détecté (ex: MetaMask).");
      }
      const prov = new BrowserProvider(window.ethereum as Eip1193Provider);
      const accounts = await prov.send("eth_requestAccounts", []);
      if (!accounts?.length) throw new Error("Aucun compte autorisé.");
      const sig = await prov.getSigner();
      setProvider(prov);
      setSigner(sig);
      setAddress(accounts[0] as string);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
    setSigner(null);
    setProvider(null);
    setError(null);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return;
    const onAccountsChanged = (accounts: unknown) => {
      if (Array.isArray(accounts) && accounts.length > 0) {
        setAddress(accounts[0] as string);
      } else {
        disconnect();
      }
    };
    window.ethereum.on?.("accountsChanged", onAccountsChanged);
    return () => {
      window.ethereum?.removeListener?.("accountsChanged", onAccountsChanged);
    };
  }, [disconnect]);

  return { address, signer, provider, loading, error, connect, disconnect };
}

declare global {
  interface Window {
    ethereum?: {
      request?: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      send?: (method: string, params?: unknown[]) => Promise<unknown>;
      on?: (event: string, cb: (payload: unknown) => void) => void;
      removeListener?: (event: string, cb: (payload: unknown) => void) => void;
    };
  }
}
