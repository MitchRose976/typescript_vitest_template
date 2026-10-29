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
  if (tasks.length === 0) return [];
  if (dependencies.length === 0) return [...tasks];

  const result = [];

  // Create map of dependencies and their prerequisites
  // [task1, task2, task3, task4, task5]
  //   {
  //     'task1': ['task2', 'task4', 'task5'],
  //     "task2": ["task3"],
  //     "task3": ["task4"]
  //   }
  const depsMap = new Map<string, Set<string>>();
  const duplicateDeps = new Set<string>();
  for (const [pre, dep] of dependencies) {
    const depKey = `${pre}-${dep}`;
    if (duplicateDeps.has(depKey)) continue;
    duplicateDeps.add(depKey);

    if (!depsMap.has(dep)) {
      depsMap.set(dep, new Set());
    }
    depsMap.get(dep)!.add(pre);
  }

  const visiting = new Set<string>();
  const seen = new Set<string>();
  let cycleDetected = false;

  depsMap.forEach((preReqs, taskId) => {
    const loopPrereqs = (preReqs: string[]) => {
      if (preReqs.length === 0) return;

      for (const pre of preReqs) {
        if (visiting.has(pre)) {
          cycleDetected = true;
          return;
        }

        if (!seen.has(pre)) {
          visiting.add(pre);
          loopPrereqs(Array.from(depsMap.get(pre) || []));
          visiting.delete(pre);
          seen.add(pre);
          result.push(pre);
        }
      }
    };

    if (!seen.has(taskId)) {
      visiting.add(taskId);
      loopPrereqs(Array.from(preReqs));
      visiting.delete(taskId);
      seen.add(taskId);
    }
  });

  for (const task of tasks) {
    if (!result.includes(task)) {
      result.push(task);
    }
  }

  return cycleDetected ? null : result;
};
