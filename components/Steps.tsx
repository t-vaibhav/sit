"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect, useState } from "react";
import StepsCards from "./StepsCards";

// Your steps data
const howItWorks = [
    {
        step: 1,
        src: "/email-signup.png",
        heading: "Sign Up with Email",
        content:
            "Create an account or log in using your email—no need for a WhatsApp login.",
    },
    {
        step: 2,
        src: "/input.png",
        heading: "Enter Recipient Details",
        content: "Input the WhatsApp number of the person you want to message.",
    },
    {
        step: 3,
        src: "/compose-messages.png",
        heading: "Compose Message & Upload Files",
        content:
            "Type your message and attach any images, documents, or media files if needed.",
    },
    {
        step: 4,
        src: "/relax.png",
        heading: "Send & Relax",
        content:
            "Hit send, and we'll deliver your message directly to WhatsApp—no extra steps required!",
    },
];

// Hook to get current Tailwind-style breakpoint
function useBreakpoint(): "xl" | "lg" | "base" {
    const [breakpoint, setBreakpoint] = useState<"xl" | "lg" | "base">("base");

    useEffect(() => {
        const checkBreakpoint = () => {
            if (window.matchMedia("(min-width: 1280px)").matches) {
                setBreakpoint("xl");
            } else if (window.matchMedia("(min-width: 1024px)").matches) {
                setBreakpoint("lg");
            } else {
                setBreakpoint("base");
            }
        };

        checkBreakpoint();
        window.addEventListener("resize", checkBreakpoint);
        return () => window.removeEventListener("resize", checkBreakpoint);
    }, []);

    return breakpoint;
}

export default function Steps() {
    const containerRef = useRef(null);
    const breakpoint = useBreakpoint();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const getOffset = () => {
        const total = howItWorks.length - 1;
        if (breakpoint === "xl") return `-${total * 40}vw`;
        if (breakpoint === "lg") return `-${total * 50}vw`;
        return `-${total * 80}vw`;
    };

    const xTransform = useTransform(
        scrollYProgress,
        [0, 1],
        ["0%", getOffset()]
    );
    const opacity = useTransform(scrollYProgress, [0, 0.95, 1], [1, 1, 0]);

    return (
        <article id="gallery">
            <section ref={containerRef} className="relative h-[400vh]">
                <div className="sticky top-0 overflow-hidden h-screen">
                    <motion.ul
                        style={{ x: xTransform }}
                        className="flex h-screen"
                    >
                        {howItWorks.map((item, index) => (
                            <li
                                key={index}
                                className=" flex flex-col items-start justify-center pb-16 w-[80vw] lg:w-[60vw] xl:w-[50vw] h-screen flex-shrink-0 px-5 md:px-20"
                            >
                                <StepsCards
                                    src={item.src}
                                    heading={item.heading}
                                    content={item.content}
                                    step={index + 1}
                                />
                            </li>
                        ))}
                    </motion.ul>
                </div>
            </section>

            <motion.div
                style={{ scaleX: scrollYProgress, opacity }}
                className="fixed left-0 right-0 bottom-4 h-[5px] bg-[#FFFFCC] origin-left"
            />
        </article>
    );
}
