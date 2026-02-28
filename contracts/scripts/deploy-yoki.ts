import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Déploiement avec le compte:", deployer.address);
  console.log(
    "Balance:",
    ethers.formatEther(await ethers.provider.getBalance(deployer.address)),
    "ETH"
  );

  // 1. Déployer YokiNFT
  const YokiNFT = await ethers.getContractFactory("YokiNFT");
  const yokiNFT = await YokiNFT.deploy();
  await yokiNFT.waitForDeployment();
  const yokiNFTAddress = await yokiNFT.getAddress();
  console.log("YokiNFT déployé à:", yokiNFTAddress);

  // 2. Déployer CombatResultNFT
  const CombatResultNFT = await ethers.getContractFactory("CombatResultNFT");
  const combatResultNFT = await CombatResultNFT.deploy();
  await combatResultNFT.waitForDeployment();
  const combatResultNFTAddress = await combatResultNFT.getAddress();
  console.log("CombatResultNFT déployé à:", combatResultNFTAddress);

  // 3. Déployer Arena
  const Arena = await ethers.getContractFactory("Arena");
  const arena = await Arena.deploy(yokiNFTAddress, combatResultNFTAddress);
  await arena.waitForDeployment();
  const arenaAddress = await arena.getAddress();
  console.log("Arena déployée à:", arenaAddress);

  // 4. Configurer l'Arena dans CombatResultNFT
  const tx = await combatResultNFT.setArena(arenaAddress);
  await tx.wait();
  console.log("Arena configurée dans CombatResultNFT");

  console.log("\n--- Adresses pour l'indexer ---");
  console.log("YokiNFT:", yokiNFTAddress);
  console.log("Arena:", arenaAddress);
  console.log("CombatResultNFT:", combatResultNFTAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
