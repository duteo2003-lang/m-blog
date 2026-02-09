import { getAllPosts } from "./utils/posts";
import { PostCard } from "./components/post-card";
import { colors, container } from "../design-system/token";
import { cn } from "../design-system/utils";
export default function BlogPage() {
    const postList = getAllPosts();
    return (
        <div className={cn(
            colors.background.surface,
            "min-h-screen py-4"
        )}>
            <div className={cn(
                container.maxWidth["4xl"],
                "mx-auto"
            )}>
                <h1>Dbt19&apos;s Blog</h1>
                <div className="space-y-6">
                    {postList.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
}