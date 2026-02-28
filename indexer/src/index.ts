import type { EthereumLog } from "@subql/types-ethereum";
import {
  YokiMintedEvent,
  YokiRegisteredEvent,
  CombatResolvedEvent,
  CombatResultCreatedEvent,
} from "./types";

function getBlockNumber(event: EthereumLog): bigint {
  return BigInt(event.block?.number ?? event.blockNumber ?? 0);
}

function getBlockHash(event: EthereumLog): string {
  return event.block?.hash ?? event.blockHash ?? "";
}

export async function handleYokiMinted(event: EthereumLog): Promise<void> {
  const args = event.args as unknown as {
    tokenId: bigint;
    owner: string;
    name: string;
    force: number;
    rapidite: number;
    dexterite: number;
    resistance: number;
    intelligence: number;
  };

  const entity = new YokiMintedEvent(
    `yoki-${event.transactionHash}-${event.logIndex}`,
    getBlockNumber(event),
    getBlockHash(event),
    event.transactionHash,
    event.address,
    args.tokenId,
    args.owner,
    args.name,
    args.force,
    args.rapidite,
    args.dexterite,
    args.resistance,
    args.intelligence
  );

  await entity.save();
}

export async function handleYokiRegistered(event: EthereumLog): Promise<void> {
  const args = event.args as unknown as {
    owner: string;
    tokenId: bigint;
    slotIndex: number;
    totalScore: bigint;
  };

  const entity = new YokiRegisteredEvent(
    `register-${event.transactionHash}-${event.logIndex}`,
    getBlockNumber(event),
    getBlockHash(event),
    event.transactionHash,
    event.address,
    args.owner,
    args.tokenId,
    args.slotIndex,
    args.totalScore
  );

  await entity.save();
}

export async function handleCombatResolved(event: EthereumLog): Promise<void> {
  const args = event.args as unknown as {
    winnerTokenId: bigint;
    loserTokenId: bigint;
    winner: string;
    loser: string;
    winnerScore: bigint;
    loserScore: bigint;
    combatResultTokenId: bigint;
  };

  const entity = new CombatResolvedEvent(
    `combat-${event.transactionHash}-${event.logIndex}`,
    getBlockNumber(event),
    getBlockHash(event),
    event.transactionHash,
    event.address,
    args.winnerTokenId,
    args.loserTokenId,
    args.winner,
    args.loser,
    args.winnerScore,
    args.loserScore,
    args.combatResultTokenId
  );

  await entity.save();
}

export async function handleCombatResultCreated(
  event: EthereumLog
): Promise<void> {
  const args = event.args as unknown as {
    tokenId: bigint;
    winner: string;
    loser: string;
    winnerTokenId: bigint;
    loserTokenId: bigint;
    winnerScore: bigint;
    loserScore: bigint;
  };

  const entity = new CombatResultCreatedEvent(
    `result-${event.transactionHash}-${event.logIndex}`,
    getBlockNumber(event),
    getBlockHash(event),
    event.transactionHash,
    event.address,
    args.tokenId,
    args.winner,
    args.loser,
    args.winnerTokenId,
    args.loserTokenId,
    args.winnerScore,
    args.loserScore
  );

  await entity.save();
}
