/**
 * Problem 11: Least recently used cache
 *
 * Implement a fixed-size cache that evicts the least recently used item when a
 * new item is inserted and the cache is at capacity.
 *
 * Input
 * - A capacity value c, where c >= 0.
 * - A sequence of get(key) and put(key, value) operations.
 *
 * Output
 * - get(key) returns the stored value for that key, or undefined if the key is
 *   missing.
 * - put(key, value) inserts or updates the key's value.
 * - When the cache is full, the least recently used entry is evicted.
 *
 * Constraints
 * - Capacity is an integer between 0 and 10,000.
 * - Keys are case-sensitive strings.
 * - Values are integers.
 * - A successful get marks that key as most recently used.
 * - A put on an existing key updates the value and refreshes recency.
 * - Do not mutate the input sequence; this is a stateful in-memory problem.
 * - Expected time per operation: average O(1).
 *
 * Example
 * const cache = new LruCache(2);
 * cache.put("a", 1);
 * cache.put("b", 2);
 * cache.get("a"); // 1
 * cache.put("c", 3); // evicts "b"
 * cache.get("b"); // undefined
 */

export class LruCache {
  private maxSize: number;
  private cache: Map<string, number>;

  constructor(capacity: number) {
    this.maxSize = capacity;
    this.cache = new Map<string, number>();;
  }

  private getSize(): number {
    return this.cache.size;
  }

  private insert(key: string, value: number, reinsert: boolean = true): void {
    if (reinsert) {
      this.cache.delete(key);
    }
    this.cache.set(key, value);
  }

  private evictIfNeeded(): void {
    if (this.getSize() > this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
  }

  get(key: string): number | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
        // Mark this key as most recently used by reinserting it.
        this.insert(key, value, true);
        return value;
    }
    return undefined;
  }

  put(key: string, value: number): void {
    // Mark this key as most recently used by reinserting it.
    console.log(`Inserting key: ${key} (typeof ${typeof key}), value: ${value} (typeof ${typeof value})`);
    this.insert(String(key), value, true);
    this.evictIfNeeded();
    console.log(`Cache after insertion: ${JSON.stringify(Array.from(this.cache.entries()))}`);
  }
}
