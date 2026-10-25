import { describe, it, expect } from "vitest";
import { solution } from "../src/solution2";

describe("remove duplicate users", () => {
    it("should return a set of unique user IDs", () => {
        const users = [
            { id: "1" },
            { id: "2" },
            { id: "1" },
            { id: "3" },
        ];
        const result = solution(users);
        expect(result).toEqual(new Set(["1", "2", "3"]));
    });

    it("should return an empty set for an empty array", () => {
        const users: { id: string }[] = [];
        const result = solution(users);
        expect(result).toEqual(new Set());
    });

    it("should preserve the order of first occurrences", () => {
        const users = [
            { id: "3" },
            { id: "1" },
            { id: "2" },
            { id: "1" },
        ];
        const result = solution(users);
        expect(result).toEqual(new Set(["3", "1", "2"]));
    });

    it("should handle users with the same ID but different object references", () => {
        const users = [
            { id: "1" },
            { id: "1" },
            { id: "2" },
            { id: "2" },
        ];
        const result = solution(users);
        expect(result).toEqual(new Set(["1", "2"]));
    });

    it("should handle a single user", () => {
        const users = [
            { id: "1" }
        ];
        const result = solution(users);
        expect(result).toEqual(new Set(["1"]));
    });

    it("should handle multiple users with all unique IDs", () => {
        const users = [
            { id: "1" },
            { id: "2" },
            { id: "3" }
        ];
        const result = solution(users);
        expect(result).toEqual(new Set(["1", "2", "3"]));
    });

    it("should handle IDs with special characters", () => {
        const users = [
            { id: "user-1" },
            { id: "user-2" },
            { id: "user-1" },
            { id: "user-3" },
        ];
        const result = solution(users);
        expect(result).toEqual(new Set(["user-1", "user-2", "user-3"]));
    });

    it("should handle IDs with numeric strings", () => {
        const users = [
            { id: "123" },
            { id: "456" },
            { id: "123" },
        ];
        const result = solution(users);
        expect(result).toEqual(new Set(["123", "456"]));
    });
});