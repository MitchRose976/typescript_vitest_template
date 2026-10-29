/**
    Question 2: Deduplicate records
    Given an array of users, remove duplicate users based on their id, preserving the first occurrence and original order.
    type User = {
        id: string;
        name: string;
    };

    function uniqueUsers(users: User[]): User[] {
        // Implement
    }


    What this tests: using a Set to track IDs while building a result array.

    Follow-up: What changes if the last occurrence should be preserved instead?

    Watch out: Don't deduplicate by object reference; two different objects may have the same ID.
*/
type User = {
    id: string,
    name: string,
}
export const solution = (users: User[]): User[] => {
  const seenIds = new Set<string>();
  const result: User[] = [];
  for (const user of users) {
    if (!seenIds.has(user.id)) {
      seenIds.add(user.id);
      result.push(user);
    }
  }
  return result;
};
