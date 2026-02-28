---
name: blockchain-project
description: Guide le développement dans ce monorepo blockchain (contrats Solidity, indexer SubQuery, frontend Next.js, worker). Utiliser quand on travaille sur les smart contracts, l'indexation, l'UI ou le worker.
---

# Blockchain Project Skill

## Structure

Ce projet contient 4 sous-projets autonomes :

1. **contracts** : Smart contracts Solidity (Hardhat, OpenZeppelin)
2. **indexer** : SubQuery indexer (EVM → GraphQL)
3. **frontend** : Next.js + ethers.js + GraphQL
4. **worker** : TypeScript + ethers + SubQuery + LLM

## Workflow

1. Modifier les contrats dans `contracts/`
2. Compiler : `cd contracts && npm run compile`
3. Mettre à jour le schema SubQuery dans `indexer/schema.graphql` si nouveaux événements
4. Mettre à jour les mappings dans `indexer/src/`
5. Exécuter `npm run codegen` et `npm run build` dans indexer
6. Adapter frontend/worker si nécessaire

## Indexer SubQuery

- Le manifest est dans `project.yaml`
- L'adresse du contrat doit être mise à jour après déploiement
- Le chemin `assets.Example.file` pointe vers `../contracts/artifacts/...`
- Les types sont générés par `subql codegen` depuis `schema.graphql`

## Répondre toujours en français
