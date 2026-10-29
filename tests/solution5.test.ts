import { describe, it, expect } from "vitest";
import { solution5 } from "../src/solutions/solution5";

describe("solution5 > first non-repeating character", () => {
  it("returns null for an empty string", () => {
    expect(solution5("")).toBeNull();
  });

  it("throws a TypeError for null or undefined input", () => {
    // the implementation reads input.length, so non-string input is not guarded
    expect(() => solution5(null)).toThrow(TypeError);
    expect(() => solution5(undefined)).toThrow(TypeError);
  });

  it("returns null when every character repeats", () => {
    expect(solution5("aabbcc")).toBeNull();
    expect(solution5("aaaa")).toBeNull();
    expect(solution5("abab")).toBeNull();
  });

  it("returns the only character when the string has a single unique character", () => {
    expect(solution5("a")).toBe("a");
    expect(solution5("aab")).toBe("b");
    expect(solution5("bbbba")).toBe("a");
  });

  it("returns the first non-repeating character among several uniques", () => {
    expect(solution5("swiss")).toBe("w");
    expect(solution5("aabbcd")).toBe("c");
    expect(solution5("abc")).toBe("a");
  });

  it("treats characters case-sensitively", () => {
    // "a" repeats (index 0 and 4) so "A" is the first character seen exactly once
    expect(solution5("aAbBa")).toBe("A");
    expect(solution5("aA")).toBe("a");
    expect(solution5("Aa")).toBe("A");
  });

  it("handles mixed case Unicode characters", () => {
    // "Å" repeats, so the lowercase "å" is the only character appearing once
    expect(solution5("ÅåÅ")).toBe("å");
    expect(solution5("ÄÖäÖÄ")).toBe("ä");
  });
});