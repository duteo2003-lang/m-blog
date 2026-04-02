"use client";
import { ROUTES } from "@/app/common/constant";
import { redirect } from "next/navigation";

export default function CMSPage() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
        return redirect(ROUTES.CMS_LOGIN);
    }
    return redirect(ROUTES.CMS_DASHBOARD);
}