import Link from "next/link";
import { prisma } from "@/app/lib/prisma";

import { Button } from "@/app/lib//button";
import { Badge } from "@/app/design-system/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/design-system/table";
import { ToolView } from "@/app/(site)/tool/types/tool.view";

export default async function ToolsPage() {
    const tools = await prisma.tool.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Tools Management
                    </h1>
                    <p className="text-sm text-muted-foreground">
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

                                        <Button
                                            size="sm"
                                            variant="destructive"
                                        >
                                            Delete
                                        </Button>
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