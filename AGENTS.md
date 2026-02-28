# Configuration des agents IA

Ce document guide les agents IA travaillant sur ce projet.

## Structure du projet

Monorepo avec 4 sous-projets **autonomes** :

| Répertoire   | Description                    | Stack principal                      |
|--------------|--------------------------------|--------------------------------------|
| `contracts/` | Smart contracts                | Solidity, Hardhat, OpenZeppelin      |
| `indexer/`   | Indexation onchain → GraphQL   | SubQuery, TypeScript                 |
| `frontend/`  | Interface utilisateur          | Next.js, TypeScript, ethers.js       |
| `worker/`    | Backend / automation + LLM     | TypeScript, ethers.js, GraphQL       |

## Règles importantes

1. **Langue** : Répondre en français
2. **Autonomie** : Chaque sous-projet a son `package.json` et ses dépendances
3. **Package manager** : npm (pas yarn ni pnpm)
4. **Tests** : Chaque projet inclut des tests (Mocha pour contracts, Vitest pour les autres)
5. **Documentation** : Consulter les README de chaque sous-projet

## Fichiers de référence

- **Règles Cursor** : `.cursor/rules/*.mdc`
- **Skills** : `.cursor/skills/blockchain-project/`
- **Documentation** : `README.md` et `*/README.md`

## Commandes rapides

```bash
# Contracts
cd contracts && npm install && npm run compile && npm test

# Indexer (après compilation des contrats)
cd indexer && npm install && npm run codegen && npm run build

# Frontend
cd frontend && npm install && npm run dev

# Worker
cd worker && npm install && npm start
```

## Variables d'environnement

- **contracts** : `PRIVATE_KEY`, `SEPOLIA_RPC_URL`, `SONEIUM_TESTNET_RPC_URL`, `SONEIUM_MAINNET_RPC_URL` (réseau par défaut : Soneium testnet)
- **frontend** : `NEXT_PUBLIC_SUBQUERY_ENDPOINT`
- **worker** : `RPC_URL`, `CONTRACT_ADDRESS`, `SUBQUERY_ENDPOINT`, `LLM_API_URL`, `LLM_API_KEY`

Voir `.env.example` dans chaque projet concerné.
