"use client";

import { useScroll } from "motion/react";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import PSCards from "@/components/PSCards";

export default function Home() {
    const data = [
        {
            heading: "Problem: ",
            points: [
                "Your phone is dead, and you can't scan the QR code. ❌",
                "You're using a public computer and don't want to log into WhatsApp. ❌",
                "You have to log in and out multiple times for different numbers. ❌",
            ],
            imageSrc: "/frustated.png",
            className: "",
        },
        {
            heading: "Solution: ",
            points: [
                "Log in with your email and send messages instantly. ✅",
                "No WhatsApp login needed. Stay secure. ✅",
                "Just enter the number and send. No extra steps. ✅",
            ],
            imageSrc: "/happy.png",
        },
        // Add more card data as needed
    ];
    const container = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        const lenis = new Lenis();

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }, []);

    return (
        <main ref={container} className={``}>
            {data.map((item, i) => {
                const targetScale = 1 - (data.length - i) * 0.05;
                return (
                    <PSCards
                        key={`p_${i}`}
                        i={i}
                        {...item}
                        progress={scrollYProgress}
                        range={[i * 0.25, 1]}
                        targetScale={targetScale}
                        heading={item.heading}
                        imageSrc={item.imageSrc}
                        points={item.points}
                    />
                );
            })}
        </main>
    );
}
