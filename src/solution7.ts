/**
 * Problem 7: Dependency execution order
 *
 * A workflow contains tasks and prerequisite relationships. Return an order in
 * which all tasks can run, or null if no complete execution order exists.
 *
 * Contract
 * - taskIds contains unique, nonempty, case-sensitive strings.
 * - Each dependency is [prerequisiteId, dependentId]. Both IDs exist in taskIds.
 * - Repeated dependencies have the same meaning as a single dependency.
 * - Return every task exactly once, with each prerequisite before its dependent.
 * - Any valid ordering is accepted; no alphabetical or input-order tie-break
 *   is required. Include tasks with no relationships to other tasks.
 * - Return null if any component contains a cycle, including a self-dependency.
 * - Empty taskIds returns []. Do not mutate either input or dependency tuples.
 *
 * Constraints
 * - 0 <= taskIds.length <= 10,000.
 * - 0 <= dependencies.length <= 50,000.
 * - Inputs satisfy the contract; runtime input validation is not required.
 * - Expected time: O(V + E); auxiliary space: O(V + E), where V is the number
 *   of tasks and E is the number of dependency entries.
 *
 * Examples
 * planTasks(["ship", "build", "test"], [["build", "test"], ["test", "ship"]])
 * returns ["build", "test", "ship"].
 *
 * planTasks(["a", "b"], [["a", "b"], ["b", "a"]]) returns null.
 */

export const planTasks = (
  taskIds: readonly string[],
  dependencies: readonly (readonly [string, string])[],
): string[] | null => {
  console.log(taskIds, dependencies);
  if (taskIds.length === 0) return [];
  if (taskIds.length > 0 && dependencies.length === 0) return [...taskIds];

  const result = [];

  // Build a dependancy map -> { "dep1": [preReq1, preReq2, ...] }
  const dependentsMap = new Map<string, string[]>();
  for (const [prerequisite, dependent] of dependencies) {
    if (!dependentsMap.has(dependent)) {
      dependentsMap.set(dependent, []);
    }
    dependentsMap.get(dependent)!.push(prerequisite);
  }

  // Track nodes being traversed
  const visiting = new Set<string>();
  // Track nodes already seen
  const seen = new Set<string>();

  let cycleDetected = false;

  // Recursively loop dependencys
  dependentsMap.forEach((value, key) => {
    console.log(`${key}: ${value}`);

    const loopDependancies = (key: string, preRequisites: string[]) => {
      for (const taskId of preRequisites) {
    
        if (visiting.has(taskId)) {
          cycleDetected = true;
          return;
        }

        if (seen.has(taskId)) continue;

        const preReqs = dependentsMap.get(taskId);
        if (preReqs) {
          loopDependancies(taskId, preReqs);
        } else {
          // If there are no dependencies, push it to result set and mark as seen
          result.push(taskId);
          seen.add(taskId);
        }
      }
      visiting.delete(key);
      // After processing all dependents, push the current key to result and mark as seen
      result.push(key);
      seen.add(key);
    };

    if (!seen.has(key) && !cycleDetected) {
      visiting.add(key);
      loopDependancies(key, value);
    }
  });

  // Add missing taskIds that weren't in dependency map
  taskIds.forEach((taskId) => {
    if (!result.includes(taskId)) result.push(taskId)
  })

  return cycleDetected ? null : result;
};
