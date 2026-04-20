
import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type PostFormValues = {
    title: string;
    content: string;
    excerpt: string;
    tags: string[];
};
export async function createBlogPost(values: PostFormValues) {
    const slug = values.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    await prisma.post.create({
        data: {
            title: values.title,
            content: values.content,
            excerpt: values.excerpt,
            tags: values.tags,
            slug: slug,
        },
    });

    revalidatePath("/blog");
    redirect("/cms/blog");
}

export async function updateBlogPost(id: string, values: any) {
    await prisma.post.update({
        where: { id },
        data: {
            title: values.title,
            content: values.content,
            excerpt: values.excerpt,
            tags: values.tags,
        },
    });

    revalidatePath("/blog");
    revalidatePath(`/blog/${values.slug}`);
    redirect("/cms/blog");
}