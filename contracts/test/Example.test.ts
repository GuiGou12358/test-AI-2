import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Example", function () {
  async function deployFixture() {
    const [owner, other] = await ethers.getSigners();
    const Example = await ethers.getContractFactory("Example");
    const example = await Example.deploy(42);
    return { example, owner, other };
  }

  describe("Deployment", function () {
    it("Doit définir la valeur initiale correctement", async function () {
      const { example } = await loadFixture(deployFixture);
      expect(await example.value()).to.equal(42);
    });

    it("Doit définir le bon propriétaire", async function () {
      const { example, owner } = await loadFixture(deployFixture);
      expect(await example.owner()).to.equal(owner.address);
    });
  });

  describe("setValue", function () {
    it("Doit permettre au propriétaire de modifier la valeur", async function () {
      const { example } = await loadFixture(deployFixture);
      await example.setValue(100);
      expect(await example.value()).to.equal(100);
    });

    it("Doit émettre l'événement ValueSet", async function () {
      const { example } = await loadFixture(deployFixture);
      await expect(example.setValue(100))
        .to.emit(example, "ValueSet")
        .withArgs(42, 100);
    });

    it("Ne doit pas permettre aux non-propriétaires de modifier", async function () {
      const { example, other } = await loadFixture(deployFixture);
      await expect(example.connect(other).setValue(100)).to.be.revertedWithCustomError(
        example,
        "OwnableUnauthorizedAccount"
      );
    });
  });
});
