"use client";

import { Textarea } from "@/components/ui/textarea";
import imageCompression from "browser-image-compression";
import { useFormContext } from "react-hook-form";
import { uploadImageAction } from "../actions/post-action";
import { PostFormValues } from "./post-form";
import { slugify } from "@/app/common/utils/common-util";

export function PostEditor() {
    const { register, setValue, getValues } = useFormContext<PostFormValues>();

    const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
        const items = e.clipboardData.items;
        const textarea = e.currentTarget;

        for (const item of items) {
            if (item.type.startsWith("image")) {
                const file = item.getAsFile();
                if (!file) continue;

                const options = { maxSizeMB: 0.1, maxWidthOrHeight: 1920, useWebWorker: true };
                const compressedFile = await imageCompression(file, options);

                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const currentContent = getValues("content");
                const placeholder = `\n![Uploading ${file.name}...]()\n`;

                const newContent =
                    currentContent.substring(0, start) +
                    placeholder +
                    currentContent.substring(end);

                setValue("content", newContent);

                try {
                    const formData = new FormData();
                    formData.append("file", compressedFile);

                    const imageUrl = await uploadImageAction(formData, slugify(getValues("title")));

                    const finalMarkdown = `![${file.name}](${imageUrl})`;
                    const updatedWithImage = getValues("content").replace(placeholder, finalMarkdown);

                    setValue("content", updatedWithImage);
                } catch (error) {
                    console.error("Upload failed", error);
                    setValue("content", currentContent.replace(placeholder, " [Upload Failed] "));
                }
            }
        }
    };

    return (
        <Textarea
            className="min-h-[500px] border-none focus-visible:ring-0 font-mono text-lg p-6 resize-none"
            placeholder="Paste an image here..."
            {...register("content", { required: "Content is required" })}
            onPaste={handlePaste}
        />
    );
}