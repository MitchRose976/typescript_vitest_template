/**
    Question 6: Find the first non-repeating character
    Given a string, return the first character that appears exactly once, or null if none exists.

    function firstUniqueCharacter(
        input: string
    ): string | null {
        // Implement
    }

    Example: "swiss" returns "w".

    Follow-up: How would you handle case sensitivity and Unicode characters?
 */

export const solution5 = (input: string) => {
    if (typeof input !== "string") {
        throw new TypeError("Input must be a string");
    }
    
    // loop each char of string
    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        // perhaps can be done better using map?
        if (input.indexOf(char) === input.lastIndexOf(char)) {
            return char;
        }
    }
    // if occurence of char is 1, store it as the first unique character and return it
    // if no unique character is found, return null
    return null;
};