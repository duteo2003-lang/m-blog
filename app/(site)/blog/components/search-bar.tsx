"use client";

import { cn } from "@/app/design-system/utils";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { ScreenLoader } from "./screen-loader";

export function SearchBar({ defaultValue }: { defaultValue?: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const term = formData.get("q")?.toString();

        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("q", term);
        } else {
            params.delete("q");
        }
        startTransition(() => {
            replace(`${pathname}?${params.toString()}`, { scroll: false });
        });
    };

    return (
        <>
            {/* Full Screen Loading Overlay */}
            {isPending && (
                <ScreenLoader />
            )}

            <form onSubmit={handleSubmit} className="relative w-full max-w-md">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <SearchIcon className="size-4" />
                </div>
                <Input
                    name="q"
                    type="text"
                    placeholder="Press Enter to search..."
                    className={cn(
                        "w-full pl-10 pr-4 py-2 rounded-lg border bg-transparent transition-all",
                        "focus:outline-none focus:border-accent/50 border-input",
                        isPending && "opacity-50 cursor-not-allowed"
                    )}
                    defaultValue={defaultValue}
                    autoComplete="off"
                />
            </form>
        </>
    );
}