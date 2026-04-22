"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/common/constant";
import { cn } from "@/app/design-system/utils";
import { colors, spacing, typography } from "@/app/design-system/token";

export function ClearFilters() {
    const router = useRouter();
    const handleClear = () => {
        router.replace(ROUTES.BLOG, { scroll: false });
    };

    return (
        <button
            onClick={handleClear}
            className={cn(
                typography.body.base,
                spacing.link,
                colors.text.accent,
                "cursor-pointer hover:underline"
            )}
        >
            Clear all filters
        </button>
    );
}