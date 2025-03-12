import * as motion from "motion/react-client";
import type { Variants } from "motion/react";
import ProblemCard from "@/components/ProblemCard";
import Heading from "@/components/Heading";

export default function ScrollTriggered() {
    return (
        <div className=" w-full relative">
            <Heading
                message="How It Works - A Simple Fix to a Big Problem "
                className="text-4xl text-start pt-16 pb-20"
            />
            <div className="mx-auto w-full my-[100px] pb-[50vh] relative">
                {cardData.map((data, i) => (
                    <Card key={i} data={data} i={i} />
                ))}
            </div>
        </div>
    );
}

interface CardProps {
    data: CardData;
    i: number;
}

interface CardData {
    heading: string;
    points: string[];
    imageSrc: string;
    className?: string;
}

function Card({ data }: CardProps) {
    return (
        <motion.div
            className="sticky top-[25vh] w-full flex justify-center items-center mb-[50vh]"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: false, amount: 0.5 }}
        >
            <ProblemCard
                heading={data.heading}
                points={data.points}
                imageSrc={data.imageSrc}
                variants={cardVariants}
                className={data.className}
            />
        </motion.div>
    );
}

const cardVariants: Variants = {
    offscreen: {
        y: 100,
        opacity: 0,
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
        },
    },
};

// Sample data for the cards
const cardData: CardData[] = [
    {
        heading: "Problem: ",
        points: [
            "Your phone is dead, and you can't scan the QR code. ❌",
            "You're using a public computer and don't want to log into WhatsApp. ❌",
            "You have to log in and out multiple times for different numbers. ❌",
        ],
        imageSrc: "/frustated.png",
        className: "-translate-y-10 scale-90",
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
