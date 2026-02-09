import { colors, spacing, typography } from "@/app/design-system/token";
import { cn } from "@/app/design-system/utils";
import { Components } from "react-markdown";
import { CodeBlock } from "./code-block";
export const MarkDownComponents: Components = {
    h1: ({ children }) => (
        <h1 >{children}</h1>
    ),
    h2: ({ children }) => (
        <h2 >{children}</h2>
    ),
    h3: ({ children }) => (
        <h3 >{children}</h3>
    ),
    h4: ({ children }) => (
        <h4 >{children}</h4>
    ),
    h5: ({ children }) => (
        <h5 >{children}</h5>
    ),
    h6: ({ children }) => (
        <h6 >{children}</h6>
    ),
    p: ({ children }) => (
        <p className={cn(typography.body.base, spacing.paragraph, colors.text.primary)}>{children}</p>
    ),
    a: ({ children, href }) => (
        <a href={href} className={cn(typography.body.base, spacing.link, colors.text.accent)}>{children}</a>
    ),
    hr: () => (
        <hr className={cn(
            "my-8 border-t border-t-4",
            "border-zinc-400 ",
            "opacity-20"
        )} />
    ),
    ol: ({ children }) => (
        <ol className={cn(spacing.ol, colors.text.primary, "list-decimal list-outside")}>{children}</ol>
    ),
    ul: ({ children }) => (
        <ul className={cn(spacing.ul, colors.text.primary, "list-disc list-outside")}>{children}</ul>
    ),
    li: ({ children }) => (
        <li className={cn(spacing.li, colors.text.primary, "leading-relaxed")}>{children}</li>
    ),
    code: ({ children, className }) => {
        const isInline = !className;
        if (isInline) {
            return <code className={cn(colors.background.code, spacing.code, "rounded text-sm font-mono")}>{children}</code>
        }
        return <CodeBlock className={className}>{String(children)}</CodeBlock>
    },
    pre: ({ children }) => {
        return <>{children}</>;
    },
    // Table components
    table: ({ children }) => (
        <div className="my-6 overflow-x-auto">
            <table className={cn(
                "w-full border-collapse",
                "border border-[var(--color-border-default)]",
                "rounded-lg overflow-hidden"
            )}>
                {children}
            </table>
        </div>
    ),
    thead: ({ children }) => (
        <thead className={cn(
            colors.background.code,
            "border-b border-[var(--color-border-default)]"
        )}>
            {children}
        </thead>
    ),
    tbody: ({ children }) => (
        <tbody>
            {children}
        </tbody>
    ),
    tr: ({ children }) => (
        <tr className={cn(
            "border-b border-[var(--color-border-default)]",
            "last:border-b-0",
            "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
        )}>
            {children}
        </tr>
    ),
    th: ({ children }) => (
        <th className={cn(
            "px-4 py-3 text-left",
            "font-semibold",
            colors.text.primary,
            "border-r border-[var(--color-border-default)] last:border-r-0"
        )}>
            {children}
        </th>
    ),
    td: ({ children }) => (
        <td className={cn(
            "px-4 py-3",
            colors.text.secondary,
            "border-r border-[var(--color-border-default)] last:border-r-0"
        )}>
            {children}
        </td>
    ),
}