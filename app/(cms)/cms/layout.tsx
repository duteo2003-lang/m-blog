import { ReactNode } from "react";

interface CMSLayoutProps {
    children: ReactNode;
}
export default function CMSLayout({ children }: CMSLayoutProps) {
    return children;

}