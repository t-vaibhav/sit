"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
import Heading from "./Heading";
import StepsCars from "./StepsCars";

const howItWorks = [
    {
        step: 1,
        title: "Sign Up with Email",
        description:
            "Create an account or log in using your email—no need for a WhatsApp login.",
    },
    {
        step: 2,
        title: "Enter Recipient Details",
        description:
            "Input the WhatsApp number of the person you want to message.",
    },
    {
        step: 3,
        title: "Compose Your Message & Upload Files",
        description:
            "Type your message and attach any howItWorks, documents, or media files if needed.",
    },
    {
        step: 4,
        title: "Send & Relax",
        description:
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
        ["0%", `-${(howItWorks.length - 1) * 50}vw`]
    );
    const opacity = useTransform(scrollYProgress, [0, 0.95, 1], [1, 1, 0]);

    return (
        <article id="gallery" className="">
            <Heading
                message="Start in simple steps:"
                className="text-4xl font-extrabold pt-20"
            />

            <section ref={containerRef} className="relative h-[500vh]">
                <div className="sticky top-0 overflow-hidden h-screen">
                    <motion.ul
                        style={{ x: xTransform }}
                        className="flex h-screen w-m"
                    >
                        {howItWorks.map((item, index) => (
                            <li
                                key={index}
                                className="flex flex-col items-start justify-center py-16 w-[50vw] h-screen flex-shrink-0 px-20"
                            >
                                {/* <Heading
                                    message={`Step-${index + 1} : `}
                                    className="text-start text-2xl "
                                />
                                <Heading
                                    message={`${item.title} `}
                                    className="text-start text-4xl mt-5"
                                />
                                <p className="pt-8 text-xl">
                                    {item.description}
                                </p> */}

                                <StepsCars />
                            </li>
                        ))}
                    </motion.ul>
                </div>
            </section>
            <motion.div
                style={{ scaleX: scrollYProgress, opacity }}
                className="fixed left-0 right-0 bottom-4 h-[5px] bg-[#C0F65E] origin-left"
            />
        </article>
    );
}
