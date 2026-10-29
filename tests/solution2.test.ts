import { describe, it, expect } from "vitest";
import { solution } from "../src/solutions/solution2";

describe("remove duplicate users", () => {
    it("should return a set of unique user IDs", () => {
        const users = [
            { id: "1", name: "Alice" },
            { id: "2", name: "Bob" },
            { id: "1", name: "Alice" },
            { id: "3", name: "Charlie" },
        ];
        const result = solution(users);
        expect(result).toEqual([
            { id: "1", name: "Alice" },
            { id: "2", name: "Bob" },
            { id: "3", name: "Charlie" }
        ]);
    });

    it("should return an empty set for an empty array", () => {
        const users: { id: string, name: string }[] = [];
        const result = solution(users);
        expect(result).toEqual([]);
    });

    it("should preserve the order of first occurrences", () => {
        const users = [
            { id: "3", name: "Charlie" },
            { id: "1", name: "Alice" },
            { id: "2", name: "Bob" },
            { id: "1", name: "Alice" },
        ];
        const result = solution(users);
        expect(result).toEqual([
            { id: "3", name: "Charlie" },
            { id: "1", name: "Alice" },
            { id: "2", name: "Bob" }
        ]);
    });

    it("should handle users with the same ID but different object references", () => {
        const users = [
            { id: "1", name: "Alice" },
            { id: "1", name: "Alice" },
            { id: "2", name: "Bob" },
            { id: "2", name: "Bob" },
        ];
        const result = solution(users);
        expect(result).toEqual([
            { id: "1", name: "Alice" },
            { id: "2", name: "Bob" }
        ]);
    });

    it("should handle a single user", () => {
        const users = [
            { id: "1", name: "Alice" }
        ];
        const result = solution(users);
        expect(result).toEqual([
            { id: "1", name: "Alice" }
        ]);
    });

    it("should handle multiple users with all unique IDs", () => {
        const users = [
            { id: "1", name: "Alice" },
            { id: "2", name: "Bob" },
            { id: "3", name: "Charlie" }
        ];
        const result = solution(users);
        expect(result).toEqual([
            { id: "1", name: "Alice" },
            { id: "2", name: "Bob" },
            { id: "3", name: "Charlie" }
        ]);
    });

    it("should handle IDs with special characters", () => {
        const users = [
            { id: "user-1", name: "Alice" },
            { id: "user-2", name: "Bob" },
            { id: "user-1", name: "Alice" },
            { id: "user-3", name: "Charlie" },
        ];
        const result = solution(users);
        expect(result).toEqual([
            { id: "user-1", name: "Alice" },
            { id: "user-2", name: "Bob" },
            { id: "user-3", name: "Charlie" }
        ]);
    });

    it("should handle IDs with numeric strings", () => {
        const users = [
            { id: "123", name: "Alice" },
            { id: "456", name: "Bob" },
            { id: "123", name: "Alice" },
        ];
        const result = solution(users);
        expect(result).toEqual([
            { id: "123", name: "Alice" },
            { id: "456", name: "Bob" }
        ]);
    });
});