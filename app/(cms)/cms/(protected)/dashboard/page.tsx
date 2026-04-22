import { colors, container } from "@/app/design-system/token";
import { cn } from "@/app/design-system/utils";

export default function DashboardPage() {
    return (
        <div className={cn(colors.background.surface, "min-h-screen py-4")}>
            <div className={cn(container.maxWidth["4xl"], "mx-auto px-4")}>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome to the dashboard</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold">Posts</h2>
                        <p className="text-sm text-gray-500">View all posts</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold">Tools</h2>
                        <p className="text-sm text-gray-500">View all tools</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold">Users</h2>
                        <p className="text-sm text-gray-500">View all users</p>
                    </div>
                </div>
            </div>
        </div>
    );
}