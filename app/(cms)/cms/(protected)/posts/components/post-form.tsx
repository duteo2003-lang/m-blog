"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MarkDownComponents } from "@site/blog/components/mark-down-components";
import { Eye, PenLine, X } from "lucide-react";

export type PostFormValues = {
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
};

type PostFormProps = {
    initialData?: PostFormValues;
    onSubmit: (data: PostFormValues) => Promise<void>;
    submitLabel: string;
    cancelPath: string;
};

export function PostForm({ initialData, onSubmit, submitLabel, cancelPath }: PostFormProps) {
    const [isPending, startTransition] = useTransition();
    const [tags, setTags] = useState<string[]>(initialData?.tags ?? []);
    const [tagInput, setTagInput] = useState("");

    const { register, handleSubmit, watch, formState: { errors } } = useForm<PostFormValues>({
        defaultValues: {
            title: initialData?.title ?? "",
            excerpt: initialData?.excerpt ?? "",
            content: initialData?.content ?? "",
        },
    });

    // Watch the content field for the preview mode
    const contentValue = watch("content");

    const addTag = () => {
        const value = tagInput.trim().toLowerCase();
        if (value && !tags.includes(value)) {
            setTags((prev) => [...prev, value]);
        }
        setTagInput("");
    };

    const removeTag = (tagToRemove: string) => {
        setTags((prev) => prev.filter((t) => t !== tagToRemove));
    };

    const handleFormSubmit = (data: PostFormValues) => {
        startTransition(async () => {
            await onSubmit({ ...data, tags });
        });
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="relative pb-20">
            {/* 1. STICKY ACTION BAR (Google Blog Style) */}
            <div className="sticky top-0 z-50 flex items-center justify-between bg-background/95 backdrop-blur border-b py-4 mb-8">
                <div>
                    <h2 className="text-sm font-medium text-muted-foreground italic">
                        {isPending ? "Syncing..." : "Draft saved locally"}
                    </h2>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="ghost" asChild disabled={isPending}>
                        <Link href={cancelPath}>Discard</Link>
                    </Button>
                    <Button type="submit" disabled={isPending} className="px-8 shadow-lg">
                        {isPending ? "Publishing..." : submitLabel}
                    </Button>
                </div>
            </div>

            <div className="space-y-8 max-w-5xl mx-auto">
                {/* Title Field - Extra Large */}
                <div className="space-y-2">
                    <Input
                        className="text-4xl font-bold border-none px-4 focus-visible:ring-0 placeholder:opacity-30 h-auto py-2"
                        placeholder="Post Title"
                        disabled={isPending}
                        {...register("title", { required: "Title is required" })}
                    />
                    <FieldError>{errors.title?.message}</FieldError>
                </div>

                {/* Settings Section (Sidebar style or Bottom) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Metadata</h3>
                        <Field>
                            <FieldLabel>Excerpt</FieldLabel>
                            <FieldContent>
                                <Textarea
                                    placeholder="Short summary for SEO and cards..."
                                    {...register("excerpt")}
                                />
                            </FieldContent>
                        </Field>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Organization</h3>
                        <Field>
                            <FieldLabel>Tags</FieldLabel>
                            <FieldContent>
                                <div className="flex gap-2">
                                    <Input
                                        value={tagInput}
                                        placeholder="Press Enter to add tags"
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === ",") {
                                                e.preventDefault();
                                                addTag();
                                            }
                                        }}
                                    />
                                </div>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="pl-3 pr-1 py-1 gap-1 border-primary/20">
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            </FieldContent>
                        </Field>
                    </div>
                </div>
                {/* Tabbed Editor (GitLab/GitHub Style) */}
                <Tabs defaultValue="edit" className="w-full border rounded-lg bg-card">
                    <div className="flex items-center justify-between px-4 border-b bg-muted/30">
                        <TabsList className="h-12 bg-transparent gap-4">
                            <TabsTrigger value="edit" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2">
                                <PenLine className="w-4 h-4 mr-2" /> Write
                            </TabsTrigger>
                            <TabsTrigger value="preview" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2">
                                <Eye className="w-4 h-4 mr-2" /> Preview
                            </TabsTrigger>
                        </TabsList>
                        <span className="text-xs text-muted-foreground uppercase font-semibold">Markdown Supported</span>
                    </div>

                    <TabsContent value="edit" className="p-0 mt-0">
                        <Textarea
                            className="min-h-[500px] border-none focus-visible:ring-0 font-mono text-lg p-6 resize-none"
                            placeholder="Start writing your story..."
                            disabled={isPending}
                            {...register("content", { required: "Content is required" })}
                        />
                    </TabsContent>

                    <TabsContent value="preview" className="p-6 mt-0 min-h-[500px] prose prose-slate dark:prose-invert max-w-none bg-background">
                        {contentValue ? (
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={MarkDownComponents}
                            >
                                {contentValue}
                            </ReactMarkdown>
                        ) : (
                            <p className="text-muted-foreground italic">Nothing to preview yet...</p>
                        )}
                    </TabsContent>
                </Tabs>

            </div>
        </form>
    );
}