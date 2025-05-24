// page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import ChatUser from "@/components/ChatUsers";
import axios from "axios";

interface Message {
    createdAt: string; // Expecting ISO date string from backend (e.g., "2023-10-27T10:00:00.000Z")
    number: string;
    message: string;
    files: any[];
    _id?: string;
}

export default function Page() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function fetchMessages() {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/get-all/",
                {
                    withCredentials: true,
                }
            );

            console.log("Response from server:", response.data);
            setMessages(response.data.data as Message[]);
        } catch (err) {
            console.error("Error fetching messages:", err);
            setError("Failed to fetch messages. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMessages();
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-[#F6FDE8]">
                <p>Loading chats...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center bg-[#F6FDE8]">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="h-screen flex bg-[#F6FDE8] overflow-hidden">
            <div className="w-full h-full flex flex-col border-r border-gray-400">
                {/* Search Bar */}
                <div className="sticky top-0 left-0 right-0 bg-[#F6FDE8] z-10">
                    <div className="p-2 border-b border-black h-16 flex items-center justify-between relative">
                        <input
                            type="text"
                            className="border w-full p-2 pr-10 outline-none border-black bg-white"
                            placeholder="Search"
                        />
                        <SearchIcon className="absolute right-4 text-gray-600" />
                    </div>
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto">
                    {messages.length > 0 ? (
                        messages.map((user) => {
                            // Convert the ISO date string to a Date object, then format it.
                            const date = new Date(user.createdAt);
                            const formattedTime = date.toLocaleDateString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            }); // e.g., "10:45 AM"

                            return (
                                <ChatUser
                                    key={user._id || user.number}
                                    timeSent={formattedTime} // Pass the formatted string
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
