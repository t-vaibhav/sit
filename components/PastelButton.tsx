// frontend/components/PastelButton.tsx
import React, { ReactNode } from "react";

interface PastelButtonProps {
    message?: string; // Made optional since sometimes we only pass children
    className?: string; // Class names for the inner div
    children?: ReactNode;
    wfull?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>; // Correct type for button onClick
    disabled?: boolean; // ADD THIS LINE (correctly)
    type?: "button" | "submit" | "reset"; // ADD THIS LINE (correctly)
    // ... any other props it currently accepts
}

export default function PastelButton({
    message,
    wfull,
    className = "", // Default empty string for safety
    children,
    onClick,
    disabled, // Destructure the disabled prop
    type = "button", // Destructure the type prop and give it a default value
}: PastelButtonProps) {
    return (
        <button
            type={type} // Apply the type prop to the actual button
            onClick={onClick} // Apply onClick to the actual button
            disabled={disabled} // Apply the disabled prop to the actual button
            // Apply base styling for the button here. The outer div `bg-black py-0` is interesting.
            // If that's meant to be a border/shadow effect, it's fine.
            // Otherwise, typically styling goes directly on the button.
            className={`bg-black py-0 ${wfull ? "w-full" : ""}`}
            // Add a style for the disabled state on the button itself
            style={{
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.6 : 1, // Example: dim when disabled
            }}
        >
            <div
                // The styling for the "pastel" effect goes here
                className={`
                    ${className}
                    bg-[#CCCCFF] h-full w-full border border-black px-5 font-normal py-2 shadow-md relative flex items-center text-base hover:-translate-y-1 hover:-translate-x-1 ease-in-out duration-200 
                    ${children ? "justify-center" : "justify-center"}
                    ${
                        disabled ? "pointer-events-none" : ""
                    } /* Prevent inner div from responding to clicks if button is disabled */
                `}
            >
                {message}
                {children && <span>{children}</span>}
                <div className="absolute h-1/10 bg-black/20 bottom-0 left-0 right-0"></div>
            </div>
        </button>
    );
}
