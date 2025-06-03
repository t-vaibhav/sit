"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import StepsCards from "./StepsCards";

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
            "Type your message and attach any howItWorks, documents, or media files if needed.",
    },
    {
        step: 4,
        src: "/relax.png",
        heading: "Send & Relax",
        content:
            "Hit send, and we’ll deliver your message directly to WhatsApp—no extra steps required!",
    },
];

export default function Steps() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const xTransform = useTransform(
        scrollYProgress,
        [0, 1],
        ["0%", `-${(howItWorks.length - 1) * 40}vw`]
    );
    const opacity = useTransform(scrollYProgress, [0, 0.95, 1], [1, 1, 0]);

    return (
        <article id="gallery" className="">
            <section ref={containerRef} className="relative h-[400vh]">
                <div className="sticky top-0 overflow-hidden h-screen">
                    <motion.ul
                        style={{ x: xTransform }}
                        className="flex h-screen"
                    >
                        {howItWorks.map((item, index) => (
                            <li
                                key={index}
                                className="flex flex-col items-start justify-center pb-16 w-[50vw] h-screen flex-shrink-0 px-20"
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
