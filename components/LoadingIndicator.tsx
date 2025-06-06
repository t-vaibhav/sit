// components/LoadingIndicator.tsx
"use client"; // This component must be a client component

import { useEffect } from "react";
import { usePathname } from "next/navigation"; // Correct import for App Router
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Don't forget to import the CSS for NProgress!

export default function LoadingIndicator() {
    const pathname = usePathname(); // Get the current pathname from the URL

    useEffect(() => {
        // When the pathname changes, it signifies a navigation has started (or completed, if we're on the new page)
        NProgress.start(); // Start the progress bar

        // We can't directly listen for 'routeChangeComplete' like in Pages Router.
        // A common strategy here is to complete NProgress when the next render cycle occurs
        // for the new page content.
        // The `setTimeout(..., 0)` ensures this runs after the current render cycle is complete.
        const timer = setTimeout(() => {
            NProgress.done();
        }, 100); // A small delay can help if pages load extremely fast, preventing a flicker.
        // You can adjust or remove this delay based on your preference.

        // Cleanup function: This runs before the next effect or when the component unmounts.
        // It's crucial to ensure NProgress is finished if the component state changes rapidly
        // or navigation is aborted.
        return () => {
            clearTimeout(timer); // Clear the timeout if the component re-renders or unmounts before it fires
            NProgress.done(); // Ensure NProgress is done on cleanup
        };
    }, [pathname]); // Re-run this effect whenever the pathname changes

    // This component does not render any visible UI directly.
    // NProgress injects its progress bar into the DOM (usually at the top).
    return null;
}
