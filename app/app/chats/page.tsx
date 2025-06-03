// page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { SearchIcon, Loader2, XCircle } from "lucide-react"; // Import Loader2 for spinner, XCircle for error
import ChatUser from "@/components/ChatUsers";
import axios from "axios";
// import { div } from "motion/react-client";
import { toast } from "sonner";

interface Message {
    createdAt: string; // Expecting ISO date string from backend (e.g., "2023-10-27T10:00:00.000Z")
    number: string;
    message: string;
    files: [];
    _id?: string;
}

export default function Page() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false);
    // const [searchResult, setSearchResult] = useState(true);
    const [error, setError] = useState<string | null>(null); // Initialize as null for no error
    const [searchQueryValue, setSearchQueryValue] = useState(""); // Initialize as null for no error

    function fetchMessages() {
        setLoading(true); // Ensure loading is true when fetch starts
        setError(null); // Clear any previous errors
        axios
            .get("http://localhost:5000/api/get-all/", {
                withCredentials: true,
            })
            .then((res) => {
                console.log("Response from server:", res.data);
                if (Array.isArray(res.data.data)) {
                    setMessages(res.data.data as Message[]);
                } else {
                    console.error(
                        "API response data is not an array:",
                        res.data
                    );
                    setError("Invalid data format received from the server.");
                }
            })
            .catch((err) => {
                console.error("Error fetching messages:", err);
                if (
                    axios.isAxiosError(err) &&
                    err.response &&
                    err.response.status === 500
                ) {
                    setError(
                        "Server error (500). Please try again later or contact support."
                    );
                } else if (axios.isAxiosError(err) && err.message) {
                    setError(`Failed to fetch messages: ${err.message}.`);
                } else {
                    setError(
                        "Failed to fetch messages. Please check your connection and try again."
                    );
                }
            })
            .finally(() => {
                setLoading(false); // Ensure loading is false after fetch completes
            });
    }

    useEffect(() => {
        fetchMessages();
    }, []);

    // Loader Component for better visual feedback
    const LoadingSpinner = () => (
        <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="h-12 w-12 animate-spin text-gray-500" />
            <p className="mt-4 text-lg text-gray-600">Loading chats...</p>
        </div>
    );
    const SearchingSpinner = () => (
        <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="h-12 w-12 animate-spin text-gray-500" />
            <p className="mt-4 text-lg text-gray-600">Searching messages...</p>
        </div>
    );

    // Error Message Component
    const ErrorDisplay = ({ message }: { message: string }) => (
        <div className="flex flex-col items-center justify-center h-full text-red-700">
            <XCircle className="h-12 w-12 text-red-500" />
            <p className="mt-4 text-lg font-semibold">Error:</p>
            <p className="text-center px-4">{message}</p>
            <button
                onClick={fetchMessages}
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Retry
            </button>
        </div>
    );
    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setSearchQueryValue(event.target.value);
        console.log(event.target.value);
    };

    const handleSearch = () => {
        setSearching(true);

        if (searchQueryValue.length <= 0) {
            toast.error("Please a enter value for searching");
            setSearching(false);

            return;
        }
        axios
            .post(
                "http://localhost:5000/api/search-messages/",
                {
                    searchQuery: searchQueryValue,
                },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                console.log("Response from server:", res.data);
                if (Array.isArray(res.data.data)) {
                    setMessages(res.data.data as Message[]);
                } else {
                    console.error(
                        "API response data is not an array:",
                        res.data
                    );
                    setError("Invalid data format received from the server.");
                }
            })
            .catch((err) => {
                console.error("Error fetching messages:", err);
                if (
                    axios.isAxiosError(err) &&
                    err.response &&
                    err.response.status === 500
                ) {
                    setError(
                        "Server error (500). Please try again later or contact support."
                    );
                } else if (axios.isAxiosError(err) && err.message) {
                    setError(`Failed to fetch messages: ${err.message}.`);
                } else {
                    setError(
                        "Failed to fetch messages. Please check your connection and try again."
                    );
                }
            })
            .finally(() => {
                setSearching(false); // Ensure loading is false after fetch completes
            });
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };
    return (
        <div className="h-screen flex bg-[#F6FDE8] overflow-hidden">
            <div className="w-full h-full flex flex-col border-r border-gray-400">
                {/* Search Bar */}
                <div className="sticky top-0 left-0 right-0 bg-[#F6FDE8] z-10">
                    <div className="p-2 border-b border-black h-16 flex items-center justify-between relative">
                        <input
                            value={searchQueryValue}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            type="text"
                            className="border w-full p-2 pr-10 outline-none border-black bg-white"
                            placeholder="Search"
                        />
                        <SearchIcon
                            className="absolute right-4 text-gray-600 cursor-pointer"
                            onClick={handleSearch}
                        />
                    </div>
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <LoadingSpinner />
                    ) : error ? (
                        <ErrorDisplay message={error} />
                    ) : searching ? (
                        <SearchingSpinner />
                    ) : messages.length > 0 ? (
                        messages.map((user) => {
                            const date = new Date(user.createdAt);
                            const formattedTime = date.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            });

                            return (
                                <ChatUser
                                    key={user._id || user.number}
                                    timeSent={formattedTime}
                                    number={user.number}
                                    recentMessage={user.message}
                                    files={user.files || []}
                                />
                            );
                        })
                    ) : (
                        <div className="p-4 text-center text-gray-600">
                            No messages found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
