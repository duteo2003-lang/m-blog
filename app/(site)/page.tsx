
import { PostCard } from "@/app/(site)/blog/components/post-card";
import { colors, container } from "@/app/design-system/token";
import { cn } from "@/app/design-system/utils";
import { getAllPosts } from "./blog/services/post.service";
export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <div className={cn(colors.background.surface, "min-h-screen py-4")}>
      <div className={cn(container.maxWidth["4xl"], "mx-auto px-4")}>
        <h1 className="text-center">Dbt19&apos;s Blog</h1>
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
