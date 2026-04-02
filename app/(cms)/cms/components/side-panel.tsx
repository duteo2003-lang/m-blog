"use client";
import NavLink from "@/app/common/components/nav-link";
import { colors } from "@/app/design-system/token";
import { cn } from "@/app/design-system/utils";
import { usePathname } from "next/navigation";

const navItems = [
    {
        label: "Tools",
        href: "/cms/tools",
    },
    {
        label: "Dashboard",
        href: "/cms",
    },
    {
        label: "Posts",
        href: "/cms/posts",
    },
]
export default function SidePanel() {
    const pathname = usePathname();
    return (
        <aside className={cn(
            "w-64  border-r border-border-default",
            colors.background.surface,
        )}>
            <nav className="p-4 space-y-1 flex flex-col gap-2">
                {navItems.map(({ href, label }) => {
                    const isActive = pathname === href;
                    return (
                        <NavLink key={href} href={href} isActive={isActive}>
                            {label}
                        </NavLink>
                    )
                })}
            </nav>
        </aside>
    );
}