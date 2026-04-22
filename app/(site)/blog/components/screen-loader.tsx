import { Loader2 } from "lucide-react";
import { cn } from "@/app/design-system/utils";

interface ScreenLoaderProps {
    className?: string;
}

export function ScreenLoader({ className }: ScreenLoaderProps) {
    return (
        <div
            className={cn(
                "fixed inset-0 z-[100] flex flex-col items-center justify-center",
                "bg-background/50 backdrop-blur-md transition-all duration-300",
                className
            )}
        >
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="size-12 animate-spin text-primary" />
                <p className="text-sm font-medium tracking-widest uppercase animate-pulse">
                    Loading...
                </p>
            </div>
        </div>
    );
}