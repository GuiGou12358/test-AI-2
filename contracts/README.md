# Contracts - Smart Contracts Solidity

Smart contracts développés avec Hardhat, OpenZeppelin, ethers.js et Mocha + Chai.

## Stack

- Solidity ^0.8.24
- Hardhat
- OpenZeppelin Contracts
- ethers.js v6
- Mocha + Chai

## Commandes

| Commande | Description |
|----------|-------------|
| `npm run compile` | Compile les contrats |
| `npm test` | Exécute les tests |
| `npm run test:coverage` | Rapport de couverture |
| `npm run deploy:local` | Déploie sur localhost |
| `npm run deploy:sepolia` | Déploie sur Sepolia |
| `npm run lint` | Vérification Solhint |

## Structure

```
contracts/
├── contracts/      # Fichiers .sol
├── scripts/       # Scripts de déploiement
├── test/          # Tests Mocha
└── hardhat.config.ts
```

## Déploiement

Pour déployer sur Sepolia :

1. Créer `.env` avec `PRIVATE_KEY` et optionnellement `SEPOLIA_RPC_URL`
2. `npm run deploy:sepolia`

Pour le réseau local :

1. Terminal 1 : `npx hardhat node`
2. Terminal 2 : `npm run deploy:local`
