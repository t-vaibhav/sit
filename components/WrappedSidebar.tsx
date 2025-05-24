"use client";
import React from "react";
import Sidebar from "./Sidebar";

export default function WrappedSidebar() {
    const [mounted, setMounted] = React.useState(true);

    return (
        <div className="flex min-h-screen bg-[#EDFCD1]">
            {mounted && <Sidebar />}
        </div>
    );
}
