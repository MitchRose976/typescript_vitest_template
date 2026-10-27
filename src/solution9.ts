/**
 * Problem 9: Timestamp range lookup
 *
 * Given sorted timestamps and a time interval, return the index range of all
 * matching entries without copying those entries. Return null for no matches.
 *
 * Contract
 * - timestamps is sorted in nondecreasing order; duplicate values are allowed.
 * - A timestamp t matches exactly when start <= t < end.
 * - Return [firstIndex, endExclusiveIndex]. These are array indices, not time
 *   values. The range includes every matching entry and no other entries.
 * - Return null for an empty input, no matching entries, or start === end.
 * - Do not mutate timestamps.
 *
 * Constraints
 * - 0 <= timestamps.length <= 1,000,000.
 * - All timestamps, start, and end are nonnegative safe integers; start <= end.
 * - Inputs satisfy the contract; runtime input validation is not required.
 * - Required time: O(log n); auxiliary space: O(1), where n is the input length.
 *
 * Examples
 * findTimestampRange([10, 20, 20, 30, 40], 20, 40) returns [1, 4].
 * Indices 1, 2, and 3 match; index 4 is excluded.
 *
 * findTimestampRange([10, 20, 30], 21, 30) returns null.
 */

export const findTimestampRange = (
  timestamps: readonly number[],
  start: number,
  end: number,
): [number, number] | null => {
  throw new Error("Not implemented");
};