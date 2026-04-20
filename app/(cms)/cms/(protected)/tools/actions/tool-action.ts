"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ToolFormValues } from "../components/tool-form";

export async function createTool(values: ToolFormValues) {
    const payload = {
        name: values.name.trim(),
        description: values.description.trim(),
        url: values.url.map((u) => u.value.trim()).filter(Boolean),
        tags: values.tags,
    };

    await prisma.tool.create({ data: payload });

    // Clear the cache for the tools list so the new tool appears
    revalidatePath("/cms/tools");
    redirect("/cms/tools");
}

export async function updateTool(id: string, values: ToolFormValues) {
    const payload = {
        name: values.name.trim(),
        description: values.description.trim(),
        url: values.url.map((u) => u.value.trim()).filter(Boolean),
        tags: values.tags,
    };

    await prisma.tool.update({
        where: { id },
        data: payload,
    });

    revalidatePath("/cms/tools");
    redirect("/cms/tools");
}

export async function deleteTool(id: string) {
    try {
        await prisma.tool.delete({
            where: { id },
        });
        revalidatePath("/cms/tools");
    } catch (error) {
        console.error(error);
        return { error: "Failed to delete tool" };
    }
}