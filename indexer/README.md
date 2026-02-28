# Indexer - SubQuery

Indexer SubQuery qui indexe les données onchain des contrats Yoki, Arena et CombatResult et expose une API GraphQL.

## Stack

- SubQuery
- TypeScript
- GraphQL
- @subql/node-ethereum

## Événements indexés

| Contrat | Événements |
|---------|------------|
| YokiNFT | `YokiMinted` |
| Arena | `YokiRegistered`, `CombatResolved` |
| CombatResultNFT | `CombatResultCreated` |

## Commandes

| Commande | Description |
|----------|-------------|
| `npm run codegen` | Génère les types depuis schema.graphql |
| `npm run build` | Build le projet |
| `npm run dev` | Lance Docker (PostgreSQL + indexer + query) |
| `npm run validate` | Valide la configuration |

## Configuration

1. Compiler et déployer les contrats : `cd ../contracts && npm run compile && npm run deploy:yoki`
2. Mettre à jour `project.yaml` avec les adresses déployées :
   - DataSource YokiNFT : `address`
   - DataSource Arena : `address`
   - DataSource CombatResultNFT : `address`
3. `npm run codegen && npm run build`
4. `npm run dev`

## API GraphQL

Une fois lancé, l'API est disponible sur `http://localhost:3000/graphql`.

Exemples de requêtes :

```graphql
query {
  yokiMintedEvents(first: 10, orderBy: blockHeight_DESC) {
    nodes {
      id
      tokenId
      owner
      name
      force
      rapidite
      dexterite
      resistance
      intelligence
    }
  }
}

query {
  combatResolvedEvents(first: 10, orderBy: blockHeight_DESC) {
    nodes {
      id
      winnerTokenId
      loserTokenId
      winner
      loser
      winnerScore
      loserScore
    }
  }
}
```
