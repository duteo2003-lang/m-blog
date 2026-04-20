import Link from "next/link";
import { prisma } from "@/app/lib/prisma";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { colors, layout, typography } from "@/app/design-system/token";
import { EyeIcon } from "lucide-react";
import { formatDate } from "@/app/common/utils/common-util";
import { DeletePostButton } from "./components/delete-post-button";
export default async function PostsPage() {
    const posts = await prisma.post.findMany({
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
                        Posts Management
                    </h1>
                    <p className={cn(typography.body.base, colors.text.muted)}>
                        Manage your posts list
                    </p>
                </div>
                <Button asChild>
                    <Link href="/cms/posts/create">
                        + Create Post
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
                            <TableHead>Excerpt</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {posts.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    No posts found.
                                </TableCell>
                            </TableRow>
                        )}

                        {posts.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell className="font-medium">
                                    {post.title}
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="secondary"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </TableCell>

                                <TableCell className="text-muted-foreground">
                                    {post.excerpt?.slice(0, 50)}...
                                </TableCell>

                                <TableCell className="text-muted-foreground">
                                    {formatDate(post.createdAt.toISOString())}
                                </TableCell>

                                <TableCell>
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            asChild
                                            size="sm"
                                            variant="outline"
                                        >
                                            <Link href={`/cms/posts/${post.id}/edit`}>
                                                Edit
                                            </Link>
                                        </Button>

                                        <Button asChild size="sm" variant="default" color="primary">
                                            <Link href={`/blog/${post.slug}`}>
                                                <EyeIcon className="w-4 h-4" />
                                            </Link>
                                        </Button>
                                        <DeletePostButton id={post.id} postTitle={post.title} />
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