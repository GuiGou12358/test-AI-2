# Projet Monorepo - Blockchain & Web3

Structure monorepo contenant quatre sous-projets autonomes pour une application blockchain complète.

## Structure du projet

```
.
├── contracts/     # Smart contracts Solidity (Hardhat, OpenZeppelin)
├── indexer/       # Indexer SubQuery (données onchain → GraphQL)
├── frontend/      # UI Next.js (contrats + GraphQL)
├── worker/        # Worker (contrats + SubQuery + LLM)
└── .cursor/       # Règles et skills pour les agents IA
```

## Prérequis

- **Node.js** 18+ (LTS recommandé)
- **npm** 9+
- **Docker** (pour l'indexer SubQuery en local)

## Installation

Chaque sous-projet est autonome. Installer les dépendances dans chaque répertoire :

```bash
cd contracts && npm install
cd ../indexer && npm install
cd ../frontend && npm install
cd ../worker && npm install
```

## Sous-projets

### 1. contracts

**Stack** : Solidity, Hardhat, OpenZeppelin, ethers.js, Mocha + Chai

```bash
cd contracts
npm run compile      # Compilation
npm test            # Tests
npm run deploy:local # Déploiement sur réseau local
```

**Variables d'environnement** (déploiement Sepolia) :
- `PRIVATE_KEY` : Clé privée du wallet
- `SEPOLIA_RPC_URL` : RPC endpoint (optionnel)

### 2. indexer

**Stack** : SubQuery, TypeScript, GraphQL

Indexe les événements des contrats et expose une API GraphQL.

```bash
cd indexer
npm run codegen     # Génère les types depuis schema.graphql
npm run build       # Build le projet
npm run dev         # Lance avec Docker (PostgreSQL + indexer + query)
```

**Configuration** : Mettre à jour `project.yaml` avec l'adresse du contrat déployé.

### 3. frontend

**Stack** : Next.js 15, TypeScript, ethers.js, Tailwind CSS, GraphQL

```bash
cd frontend
npm run dev         # Développement
npm run build       # Build production
```

**Variables d'environnement** :
- `NEXT_PUBLIC_SUBQUERY_ENDPOINT` : URL de l'API GraphQL SubQuery (défaut: http://localhost:3000/graphql)

### 4. worker

**Stack** : TypeScript, Node.js, ethers.js, GraphQL, LLM

Interagit avec les contrats, l'indexer et un LLM (optionnel).

```bash
cd worker
cp .env.example .env   # Configurer les variables
npm start              # Exécution
npm run dev            # Mode watch
```

**Variables d'environnement** (voir `.env.example`) :
- `RPC_URL` : RPC Ethereum
- `CONTRACT_ADDRESS` : Adresse du contrat Example
- `SUBQUERY_ENDPOINT` : API GraphQL SubQuery
- `LLM_API_URL`, `LLM_API_KEY` : Pour l'intégration LLM (optionnel)

## Workflow de développement

1. **Compiler et tester les contrats** : `cd contracts && npm run compile && npm test`
2. **Déployer en local** : Démarrer Hardhat node (`npx hardhat node`), puis `npm run deploy:local`
3. **Mettre à jour l'indexer** : Remplacer l'adresse dans `indexer/project.yaml`
4. **Lancer l'indexer** : `cd indexer && npm run dev`
5. **Démarrer le frontend** : `cd frontend && npm run dev`
6. **Lancer le worker** : `cd worker && npm start`

## Tests

| Projet    | Commande        |
|-----------|-----------------|
| contracts | `npm test`      |
| indexer   | `npm test`      |
| frontend  | `npm test`      |
| worker    | `npm test`      |

## Documentation

- [contracts/README.md](contracts/README.md)
- [indexer/README.md](indexer/README.md)
- [frontend/README.md](frontend/README.md)
- [worker/README.md](worker/README.md)

## Licence

MIT
