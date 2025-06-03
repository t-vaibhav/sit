import * as motion from "motion/react-client";
import type { Variants } from "motion/react";
import Image from "next/image";
import Heading from "@/components/Heading";

// Props interface for the ProblemCard component
interface ProblemCardProps {
    heading: string;
    points: string[];
    imageSrc: string;
    variants?: Variants;
    className?: string;
}

// The reusable ProblemCard component
const ProblemCard = ({
    heading,
    points,
    imageSrc,
    variants,
    className,
}: ProblemCardProps) => {
    return (
        <motion.div
            variants={variants}
            className={`grid grid-cols-5 gap-5 bg-[#FFFFCC] p-10 border-2 border-black w-full relative shadow-lg ${className}`}
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
                <Image
                    src={imageSrc}
                    height={250}
                    width={250}
                    alt="illustration"
                />
            </div>
        </motion.div>
    );
};

export default ProblemCard;
