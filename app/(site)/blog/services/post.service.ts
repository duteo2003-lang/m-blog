import { prisma } from "@/app/lib/prisma";
import { PostView } from "../types/post";
import { toPostViewList } from "../mappers/post.mapper";
export async function getAllPosts(): Promise<PostView[]> {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
    });

    return toPostViewList(posts);
}
