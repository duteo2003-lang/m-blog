import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "../utils/posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MarkDownComponents } from "../components/mark-down-components";
import { formatDate } from "@/app/common/utils/common-util";
import { colors, container, spacing, typography } from "@/app/design-system/token";
import { cn } from "@/app/design-system/utils";
import { ROUTES } from "@/app/common/constant";

export async function generateStaticParams() {
  const postsData = getAllPosts();
  return postsData.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className={cn(
      colors.background.surface,
      "min-h-screen py-6"
    )}>
      <div className={cn(
        container.maxWidth["4xl"],
        "mx-auto"
      )}>
        <Link
          href={ROUTES.BLOG}
          className={cn(typography.body.base, spacing.link, colors.text.accent)}
        >
          Back to Blog
        </Link>
        <article className={cn(
          container.padding.desktop,
          spacing.block,
          "rounded-lg shadow-sm py-2 bg-white "
        )}>
          <h1 >{post.title}</h1>
          <p className={cn(
            colors.text.muted,
            typography.body.small,
            spacing.block,
          )}>
            {formatDate(post.date)}
          </p>
          <div className="max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkDownComponents}>
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  )
}