import { describe, it, expect, vi } from "vitest";
import { createGraphQLClient, getValueSetEvents } from "../graphql";

describe("graphql", () => {
  it("createGraphQLClient retourne un client", () => {
    const client = createGraphQLClient("http://localhost:3000/graphql");
    expect(client).toBeDefined();
  });

  it("getValueSetEvents retourne un tableau", async () => {
    const client = createGraphQLClient("http://localhost:3000/graphql");
    const originalRequest = client.request.bind(client);
    vi.spyOn(client, "request").mockResolvedValue({
      valueSetEvents: { nodes: [{ id: "1" }] },
    });

    const events = await getValueSetEvents(client, 5);
    expect(Array.isArray(events)).toBe(true);
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({ id: "1" });
  });

  it("getValueSetEvents gère les réponses vides", async () => {
    const client = createGraphQLClient("http://localhost:3000/graphql");
    vi.spyOn(client, "request").mockResolvedValue({});

    const events = await getValueSetEvents(client, 5);
    expect(events).toEqual([]);
  });
});
