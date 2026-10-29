/**
 * Problem 8: Least-recently-used cache
 *
 * Implement a fixed-capacity cache with get(key) and put(key, value). When a
 * new entry would exceed capacity, evict the least recently used entry.
 *
 * Contract
 * - get returns the stored value, or undefined when the key is absent.
 * - A successful get makes that entry the most recently used entry.
 * - An unsuccessful get does not change the recency of any entry.
 * - put adds or updates an entry and makes it the most recently used entry.
 * - Updating an existing entry does not increase the number of stored entries.
 * - Capacity zero retains no entries. Separate instances do not share state.
 * - Keys are arbitrary, case-sensitive strings, including the empty string.
 * - Values are safe integers, including zero and negative numbers.
 *
 * Constraints
 * - capacity is an integer from 0 through 10,000, inclusive.
 * - At most 100,000 get/put calls will be made per instance.
 * - Inputs satisfy the contract; runtime input validation is not required.
 * - Each get/put must take average O(1) time. Retained storage must be
 *   O(capacity). Use built-in language facilities only; no external libraries.
 * - No expiration, persistence, or concurrency handling is required.
 *
 * Examples (each starts with a fresh cache)
 * const cache = new LruCache(2);
 * cache.put("a", 1); cache.put("b", 2); cache.get("a"); // 1
 * cache.put("c", 3); cache.get("b"); // undefined
 *
 * const cache = new LruCache(1);
 * cache.put("a", 1); cache.put("a", 9); cache.get("a"); // 9
 */

export class LruCache {
  private capacity: number;
  private cache: Map<string, number>;
  private recentlyUsed: Set<string>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map<string, number>();
    this.recentlyUsed = new Set<string>();
  }

  get(key: string): number | undefined {
    const value = this.cache.get(key);
    if (value === undefined) return undefined;
    
    // Move the key to the end of the recently used set
    this.recentlyUsed.delete(key);
    this.recentlyUsed.add(key);
    return value;
  }

  put(key: string, value: number): void {
    if (this.capacity === 0) return;

    // check if the key already exists and update it if necessary
    if (this.cache.has(key)) {
      this.cache.set(key, value);
      this.recentlyUsed.delete(key);
      this.recentlyUsed.add(key);
      return;
    }
    
    // check if the cache has reached capacity and evict the least recently used entry if necessary
    if (this.cache.size >= this.capacity || this.cache.size + 1 > this.capacity) {
      const leastRecentlyUsedKey = this.recentlyUsed.values().next().value;
      this.cache.delete(leastRecentlyUsedKey);
      this.recentlyUsed.delete(leastRecentlyUsedKey);
    }
    this.cache.set(key, value);
    this.recentlyUsed.add(key);
  }
}