export const solution3 = (timeRanges: number[][]) => {
    // Helper function to check if an interval is valid
    const checkValidInput = (interval: number[]) => {
        if (typeof interval[0] !== "number" || typeof interval[1] !== "number") {
            throw new TypeError("Invalid interval");
        }
        if (interval.length !== 2) {
            throw new TypeError("Invalid interval");
        }
        if (interval[0] > interval[1]) {
            throw new TypeError("Invalid interval");
        }
        if (isNaN(interval[0]) || isNaN(interval[1])) {
            throw new TypeError("Invalid interval");
        }
        if (interval[0] === undefined || interval[1] === undefined) {
            throw new TypeError("Invalid interval");
        }
        if (interval[0] === null || interval[1] === null) {
            throw new TypeError("Invalid interval");
        }
    };

    if (timeRanges.length === 0) {
        return [];
    }

    if (timeRanges.length === 1) {
        checkValidInput(timeRanges[0]);
        return timeRanges;
    }

    // make copy of input array
    const ranges = [...timeRanges]; // make copy of input array
    // set to keep track of overlapping intervals and prevent dupes
    const overlappingIntervals = new Set();

    // run nested loops
    for (let i = 0; i < ranges.length; i++) {
        for (let j = 0; j < ranges.length; j++) {
            checkValidInput(timeRanges[i]);

            if (i !== j) {
                const a = { start: ranges[i][0], end: ranges[i][1] };
                const b = { start: ranges[j][0], end: ranges[j][1] };
                const startOverlaps = a.start >= b.start && a.start <= b.end;
                const endOverlaps = a.end >= b.start && a.end <= b.end;
                if (startOverlaps || endOverlaps) {
                    const newInterval = [Math.min(a.start, b.start), Math.max(a.end, b.end)];
                    if (!overlappingIntervals.has(newInterval.toString())) {
                        ranges.push(newInterval);
                        overlappingIntervals.add(newInterval.toString());
                    };
                    ranges.splice(i, 1);
                    i--;
                    break;
                }
            }
        }
    }

    return ranges;
}

// [[4,5],[2,4],[4,6],[3,4],[0,0],[1,1],[3,5],[2,2]]

// [[4,5] ... [2,4],[4,6],[3,4],[0,0],[1,1],[3,5],[2,2], ... [2,5]]
// [[4,5], [2,4] ... [4,6],[3,4],[0,0],[1,1],[3,5],[2,2], ... [2,5], [2,6]]
// [[4,5], [2,4], [4,6] ... [3,4],[0,0],[1,1],[3,5],[2,2], ... [2,5], [2,6], [3,6]]
// [[4,5], [2,4], [4,6], [3,4] ... [0,0],[1,1],[3,5],[2,2], ... [2,5], [2,6], [3,6], [3,5]]
// [[4,5], [2,4], [4,6], [3,4], [0,0] ... [1,1],[3,5],[2,2], ... [2,5], [2,6], [3,6], [3,5], [0,0]]
// [[4,5], [2,4], [4,6], [3,4], [0,0], [1,1] ... [3,5],[2,2], ... [2,5], [2,6], [3,6], [3,5], [0,0], [1,1]]
// [[4,5], [2,4], [4,6], [3,4], [0,0], [1,1], [3,5] ... [2,2], ... [2,5], [2,6], [3,6], [3,5], [0,0], [1,1]]
// [[4,5], [2,4], [4,6], [3,4], [0,0], [1,1], [3,5], [2,2], ... , [2,5], [2,6], [3,6], [3,5], [0,0], [1,1]]
// [[4,5], [2,4], [4,6], [3,4], [0,0], [1,1], [3,5], [2,2], [2,5], ... , [2,6], [3,6], [3,5], [0,0], [1,1]]
// [[4,5], [2,4], [4,6], [3,4], [0,0], [1,1], [3,5], [2,2], [2,5], [2,6] ... , [3,6], [3,5], [0,0], [1,1]]
// [[4,5], [2,4], [4,6], [3,4], [0,0], [1,1], [3,5], [2,2], [2,5], [2,6] ... , [3,6], [3,5], [0,0], [1,1]]



// [[0,0],[1,1],[2,6]]