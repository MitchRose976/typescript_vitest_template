import { describe, expect, it } from "vitest";
import { planTasks } from "../src/solutions/solution7";

describe("planTasks", () => {
  it("returns [] when taskIds is empty", () => {
    expect(planTasks([], [])).toEqual([]);
  });

  it("returns [] when taskIds is empty even if dependencies are present", () => {
    expect(planTasks([], [["a", "b"]])).toEqual([]);
  });

  it("returns null for a self dependency cycle", () => {
    expect(planTasks(["a"], [["a", "a"]])).toBeNull();
  });

  it("returns null for a two-node circular dependency", () => {
    expect(planTasks(["a", "b"], [["a", "b"], ["b", "a"]])).toBeNull();
  });

  it("returns null for an indirect cycle", () => {
    expect(
      planTasks([
        "a",
        "b",
        "c",
      ], [
        ["a", "b"],
        ["b", "c"],
        ["c", "a"],
      ]),
    ).toBeNull();
  });

  it("returns a valid topological order for a simple dependency chain", () => {
    const result = planTasks(["ship", "build", "test"], [
      ["build", "test"],
      ["test", "ship"],
    ]);

    expect(result).toEqual(["build", "test", "ship"]);
  });

  it("keeps all tasks in the result for a graph with independent tasks", () => {
    const taskIds = ["a", "b", "c", "d"]; 
    const result = planTasks(taskIds, [
      ["a", "c"],
      ["b", "d"],
    ]);

    expect(result).not.toBeNull();
    expect(new Set(result)).toEqual(new Set(taskIds));
    expect(result).toHaveLength(taskIds.length);
  });

  it("includes every task id exactly once in the returned order", () => {
    const taskIds = ["build", "lint", "test", "deploy"];
    const result = planTasks(taskIds, [
      ["build", "test"],
      ["lint", "deploy"],
      ["build", "deploy"],
    ]);

    expect(result).not.toBeNull();
    expect(result).toHaveLength(taskIds.length);
    expect(new Set(result)).toEqual(new Set(taskIds));
  });

  it("orders prerequisites before dependents in a valid dependency graph", () => {
    const taskIds = ["a", "b", "c", "d", "e"];
    const dependencies: [string, string][] = [
      ["a", "c"],
      ["b", "c"],
      ["c", "d"],
      ["d", "e"],
    ];

    const result = planTasks(taskIds, dependencies);
    const positions = new Map((result ?? []).map((taskId, index) => [taskId, index]));

    expect(result).not.toBeNull();
    expect(result).toHaveLength(taskIds.length);
    for (const [prerequisite, dependent] of dependencies) {
      expect(positions.get(prerequisite)).toBeLessThan(positions.get(dependent));
    }
  });

  it("keeps disconnected components and independent tasks in the final ordering", () => {
    const taskIds = ["setup", "lint", "build", "deploy", "test"];
    const dependencies: [string, string][] = [
      ["setup", "build"],
      ["build", "test"],
      ["lint", "deploy"],
    ];

    const result = planTasks(taskIds, dependencies);
    const positions = new Map((result ?? []).map((taskId, index) => [taskId, index]));

    expect(result).not.toBeNull();
    expect(new Set(result)).toEqual(new Set(taskIds));
    expect(positions.get("setup")).toBeLessThan(positions.get("build"));
    expect(positions.get("build")).toBeLessThan(positions.get("test"));
    expect(positions.get("lint")).toBeLessThan(positions.get("deploy"));
  });

  it("returns all taskIds even if there are no dependencies", () => {
    const taskIds = ["a", "b", "c"];
    const result = planTasks(taskIds, []);

    expect(result).not.toBeNull();
    expect(new Set(result)).toEqual(new Set(taskIds));
    expect(result).toHaveLength(taskIds.length);
  });

  // Make sure all taskIds's are returned even when some have no pre-requisites
  it("returns all taskIds even when some have no dependancies", () => {
    const taskIds = ["a", "b", "c", "d"];
    const results = planTasks(taskIds, [['a', 'b']])

    expect(results).not.toBeNull();
    expect(new Set(results)).toEqual(new Set(taskIds));
    expect(results).toHaveLength(taskIds.length);
  });
});
