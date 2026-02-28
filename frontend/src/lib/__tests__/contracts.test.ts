import { describe, it, expect } from "vitest";
import { getExampleContract } from "../contracts";

describe("contracts", () => {
  it("getExampleContract retourne un contrat avec la bonne adresse", () => {
    const mockProvider = {
      getSigner: () => ({}),
      getNetwork: () => Promise.resolve({ chainId: 1n }),
    } as unknown;
    const address = "0x0000000000000000000000000000000000000001";
    const contract = getExampleContract(address, mockProvider as never);
    expect(contract).toBeDefined();
    expect(contract.target).toBe(address);
  });
});
