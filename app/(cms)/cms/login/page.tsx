"use client";
import { ROUTES } from "@/app/common/constant";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        localStorage.setItem("isLoggedIn", "true");
        redirect(ROUTES.CMS_DASHBOARD);
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4">
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Login</button>
            </form>
        </div>
    );
}