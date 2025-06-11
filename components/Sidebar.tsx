"use client";

import React from "react";
// import { usePathname } from "next/navigation";
import Link from "next/link";
import { Heart, History, House, SendHorizonal, Settings } from "lucide-react";
export default function Sidebar() {
    // console.log("Current Path:", pathname);

    // if (pathname === "/") return null; // Ensure Sidebar does not appear on "/"

    return (
        <div className="w-16 py-8 p-3 flex flex-col items-center space-y-10 text-black border-black border-r">
            <Link href="/app/home">
                <House className="text-3xl cursor-pointer h-8 w-8" />
            </Link>
            <Link href="/app/send">
                <SendHorizonal className="text-3xl cursor-pointer h-8 w-8" />
            </Link>
            <Link href="/app/chats">
                <History className="text-3xl cursor-pointer h-8 w-8" />
            </Link>
            <Link href="/app/favourites">
                <Heart className="text-3xl cursor-pointer h-8 w-8" />
            </Link>
            <Link href="/app/settings">
                <Settings className="text-3xl cursor-pointer h-8 w-8" />
            </Link>
        </div>
    );
}
