"use client";

import { CheckIcon } from "@/app/common/icons/check-icon";
import { CopyIcon } from "@/app/common/icons/copy-icon";
import { colors } from "@/app/design-system/token";
import { cn } from "@/app/design-system/utils";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula, vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
    children: string;
    className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const lang = className?.replace(/language-/, "") || "text";

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(children);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const renderIcon = (copied: boolean) => {
        return (
            <div className="flex items-center gap-1.5">
                {copied ? <CheckIcon /> : <CopyIcon />}
                <span>{copied ? "Copied!" : "Copy"}</span>
            </div>
        );
    }

    return (
        <div className="relative group my-4">
            <div className={cn(
                "flex items-center justify-between px-4 py-2 rounded-t-lg border-b",
                colors.background.code,
                colors.border.default
            )}>
                <span className={cn(
                    "text-xs font-bold uppercase tracking-wide",
                    colors.text.primary
                )}>
                    {lang}
                </span>
                <button
                    onClick={handleCopy}
                    className={cn(
                        "flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-all",
                        "hover:bg-zinc-200 dark:hover:bg-zinc-700",
                        copied
                            ? "text-green-600 dark:text-green-400"
                            : colors.text.muted
                    )}
                    aria-label="Copy code"
                >
                    {renderIcon(copied)}
                </button>
            </div>

            <div className={cn(
                "rounded-b-lg overflow-hidden border border-t-0",
                colors.border.default
            )}>
                <SyntaxHighlighter
                    language={lang}
                    style={dracula}
                    customStyle={{
                        margin: 0,
                        padding: "1rem",
                        fontSize: "0.875rem",
                    }}
                    showLineNumbers={false}
                >
                    {children}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}
