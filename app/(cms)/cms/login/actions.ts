"use server";

import { ROUTES } from "@/app/common/constant";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type ActionState = {
    error?: string;
} | null;
export async function login(prevState: ActionState, formData: FormData) {
    const username = formData.get("username") as string | null;
    const password = formData.get("password") as string | null;

    const expectedUser = process.env.CMS_USERNAME;
    const expectedPass = process.env.CMS_PASSWORD;

    if (
        !username ||
        !password ||
        !expectedUser ||
        !expectedPass ||
        username !== expectedUser ||
        password !== expectedPass
    ) {
        return { error: "Invalid username or password" };
    }

    const cookieStore = await cookies();
    const cookieName = process.env.CMS_SESSION_COOKIE ?? "cms_session";
    cookieStore.set(cookieName, "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
    });

    redirect(ROUTES.CMS_DASHBOARD);
}