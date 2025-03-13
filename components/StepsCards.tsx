import Image from "next/image";
import React from "react";
import Heading from "./Heading";

type StepCardTypes = {
    step: number;
    src: string;
    heading: string;
    content: string;
};

export default function StepsCards({
    step,
    src,
    heading,
    content,
}: StepCardTypes) {
    return (
        <div
            className="p-10 bg-[#C0F65E] h-[60vh] border-2 border-black flex flex-col justify-between
    "
        >
            <Image
                src={src}
                height={200}
                width={200}
                alt="image"
                className=" mx-auto"
            />

            <div>
                <Heading
                    message={`Step-${step} : `}
                    className="text-start text-lg "
                />
                <Heading
                    message={heading}
                    className="text-start text-2xl mt-0"
                />
                <p className="pt-5 text-lg">{content}</p>
            </div>
        </div>
    );
}
