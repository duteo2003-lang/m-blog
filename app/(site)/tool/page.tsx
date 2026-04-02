import { colors, container } from "@/app/design-system/token";
import { cn } from "@/app/design-system/utils";
import { ToolCard } from "./components/tool-card";
import { getAllTools } from "./services/tool.service";
import { ToolView } from "./types/tool.view";


export default async function ToolPage() {
  const tools: ToolView[] = await getAllTools();
  if (!tools.length) {
    return (
      <p className={cn("text-center", colors.text.muted)}>
        No tools available yet.
      </p>
    );
  }
  return (
    <div className={cn(colors.background.surface, "min-h-screen py-4")}>
      <div className={cn(container.maxWidth["4xl"], "mx-auto px-4")}>
        <h2 className="text-center">Useful Tools</h2>
        <p className={cn(colors.text.muted)}>Password: dbt19</p>
        <div className=" flex flex-wrap gap-6 mt-2">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
}