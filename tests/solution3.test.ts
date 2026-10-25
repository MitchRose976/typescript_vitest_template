import { describe, it, expect } from "vitest";
import { solution3 } from "../src/solution3";

type Range = number[];

const range = (start: number, end: number): Range => [start, end];

// cast keeps malformed input readable in the test body
const malformed = (start: unknown, end: unknown): Range =>
  [start, end] as Range;

const byStart = (ranges: Range[]): Range[] =>
  [...ranges].sort((a, b) => a[0] - b[0] || a[1] - b[1]);

describe("solution3 > merging valid intervals", () => {
  it("returns single interval when all intervals overlap", () => {
    const ranges = [range(1, 3), range(2, 4), range(3, 5)];

    expect(byStart(solution3(ranges))).toEqual([range(1, 5)]);
  });

  it("returns single interval when input array only has 1 item", () => {
    const ranges = [range(1, 3)];

    expect(byStart(solution3(ranges))).toEqual([range(1, 3)]);
  });

  it("merges overlapping intervals with negative numbers", () => {
    const ranges = [range(-3, -1), range(-2, 2), range(1, 4), range(-5, -3)];

    expect(byStart(solution3(ranges))).toEqual([range(-5, 4)]);
  });

  it("merges overlapping intervals with positive numbers", () => {
    const ranges = [range(1, 3), range(2, 6), range(8, 10), range(9, 12)];

    expect(byStart(solution3(ranges))).toEqual([range(1, 6), range(8, 12)]);
  });

  it("returns an empty array for empty input", () => {
    expect(solution3([])).toEqual([]);
  });

  it("returns original array when no intervals overlap", () => {
    const ranges = [range(1, 2), range(3, 4), range(5, 6)];

    expect(solution3(ranges)).toEqual(ranges);
  });

  it("merges intervals that share start and end points", () => {
    const ranges = [range(1, 3), range(3, 5), range(5, 7)];

    expect(byStart(solution3(ranges))).toEqual([range(1, 7)]);
  });

  it("merges a chain of overlaps while keeping standalone intervals", () => {
    const ranges = [
      range(4, 5),
      range(2, 4),
      range(4, 6),
      range(3, 4),
      range(0, 0),
      range(1, 1),
      range(3, 5),
      range(2, 2),
    ];

    expect(byStart(solution3(ranges))).toEqual([
      range(0, 0),
      range(1, 1),
      range(2, 6),
    ]);
  });
});

describe("solution3 > rejecting malformed intervals", () => {
  // an empty entry has no start or end at all, so it cannot be merged
  it("throws when an empty interval is mixed with valid ones", () => {
    const ranges = [range(1, 3), [] as Range, range(4, 6)];

    expect(() => solution3(ranges)).toThrow(TypeError);
  });

  it("throws when an interval has more than two bounds", () => {
    expect(() => solution3([[1, 3, 5]])).toThrow(TypeError);
    expect(() => solution3([[1, 2, 3, 4]])).toThrow(TypeError);
    expect(() =>
      solution3([
        [1, 2],
        [3, 4, 5],
      ]),
    ).toThrow(TypeError);
  });

  it("throws when start is greater than end", () => {
    const ranges = [range(3, 1), range(5, 2), range(7, 4)];

    expect(() => solution3(ranges)).toThrow(TypeError);
  });

  it("throws on NaN bounds", () => {
    expect(() => solution3([malformed(NaN, 2)])).toThrow(TypeError);
    expect(() => solution3([malformed(3, NaN)])).toThrow(TypeError);
    expect(() => solution3([malformed(NaN, NaN)])).toThrow(TypeError);
  });

  it("throws on undefined bounds", () => {
    expect(() => solution3([malformed(undefined, 2)])).toThrow(TypeError);
    expect(() => solution3([malformed(3, undefined)])).toThrow(TypeError);
    expect(() => solution3([malformed(undefined, undefined)])).toThrow(
      TypeError,
    );
  });

  it("throws on null bounds", () => {
    expect(() => solution3([malformed(null, 2)])).toThrow(TypeError);
    expect(() => solution3([malformed(3, null)])).toThrow(TypeError);
    expect(() => solution3([malformed(null, null)])).toThrow(TypeError);
  });
});
