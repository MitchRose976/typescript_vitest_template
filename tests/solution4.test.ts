import { describe, it, expect } from "vitest";
import { solution4 } from "../src/solution4";

type Status = "draft" | "scheduled" | "published";
type Post = { id: string; status: Status };

const post = (id: string, status: Status): Post => ({ id, status });

// cast keeps invalid statuses readable in the test body
const withStatus = (id: string, status: unknown): Post =>
  ({ id, status } as Post);

describe("solution4 > grouping posts by status", () => {
  it("returns an empty object for empty input", () => {
    expect(solution4([])).toEqual({});
  });

  it("returns a single bucket when the input has one post", () => {
    const posts = [post("1", "draft")];

    expect(solution4(posts)).toEqual({ draft: posts });
  });

  it("groups posts into one bucket per status", () => {
    const draft = post("1", "draft");
    const scheduled = post("2", "scheduled");
    const published = post("3", "published");

    expect(solution4([draft, scheduled, published])).toEqual({
      draft: [draft],
      scheduled: [scheduled],
      published: [published],
    });
  });

  it("keeps input order within a bucket and key order by first appearance", () => {
    const posts = [
      post("1", "published"),
      post("2", "draft"),
      post("3", "published"),
      post("4", "scheduled"),
      post("5", "draft"),
    ];

    const grouped = solution4(posts);

    expect(Object.keys(grouped)).toEqual(["published", "draft", "scheduled"]);
    expect(grouped.published.map((p) => p.id)).toEqual(["1", "3"]);
    expect(grouped.draft.map((p) => p.id)).toEqual(["2", "5"]);
    expect(grouped.scheduled.map((p) => p.id)).toEqual(["4"]);
  });

  it("returns one bucket containing every post when all posts share a status", () => {
    const posts = [
      post("1", "scheduled"),
      post("2", "scheduled"),
      post("3", "scheduled"),
    ];

    expect(solution4(posts)).toEqual({ scheduled: posts });
  });

  it("keeps duplicate posts instead of de-duplicating them", () => {
    const duplicate = post("1", "draft");
    const posts = [duplicate, duplicate, post("1", "draft")];

    const grouped = solution4(posts);

    expect(grouped.draft).toHaveLength(3);
    expect(grouped.draft[0]).toBe(duplicate);
    expect(grouped.draft[1]).toBe(duplicate);
  });

  it("does not mutate the input array", () => {
    const posts = [post("1", "draft"), post("2", "published")];
    const snapshot = [...posts];

    solution4(posts);

    expect(posts).toEqual(snapshot);
  });
});

describe("solution4 > non-string status values", () => {
  it("groups numeric statuses under their stringified keys", () => {
    const grouped = solution4([withStatus("1", 2), withStatus("2", 1)]);

    // integer-like keys are enumerated in ascending order, not insertion order
    expect(Object.keys(grouped)).toEqual(["1", "2"]);
    expect(grouped["2"].map((p) => p.id)).toEqual(["1"]);
    expect(grouped["1"].map((p) => p.id)).toEqual(["2"]);
  });

  it("groups boolean statuses under their stringified keys", () => {
    const grouped = solution4([withStatus("1", true), withStatus("2", false)]);

    expect(Object.keys(grouped)).toEqual(["true", "false"]);
    expect(grouped["true"].map((p) => p.id)).toEqual(["1"]);
    expect(grouped["false"].map((p) => p.id)).toEqual(["2"]);
  });

  // Should merge numeric and string statuses that stringify to the same value into a single bucket?
  it("merges a numeric status with a string status that stringifies the same", () => {
    const grouped = solution4([withStatus("1", 1), withStatus("2", "1")]);

    // object keys are coerced, so 1 and "1" land in the same bucket
    expect(Object.keys(grouped)).toEqual(["1"]);
    expect(grouped["1"].map((p) => p.id)).toEqual(["1", "2"]);
  });
});

describe("solution4 > invalid status values", () => {
  it("does not throw on a status outside the union and groups it by value", () => {
    const posts = [withStatus("1", "archived"), post("2", "draft")];

    const grouped = solution4(posts);

    expect(Object.keys(grouped)).toEqual(["archived", "draft"]);
    expect(grouped.archived.map((p) => p.id)).toEqual(["1"]);
  });

  it("treats case variants and empty strings as their own buckets", () => {
    const grouped = solution4([
      post("1", "Draft" as Status),
      post("2", "" as Status),
      post("3", "draft"),
    ]);

    expect(Object.keys(grouped)).toEqual(["Draft", "", "draft"]);
    expect(grouped["draft"].map((p) => p.id)).toEqual(["3"]);
  });

  it("groups null and undefined statuses under 'null' and 'undefined'", () => {
    const grouped = solution4([withStatus("1", null), withStatus("2", undefined)]);

    expect(Object.keys(grouped)).toEqual(["null", "undefined"]);
    expect(grouped["null"].map((p) => p.id)).toEqual(["1"]);
    expect(grouped["undefined"].map((p) => p.id)).toEqual(["2"]);
  });

  it("returns only the statuses present in the input", () => {
    const grouped = solution4([post("1", "draft")]);

    expect(grouped).not.toHaveProperty("scheduled");
    expect(grouped).not.toHaveProperty("published");
  });
});