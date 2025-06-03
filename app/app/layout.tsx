"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

function LoadingSpinner() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFFCC]">
            <div className="loader"></div>
        </div>
    );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    // const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const authCookie = Cookies.get("is_auth");
            const authenticated = authCookie === "true";

            if (!authenticated) {
                toast.error("Please login to access this page");
                router.push("/auth/login");
            }
            setIsLoading(false);
        };

        checkAuth();
    }, [router]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen flex">
            <Sidebar />
            <div className="flex-1">{children}</div>
            <Toaster />
        </div>
    );
}
