import { prisma } from "@/app/lib/prisma";
import { ToolView } from "../types/tool.view";
import { toToolViewList } from "../mappers/tool.mapper";

export async function getAllTools(): Promise<ToolView[]> {
    const tools = await prisma.tool.findMany({
        orderBy: { date: "desc" },
    });

    return toToolViewList(tools);
}
