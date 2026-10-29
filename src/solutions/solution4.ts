/**
    Question 4: Group items by a property
    Given a list of content posts, group them by their status.
    type Post = {
        id: string;
        status: "draft" | "scheduled" | "published";
    };

    Follow-up: How would you return the count of posts per status instead of the actual posts?
 */

export const solution4 = (posts: {id: string, status: "draft" | "scheduled" | "published"}[]) => {
    // initialize an object to hold arrays for each status
    const groupedPosts: Record<string, {id: string, status: "draft" | "scheduled" | "published"}[]> = {};
    // iterate over the posts and push each post into the corresponding array based on its status
    for (const post of posts) {
        if (!groupedPosts[post.status]) {
            groupedPosts[post.status] = [];
        }
        groupedPosts[post.status].push(post);
    }
    return groupedPosts;
}
