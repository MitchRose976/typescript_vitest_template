import { describe, it, expect } from "vitest";
import { solution, Order } from "../src/solution";

const order = (id: string, customerId: string, amount: number): Order => ({
  id,
  customerId,
  amount,
});

describe("totalByCustomer", () => {
  it("returns an empty Map for empty input", () => {
    expect(solution([])).toEqual(new Map());
  });

  it("aggregates multiple customers in one pass", () => {
    const totals = solution([
      order("1", "a", 10),
      order("2", "b", 20),
      order("3", "a", 5),
    ]);

    expect(totals).toEqual(
      new Map([
        ["a", 15],
        ["b", 20],
      ]),
    );
  });

  it("supports negative amounts (refunds)", () => {
    const totals = solution([order("1", "a", -10), order("2", "a", 5)]);

    expect(totals.get("a")).toBe(-5);
  });

  it("keeps a total that nets to zero instead of dropping the customer", () => {
    const totals = solution([
      order("1", "a", 5),
      order("2", "a", -5),
      order("3", "a", 0),
    ]);

    expect(totals.has("a")).toBe(true);
    expect(totals.get("a")).toBe(0);
  });

  it("handles customer ids that collide with Object prototype keys", () => {
    const totals = solution([
      order("1", "constructor", 5),
      order("2", "toString", 7),
      order("3", "__proto__", 9),
    ]);

    expect(totals.get("constructor")).toBe(5);
    expect(totals.get("toString")).toBe(7);
    expect(totals.get("__proto__")).toBe(9);
  });

  it("preserves insertion order of first appearance", () => {
    const totals = solution([
      order("1", "b", 1),
      order("2", "a", 1),
      order("3", "b", 1),
    ]);

    expect([...totals.keys()]).toEqual(["b", "a"]);
  });

  it("throws on a non-numeric amount instead of concatenating strings", () => {
    const orders = [order("1", "a", "10" as unknown as number)];

    expect(() => solution(orders)).toThrow(TypeError);
  });

  it("throws on NaN or Infinity amounts", () => {
    expect(() => solution([order("1", "a", NaN)])).toThrow(TypeError);
    expect(() => solution([order("1", "a", Infinity)])).toThrow(TypeError);
  });
});

describe("totalByCustomerAbove", () => {
  it("returns only customers strictly above the threshold", () => {
    const totals = solution(
      [order("1", "a", 100), order("2", "b", 100.01), order("3", "c", 150)],
      100,
    );

    expect(totals).toEqual(
      new Map([
        ["b", 100.01],
        ["c", 150],
      ]),
    );
  });

  it("defaults the threshold to 100", () => {
    const totals = solution([order("1", "a", 60), order("2", "a", 60)]);

    expect(totals).toEqual(new Map([["a", 120]]));
  });

  it("returns an empty Map when nobody qualifies", () => {
    expect(solution([], 100)).toEqual(new Map());
    expect(solution([order("1", "a", 10)], 100)).toEqual(new Map());
  });
});
