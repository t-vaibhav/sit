// src/components/ChatUsers.tsx (or wherever your ChatUser component is located)

import React from "react";
import { Users } from "lucide-react";
import { GrAttachment } from "react-icons/gr";

// Make sure this interface is defined correctly
interface ChatUserProps {
    timeSent: string;
    number: string;
    recentMessage: string;
    files: [];
}

// This line is the most important for the error you're seeing
const ChatUser: React.FC<ChatUserProps> = ({
    timeSent,
    number,
    recentMessage,
    files,
}) => {
    return (
        <div className="flex bg-[#F9FAFB] items-center justify-between hover:bg-[#FFFFCC] text-black p-4 w-full hover:text-black cursor-pointer border-b border-gray-200">
            <div className="flex items-center space-x-3 w-full overflow-hidden">
                <div className="bg-gray-700 p-2 rounded-full flex-shrink-0">
                    <Users size={20} className="text-gray-400" />
                </div>
                <div className="min-w-0 flex flex-col justify-between">
                    <p className="font-semibold truncate">{number}</p>
                    <p className="text-gray-800 text-sm flex space-x-1 ">
                        <span className="flex-grow truncate max-w-[300px]">
                            {`~ ${recentMessage}`}
                        </span>
                        {files.length > 0 && (
                            <span className="flex items-center text-gray-600 flex-shrink-0 ml-1">
                                {files.length} <GrAttachment className="ml-1" />
                            </span>
                        )}
                    </p>
                </div>
            </div>
            <div className="text-gray-800 flex items-center space-x-2 flex-shrink-0">
                <span className="text-sm whitespace-nowrap">{timeSent}</span>
            </div>
        </div>
    );
};

export default ChatUser;
