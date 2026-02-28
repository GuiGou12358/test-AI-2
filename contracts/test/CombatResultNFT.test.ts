import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

async function deployFixture() {
  const [owner, alice, bob] = await ethers.getSigners();

  const YokiNFT = await ethers.getContractFactory("YokiNFT");
  const yokiNFT = await YokiNFT.deploy();
  await yokiNFT.waitForDeployment();

  const CombatResultNFT = await ethers.getContractFactory("CombatResultNFT");
  const combatResultNFT = await CombatResultNFT.deploy();
  await combatResultNFT.waitForDeployment();

  const Arena = await ethers.getContractFactory("Arena");
  const arena = await Arena.deploy(
    await yokiNFT.getAddress(),
    await combatResultNFT.getAddress()
  );
  await arena.waitForDeployment();

  await combatResultNFT.setArena(await arena.getAddress());

  await yokiNFT.mint(alice.address, "A", 100, 0, 0, 0, 0);
  await yokiNFT.mint(bob.address, "B", 50, 0, 0, 0, 0);

  return { yokiNFT, arena, combatResultNFT, alice, bob };
}

describe("CombatResultNFT", function () {
  it("Mint un NFT au gagnant avec CombatResultCreated", async function () {
    const { yokiNFT, arena, combatResultNFT, alice, bob } =
      await loadFixture(deployFixture);

    await yokiNFT.connect(alice).approve(await arena.getAddress(), 0);
    await yokiNFT.connect(bob).approve(await arena.getAddress(), 1);

    await arena.connect(alice).register(0);
    await arena.connect(bob).register(1);

    await expect(arena.resolveCombat())
      .to.emit(combatResultNFT, "CombatResultCreated")
      .withArgs(0, alice.address, bob.address, 0, 1, 100n, 50n);

    expect(await combatResultNFT.ownerOf(0)).to.equal(alice.address);
    expect(await combatResultNFT.totalSupply()).to.equal(1n);
  });
});
