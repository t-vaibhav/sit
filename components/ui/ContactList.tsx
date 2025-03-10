// components/ContactList.tsx
import { Search } from "lucide-react";

interface Contact {
    id: number;
    name: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unread: number;
}

export default function ContactList() {
    const contacts: Contact[] = [
        {
            id: 1,
            name: "John Doe",
            avatar: "J",
            lastMessage: "Did you see the new updates?",
            time: "10:35 AM",
            unread: 0,
        },
        {
            id: 2,
            name: "Sarah Smith",
            avatar: "S",
            lastMessage: "Let's meet tomorrow at 2 PM",
            time: "9:42 AM",
            unread: 2,
        },
        {
            id: 3,
            name: "Tech Group",
            avatar: "T",
            lastMessage: "Alice: The new features are amazing!",
            time: "Yesterday",
            unread: 5,
        },
        {
            id: 4,
            name: "David Wilson",
            avatar: "D",
            lastMessage: "Thanks for your help!",
            time: "Yesterday",
            unread: 0,
        },
        {
            id: 5,
            name: "Marketing Team",
            avatar: "M",
            lastMessage: "You: Will send the report soon",
            time: "3/7/25",
            unread: 0,
        },
    ];

    return (
        <div className="h-screen w-80 bg-white border-r overflow-hidden flex flex-col">
            {/* Search Bar */}
            <div className="p-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-gray-100 rounded-lg pl-10 pr-4 py-2 outline-none"
                    />
                    <Search
                        className="absolute left-3 top-2.5 text-gray-500"
                        size={18}
                    />
                </div>
            </div>

            {/* Contact List */}
            <div className="flex-1 overflow-y-auto">
                {contacts.map((contact) => (
                    <div
                        key={contact.id}
                        className={`flex items-center p-3 hover:bg-gray-100 cursor-pointer ${
                            contact.id === 1 ? "bg-blue-50" : ""
                        }`}
                    >
                        <div className="w-12 h-12 rounded-full bg-blue-300 flex items-center justify-center text-xl font-bold text-white">
                            {contact.avatar}
                        </div>
                        <div className="ml-3 flex-1 border-b border-gray-100 pb-3">
                            <div className="flex justify-between">
                                <span className="font-medium">
                                    {contact.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {contact.time}
                                </span>
                            </div>
                            <div className="flex justify-between mt-1">
                                <span className="text-sm text-gray-600 truncate max-w-[160px]">
                                    {contact.lastMessage}
                                </span>
                                {contact.unread > 0 && (
                                    <span className="bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {contact.unread}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
