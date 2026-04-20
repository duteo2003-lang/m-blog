import { PostForm } from "../components/post-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { createPost } from "../actions/post-action";

export default function CreatePostPage() {
    return (
        <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
            <header className="space-y-4">
                <Button variant="ghost" size="sm" asChild className="-ml-2">
                    <Link href="/cms/posts">
                        <MoveLeft className="mr-2 h-4 w-4" /> Back to Blog List
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold">New Blog Post</h1>
            </header>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <PostForm
                    onSubmit={createPost}
                    submitLabel="Publish Post"
                    cancelPath="/cms/blog"
                />
            </div>
        </div>
    );
}