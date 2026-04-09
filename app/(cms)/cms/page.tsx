"use client";
import { ROUTES } from "@/app/common/constant";
import { redirect } from "next/navigation";

export default function CMSPage() {
    return redirect(ROUTES.CMS_LOGIN);
}