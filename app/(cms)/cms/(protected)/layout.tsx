import { ReactNode } from "react";
import SidePanel from "./components/side-panel";

interface CMSLayoutProps {
    children: ReactNode;
}
export default function CMSLayout({ children }: CMSLayoutProps) {
    return (
        <div className="flex min-h-screen">
            <SidePanel />
            <main className="flex-1 p-4 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}