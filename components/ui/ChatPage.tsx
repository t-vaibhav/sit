// pages/index.tsx
import { useState, useRef, useEffect } from "react";
import {
    ChevronLeft,
    Phone,
    MoreVertical,
    Paperclip,
    Smile,
    Mic,
    Send,
} from "lucide-react";

interface Message {
    id: number;
    text: string;
    isMe: boolean;
    timestamp: string;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hey, how are you?",
            isMe: false,
            timestamp: "10:30 AM",
        },
        {
            id: 2,
            text: "I'm good! How about you?",
            isMe: true,
            timestamp: "10:31 AM",
        },
        {
            id: 3,
            text: "Doing well, thanks for asking. Did you see the new updates?",
            isMe: false,
            timestamp: "10:32 AM",
        },
        {
            id: 4,
            text: "Yes! The new features are really cool. I especially like the new dark mode.",
            isMe: true,
            timestamp: "10:34 AM",
        },
        {
            id: 5,
            text: "Agreed! They've done a great job with this update.",
            isMe: false,
            timestamp: "10:35 AM",
        },
    ]);

    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (newMessage.trim() === "") return;

        const newMsg: Message = {
            id: messages.length + 1,
            text: newMessage,
            isMe: true,
            timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        setMessages([...messages, newMsg]);
        setNewMessage("");
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Chat Header */}
            <div className="bg-blue-500 text-white p-4 flex items-center justify-between shadow-md">
                <div className="flex items-center">
                    <ChevronLeft className="mr-2 cursor-pointer" />
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center text-xl font-bold">
                            J
                        </div>
                        <div className="ml-3">
                            <div className="font-semibold">John Doe</div>
                            <div className="text-xs">online</div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <Phone className="cursor-pointer" />
                    <MoreVertical className="cursor-pointer" />
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-[url('/telegram-bg.png')] bg-repeat">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex mb-4 ${
                            message.isMe ? "justify-end" : "justify-start"
                        }`}
                    >
                        <div
                            className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${
                                message.isMe
                                    ? "bg-green-200 rounded-br-none"
                                    : "bg-white rounded-bl-none"
                            }`}
                        >
                            <div className="text-sm">{message.text}</div>
                            <div className="text-right text-xs text-gray-500 mt-1">
                                {message.timestamp}
                                {message.isMe && (
                                    <span className="ml-1">✓✓</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white p-4 flex items-center space-x-2">
                <Paperclip className="text-gray-500 cursor-pointer" />
                <div className="flex-1 rounded-full bg-gray-100 overflow-hidden flex items-center">
                    <textarea
                        className="flex-1 p-3 bg-transparent border-none outline-none resize-none h-10 max-h-40"
                        placeholder="Write a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        rows={1}
                    />
                    <Smile className="mx-2 text-gray-500 cursor-pointer" />
                </div>
                {newMessage.trim() ? (
                    <Send
                        className="p-2 rounded-full bg-blue-500 text-white cursor-pointer"
                        onClick={handleSendMessage}
                    />
                ) : (
                    <Mic className="p-2 rounded-full bg-blue-500 text-white cursor-pointer" />
                )}
            </div>
        </div>
    );
}
