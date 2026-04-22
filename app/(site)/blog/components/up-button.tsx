"use client";
import { colors } from "@/app/design-system/token";
import { cn } from "@/lib/utils";
import { ArrowUpIcon } from "lucide-react";

interface UpButtonProps {
    className?: string;
}
export const UpButton = ({ className }: UpButtonProps) => {
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <button onClick={handleClick} className={cn(" p-4 rounded-full  text-white animate-pulse hover:animate-none transition-all duration-300",
            "hover:bg-accent hover:text-accent-foreground cursor-pointer",
            colors.background.accent,
            className)}>
            <ArrowUpIcon className="w-4 h-4" />
        </button>
    );
};
