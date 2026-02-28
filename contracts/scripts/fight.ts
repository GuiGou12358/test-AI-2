import { ethers } from "hardhat";


const YOKI_NFT_ADDRESS="0x029Ab82d72F368Ab54B31B1eD68a36Eb44fF0996";
const ARENA_ADDRESS="0x2B13C7338C0A5E99C3C015312BD128F64A68758d";
const COMBAT_RESULT_NFT_ADDRESS="0x5F33823e6F0b903b4bdE23DCFeAA815e473323b3";
/*
const YOKI_NFT_ADDRESS = process.env.YOKI_NFT_ADDRESS;
const ARENA_ADDRESS = process.env.ARENA_ADDRESS;
const COMBAT_RESULT_NFT_ADDRESS = process.env.COMBAT_RESULT_NFT_ADDRESS;
*/
if (!YOKI_NFT_ADDRESS || !ARENA_ADDRESS || !COMBAT_RESULT_NFT_ADDRESS) {
  console.error("Variables d'environnement manquantes");
  process.exit(1);
}

console.log("YOKI_NFT_ADDRESS", YOKI_NFT_ADDRESS);
console.log("ARENA_ADDRESS", ARENA_ADDRESS);
console.log("COMBAT_RESULT_NFT_ADDRESS", COMBAT_RESULT_NFT_ADDRESS);  

async function main() {
  const [signer] = await ethers.getSigners();

  // Interfaces
  const yokiNFT = await ethers.getContractAt("YokiNFT", YOKI_NFT_ADDRESS, signer);
  const arena = await ethers.getContractAt("Arena", ARENA_ADDRESS, signer);

  // Get les Yoki du wallet
  const balance = await yokiNFT.balanceOf(signer.address);
  if (balance < 2) {
    console.error("Il faut au moins 2 Yoki pour faire un combat.");
    process.exit(1);
  }

  // Liste des tokenIds possédés
  const tokens: bigint[] = [BigInt(0), BigInt(1)];
/*  for (let i = 0; i < balance; i++) {
    const tokenId = await yokiNFT.tokenOfOwnerByIndex(signer.address, i);
    tokens.push(tokenId);
  }
*/

  // Enregistre les deux premiers tokens dans l'arène
  console.log(`Enregistrement dans l'arène des Yoki #${tokens[0].toString()} et #${tokens[1].toString()}...`);
  let tx1 = await arena.register(tokens[0]);
  await tx1.wait();
  console.log(`Yoki #${tokens[0].toString()} enregistré.`);

  let tx2 = await arena.register(tokens[1]);
  await tx2.wait();
  console.log(`Yoki #${tokens[1].toString()} enregistré.`);

  // Vérifie si le combat a bien commencé
  const combatInProgress = await arena.combatInProgress();
  if (!combatInProgress) {
    console.error("Le combat n'a pas pu être démarré.");
    process.exit(1);
  }

  // Résout le combat
  console.log("Lancement du combat...");
  const tx3 = await arena.resolveCombat();
  const receipt = await tx3.wait();

  // Extraction des infos du combat depuis l'event CombatResolved
  const iface = await ethers.getContractAt("Arena", ARENA_ADDRESS);
  const eventFragment = iface.interface.getEvent("CombatResolved");
  let found = false;
  for (const log of receipt.logs) {
    try {
      const parsed = iface.interface.parseLog(log);
      if (parsed.name === "CombatResolved") {
        found = true;
        const {
          winnerTokenId,
          loserTokenId,
          winner,
          loser,
          winnerScore,
          loserScore,
          combatResultTokenId,
        } = parsed.args;
        console.log("Combat résolu !");
        console.log(`Gagnant: Token #${winnerTokenId} (score ${winnerScore}) (${winner})`);
        console.log(`Perdant: Token #${loserTokenId} (score ${loserScore}) (${loser})`);
        console.log(`CombatResultNFT minté: TokenId #${combatResultTokenId}`);
        break;
      }
    } catch {}
  }
  if (!found) {
    console.error("Event CombatResolved non trouvé dans la transaction.");
  }
}

main().catch((err) => {
  console.error("Erreur:", err);
  process.exit(1);
});