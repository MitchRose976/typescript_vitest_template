/**
 * Problem 12: First index in a sorted array
 *
 * Given a sorted array of integers and a target value, return the index of the
 * first occurrence of the target. If the target is not present, return -1.
 *
 * Input
 * - nums: a sorted array of integers in nondecreasing order.
 * - target: the value to search for.
 *
 * Output
 * - The minimum index i such that nums[i] === target.
 * - If no such index exists, return -1.
 *
 * Constraints
 * - nums.length can be up to 1,000,000.
 * - The array is sorted in ascending order and may contain duplicates.
 * - Values may be negative or positive.
 * - The required approach is logarithmic time, not linear scan.
 * - Do not mutate the input array.
 *
 * Example
 * solution12([1, 2, 2, 2, 5, 9], 2) returns 1
 * solution12([1, 2, 2, 2, 5, 9], 8) returns -1
 */

export const solution12 = (
  nums: readonly number[],
  target: number,
): number => {
    if (nums.length === 0) return -1;

  const middleIndex = Math.floor(nums.length / 2);

  // Check if the middle element is the target
  if (nums[middleIndex] === target) {
    // Check elements to left of middleIndex to find the first occurrence
    if (middleIndex === 0 || nums[middleIndex - 1] < target) {
      return middleIndex;
    }
    return solution12(nums.slice(0, middleIndex), target);
  }

  // Check to left of middleIndex if target is smaller
  if (nums[middleIndex] < target) {
    const result = solution12(nums.slice(middleIndex + 1), target);
    return result === -1 ? -1 : result + middleIndex + 1;
  }

  // Check to right of middleIndex if target is greater
  if (nums[middleIndex] > target) {
    return solution12(nums.slice(0, middleIndex), target);
  }

  return -1;
};
