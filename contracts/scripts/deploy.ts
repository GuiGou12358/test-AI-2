import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Déploiement avec le compte:", deployer.address);
  console.log("Balance du compte:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH");

  const Example = await ethers.getContractFactory("Example");
  const example = await Example.deploy(42);

  await example.waitForDeployment();
  const address = await example.getAddress();

  console.log("Contrat Example déployé à:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
