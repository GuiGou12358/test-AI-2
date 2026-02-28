import { GraphQLClient, gql } from "graphql-request";

const GET_VALUE_SET_EVENTS = gql`
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

export function createGraphQLClient(endpoint: string): GraphQLClient {
  return new GraphQLClient(endpoint);
}

export async function getValueSetEvents(
  client: GraphQLClient,
  first: number
): Promise<unknown[]> {
  const data = await client.request(GET_VALUE_SET_EVENTS, { first });
  return (data as { valueSetEvents?: { nodes?: unknown[] } }).valueSetEvents
    ?.nodes ?? [];
}
