import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import { updatePost } from "../../actions/post-action";
import { PostForm } from "../../components/post-form";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) notFound();

    // Bind the ID to the update action so the form doesn't need to know it
    const updateAction = updatePost.bind(null, id);

    return (
        <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
            <h1 className="text-3xl font-bold">Edit Post</h1>
            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <PostForm 
                    initialData={post} 
                    onSubmit={updateAction} 
                    submitLabel="Save Changes" 
                    cancelPath="/cms/posts" 
                />
            </div>
        </div>
    );
}