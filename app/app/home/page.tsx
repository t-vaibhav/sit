"use client";
import CTACards from "@/components/CTACards";
import { Manrope } from "next/font/google";
import PastelButton from "@/components/PastelButton";
import Heading from "@/components/Heading";
import axios from "axios";
import { useEffect, useState } from "react";

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
});
import { motion } from "motion/react";
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

export default function Home() {
    const [userData, setUserData] = useState<UserApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = () => {
        axios
            .get<UserApiResponse>("/api/user/me", {
                withCredentials: true,
            })
            .then((res) => {
                // console.log("API Response Data (from .then):", res.data);
                // console.log(
                //     "API Response User Object (from .then):",
                //     res.data?.user
                // );
                // console.log(
                //     "API Response User Phone (from .then):",
                //     res.data?.user?.phone
                // );

                setUserData(res.data);
            })
            .catch((err) => {
                // console.error("Error fetching messages:", err);
                if (axios.isAxiosError(err)) {
                    if (err.response) {
                        // --- ADDED FOR DEBUGGING ---
                        // console.error(
                        //     "Axios Error Response Data:",
                        //     err.response.data
                        // );
                        // --- END DEBUGGING ---
                        if (err.response.status === 500) {
                            setError(
                                "Server error (500). Please try again or contact support."
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
                        setError(`Failed to load: ${err.message}.`);
                    }
                } else {
                    setError("Please try again or contact support.");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const userName = userData?.user?.name || "User";
    const userPhone = userData?.user?.phone || "";

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen text-2xl font-semibold">
                Loading user data...
            </div>
        );
    }

    if (error) {
        return (
            <>
                <div className="flex flex-col items-center justify-center h-full text-red-700">
                    <XCircle className="h-8 w-8 text-red-500" />
                    <p className="mt-4 text-xl font-semibold">Error:</p>
                    <p className="text-center px-4 text-lg">{error}</p>
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
            </>
        );
    }

    return (
        <div className="p-6 xl:px-10">
            <motion.div
                initial={{
                    transform: "translateY(-300px)",
                    opacity: 0,
                    scale: 0,
                }}
                animate={{
                    transform: "translateY(0px)",
                    opacity: 1,
                    scale: 1,
                }}
                transition={{ type: "keyframes" }}
                className={` ${manrope.variable} bg-[#FFFFCC] heading text-lg h-full
                 grid md:grid-cols-2 md:gap-10 gap-2`}
            >
                <div className="xl:py-20 md:py-10 lg:py-16 h-full ">
                    <Heading
                        message={`Hey! ${userName
                            .toLowerCase()
                            .split(" ")
                            .map(
                                (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}`}
                        className="text-base xl:text-lg md:py-2 py-0"
                    />
                    <Heading
                        message="Start sending now"
                        className=" font-semibold heading text-2xl md:text-3xl  lg:text-4xl xl:text-5xl py-2 xl:py-4 "
                    />
                </div>
                <div className="flex items-center h-full justify-center xl:text-lg text-base">
                    <div>
                        <div className="md:pb-2">No phone? No problem.</div>
                        <div>
                            Send WhatsApp messages and documents straight from
                            your browser — no QR code, no login, no hassle.
                            Secure. Instant. Just your number and message.
                        </div>
                    </div>
                </div>
            </motion.div>
            <motion.div
                initial={{
                    transform: "translateY(300px)",
                    opacity: 0,
                    scale: 0,
                }}
                animate={{
                    transform: "translateY(0px)",
                    opacity: 1,
                    scale: 1,
                }}
                transition={{ type: "keyframes" }}
            >
                <div className=" h-full grid md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-10 py-10 lg:pt-10 xl:pt-0">
                    <CTACards
                        src="/user.png"
                        title="To yourself"
                        content="Send files, docs or messages to yourself"
                        link={`/app/send/?number=${userPhone}`} // userPhone should now correctly contain the phone number
                    />
                    <CTACards
                        src="/friends.png"
                        title="To number"
                        content="Send files, docs or messages to any number"
                        link="/app/send"
                    />
                    <CTACards
                        src="/favourite.png"
                        title="To favourites"
                        content="Start sending to your favourite contacts"
                        link="/app/favourites"
                    />
                </div>
                <div className="md:pt-16  lg:pt-20 ">
                    <PastelButton message="Check History" />
                </div>
            </motion.div>
        </div>
    );
}
