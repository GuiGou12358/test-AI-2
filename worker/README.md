# Worker

Worker TypeScript qui interagit avec les smart contracts Solidity, l'indexer SubQuery GraphQL et un LLM.

## Stack

- TypeScript
- Node.js
- ethers.js v6
- graphql-request
- Intégration LLM (OpenAI ou compatible)

## Commandes

| Commande | Description |
|----------|-------------|
| `npm start` | Exécution |
| `npm run dev` | Mode watch |
| `npm test` | Tests Vitest |

## Configuration

Copier `.env.example` vers `.env` :

```env
RPC_URL=https://rpc.sepolia.org
CONTRACT_ADDRESS=0x...   # Adresse du contrat Example
SUBQUERY_ENDPOINT=http://localhost:3000/graphql
LLM_API_URL=https://api.openai.com/v1/chat/completions
LLM_API_KEY=sk-...
```

L'intégration LLM est optionnelle. Sans `LLM_API_URL` et `LLM_API_KEY`, le worker affichera un message indiquant que le LLM n'est pas configuré.
