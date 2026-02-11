import { navlink } from "@/app/design-system/token";
import { cn } from "@/app/design-system/utils";
import Link from "next/link";
import { ReactNode } from "react";
interface NavLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    isActive?: boolean;
}
export default function NavLink({ href, children, className, isActive }: NavLinkProps) {
    return (
        <Link href={href}
            className={cn(
                "relative",
                navlink.base,
                isActive && navlink.active,
                navlink.hover,
                className,
            )}>
            {children}
        </Link>
    );
}