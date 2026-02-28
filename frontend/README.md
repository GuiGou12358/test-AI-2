# Frontend - Next.js

Interface utilisateur Next.js intégrant les contrats Solidity et l'indexer SubQuery via GraphQL.

## Stack

- Next.js 15
- TypeScript
- ethers.js v6
- graphql-request
- Tailwind CSS

## Commandes

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build production |
| `npm run start` | Serveur production |
| `npm test` | Tests Vitest |

## Variables d'environnement

Créer `.env.local` :

```
NEXT_PUBLIC_SUBQUERY_ENDPOINT=http://localhost:3000/graphql
```

## Structure

```
src/
├── app/           # App Router Next.js
├── lib/           # Utilitaires (contrats, graphql)
└── components/    # Composants React
```
