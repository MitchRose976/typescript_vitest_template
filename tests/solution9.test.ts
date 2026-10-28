import { describe, expect, it } from "vitest";
import { findTimestampRange } from "../src/solution9";

describe("findTimestampRange", () => {
  it("returns null for an empty array", () => {
    expect(findTimestampRange([], 0, 10)).toBeNull();
  });

  it("returns null when start and end are equal", () => {
    expect(findTimestampRange([10, 20, 30], 15, 15)).toBeNull();
  });

  it("returns null when no timestamps fall within the interval", () => {
    expect(findTimestampRange([10, 20, 30], 21, 30)).toBeNull();
  });

  it("returns the full matching range for an interval that begins at the first matching value", () => {
    expect(findTimestampRange([10, 20, 20, 30, 40], 20, 40)).toEqual([1, 4]);
  });

  it("returns the range for a suffix interval that reaches the end of the array", () => {
    expect(findTimestampRange([10, 20, 30, 40, 50], 30, 60)).toEqual([2, 5]);
  });

  it("returns null when the interval starts after the last timestamp", () => {
    expect(findTimestampRange([10, 20, 30], 40, 50)).toBeNull();
  });

  it("returns null when the interval ends before or at the first timestamp", () => {
    expect(findTimestampRange([10, 20, 30], 0, 10)).toBeNull();
  });

  it("includes duplicate timestamps that fall inside the range", () => {
    expect(findTimestampRange([5, 10, 10, 10, 20], 10, 20)).toEqual([1, 4]);
  });

  it("returns null when the interval excludes all timestamps even with duplicates", () => {
    expect(findTimestampRange([10, 10, 10], 11, 11)).toBeNull();
  });

  it("does not mutate the input array", () => {
    const timestamps = [1, 2, 3, 4, 5];
    const original = [...timestamps];

    findTimestampRange(timestamps, 2, 5);

    expect(timestamps).toEqual(original);
  });
});