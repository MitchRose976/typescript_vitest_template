/*
    Question 1: Aggregate records
    You are given an array of orders. Each order has an id, customerId, and amount.

    Implement a function that returns the total amount spent by each customer.

    What this tests: choosing a Map, accumulating values, handling empty input, and explaining time and space complexity.

    Follow-up: What if you need to return only customers whose total exceeds $100?

    Target: one pass, O(n) expected time.
 */
export type Order = {
  id: string;
  customerId: string;
  amount: number;
};

export const solution = (order: Order[], returnAbove: number = undefined) => {
  const totalsMap: Map<string, number> = new Map();
  for (const o of order) {
    if (typeof o.amount !== "number" || !isFinite(o.amount)) {
      throw new TypeError("Amount must be a finite number");
    }
    if (!totalsMap.has(o.customerId)) {
      totalsMap.set(o.customerId, 0);
    }
    totalsMap.set(o.customerId, totalsMap.get(o.customerId)! + o.amount);
  }

  if (returnAbove === undefined) {
    return totalsMap;
  }

  const filteredMap: Map<string, number> = new Map();
  for (const [customerId, total] of totalsMap) {
    if (total > returnAbove) {
      filteredMap.set(customerId, total);
    }
  }
  return filteredMap;
};
