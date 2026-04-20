import Link from "next/link";
import { prisma } from "@/app/lib/prisma";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { colors, layout, typography } from "@/app/design-system/token";
import { DeleteToolButton } from "./components/delete-tool-button";
export default async function ToolsPage() {
    const tools = await prisma.tool.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className={cn(layout.flexBetween)}>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Tools Management
                    </h1>
                    <p className={cn(typography.body.base, colors.text.muted)}>
                        Manage your tools list
                    </p>
                </div>
                <Button asChild>
                    <Link href="/cms/tools/create">
                        + Create Tool
                    </Link>
                </Button>
            </div>
            {/* Table */}
            <div className="rounded-xl border bg-background shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Tags</TableHead>
                            <TableHead>URLs</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {tools.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    No tools found.
                                </TableCell>
                            </TableRow>
                        )}

                        {tools.map((tool) => (
                            <TableRow key={tool.id}>
                                <TableCell className="font-medium">
                                    {tool.name}
                                </TableCell>

                                <TableCell>
                                    <div className="flex flex-wrap gap-2">
                                        {tool.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="secondary"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </TableCell>

                                <TableCell>
                                    {tool.url.length}
                                </TableCell>

                                <TableCell className="text-muted-foreground">
                                    {tool.createdAt.toLocaleDateString()}
                                </TableCell>

                                <TableCell>
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            asChild
                                            size="sm"
                                            variant="outline"
                                        >
                                            <Link
                                                href={`/cms/tools/${tool.id}/edit`}
                                            >
                                                Edit
                                            </Link>
                                        </Button>

                                        <DeleteToolButton id={tool.id} toolName={tool.name} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}