import { createTool } from "../actions/tool-action";
import { ToolForm } from "../components/tool-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function CreateToolPage() {
    return (
        <div className="max-w-3xl mx-auto py-10 px-4 space-y-8">
            {/* Header */}
            <header className="space-y-4">
                <Button variant="ghost" size="sm" asChild className="-ml-2 text-muted-foreground">
                    <Link href="/cms/tools">
                        <MoveLeft className="mr-2 h-4 w-4" />
                        Back to Tools
                    </Link>
                </Button>
                
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Create Tool</h1>
                    <p className="text-muted-foreground">Add a new tool to the directory</p>
                </div>
            </header>

            {/* Form Section */}
            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <ToolForm 
                    onSubmit={createTool} 
                    submitLabel="Create Tool" 
                    cancelPath="/cms/tools"
                />
            </div>
        </div>
    );
}