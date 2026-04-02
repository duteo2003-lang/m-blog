import { prisma } from "@/app/lib/prisma";
import { ToolView } from "@site/tool/types/tool.view";
import { toToolViewList } from "@site/tool/mappers/tool.mapper";

export async function getAllTools(): Promise<ToolView[]> {
    const tools = await prisma.tool.findMany({
        orderBy: { date: "desc" },
    });

    return toToolViewList(tools);
}
