"use client";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
// import PastelButton from "@/components/PastelButton";
import { XCircle } from "lucide-react";

// Define the User interface based on your Mongoose schema
interface User {
    _id: string;
    name: string;
    email: string;
    phone: string; // Phone is now confirmed to be present in the User object
    is_verified: boolean;
    roles: ("user" | "admin")[];
    createdAt?: string; // Mongoose adds createdAt and updatedAt
    updatedAt?: string;
    __v?: number; // Add this if your API returns it and you want it typed
}

// *** CRITICAL CHANGE HERE ***
// Define the API response structure to directly match what your API returns:
// The 'user' object is at the top level, not nested under 'data'.
interface UserApiResponse {
    user?: User; // 'user' object is directly at the top level, and is optional
    message?: string; // Optional message field at top level (if your API sends it)
    error?: boolean; // Added for backend error responses
}

export default function Page() {
    const router = useRouter(); // Initialize the router
    const [userData, setUserData] = useState<UserApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = () => {
        axios
            .get<UserApiResponse>("/api/user/me", {
                withCredentials: true,
            })
            .then((res) => {
                console.log("API Response Data (from .then):", res.data);
                console.log(
                    "API Response User Object (from .then):",
                    res.data?.user
                );
                console.log(
                    "API Response User Phone (from .then):",
                    res.data?.user?.phone
                );

                setUserData(res.data);
            })
            .catch((err) => {
                console.error("Error fetching messages:", err);
                if (axios.isAxiosError(err)) {
                    if (err.response) {
                        // --- ADDED FOR DEBUGGING ---
                        console.error(
                            "Axios Error Response Data:",
                            err.response.data
                        );
                        // --- END DEBUGGING ---
                        if (err.response.status === 500) {
                            setError(
                                "Server error (500). Please try again later or contact support."
                            );
                        } else if (err.response.status === 401) {
                            // Use the message from the backend if available
                            const backendMessage = (
                                err.response.data as UserApiResponse
                            )?.message;
                            setError(
                                backendMessage || "Unauthorized. Please log in."
                            );
                        } else {
                            setError(
                                `API Error: ${err.response.status} - ${
                                    err.response.statusText || "Unknown Error"
                                }`
                            );
                        }
                    } else if (err.message) {
                        setError(`Failed to fetch messages: ${err.message}.`);
                    }
                } else {
                    setError(
                        "Failed to fetch messages. Please check your connection and try again."
                    );
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (userData?.user?.phone) {
            console.log("User data set in state (phone):", userData.user.phone);
        } else if (userData) {
            console.log(
                "User data set in state, but phone property is missing or invalid. Full userData:",
                userData
            );
        }
    }, [userData]);

    // const userName = userData?.user?.name || "User";
    // const userPhone = userData?.user?.phone || "";
    const LoadingSpinner = () => (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="loader" />
            <p className="mt-4 text-lg text-black">Loading user data...</p>
        </div>
    );
    const ErrorDisplay = ({ message }: { message: string }) => (
        <div className="h-full w-full flex items-center justify-center">
            <div className="flex flex-col items-center justify-center  text-red-700">
                <XCircle className="h-8 w-8 text-red-500" />
                <p className="mt-4 text-xl font-semibold">Error:</p>
                <p className="text-center px-4 text-lg">{message}</p>
                <button
                    onClick={() => {
                        setLoading(true);
                        setError(null);
                        fetchData();
                    }}
                    className="mt-6 px-4 py-2 bg-red-500 text-white  cursor-pointer hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 "
                >
                    Retry
                </button>
            </div>
        </div>
    );
    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorDisplay message={error} />;
    }
    const handleLogout = async () => {
        // Make the function asynchronous
        const loadingToastId = toast.loading("Logging out..."); // Store the toast ID

        try {
            await axios.post(
                "/api/user/logout",
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
        <div className="py-16 px-5 md:p-20 flex  items-center justify-center h-full">
            <div className="w-full max-w-md bg-[#FFCCE6] p-5 md:p-8  border-2 border-black shadow-md h-full flex flex-col justify-between">
                <Heading
                    message="Profile Details:"
                    className="text-2xl  lg:text-3xl xl:text-4xl mb-5 lg:mb-8"
                />
                <div className="space-y-5 flex flex-col justify-between h-full">
                    <div className="flex-1 space-y-3 md:space-y-5">
                        <div className="text-lg md:text-xl">
                            Name:{" "}
                            {userData?.user?.name
                                .toLowerCase()
                                .split(" ")
                                .map(
                                    (word) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1)
                                )
                                .join(" ")}
                        </div>
                        <div className="text-lg md:text-xl">
                            Email: {userData?.user?.email}
                        </div>
                        <div className="text-lg md:text-xl">
                            Mob: {userData?.user?.phone}
                        </div>
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
