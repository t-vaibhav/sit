"use client";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function Page() {
    const router = useRouter(); // Initialize the router

    const handleLogout = async () => {
        // Make the function asynchronous
        const loadingToastId = toast.loading("Logging out..."); // Store the toast ID

        try {
            await axios.post(
                "http://localhost:5000/api/user/logout",
                {}, // Send an empty object for POST requests if no body is needed
                {
                    withCredentials: true,
                }
            );
            toast.dismiss(loadingToastId); // Dismiss the loading toast
            toast.success("Logged out successfully");
            router.push("/"); // Redirect to the login page after successful logout
        } catch (error) {
            toast.dismiss(loadingToastId); // Dismiss the loading toast even on error
            console.error("Logout error:", error); // Log the error for debugging
            toast.error("Failed to log out. Please try again.");
        }
    };

    return (
        <div className="p-20 flex  items-center justify-center h-full">
            <div className="w-full max-w-md bg-[#FFFFCC] p-8 rounded-lg shadow-md h-full flex flex-col justify-between">
                <Heading message="Profile Details:" className="text-4xl mb-8" />
                <div className="space-y-5 flex flex-col justify-between h-full">
                    <div className="flex-1 space-y-5">
                        <div className="text-xl">Vaibhav Tiwari</div>
                        <div className="text-xl">
                            Email: tovaibhavt@gmail.com
                        </div>
                        <div className="text-xl">Mob: 916393698670</div>
                    </div>
                    <Button
                        onClick={handleLogout}
                        variant={"destructive"}
                        className="rounded-none cursor-pointer border-black"
                    >
                        Log Out
                    </Button>
                </div>
            </div>
        </div>
    );
}
