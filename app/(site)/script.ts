import { prisma } from "../lib/prisma";
import { getAllPosts } from "./blog/services/post.service";

async function seedPosts() {
    const posts = await getAllPosts();
    for (const post of posts) {
    await prisma.post.upsert({
        where: { slug: post.slug },
        update: {},
        create: {
            title: post.title,
            content: post.content,
            excerpt: post.excerpt,
            date: new Date(post.date),
            tags: post.tags,
            slug: post.slug,
        }
    });
}
}

seedPosts();