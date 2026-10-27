import { describe, expect, it } from "vitest";
import { findTimestampRange } from "../src/solution9";

describe("findTimestampRange", () => {
  it("matches the example with repeated timestamps", () => {
    expect(findTimestampRange([10, 20, 20, 30, 40], 20, 40)).toEqual([1, 4]);
  });

  it("returns null for the no-match example", () => {
    expect(findTimestampRange([10, 20, 30], 21, 30)).toBeNull();
  });

  it("returns null for an empty array", () => {
    expect(findTimestampRange([], 0, 10)).toBeNull();
  });

  it("handles singleton matches and misses at both boundaries", () => {
    expect(findTimestampRange([5], 5, 6)).toEqual([0, 1]);
    expect(findTimestampRange([5], 0, 5)).toBeNull();
    expect(findTimestampRange([5], 6, 7)).toBeNull();
  });

  it("includes every duplicate at start and excludes every duplicate at end", () => {
    expect(findTimestampRange([0, 5, 5, 5, 7, 10, 10, 12], 5, 10)).toEqual([
      1, 5,
    ]);
    expect(findTimestampRange([5, 5, 5], 5, 6)).toEqual([0, 3]);
    expect(findTimestampRange([5, 5, 5], 0, 5)).toBeNull();
  });

  it("returns null for equal bounds even when that timestamp exists", () => {
    expect(findTimestampRange([0, 5, 5, 10], 5, 5)).toBeNull();
    expect(findTimestampRange([0], 0, 0)).toBeNull();
  });

  it("returns the whole index range when every timestamp matches", () => {
    expect(findTimestampRange([0, 0, 5, 9], 0, 10)).toEqual([0, 4]);
    expect(findTimestampRange([2, 4, 6], 0, 10)).toEqual([0, 3]);
  });

  it("finds interior matches when neither endpoint occurs in the data", () => {
    expect(findTimestampRange([10, 20, 30, 40], 11, 39)).toEqual([1, 3]);
  });

  it("returns null for a gap and intervals entirely outside the data", () => {
    expect(findTimestampRange([10, 20, 30], 11, 19)).toBeNull();
    expect(findTimestampRange([10, 20, 30], 0, 10)).toBeNull();
    expect(findTimestampRange([10, 20, 30], 31, 100)).toBeNull();
  });

  it("handles safe-integer boundary values without losing precision", () => {
    const max = Number.MAX_SAFE_INTEGER;
    expect(findTimestampRange([0, max - 2, max - 1, max], max - 2, max)).toEqual([
      1, 3,
    ]);
    expect(findTimestampRange([max], max, max)).toBeNull();
  });

  it("does not mutate the input", () => {
    const timestamps = Object.freeze([0, 10, 10, 20, 30]);
    expect(findTimestampRange(timestamps, 10, 30)).toEqual([1, 4]);
    expect(timestamps).toEqual([0, 10, 10, 20, 30]);
  });

  it("handles one million timestamps with repeated values", () => {
    const timestamps = Array.from({ length: 1_000_000 }, (_, i) =>
      Math.floor(i / 4),
    );

    expect(findTimestampRange(timestamps, 123_456, 123_459)).toEqual([
      493_824, 493_836,
    ]);
    expect(findTimestampRange(timestamps, 249_999, 250_000)).toEqual([
      999_996, 1_000_000,
    ]);
    expect(findTimestampRange(timestamps, 250_000, 250_001)).toBeNull();
  });
});