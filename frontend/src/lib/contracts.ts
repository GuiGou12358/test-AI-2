import { Contract, ethers } from "ethers";

const YOKI_NFT_ABI = [
  "function mint(address to, string name, uint8 force, uint8 rapidite, uint8 dexterite, uint8 resistance, uint8 intelligence)",
  "function getAttributes(uint256 tokenId) view returns (string name, uint8 force, uint8 rapidite, uint8 dexterite, uint8 resistance, uint8 intelligence)",
  "function getTotalScore(uint256 tokenId) view returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function balanceOf(address owner) view returns (uint256)",
  "event YokiMinted(uint256 indexed tokenId, address indexed owner, string name, uint8 force, uint8 rapidite, uint8 dexterite, uint8 resistance, uint8 intelligence)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
] as const;

const ARENA_ABI = [
  "function register(uint256 tokenId)",
  "function resolveCombat()",
  "function fighter1() view returns (address owner, uint256 tokenId, uint256 totalScore)",
  "function fighter2() view returns (address owner, uint256 tokenId, uint256 totalScore)",
  "function combatInProgress() view returns (bool)",
  "function totalCombats() view returns (uint256)",
  "event YokiRegistered(address indexed owner, uint256 indexed tokenId, uint8 slotIndex, uint256 totalScore)",
  "event CombatResolved(uint256 indexed winnerTokenId, uint256 indexed loserTokenId, address indexed winner, address loser, uint256 winnerScore, uint256 loserScore, uint256 combatResultTokenId)",
] as const;

const COMBAT_RESULT_NFT_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function totalSupply() view returns (uint256)",
] as const;

export function getYokiNFTContract(
  address: string,
  signerOrProvider: ethers.Signer | ethers.Provider
): Contract {
  return new Contract(address, YOKI_NFT_ABI as unknown as ethers.InterfaceAbi, signerOrProvider);
}

export function getArenaContract(
  address: string,
  signerOrProvider: ethers.Signer | ethers.Provider
): Contract {
  return new Contract(address, ARENA_ABI as unknown as ethers.InterfaceAbi, signerOrProvider);
}

export function getCombatResultNFTContract(
  address: string,
  signerOrProvider: ethers.Signer | ethers.Provider
): Contract {
  return new Contract(address, COMBAT_RESULT_NFT_ABI as unknown as ethers.InterfaceAbi, signerOrProvider);
}

export const ARENA_IFACE = new ethers.Interface(ARENA_ABI as unknown as string[]);

export type YokiAttributes = {
  name: string;
  force: number;
  rapidite: number;
  dexterite: number;
  resistance: number;
  intelligence: number;
};
