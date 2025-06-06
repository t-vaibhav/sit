/* eslint-disable @typescript-eslint/no-unused-vars */

// components/LoadingContext.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// Create a context to hold the loading state
const LoadingContext = createContext({
    isLoading: false,
    setLoading: (loading: boolean) => {}, // Placeholder function
});

// Custom hook to easily access the loading state
export function useLoading() {
    return useContext(LoadingContext);
}

// Provider component to wrap your application
export function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // When the pathname changes, assume navigation has started
        setIsLoading(true);

        // After a short delay, or when the new page is likely rendered,
        // set loading to false. A `setTimeout(..., 0)` ensures it runs
        // after the current render cycle completes for the new page.
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 100); // Small delay to prevent flicker on very fast navigations

        // Cleanup function: runs before the next effect or when component unmounts
        return () => {
            clearTimeout(timer);
            setIsLoading(false); // Ensure loading is off if navigation is interrupted
        };
    }, [pathname]); // Effect runs whenever the pathname changes

    return (
        <LoadingContext.Provider
            value={{ isLoading, setLoading: setIsLoading }}
        >
            {children}
        </LoadingContext.Provider>
    );
}
