import { describe, it, expect } from "vitest";
import {
  YokiMintedEvent,
  YokiRegisteredEvent,
  CombatResolvedEvent,
  CombatResultCreatedEvent,
} from "../types";

describe("indexer types", () => {
  it("YokiMintedEvent peut être instancié", () => {
    const entity = new YokiMintedEvent(
      "test-id",
      1n,
      "0xabc",
      "0x123",
      "0xaddr",
      0n,
      "0xowner",
      "Test",
      50,
      50,
      50,
      50,
      50
    );
    expect(entity.id).toBe("test-id");
    expect(entity).toBeInstanceOf(YokiMintedEvent);
  });

  it("YokiRegisteredEvent peut être instancié", () => {
    const entity = new YokiRegisteredEvent(
      "test-id",
      1n,
      "0xabc",
      "0x123",
      "0xaddr",
      "0xowner",
      0n,
      1,
      100n
    );
    expect(entity.id).toBe("test-id");
  });

  it("CombatResolvedEvent peut être instancié", () => {
    const entity = new CombatResolvedEvent(
      "test-id",
      1n,
      "0xabc",
      "0x123",
      "0xaddr",
      0n,
      1n,
      "0xw",
      "0xl",
      100n,
      50n,
      0n
    );
    expect(entity.id).toBe("test-id");
  });

  it("CombatResultCreatedEvent peut être instancié", () => {
    const entity = new CombatResultCreatedEvent(
      "test-id",
      1n,
      "0xabc",
      "0x123",
      "0xaddr",
      0n,
      "0xw",
      "0xl",
      0n,
      1n,
      100n,
      50n
    );
    expect(entity.id).toBe("test-id");
  });
});
