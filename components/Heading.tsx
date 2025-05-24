import { Radio_Canada } from "next/font/google";
import React from "react";

const radioCanada = Radio_Canada({
    subsets: ["latin"],
    variable: "--font-radio-canada",
});

interface HeadingProps {
    message: string;
    className?: string;
}
export default function Heading({ message, className }: HeadingProps) {
    return (
        <div
            className={`${radioCanada.variable} ${className} font-semibold      `}
        >
            {message}
        </div>
    );
}
