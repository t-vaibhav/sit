"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

function LoadingSpinner() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#EDFCD1]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
    );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const authCookie = Cookies.get("is_auth");
            const authenticated = authCookie === "true";

            if (!authenticated) {
                toast.error("Please login to access this page");
                router.push("/auth/login");
            } else {
                setIsAuth(true);
            }
            setIsLoading(false);
        };

        checkAuth();
    }, [router]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!isAuth) {
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
