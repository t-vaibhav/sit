"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Heart,
    History,
    House,
    List,
    SendHorizonal,
    Settings,
    X,
} from "lucide-react";

export default function Sidebar() {
    const [on, setOn] = useState(false);

    const toggleBurger = () => {
        setOn(!on);
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="md:flex hidden w-16 py-8 p-3 flex-col items-center space-y-10 text-black border-black border-r ">
                <Link href="/app/home">
                    <House className="text-3xl cursor-pointer h-8 w-8" />
                </Link>
                <Link href="/app/send">
                    <SendHorizonal className="text-3xl cursor-pointer h-8 w-8" />
                </Link>
                <Link href="/app/messages">
                    <History className="text-3xl cursor-pointer h-8 w-8" />
                </Link>
                <Link href="/app/favourites">
                    <Heart className="text-3xl cursor-pointer h-8 w-8" />
                </Link>
                <Link href="/app/settings">
                    <Settings className="text-3xl cursor-pointer h-8 w-8" />
                </Link>
            </div>

            {/* Mobile Burger Icon */}
            <div className="md:hidden block fixed right-5 top-5 z-50">
                {on ? (
                    <X onClick={toggleBurger} className="h-8 w-8" /> // X icon when sidebar is open
                ) : (
                    <List onClick={toggleBurger} className="h-8 w-8 " /> // List icon when sidebar is closed
                )}
            </div>

            {/* Mobile Sidebar Overlay */}
            <div
                className={`fixed inset-0 z-40  md:hidden
                           transition-opacity duration-300
                           ${
                               on
                                   ? "bg-opacity-50 pointer-events-auto"
                                   : "bg-opacity-0 pointer-events-none"
                           }`}
                onClick={toggleBurger} // Close sidebar when clicking on overlay
            >
                {/* Mobile Sidebar Content */}
                <div
                    className={`fixed top-0 right-0 h-full w-full bg-[#CCCCFF] shadow-lg z-50
                                transform transition-transform duration-300 ease-in-out
                                ${on ? "translate-x-0" : "translate-x-full"}
                                py-8 p-5 pt-20 mx-auto flex justify-center text-center text-black`}
                    onClick={(e) => e.stopPropagation()} // Prevent clicks inside the sidebar from closing it
                >
                    <div className="space-y-10">
                        <Link
                            href="/app/home"
                            onClick={toggleBurger}
                            className="space-x-3 flex text-lg"
                        >
                            <House className="text-3xl cursor-pointer h-8 w-8" />
                            <p>Home</p>
                        </Link>

                        <Link
                            href="/app/send"
                            onClick={toggleBurger}
                            className="space-x-3 flex text-lg"
                        >
                            <SendHorizonal className="text-3xl cursor-pointer h-8 w-8" />
                            <p>Send</p>
                        </Link>
                        <Link
                            href="/app/messages"
                            onClick={toggleBurger}
                            className="space-x-3 flex text-lg"
                        >
                            <History className="text-3xl cursor-pointer h-8 w-8" />
                            <p>History</p>
                        </Link>
                        <Link
                            href="/app/favourites"
                            onClick={toggleBurger}
                            className="space-x-3 flex text-lg"
                        >
                            <Heart className="text-3xl cursor-pointer h-8 w-8" />
                            <p>Favourites</p>
                        </Link>

                        <Link
                            href="/app/settings"
                            onClick={toggleBurger}
                            className="space-x-3 flex text-lg"
                        >
                            <Settings className="text-3xl cursor-pointer h-8 w-8" />
                            <p>Settings</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
