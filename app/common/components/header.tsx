"use client";
import { container } from "@/app/design-system/token";
import { cn } from "@/app/design-system/utils";
import { usePathname } from "next/navigation";
import { ROUTES } from "../constant";
import NavLink from "./nav-link";

const routes = [
    {
        href: ROUTES.BLOG,
        label: "The M-Blog"
    },
    {
        href: ROUTES.TOOLS,
        label: "Tools"
    }
]
export default function Header() {
    const pathname = usePathname();
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background">
            <div className={cn(
                "w-full flex  items-center  gap-4 mx-auto ",
                container.maxWidth["4xl"],
                container.padding.desktop,
                "py-4",
            )}>
                {routes.map((route) => {
                    const isActive = pathname === route.href;
                    return (
                        <NavLink
                            key={route.href}
                            href={route.href}
                            isActive={isActive}
                            className="text-lg font-bold">
                            {route.label}
                        </NavLink>
                    )

                })}
            </div>
        </header>
    );
}