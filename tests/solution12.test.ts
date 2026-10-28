import { describe, expect, it } from "vitest";
import { solution12 } from "../src/solution12";

describe("solution12", () => {
  it("returns -1 for an empty array", () => {
    expect(solution12([], 10)).toBe(-1);
  });

  it("returns the index of a single matching value", () => {
    expect(solution12([7], 7)).toBe(0);
  });

  it("returns -1 when the single element does not match", () => {
    expect(solution12([7], 2)).toBe(-1);
  });

  it("returns the first occurrence in the middle of a duplicate block", () => {
    expect(solution12([1, 2, 2, 2, 5, 9], 2)).toBe(1);
  });

  it("returns the first occurrence when the duplicate block starts at index 0", () => {
    expect(solution12([2, 2, 2, 5, 9], 2)).toBe(0);
  });

  it("returns -1 when the target is smaller than every value", () => {
    expect(solution12([3, 5, 7, 9], 1)).toBe(-1);
  });

  it("returns -1 when the target is larger than every value", () => {
    expect(solution12([3, 5, 7, 9], 10)).toBe(-1);
  });

  it("handles duplicates and negative numbers", () => {
    expect(solution12([-9, -5, -5, -1, 4, 4, 4, 8], -5)).toBe(1);
    expect(solution12([-9, -5, -5, -1, 4, 4, 4, 8], 8)).toBe(7);
  });

  it("returns -1 when the target is absent between larger and smaller values", () => {
    expect(solution12([1, 3, 4, 8, 9], 6)).toBe(-1);
  });

  it("does not mutate the input array", () => {
    const nums = Object.freeze([1, 2, 2, 2, 5]);
    expect(solution12(nums, 2)).toBe(1);
    expect(nums).toEqual([1, 2, 2, 2, 5]);
  });
});
