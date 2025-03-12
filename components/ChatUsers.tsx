import React from "react";
import { Volume2, Users } from "lucide-react";

interface ChatUserProps {
    timeSent: string;
    sender: string;
    recentMessage: string;
}

const ChatUser: React.FC<ChatUserProps> = ({
    timeSent,
    sender,
    recentMessage,
}) => {
    return (
        <div className="flex bg-[F9FAFB] items-center justify-between hover:bg-[#C0F65E] text-black p-4 w-full hover:text-black cursor-pointer">
            <div className="flex items-center space-x-3 w-full overflow-hidden">
                {/* Profile Icon */}
                <div className="bg-gray-700 p-2 rounded-full flex-shrink-0">
                    <Users size={20} className="text-gray-400" />
                </div>

                {/* Message Container */}
                <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate">{sender}</p>
                    <p className="text-gray-800 text-sm truncate max-w-[200px] sm:max-w-[250px] md:max-w-[300px]">
                        ~{sender}: {recentMessage}
                    </p>
                </div>
            </div>

            {/* Timestamp and Volume Icon */}
            <div className="text-gray-800 flex items-center space-x-2 flex-shrink-0">
                <span className="text-sm whitespace-nowrap">{timeSent}</span>
                <Volume2 size={16} className="opacity-50" />
            </div>
        </div>
    );
};

export default ChatUser;
