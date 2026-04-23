import { cn } from "@/lib/utils";
import { colors, container } from "../design-system/token";
import { ClearFilters } from "./blog/components/clear-fitlers-button";
import { PostCard } from "./blog/components/post-card";
import { SearchBar } from "./blog/components/search-bar";
import { getAllPosts } from "./blog/services/post.service";

export default async function BlogPage({
  searchParams
}: {
  searchParams: Promise<{ tag?: string; q?: string }>
}) {
  const { tag, q } = await searchParams;
  const posts = await getAllPosts(tag, q);
  const isFiltering = !!(tag || q);
  return (
    <div className={cn(colors.background.surface, "min-h-screen py-4")}>
      <div className={cn(container.maxWidth["4xl"], "mx-auto px-4")}>
        {/* Only show the big branding title if not filtering */}
        <div className="flex items-center justify-between">
          <h2 className="text-center my-2 text-sm md:text-2xl">
            Dbt19&apos;s Blog
          </h2>
          <SearchBar key={q || 'empty'} defaultValue={q} />
        </div>
        {/* Search & Filter Status */}
        <div className="mb-4 flex flex-col gap-4">
          {isFiltering && (
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">
                {tag ? `Tag: ${tag}` : 'Search Results'}
                {q && ` for "${q}"`}
              </h2>
              <ClearFilters />
            </div>
          )}
        </div>
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          {posts.length === 0 && (
            <div className="text-center py-10 opacity-50">
              No posts found.
            </div>
          )}

        </div>
      </div>
    </div>
  );
}