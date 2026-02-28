import { ethers } from "ethers";
import { getYokiNFTContract } from "./contracts";

const TRANSFER_TOPIC = ethers.id("Transfer(address,address,uint256)");

/**
 * Récupère les tokenIds des Yoki détenus par une adresse
 * en scannant les événements Transfer(to=address) puis en vérifiant ownerOf.
 */
export async function getYokiTokenIdsForOwner(
  yokiContractAddress: string,
  ownerAddress: string,
  provider: ethers.Provider
): Promise<bigint[]> {
  const contract = getYokiNFTContract(yokiContractAddress, provider);
  const filter = {
    address: yokiContractAddress,
    topics: [TRANSFER_TOPIC, null, ethers.zeroPadValue(ownerAddress, 32)] as string[],
  };
  const logs = await provider.getLogs({
    ...filter,
    fromBlock: 0,
    toBlock: "latest",
  });
  const tokenIds = new Set<bigint>();
  const iface = new ethers.Interface([
    "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
  ]);
  for (const log of logs) {
    const parsed = iface.parseLog({ topics: log.topics as string[], data: log.data });
    if (parsed?.args?.tokenId != null) tokenIds.add(parsed.args.tokenId);
  }
  const stillOwned: bigint[] = [];
  for (const id of tokenIds) {
    try {
      const owner = await contract.ownerOf(id);
      if (owner?.toLowerCase() === ownerAddress.toLowerCase()) stillOwned.push(id);
    } catch {
      // token brûlé ou inexistant
    }
  }
  return stillOwned.sort((a, b) => (a < b ? -1 : 1));
}
