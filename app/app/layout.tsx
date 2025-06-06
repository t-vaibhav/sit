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

    // ...existing code...
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const checkAuth = async () => {
            const authCookie = Cookies.get("is_auth");
            const authenticated = authCookie === "true";

            if (!authenticated) {
                timeoutId = setTimeout(() => {
                    toast.error("Please login to access this page");
                }, 500); // 500ms delay for the toast
                router.push("/auth/login");
                return;
            }
            setIsLoading(false);
        };

        checkAuth();

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [router]);
    // ...existing code...
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
