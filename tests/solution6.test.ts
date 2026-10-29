import { describe, expect, it } from "vitest";
import { admitRequests } from "../src/solutions/solution6";

describe("admitRequests", () => {
  it("counts duplicate request entries independently", () => {
    const duplicate = { userId: "a", timestamp: 5 };

    expect(admitRequests([duplicate, duplicate], 1, 10)).toEqual([true, false]);
  });

  it("processes requests with the same timestamp in array order", () => {
    expect(
      admitRequests(
        [
          { userId: "a", timestamp: 5 },
          { userId: "a", timestamp: 5 },
          { userId: "b", timestamp: 5 },
          { userId: "a", timestamp: 5 },
        ],
        2,
        10,
      ),
    ).toEqual([true, true, true, false]);
  });

  it("rejects requests that exceed the limit within the rolling window", () => {
    expect(
      admitRequests(
        [
          { userId: "a", timestamp: 1 },
          { userId: "a", timestamp: 2 },
          { userId: "a", timestamp: 3 },
        ],
        2,
        10,
      ),
    ).toEqual([true, true, false]);
  });

  it("does not count requests outside the rolling window", () => {
    expect(
      admitRequests(
        [
          { userId: "a", timestamp: 0 },
          { userId: "a", timestamp: 10 },
        ],
        1,
        10,
      ),
    ).toEqual([true, true]);
  });

  it("returns an empty array for no requests", () => {
    expect(admitRequests([], 1, 10)).toEqual([]);
  });

  it("keeps recent requests across fixed window boundaries", () => {
    expect(
      admitRequests(
        [
          { userId: "a", timestamp: 9 },
          { userId: "a", timestamp: 10 },
        ],
        1,
        10,
      ),
    ).toEqual([true, false]);
  });

  it("accepts a late first request and expires history between boundaries", () => {
    expect(
      admitRequests(
        [
          { userId: "a", timestamp: 101 },
          { userId: "a", timestamp: 112 },
        ],
        1,
        10,
      ),
    ).toEqual([true, true]);
  });

  it("does not reset the count for repeated timestamps at a window boundary", () => {
    const requests = [
      { userId: "a", timestamp: 0 },
      { userId: "a", timestamp: 0 },
      { userId: "a", timestamp: 0 },
    ];

    expect(admitRequests(requests, 1, 10)).toEqual([true, false, false]);
  });

  it("expires only old accepted requests and does not count rejected requests", () => {
    const requests = [0, 5, 6, 7, 10, 11, 15].map((timestamp) => ({
      userId: "a",
      timestamp,
    }));

    expect(admitRequests(requests, 2, 10)).toEqual([
      true, true, false, false, true, false, true,
    ]);
  });

  it("matches the problem example without mutating the input", () => {
    const requests = Object.freeze(
      [
        { userId: "a", timestamp: 0 },
        { userId: "a", timestamp: 1 },
        { userId: "a", timestamp: 2 },
        { userId: "b", timestamp: 2 },
        { userId: "a", timestamp: 10 },
        { userId: "a", timestamp: 11 },
      ].map((request) => Object.freeze(request)),
    );

    expect(admitRequests(requests, 2, 10)).toEqual([
      true, true, false, true, true, true,
    ]);
  });

  it("handles 200,000 requests with a large batch of expirations", () => {
    const requests = Array.from({ length: 200_000 }, (_, i) => ({
      userId: "a",
      timestamp: i < 100_000 ? 0 : 10,
    }));
    const result = admitRequests(requests, 100_000, 10);

    expect(result).toHaveLength(200_000);
    expect(result.every((accepted) => accepted)).toBe(true);
  });
});
