import React from "react";
import { SearchIcon } from "lucide-react";
import { LuCircleUser } from "react-icons/lu";
import PastelButton from "@/components/PastelButton";
import { BsEmojiSmile } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import ChatUser from "@/components/ChatUsers";

const messages = [
    {
        id: 1,
        text: "Bhejna ka bhi first screen pe hi hota toh better rahega",
        time: "08:31",
        sender: "other",
    },
    { id: 2, text: "Open karte hi", time: "08:32", sender: "other" },
    { id: 3, text: "Yes krta abhi complete", time: "09:29", sender: "self" },
    { id: 4, text: "Ui accha h na???", time: "09:29", sender: "self" },
];
const chatUsersData = [
    {
        timeSent: "10:45",
        sender: "Alice",
        recentMessage: "Hey, how's it going?",
    },
    {
        timeSent: "11:30",
        sender: "Bob",
        recentMessage: "Did you check the updates?",
    },
    {
        timeSent: "12:15",
        sender: "Charlie",
        recentMessage: "Let's meet at the usual place.",
    },
    {
        timeSent: "13:50",
        sender: "David",
        recentMessage: "I'll call you in 5 minutes.",
    },
    {
        timeSent: "14:20",
        sender: "Emma",
        recentMessage: "Great job on the project!",
    },
    {
        timeSent: "15:10",
        sender: "Frank",
        recentMessage: "Are we still on for tonight?",
    },
    {
        timeSent: "16:05",
        sender: "Grace",
        recentMessage: "I'll send you the details soon.",
    },
    {
        timeSent: "17:40",
        sender: "Hannah",
        recentMessage: "Don't forget the meeting tomorrow.",
    },
    {
        timeSent: "18:25",
        sender: "Ian",
        recentMessage: "Let's wrap up by EOD.",
    },
    {
        timeSent: "19:00",
        sender: "Jack",
        recentMessage: "The files are uploaded now.",
    },
    {
        timeSent: "19:45",
        sender: "Kate",
        recentMessage: "Can you review this for me?",
    },
    {
        timeSent: "20:20",
        sender: "Leo",
        recentMessage: "See you at the event!",
    },
    {
        timeSent: "21:05",
        sender: "Mia",
        recentMessage: "I'll be late, start without me.",
    },
    {
        timeSent: "22:30",
        sender: "Nathan",
        recentMessage: "Have a great night!",
    },
    {
        timeSent: "23:15",
        sender: "Olivia",
        recentMessage: "Good night, talk tomorrow!",
    },
];

const ChatMessage = ({
    text,
    time,
    sender,
}: {
    text: string;
    time: string;
    sender: string;
}) => (
    <div
        className={`flex ${
            sender === "self" ? "justify-end" : "justify-start"
        } mb-2`}
    >
        <div
            className={`max-w-xs p-2 rounded-lg  ${
                sender === "self"
                    ? "bg-[#F75FC7] text-black"
                    : "bg-[#C0F65E] text-black"
            }`}
        >
            <p>{text}</p>
            <span className="text-xs text-gray-800">{time}</span>
        </div>
    </div>
);

export default function page() {
    return (
        <div className="h-screen flex  bg-[#F6FDE8] overflow-hidden">
            <div className="w-1/4 h-full flex flex-col border-r border-black">
                {/* Search Bar */}
                <div className="sticky top-0 left-0 right-0 bg-[#F6FDE8] z-10">
                    <div className="p-2 border-b border-black h-16 flex items-center justify-between relative">
                        <input
                            type="text"
                            className="border w-full p-2 pr-10 outline-none border-black bg-white "
                            placeholder="Search"
                        />
                        <SearchIcon className="absolute right-4 text-gray-600" />
                    </div>
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto scroll">
                    {chatUsersData.map((user, index) => (
                        <ChatUser
                            key={index}
                            timeSent={user.timeSent}
                            sender={user.sender}
                            recentMessage={user.recentMessage}
                        />
                    ))}
                </div>
            </div>

            <div className="w-3/4 h-full flex #F6FDE8 flex-col justify-between">
                <div className="p-2 border-b border-black h-16 flex items-center ">
                    <div className="px-2 flex items-center">
                        <div className="flex space-x-2 items-center">
                            <LuCircleUser size={40} className=" font-normal" />
                            <div>
                                <p className="text-sm font-semibold">Rahul</p>
                                <p className="text-xs">Online</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-grow p-4 overflow-y-auto bg-[url('/bg-print.svg')] bg-gray-50">
                    {messages.map((message) => (
                        <ChatMessage
                            key={message.id}
                            text={message.text}
                            time={message.time}
                            sender={message.sender}
                        />
                    ))}
                </div>

                <div className="px-4 py-3 flex items-center border-t border-black">
                    <div className="flex space-x-2 items-center">
                        <BsEmojiSmile size={30} className=" font-normal" />
                        <GrAttachment size={30} className=" font-normal" />
                    </div>
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Enter your text here..."
                        className="p-2 rounded-full bg-white flex-grow mx-3 border border-black px-4"
                    />
                    <PastelButton message="Send ->" className="text-base " />
                </div>
            </div>
        </div>
    );
}
