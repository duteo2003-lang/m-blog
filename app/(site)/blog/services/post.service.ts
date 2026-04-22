import { prisma } from "@/app/lib/prisma";
import { PostView } from "../types/post";
import { toPostViewList } from "../mappers/post.mapper";
export async function getAllPosts(tag?: string, q?: string): Promise<PostView[]> {
    const posts = await prisma.post.findMany({
        where: {
            AND: [
                tag ? { tags: { has: tag } } : {},
                q ? {
                    OR: [
                        { title: { contains: q, mode: 'insensitive' } },
                        { content: { contains: q, mode: 'insensitive' } }
                    ]
                } : {}
            ]
        },
        orderBy: { createdAt: "desc" },
    });

    return toPostViewList(posts);
}