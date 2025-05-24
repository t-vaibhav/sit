"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const currentPath = usePathname();

    const isAuthRoute =
        currentPath === "/auth/login" ||
        currentPath === "/auth/register" ||
        currentPath === "/" ||
        currentPath === "/auth/register/test";

    console.log("Current Path:", currentPath);

    return (
        <div className={`min-h-screen ${isAuthRoute ? "" : "flex"}`}>
            {!isAuthRoute && <Sidebar />}
            <div className="flex-1">{children}</div>
        </div>
    );
}
