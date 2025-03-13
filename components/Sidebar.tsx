"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { BsChatSquareDots } from "react-icons/bs";
import { LuContact } from "react-icons/lu";
import { GoHome } from "react-icons/go";
import { AiOutlineSend } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";

export default function Sidebar() {
    const pathname = usePathname(); // Get current path
    console.log("Current Path:", pathname);

    if (pathname === "/") return null; // Ensure Sidebar does not appear on "/"

    return (
        <div className="w-[5vw] py-8 p-3 flex flex-col items-center space-y-10 text-black border-black border-r">
            <Link href="/">
                <GoHome className="text-3xl cursor-pointer" />
            </Link>
            <Link href="/send">
                <AiOutlineSend className="text-3xl cursor-pointer" />
            </Link>
            <Link href="/chats">
                <BsChatSquareDots className="text-3xl cursor-pointer" />
            </Link>
            <Link href="/contacts">
                <LuContact className="text-3xl cursor-pointer" />
            </Link>
            <Link href="/">
                <IoSettingsOutline className="text-3xl cursor-pointer" />
            </Link>
        </div>
    );
}
