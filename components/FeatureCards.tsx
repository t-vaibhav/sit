import React from "react";
import Heading from "./Heading";
import Image from "next/image";
import * as motion from "motion/react-client";

type FeatureCardsProps = {
    message: string;
    content: string;
    src: string;
};
const box = {
    backgroundColor: "",
    borderRadius: 5,
};
const FeatureCards: React.FC<FeatureCardsProps> = ({
    message,
    content,
    src,
}) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.8 }}
            style={box}
        >
            <div className="border-2 border-black rotate-[2deg] bg-[#FCD1EF] mt-10">
                <div className="border-2 border-black -rotate-[1deg] h-full bg-[#FCD1EF]">
                    <div className="border-2 border-black -rotate-[1deg] h-full bg-[#FCD1EF] p-8 grid grid-cols-5 gap-5">
                        <div className="col-span-4">
                            <Heading
                                message={message}
                                className="text-2xl font-bold"
                            />
                            <p className="text-base pt-3">{content}</p>
                        </div>
                        <div className="flex items-center justify-center">
                            <Image
                                src={src}
                                height={80}
                                width={80}
                                alt="feature-image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default FeatureCards;
