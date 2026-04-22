"use client";
import { cn } from "@/app/design-system/utils";
import { useEffect, useState } from "react";
export type Heading = {
    id: string;
    text: string;
    level: number;
}
interface ContentTableProps {
    headings: Heading[];
    className?: string;
}
export const ContentTable = ({ headings, className }: ContentTableProps) => {
    const [activeId, setActiveId] = useState<string>("");
    useEffect(() => {
        // 1. Initialize the Observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // We only care if the heading is in the top 20% of the screen
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                // This rootMargin 'clips' the detection area so only 
                // headings near the top of the screen trigger 'active'
                rootMargin: "-100px 0% -80% 0%"
            }
        );

        // 2. Observe all headings currently on the page
        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);
    return (
        <aside className={cn("hidden lg:block", className)}>
            <p className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
                Table of Contents
            </p>
            <nav className="flex flex-col gap-2">
                {headings.map((heading) => {
                    const isActive = activeId === heading.id;
                    return (
                        <a
                            key={heading.id}
                            href={`#${heading.id}`}
                            className={cn(
                                "text-sm transition-all duration-200 border-l-2 pl-4 py-1",
                                isActive
                                    ? "text-primary border-primary font-bold translate-x-1"
                                    : "text-muted-foreground border-transparent hover:text-foreground",
                                heading.level === 3 && "ml-4"
                            )}
                        >
                            {heading.text}
                        </a>
                    );
                })}
            </nav>
        </aside >
    );
};