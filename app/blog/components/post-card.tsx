import Link from "next/link";
import { Post } from "../types/post";
import { formatDate } from "@/app/common/utils/common-util";

interface PostCardProps {
    post: Post;
}
export const PostCard = ({ post }: PostCardProps) => {
    return (
        <article
            key={post.id}
            className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800"
        >
            <h2 className="text-2xl font-semibold mb-2">
                <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                    {post.title}
                </Link>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-3">
                {formatDate(post.date)}
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                {post.excerpt}
            </p>
            <Link
                href={`/blog/${post.slug}`}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
                Read more →
            </Link>
        </article>
    );
};