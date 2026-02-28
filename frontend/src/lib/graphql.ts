import { GraphQLClient } from "graphql-request";

const SUBQUERY_ENDPOINT =
  process.env.NEXT_PUBLIC_SUBQUERY_ENDPOINT || "http://localhost:3000/graphql";

export const graphqlClient = new GraphQLClient(SUBQUERY_ENDPOINT);

export const GET_COMBAT_RESOLVED_EVENTS = `
  query GetCombatResolvedEvents($first: Int!, $winner: String) {
    combatResolvedEvents(
      first: $first
      orderBy: blockHeight_DESC
      filter: { winner: { equalTo: $winner } }
    ) {
      nodes {
        id
        blockHeight
        transactionHash
        winnerTokenId
        loserTokenId
        winner
        loser
        winnerScore
        loserScore
        combatResultTokenId
      }
    }
  }
`;

export const GET_ALL_COMBAT_RESOLVED_EVENTS = `
  query GetAllCombatResolvedEvents($first: Int!) {
    combatResolvedEvents(first: $first, orderBy: blockHeight_DESC) {
      nodes {
        id
        blockHeight
        transactionHash
        winnerTokenId
        loserTokenId
        winner
        loser
        winnerScore
        loserScore
        combatResultTokenId
      }
    }
  }
`;
