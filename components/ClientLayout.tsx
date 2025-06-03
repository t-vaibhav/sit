"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const currentPath = usePathname();

    useEffect(() => {
        const isAuth = Cookies.get("isAuth");
        setIsLoggedIn(isAuth === "true");
    }, []);

    console.log("Current Path:", currentPath);
    console.log("Is Logged In:", isLoggedIn);

    return (
        <div className={`min-h-screen`}>
            <div className="flex-1">{children}</div>
        </div>
    );
}
