import Link from "next/link";
import { Post } from "../types/post";
import { formatDate } from "@/app/common/utils/common-util";
import { colors, typography } from "@/app/design-system/token";
import { cn } from "@/app/design-system/utils";

interface PostCardProps {
    post: Post;
}
export const PostCard = ({ post }: PostCardProps) => {
    return (
        <article
            key={post.id}
            className={cn(colors.background.surface, "p-6 rounded-lg shadow-sm border border-border-default")}
        >

            <Link href={`/blog/${post.slug}`}>
                <h2 className={cn(colors.text.accent, "hover:opacity-80 transition-opacity")}>{post.title}</h2>
            </Link>

            <p className={cn(typography.body.base, colors.text.muted, "mb-3")}>
                {formatDate(post.date)}
            </p>
            <p className={cn(typography.body.base, colors.text.muted, "mb-4")}>
                {post.excerpt}
            </p>
            <Link
                href={`/blog/${post.slug}`}
                className={cn(typography.body.base, colors.text.accent, "hover:underline font-medium")}
            >
                Read more →
            </Link>
        </article>
    );
};