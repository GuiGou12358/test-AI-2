import { HardhatUserConfig, task, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const MINATO_OWNER_PRIVATE_KEY = vars.get("MINATO_OWNER_PRIVATE_KEY");

task("pk", "Prints the list of accounts", async (taskArgs, hre) => {
    console.log(process.env.PRIVATE_KEY);
});

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

task ("balances", "Prints the balance of an account", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    const balance = await hre.ethers.provider.getBalance(account);
    console.log(account.address, ": ", hre.ethers.formatEther(balance), "ETH");
  }
});

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: false,
      evmVersion: "cancun",
    },
  },
  ignition: {
    accounts: [MINATO_OWNER_PRIVATE_KEY],
    disableFeeBumping: false,
    maxFeeBumpPercentage: 100,
    requireConfirmations: 5,
  },
  defaultNetwork: "soneium-testnet",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    // Soneium testnet (Minato) - utilisé par défaut
    "soneium-testnet": {
      url: process.env.SONEIUM_TESTNET_RPC_URL || "https://rpc.minato.soneium.org",
      accounts: [MINATO_OWNER_PRIVATE_KEY],
      chainId: 1946,
      urls:{
        apiURL: "https://soneium-minato.blockscout.com/api",
        browserURL: "https://soneium-minato.blockscout.com",
      }
    },
    // Soneium mainnet
    "soneium-mainnet": {
      url: process.env.SONEIUM_MAINNET_RPC_URL || "https://rpc.soneium.org",
      accounts: [MINATO_OWNER_PRIVATE_KEY],
      chainId: 1868,
    },
  },
  verify: {
    etherscan: {
      apiKey: {
        "soneium-testnet": "empty key",
        "soneium-mainnet": "empty key",
      },
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
    currency: "USD",
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

export default config;
