import React, { ReactNode } from "react";

interface PastelButtonProps {
    message?: string; // Made optional since sometimes we only pass children
    className?: string;
    children?: ReactNode;
    wfull?: boolean;
    onClick?: () => void; // Added onClick prop
}

export default function PastelButton({
    message,
    wfull,
    className = "",
    children,
    onClick,
}: PastelButtonProps) {
    return (
        <button className={`bg-black py-0 ${wfull ? "w-full" : ""}`}>
            <div
                onClick={onClick} // Now supports click event
                className={`
                ${className} 
                bg-pink-300 h-full w-full cursor-pointer border border-black px-5 font-normal py-2 shadow-md relative flex items-center text-base hover:-translate-y-1 hover:-translate-x-1 ease-in-out duration-200
                ${children ? "justify-center" : "justify-center"}
                `}
            >
                {message}
                {children && <span>{children}</span>}
                <div className="absolute h-1/10 bg-black/20 bottom-0 left-0 right-0"></div>
            </div>
        </button>
    );
}
