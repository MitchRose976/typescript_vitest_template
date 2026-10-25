/**
    Problem 1: Request admission
    You are building a service that decides whether incoming requests should be accepted.

    Each user may have at most limit accepted requests within a rolling window of windowMs milliseconds.

    Requirements
    -Return one boolean per request, in input order.
    -Users have independent limits.
    -Requests arrive in nondecreasing timestamp order.
    -For a request at time t, previous accepted requests count only when their timestamps are in (t - windowMs, t].
    -Rejected requests do not count toward future limits.
    -Requests sharing a timestamp are processed in array order.
    -Do not mutate the input.
    -Assume timestamps are nonnegative safe integers and both configuration values are positive safe integers.
    -Input may contain up to 200,000 requests.

    Example:
    admitRequests(
    [
        { userId: "a", timestamp: 0 },
        { userId: "a", timestamp: 1 },
        { userId: "a", timestamp: 2 },
        { userId: "b", timestamp: 2 },
        { userId: "a", timestamp: 10 },
        { userId: "a", timestamp: 11 },
    ],
    2,
    10
    );

    // [true, true, false, true, true, true]
 */

export type Request = {
  userId: string;
  timestamp: number;
};

export const admitRequests = (
  requests: readonly Request[],
  limit: number,
  windowMs: number,
): boolean[] => {
  const result: boolean[] = [];

  const userRequests = new Map<
    string,
    { timestamps: number[]; head: number }
  >();

  for (const { userId, timestamp } of requests) {
    let history = userRequests.get(userId);
    if (history === undefined) {
      history = { timestamps: [], head: 0 };
      userRequests.set(userId, history);
    }

    const cutoff = timestamp - windowMs;
    // Advance a cursor instead of shifting the array for each expired request.
    while (
      history.head < history.timestamps.length &&
      history.timestamps[history.head] <= cutoff
    ) {
      history.head++;
    }

    const accepted = history.timestamps.length - history.head < limit;
    result.push(accepted);
    if (accepted) {
      history.timestamps.push(timestamp);
    }
  }
  return result;
};
