import { Post } from "@prisma/client";
import { PostView } from "../types/post";

export const toPostView = (post: Post): PostView => {
    return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        date: post.createdAt.toISOString(),
        excerpt: post.excerpt ?? "No excerpt available",
        content: post.content,
        tags: post.tags,
    };
};
export const toPostViewList = (posts: Post[]): PostView[] => {
    return posts.map(toPostView);
};