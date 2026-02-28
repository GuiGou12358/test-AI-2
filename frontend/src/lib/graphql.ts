import { GraphQLClient } from "graphql-request";

const SUBQUERY_ENDPOINT =
  process.env.NEXT_PUBLIC_SUBQUERY_ENDPOINT || "http://localhost:3000/graphql";

export const graphqlClient = new GraphQLClient(SUBQUERY_ENDPOINT);

export const GET_VALUE_SET_EVENTS = `
  query GetValueSetEvents($first: Int!) {
    valueSetEvents(first: $first, orderBy: blockHeight_DESC) {
      nodes {
        id
        blockHeight
        previousValue
        newValue
        contractAddress
        transactionHash
      }
    }
  }
`;
