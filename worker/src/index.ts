import "dotenv/config";
import { ethers } from "ethers";
import { GraphQLClient, gql } from "graphql-request";

const RPC_URL = process.env.RPC_URL || "https://rpc.sepolia.org";
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "";
const SUBQUERY_ENDPOINT =
  process.env.SUBQUERY_ENDPOINT || "http://localhost:3000/graphql";
const LLM_API_URL = process.env.LLM_API_URL || "";
const LLM_API_KEY = process.env.LLM_API_KEY || "";

const EXAMPLE_ABI = [
  "function value() view returns (uint256)",
  "function setValue(uint256)",
  "event ValueSet(uint256 indexed previousValue, uint256 indexed newValue)",
] as const;

const GET_VALUE_SET_EVENTS = gql`
  query GetValueSetEvents($first: Int!) {
    valueSetEvents(first: $first, orderBy: blockHeight_DESC) {
      nodes {
        id
        blockHeight
        previousValue
        newValue
        contractAddress
      }
    }
  }
`;

async function getContractValue(): Promise<bigint | null> {
  if (!CONTRACT_ADDRESS) return null;
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, EXAMPLE_ABI, provider);
  return contract.value();
}

async function getIndexedEvents(limit = 10): Promise<unknown[]> {
  try {
    const client = new GraphQLClient(SUBQUERY_ENDPOINT);
    const data = await client.request(GET_VALUE_SET_EVENTS, { first: limit });
    return (data as { valueSetEvents?: { nodes?: unknown[] } }).valueSetEvents
      ?.nodes ?? [];
  } catch {
    return [];
  }
}

async function callLlm(prompt: string): Promise<string> {
  if (!LLM_API_URL || !LLM_API_KEY) {
    return "[LLM non configuré - définir LLM_API_URL et LLM_API_KEY]";
  }
  const response = await fetch(LLM_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LLM_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    }),
  });
  const data = (await response.json()) as { choices?: { message?: { content?: string } }[] };
  return data.choices?.[0]?.message?.content ?? "[Pas de réponse LLM]";
}

async function main() {
  console.log("Worker démarré");

  const value = await getContractValue();
  if (value !== null) {
    console.log("Valeur on-chain:", value.toString());
  }

  const events = await getIndexedEvents(5);
  console.log("Événements indexés:", events.length);

  const summary = `Résumé des données: valeur on-chain=${value?.toString() ?? "N/A"}, événements indexés=${events.length}`;
  const llmResponse = await callLlm(
    `Analyse ces données blockchain en une phrase: ${summary}`
  );
  console.log("Réponse LLM:", llmResponse);
}

main().catch(console.error);
