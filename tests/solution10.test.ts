import { describe, expect, it } from "vitest";
import { solution10 } from "../src/solutions/solution10";

const expectValidTaskOrder = (
  tasks: readonly string[],
  dependencies: readonly (readonly [string, string])[],
) => {
  const order = solution10(tasks, dependencies);
  expect(order).not.toBeNull();
  if (order === null) throw new Error("Expected a valid topological order");

  expect(order).toHaveLength(tasks.length);
  expect(new Set(order)).toEqual(new Set(tasks));

  const positions = new Map<string, number>();
  order.forEach((task, index) => positions.set(task, index));

  for (const [prerequisite, dependent] of dependencies) {
    expect(positions.get(prerequisite)).toBeDefined();
    expect(positions.get(dependent)).toBeDefined();
    expect(positions.get(prerequisite)!).toBeLessThan(positions.get(dependent)!);
  }
};

describe("solution10", () => {
  it("returns an empty array when there are no tasks", () => {
    expect(solution10([], [])).toEqual([]);
  });

  it("returns the task list unchanged when there are no dependencies", () => {
    expect(solution10(["a", "b", "c"], [])).toEqual(["a", "b", "c"]);
  });

  it("handles a simple dependency chain", () => {
    expect(solution10(["build", "test", "deploy"], [["build", "test"], ["test", "deploy"]])).toEqual([
      "build",
      "test",
      "deploy",
    ]);
  });

  it("supports branching and shared prerequisites", () => {
    expectValidTaskOrder(
      ["lint", "build", "unit", "integration", "deploy"],
      [
        ["lint", "build"],
        ["build", "unit"],
        ["build", "integration"],
        ["unit", "deploy"],
        ["integration", "deploy"],
      ],
    );
  });

  it("handles disconnected components", () => {
    expectValidTaskOrder(
      ["a", "b", "c", "d"],
      [["a", "b"], ["c", "d"]],
    );
  });

  it("ignores repeated dependency entries", () => {
    expectValidTaskOrder(
      ["a", "b", "c"],
      [["a", "b"], ["a", "b"], ["b", "c"]],
    );
  });

  it("returns null for a self-dependency cycle", () => {
    expect(solution10(["a"], [["a", "a"]])).toBeNull();
  });

  it("returns null for a two-node cycle", () => {
    expect(solution10(["a", "b"], [["a", "b"], ["b", "a"]])).toBeNull();
  });

  it("returns null for a longer cycle in one component", () => {
    expect(
      solution10(
        ["a", "b", "c", "d"],
        [["a", "b"], ["b", "c"], ["c", "a"], ["c", "d"]],
      ),
    ).toBeNull();
  });

  it("does not mutate the input arrays or tuples", () => {
    const tasks = Object.freeze(["x", "y", "z"]);
    const dependencies = Object.freeze([
      Object.freeze(["x", "y"] as const),
      Object.freeze(["y", "z"] as const),
    ]);

    const result = solution10(tasks, dependencies);
    expect(result).not.toBeNull();
    expect(tasks).toEqual(["x", "y", "z"]);
    expect(dependencies).toEqual([["x", "y"], ["y", "z"]]);
  });
});
