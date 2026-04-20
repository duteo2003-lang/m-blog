import { Tool } from "@prisma/client";
import { ToolView } from "../types/tool.view";

export const toToolView = (tool: Tool): ToolView => {
    return {
        id: tool.id,
        name: tool.name,
        description: tool.description,
        url: tool.url,
        createdAt: tool.createdAt.toISOString(),
        updatedAt: tool.updatedAt.toISOString(),
        tags: tool.tags,
    };
};
export const toToolViewList = (tools: Tool[]): ToolView[] => {
    return tools.map(toToolView);
};