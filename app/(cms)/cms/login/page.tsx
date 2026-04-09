"use client";
import { useActionState } from "react";
import { login } from "./actions";

export default function LoginPage() {
    const [state, loginAction, isPending] = useActionState(login, null);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">CMS Login</h1>
            <form action={loginAction} className="flex flex-col gap-4 w-64">
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    required
                    className="border rounded px-3 py-2"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    className="border rounded px-3 py-2"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Sign in
                </button>
            {state?.error && <p className="text-red-500">{state.error}</p>}
            </form>
        </div>
    );
}