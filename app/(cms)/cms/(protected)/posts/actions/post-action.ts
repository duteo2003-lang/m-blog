"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PostFormValues } from "../components/post-form";
import { slugify } from "@/app/common/utils/common-util";

export async function createPost(values: PostFormValues) {
    const slug = slugify(values.title.trim());
    const payload = {
        title: values.title.trim(),
        excerpt: values.excerpt?.trim(),
        content: values.content.trim(),
        tags: values.tags,
        slug,
    };

    await prisma.post.create({ data: payload });

    // Clear the cache for the posts list so the new post appears
    revalidatePath("/cms/posts");
    redirect("/cms/posts");
}

export async function updatePost(id: string, values: PostFormValues) {
    const payload = {
        title: values.title.trim(),
        excerpt: values.excerpt.trim(),
        content: values.content.trim(),
        tags: values.tags,
    };

    await prisma.post.update({
        where: { id },
        data: payload,
    });

    revalidatePath("/cms/posts");
    redirect("/cms/posts");
}

export async function deletePost(id: string) {
    try {
        await prisma.post.delete({
            where: { id },
        });
        revalidatePath("/cms/tools");
    } catch (error) {
        console.error(error);
        return { error: "Failed to delete tool" };
    }
}
