import { describe, expect, it } from "vitest";
import { LruCache } from "../src/solution11";

describe("LruCache", () => {
  it("returns undefined for a missing key", () => {
    const cache = new LruCache(2);
    expect(cache.get("missing")).toBeUndefined();
  });

  it("stores and retrieves a value", () => {
    const cache = new LruCache(2);
    cache.put("a", 42);
    expect(cache.get("a")).toBe(42);
  });

  it("allows zero capacity", () => {
    const cache = new LruCache(0);
    cache.put("a", 1);
    cache.put("b", 2);
    expect(cache.get("a")).toBeUndefined();
    expect(cache.get("b")).toBeUndefined();
  });

  it("updates an existing key without increasing the item count", () => {
    const cache = new LruCache(2);
    cache.put("a", 1);
    cache.put("a", 7);
    cache.put("b", 9);

    expect(cache.get("a")).toBe(7);
    expect(cache.get("b")).toBe(9);
  });

  it("evicts the least recently used entry", () => {
    const cache = new LruCache(2);
    cache.put("a", 1);
    cache.put("b", 2);
    cache.get("a");
    cache.put("c", 3);

    expect(cache.get("a")).toBe(1);
    expect(cache.get("b")).toBeUndefined();
    expect(cache.get("c")).toBe(3);
  });

  it("marks a successful get as most recently used", () => {
    const cache = new LruCache(2);
    cache.put("a", 1);
    cache.put("b", 2);
    expect(cache.get("a")).toBe(1);
    cache.put("c", 3);

    expect(cache.get("b")).toBeUndefined();
    expect(cache.get("a")).toBe(1);
    expect(cache.get("c")).toBe(3);
  });

  it("does not change recency on a failed get", () => {
    const cache = new LruCache(2);
    cache.put("a", 1);
    cache.put("b", 2);
    expect(cache.get("missing")).toBeUndefined();
    cache.put("c", 3);

    expect(cache.get("a")).toBeUndefined();
    expect(cache.get("b")).toBe(2);
    expect(cache.get("c")).toBe(3);
  });

  it("supports capacity one and replacement behavior", () => {
    const cache = new LruCache(1);
    cache.put("a", 1);
    cache.put("a", 9);
    expect(cache.get("a")).toBe(9);
    cache.put("b", 2);
    expect(cache.get("a")).toBeUndefined();
    expect(cache.get("b")).toBe(2);
  });

  it("accepts empty and prototype-like string keys", () => {
    const cache = new LruCache(5);
    const keys = ["", "__proto__", "constructor", "A", "a"];

    keys.forEach((key, index) => cache.put(key, index));
    keys.forEach((key, index) => expect(cache.get(key)).toBe(index));
  });

  it("keeps separate instances independent", () => {
    const first = new LruCache(1);
    const second = new LruCache(1);

    first.put("x", 1);
    second.put("x", 2);
    first.put("y", 3);

    expect(first.get("x")).toBeUndefined();
    expect(first.get("y")).toBe(3);
    expect(second.get("x")).toBe(2);
    expect(second.get("y")).toBeUndefined();
  });
});
