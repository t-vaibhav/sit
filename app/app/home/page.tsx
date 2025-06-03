"use client";
import CTACards from "@/components/CTACards";
import { Manrope } from "next/font/google";
import PastelButton from "@/components/PastelButton";
import Heading from "@/components/Heading";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
});
import { motion } from "motion/react";

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
}

export default function Home() {
    const [userData, setUserData] = useState<UserApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = () => {
        axios
            .get<UserApiResponse>("http://localhost:5000/api/user/me", {
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
                        if (err.response.status === 500) {
                            setError(
                                "Server error (500). Please try again later or contact support."
                            );
                        } else if (err.response.status === 401) {
                            setError("Unauthorized. Please log in.");
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
        toast("testing");
        if (userData?.user?.phone) {
            console.log("User data set in state (phone):", userData.user.phone);
        } else if (userData) {
            console.log(
                "User data set in state, but phone property is missing or invalid. Full userData:",
                userData
            );
        }
    }, [userData]);

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
            <div className="flex flex-col items-center justify-center h-screen text-red-500 text-xl p-4 text-center">
                <p>Error: {error}</p>
                <PastelButton
                    message="Retry"
                    onClick={() => {
                        setLoading(true);
                        setError(null);
                        fetchData();
                    }}
                    className="mt-4"
                />
            </div>
        );
    }

    return (
        <div className="p-6">
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
                className={` ${manrope.variable} bg-[#FFFFCC] heading text-lg  grid grid-cols-2 gap-10`}
            >
                <div className="py-20 px-10">
                    <Heading
                        message={`Hey! ${userName}`}
                        className="text-lg py-2"
                    />
                    <Heading
                        message="Start sending now"
                        className=" font-semibold heading text-5xl py-4 "
                    />
                </div>
                <div className="flex items-center h-full justify-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                    sit cumque, possimus nisi facilis consequatur laudantium
                    accusantium sapiente molestiae corporis, aperiam voluptatum
                    inventore tenetur ex qui
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
                <div className=" h-full grid grid-cols-3 gap-10 px-5">
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
                        title="To your favourites"
                        content="Start sending to your favourite contacts"
                        link="/app/favourites"
                    />
                </div>
                <div className="px-5 pt-20 ">
                    <PastelButton message="Check History" />
                </div>
            </motion.div>
        </div>
    );
}
