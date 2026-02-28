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

  // Mint 2 Yoki
  await yokiNFT.mint(alice.address, "AliceYoki", 100, 50, 50, 50, 50); // 300
  await yokiNFT.mint(bob.address, "BobYoki", 50, 50, 50, 50, 50); // 250

  return { yokiNFT, arena, combatResultNFT, owner, alice, bob };
}

describe("Arena", function () {
  it("Permet d'enregistrer 2 Yoki et de résoudre le combat", async function () {
    const { yokiNFT, arena, combatResultNFT, alice, bob } =
      await loadFixture(deployFixture);

    await yokiNFT.connect(alice).approve(await arena.getAddress(), 0);
    await yokiNFT.connect(bob).approve(await arena.getAddress(), 1);

    await arena.connect(alice).register(0);
    await arena.connect(bob).register(1);

    expect(await arena.combatInProgress()).to.be.true;

    await expect(arena.resolveCombat())
      .to.emit(arena, "CombatResolved")
      .withArgs(0, 1, alice.address, bob.address, 300n, 250n, 0);

    expect(await yokiNFT.ownerOf(0)).to.equal(alice.address);
    expect(await yokiNFT.ownerOf(1)).to.equal(bob.address);
    expect(await combatResultNFT.ownerOf(0)).to.equal(alice.address);
  });

  it("Ne permet pas plus de 2 Yoki dans l'arène", async function () {
    const { yokiNFT, arena, alice, bob } = await loadFixture(deployFixture);

    await yokiNFT.connect(alice).approve(await arena.getAddress(), 0);
    await yokiNFT.connect(bob).approve(await arena.getAddress(), 1);

    await arena.connect(alice).register(0);
    await arena.connect(bob).register(1);

    await yokiNFT.mint(alice.address, "Extra", 1, 1, 1, 1, 1);
    await yokiNFT.connect(alice).approve(await arena.getAddress(), 2);

    await expect(arena.connect(alice).register(2)).to.be.revertedWithCustomError(
      arena,
      "CombatNotReady"
    );
  });
});
