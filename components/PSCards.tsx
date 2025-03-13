"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import * as motion from "motion/react-client";
import { useTransform, useScroll, MotionValue } from "motion/react";
import { useRef } from "react";
import Heading from "./Heading";

interface PSCardsProps {
    i: number;
    heading: string;
    points: string[];
    imageSrc: string;
    className?: string;
    progress: MotionValue<number>; // Adjust type if needed (for example, MotionValue<number>)
    range: [number, number];
    targetScale: number;
}

const PSCards: React.FC<PSCardsProps> = ({
    i,

    heading,
    points,
    imageSrc,

    progress,
    range,
    targetScale,
    className,
}) => {
    const container = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "start start"],
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={container} className={styles.cardContainer}>
            <motion.div
                style={{
                    backgroundColor: "#FCD1EF",
                    scale,
                    top: `calc(0vh + ${i * 25}px)`,
                }}
                className={`grid grid-cols-5 gap-5 bg-[#FCD1EF] p-10 border-2 border-black w-full relative shadow-lg ${className}`}
            >
                <div className="col-span-3">
                    <Heading
                        message={heading}
                        className="text-3xl pb-2 text-start"
                    />
                    <div className="space-y-6 text-start text-xl font-semibold pt-10">
                        {points.map((point, index) => (
                            <p key={index}>{point}</p>
                        ))}
                    </div>
                </div>
                <div className="col-span-2 flex justify-center items-center">
                    <div className={styles.imageContainer}>
                        <motion.div
                            className={styles.inner}
                            style={{ scale: imageScale }}
                        >
                            <Image
                                src={imageSrc}
                                alt={heading}
                                height={250}
                                width={250}
                            />
                        </motion.div>
                    </div>
                </div>

                {/* <div className={styles.body}>
                    <div className={styles.description}>
                        <p>{heading}</p>
                    </div>
                </div> */}
            </motion.div>
        </div>
    );
};

export default PSCards;
