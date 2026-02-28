import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("YokiNFT", function () {
  async function deployFixture() {
    const [owner, user] = await ethers.getSigners();
    const YokiNFT = await ethers.getContractFactory("YokiNFT");
    const yoki = await YokiNFT.deploy();
    return { yoki, owner, user };
  }

  describe("Mint", function () {
    it("Doit créer un Yoki avec les bons attributs", async function () {
      const { yoki, owner } = await loadFixture(deployFixture);
      await yoki.mint(
        owner.address,
        "Kaze",
        80,
        90,
        70,
        85,
        75
      );

      const attrs = await yoki.getAttributes(0);
      expect(attrs[0]).to.equal("Kaze");
      expect(attrs[1]).to.equal(80);
      expect(attrs[2]).to.equal(90);
      expect(attrs[3]).to.equal(70);
      expect(attrs[4]).to.equal(85);
      expect(attrs[5]).to.equal(75);

      expect(await yoki.getTotalScore(0)).to.equal(400n);
    });

    it("Doit émettre YokiMinted", async function () {
      const { yoki, owner } = await loadFixture(deployFixture);
      await expect(yoki.mint(owner.address, "Test", 50, 50, 50, 50, 50))
        .to.emit(yoki, "YokiMinted")
        .withArgs(0, owner.address, "Test", 50, 50, 50, 50, 50);
    });

    it("Seul le owner peut minter", async function () {
      const { yoki, user } = await loadFixture(deployFixture);
      await expect(
        yoki.connect(user).mint(user.address, "Hack", 1, 1, 1, 1, 1)
      ).to.be.revertedWithCustomError(yoki, "OwnableUnauthorizedAccount");
    });
  });
});
