import { getAllPosts } from "@/app/(site)/blog/utils/posts";
import { PostCard } from "@/app/(site)/blog/components/post-card";
import { colors, container } from "@/app/design-system/token";
import { cn } from "@/app/design-system/utils";
export default function BlogPage() {
  const postList = getAllPosts();
  return (
    <div className={cn(colors.background.surface, "min-h-screen py-4")}>
      <div className={cn(container.maxWidth["4xl"], "mx-auto px-4")}>
        <h1 className="text-center">Dbt19&apos;s Blog</h1>
        <div className="space-y-6">
          {postList.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
