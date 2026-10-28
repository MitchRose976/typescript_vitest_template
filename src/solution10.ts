/**
 * Problem 10: Task scheduling order
 *
 * You are given a list of project tasks and a set of prerequisite relationships.
 * Each relationship indicates that one task must finish before another task can
 * start. Return one valid execution order for all tasks, or null if the tasks
 * cannot all be scheduled because of a cycle.
 *
 * Input
 * - tasks: a unique list of task IDs.
 * - dependencies: an array of pairs [prerequisite, dependent].
 * - Every task appearing in a dependency must exist in tasks.
 * - Repeated dependencies are allowed and should not change the result.
 *
 * Output
 * - Return an array of task IDs in a valid topological order.
 * - Every task should appear exactly once.
 * - If no valid order exists, return null.
 *
 * Constraints
 * - tasks.length can be up to 10,000.
 * - dependencies.length can be up to 50,000.
 * - Task IDs are case-sensitive strings and are unique.
 * - The input may contain disconnected components and different dependency chains.
 * - Do not mutate the input arrays or dependency tuples.
 * - Your solution should run in expected O(V + E) time, where V is the number of
 *   tasks and E is the number of dependency edges.
 *
 * Examples
 * solution10(["build", "test", "deploy"], [["build", "test"], ["test", "deploy"]])
 * returns either ["build", "test", "deploy"] or another valid order.
 *
 * solution10(["a", "b"], [["a", "b"], ["b", "a"]]) returns null.
 */

export const solution10 = (
  tasks: readonly string[],
  dependencies: readonly (readonly [string, string])[],
): string[] | null => {
  throw new Error("Not implemented");
};
