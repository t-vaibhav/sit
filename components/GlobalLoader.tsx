// components/GlobalLoader.tsx
"use client";

import { useLoading } from "@/components/LoadingContext"; // Import your custom hook
import React from "react";

export default function GlobalLoader() {
    const { isLoading } = useLoading();

    // Don't render anything if not loading
    if (!isLoading) {
        return null;
    }

    // Render your custom loader markup and styles here
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent overlay
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999, // Ensure it's on top of other content
                pointerEvents: "none", // Allows clicks to pass through the overlay to underlying elements
            }}
        >
            {/* Your existing spinner from LoadingSpinner or any other custom loader */}
            <div className="loader"></div>
            {/* You can add text, animations, etc. */}
        </div>
    );
}
