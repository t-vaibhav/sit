"use client";
import React, { ReactNode } from "react";
import Heading from "./Heading";
import { motion } from "motion/react";
type FeatureCardsProps = {
    message: string;
    content: string;
    icon: ReactNode;
};

const FeatureCards: React.FC<FeatureCardsProps> = ({
    message,
    content,
    icon,
}) => {
    return (
        <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.5 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            // whileInView={{ opacity: 1, scale: 1 }}
            // viewport={}

            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.8 }}
        >
            <div className="border-2 border-black rotate-[2deg] bg-[#FFCCE6] h-full">
                <div className="border-2 border-black -rotate-[1deg] h-full bg-[#FFCCE6]">
                    <div className="border-2 border-black -rotate-[1deg] h-full bg-[#FFCCE6] p-8 grid grid-cols-5 gap-5">
                        <div className="col-span-4">
                            <Heading
                                message={message}
                                className="text-2xl font-bold"
                            />
                            <p className="text-base pt-3">{content}</p>
                        </div>
                        <div className="flex items-center justify-center">
                            {icon}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default FeatureCards;
