import { Contract, ethers } from "ethers";

const EXAMPLE_ABI = [
  "function value() view returns (uint256)",
  "function setValue(uint256)",
  "event ValueSet(uint256 indexed previousValue, uint256 indexed newValue)",
] as const;

export function getExampleContract(
  address: string,
  signerOrProvider: ethers.Signer | ethers.Provider
): Contract {
  return new Contract(address, EXAMPLE_ABI, signerOrProvider);
}
