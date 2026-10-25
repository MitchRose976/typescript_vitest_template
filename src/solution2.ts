/**
    Question 2: Deduplicate records
    Given an array of users, remove duplicate users based on their id, preserving the first occurrence and original order.

    What this tests: using a Set to track IDs while building a result array.

    Follow-up: What changes if the last occurrence should be preserved instead?

    Watch out: Don't deduplicate by object reference; two different objects may have the same ID.
*/
export const solution = (users: {id: string}[]) => {
    const seenIds = new Set<string>();
    for (const user of users) {
        if (!seenIds.has(user.id)) {
            seenIds.add(user.id);
        }
    }
    return seenIds;
};