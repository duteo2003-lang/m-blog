import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getAllPosts } from "@/app/(site)/blog/utils/posts";

export async function GET() {
  try {
    const posts = getAllPosts();
    const results = [];

    for (const post of posts) {
      // Upsert: Create if missing, update if exists
      const entry = await prisma.post.upsert({
        where: { slug: post.slug },
        update: {
            content: post.content,
            title: post.title,
            excerpt: post.excerpt,
            createdAt: new Date(post.date),
            updatedAt: new Date(post.date), 
        },
        create: {
          slug: post.slug,
          title: post.title,
          content: post.content,
          excerpt: post.excerpt,
          createdAt: new Date(post.date),
          updatedAt: new Date(post.date),
          tags: post.tags,
          published: true,
        },
      });
      results.push(entry.slug);
    }

    return NextResponse.json({ message: "Migration successful", migrated: results });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Migration failed" }, { status: 500 });
  }
}