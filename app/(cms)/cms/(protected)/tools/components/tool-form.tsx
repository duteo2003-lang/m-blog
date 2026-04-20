"use client";

import { useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Field,
    FieldContent,
    FieldError,
    FieldLabel,
} from "@/components/ui/field";
import Link from "next/link";

export type ToolFormValues = {
    name: string;
    description: string;
    url: { value: string }[];
    tags: string[];
};

type ToolFormProps = {
    initialData?: {
        name: string;
        description: string;
        url: string[];
        tags: string[];
    };
    onSubmit: (data: ToolFormValues) => Promise<void>;
    submitLabel: string;
    cancelPath: string;
};

export function ToolForm({
    initialData,
    onSubmit,
    submitLabel,
    cancelPath,
}: ToolFormProps) {
    const [isPending, startTransition] = useTransition();
    const [tags, setTags] = useState<string[]>(initialData?.tags ?? []);
    const [tagInput, setTagInput] = useState("");

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ToolFormValues>({
        defaultValues: {
            name: initialData?.name ?? "",
            description: initialData?.description ?? "",
            url: initialData?.url?.length
                ? initialData.url.map((item) => ({ value: item }))
                : [{ value: "" }],
        },
        mode: "onBlur",
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "url",
    });

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

    const handleFormSubmit = (data: ToolFormValues) => {
        startTransition(async () => {
            try {
                await onSubmit({ ...data, tags });
            } catch (error) {
                console.error("Submission error:", error);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Name Field */}
            <Field>
                <FieldLabel>Name</FieldLabel>
                <FieldContent>
                    <Input
                        placeholder="ChatGPT"
                        disabled={isPending}
                        {...register("name", {
                            required: "Name is required",
                            minLength: { value: 2, message: "Minimum 2 characters" },
                        })}
                    />
                    <FieldError>{errors.name?.message}</FieldError>
                </FieldContent>
            </Field>

            {/* Description Field */}
            <Field>
                <FieldLabel>Description</FieldLabel>
                <FieldContent>
                    <Textarea
                        rows={5}
                        placeholder="Describe this tool..."
                        disabled={isPending}
                        {...register("description", {
                        })}
                    />
                    <FieldError>{errors.description?.message}</FieldError>
                </FieldContent>
            </Field>

            {/* Dynamic URL Fields */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">URLs</p>
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={isPending}
                        onClick={() => append({ value: "" })}
                    >
                        + Add URL
                    </Button>
                </div>
                {fields.map((field, index) => (
                    <Field key={field.id}>
                        <FieldContent>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="https://example.com"
                                    disabled={isPending}
                                    {...register(`url.${index}.value` as const, {
                                        required: "URL is required",
                                        pattern: {
                                            value: /^https?:\/\/.+/i,
                                            message: "Must start with http:// or https://",
                                        },
                                    })}
                                />
                                {fields.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        disabled={isPending}
                                        onClick={() => remove(index)}
                                    >
                                        ×
                                    </Button>
                                )}
                            </div>
                            <FieldError>{errors.url?.[index]?.value?.message}</FieldError>
                        </FieldContent>
                    </Field>
                ))}
            </div>

            {/* Tags Management */}
            <Field>
                <FieldLabel>Tags</FieldLabel>
                <FieldContent>
                    <div className="flex gap-2">
                        <Input
                            value={tagInput}
                            disabled={isPending}
                            placeholder="Add a tag..."
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === ",") {
                                    e.preventDefault();
                                    addTag();
                                }
                            }}
                        />
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={addTag}
                            disabled={isPending}
                        >
                            Add
                        </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3 min-h-[32px]">
                        {tags.map((tag) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="cursor-pointer hover:bg-destructive hover:text-white transition-colors"
                                onClick={() => !isPending && removeTag(tag)}
                            >
                                {tag} <span className="ml-1 opacity-60">×</span>
                            </Badge>
                        ))}
                    </div>
                </FieldContent>
            </Field>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4 border-t">
                <Button type="submit" disabled={isPending}>
                    {isPending ? "Saving..." : submitLabel}
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    disabled={isPending}
                    asChild
                >
                    <Link href={cancelPath}>
                        Cancel
                    </Link>
                </Button>
            </div>
        </form>
    );
}