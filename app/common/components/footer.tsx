import { colors, container } from "@/app/design-system/token";
import { cn } from "@/app/design-system/utils";

export default function Footer() {
    return (
        <footer className={cn(colors.background.surface, "w-full")}>
            <div className={cn(container.maxWidth.lg,
                "py-2",
                container.padding.mobile
            )}>
                <p>Copyright 2026 The M-Blog. All rights reserved.</p>
            </div>
        </footer>
    );
}