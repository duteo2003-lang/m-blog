import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import { ToolForm } from "../../components/tool-form";
import { updateTool } from "../../actions/too-action";

export default async function EditToolPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const tool = await prisma.tool.findUnique({
        where: { id },
    });
    if (!tool) notFound();
    const updateAction = updateTool.bind(null, id);
    return (
        <div className="max-w-3xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Edit Tool</h1>
            <ToolForm
                initialData={tool}
                onSubmit={updateAction}
                cancelPath={"/cms/tools"}
                submitLabel="Save Changes"
            />
        </div>
    );
}