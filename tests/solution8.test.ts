import { describe, expect, it } from "vitest";
import { LruCache } from "../src/solutions/solution8";

describe("LruCache", () => {
  it("returns undefined for an absent key", () => {
    expect(new LruCache(2).get("missing")).toBeUndefined();
  });

  it("stores and retrieves zero, negative, and positive values", () => {
    const cache = new LruCache(3);
    cache.put("zero", 0);
    cache.put("negative", -7);
    cache.put("positive", Number.MAX_SAFE_INTEGER);

    expect(cache.get("zero")).toBe(0);
    expect(cache.get("negative")).toBe(-7);
    expect(cache.get("positive")).toBe(Number.MAX_SAFE_INTEGER);
  });

  it("evicts the least recently used entry when adding above capacity", () => {
    const cache = new LruCache(2);
    cache.put("a", 1);
    cache.put("b", 2);
    cache.put("c", 3);

    expect(cache.get("a")).toBeUndefined();
    expect(cache.get("b")).toBe(2);
    expect(cache.get("c")).toBe(3);
  });

  it("refreshes recency on a successful read, as in the first example", () => {
    const cache = new LruCache(2);
    cache.put("a", 1);
    cache.put("b", 2);
    expect(cache.get("a")).toBe(1);
    cache.put("c", 3);

    expect(cache.get("b")).toBeUndefined();
    expect(cache.get("a")).toBe(1);
    expect(cache.get("c")).toBe(3);
  });

  it("updates a value and recency without consuming another entry", () => {
    const cache = new LruCache(2);
    cache.put("a", 1);
    cache.put("b", 2);
    cache.put("a", 9);
    expect(cache.get("b")).toBe(2);
    cache.put("a", 10);
    cache.put("c", 3);

    expect(cache.get("b")).toBeUndefined();
    expect(cache.get("a")).toBe(10);
    expect(cache.get("c")).toBe(3);
  });

  it("does not change existing recency on a missing read", () => {
    const cache = new LruCache(2);
    cache.put("a", 1);
    cache.put("b", 2);
    expect(cache.get("missing")).toBeUndefined();
    cache.put("c", 3);

    expect(cache.get("a")).toBeUndefined();
    expect(cache.get("b")).toBe(2);
    expect(cache.get("c")).toBe(3);
  });

  it("supports updates and replacement at capacity one", () => {
    const cache = new LruCache(1);
    cache.put("a", 1);
    cache.put("a", 9);
    expect(cache.get("a")).toBe(9);
    cache.put("b", 2);

    expect(cache.get("a")).toBeUndefined();
    expect(cache.get("b")).toBe(2);
  });

  it("retains nothing at capacity zero", () => {
    const cache = new LruCache(0);
    cache.put("a", 1);
    cache.put("a", 2);
    cache.put("b", 3);

    expect(cache.get("a")).toBeUndefined();
    expect(cache.get("b")).toBeUndefined();
  });

  it("accepts empty and prototype-like keys and distinguishes case", () => {
    const cache = new LruCache(5);
    const keys = ["", "__proto__", "constructor", "a", "A"];
    keys.forEach((key, i) => cache.put(key, i));
    keys.forEach((key, i) => expect(cache.get(key)).toBe(i));
  });

  it("keeps instances independent", () => {
    const first = new LruCache(1);
    const second = new LruCache(1);
    first.put("a", 1);
    second.put("a", 2);
    first.put("b", 3);

    expect(first.get("a")).toBeUndefined();
    expect(first.get("b")).toBe(3);
    expect(second.get("a")).toBe(2);
    expect(second.get("b")).toBeUndefined();
  });

  it("supports reading an entry after it was evicted and later reinserted", () => {
    const cache = new LruCache(2);
    cache.put("a", 1);
    cache.put("b", 2);
    cache.put("c", 3);
    cache.put("a", 4);

    expect(cache.get("b")).toBeUndefined();
    expect(cache.get("a")).toBe(4);
    expect(cache.get("c")).toBe(3);
  });

  it("handles 100,000 operations at the maximum capacity", () => {
    const cache = new LruCache(10_000);
    for (let i = 0; i < 80_000; i++) cache.put(`key-${i}`, i);
    for (let i = 60_000; i < 70_000; i++) {
      expect(cache.get(`key-${i}`)).toBeUndefined();
    }
    for (let i = 70_000; i < 80_000; i++) {
      expect(cache.get(`key-${i}`)).toBe(i);
    }
  });
});