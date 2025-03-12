import Image from "next/image";
import React from "react";
import Heading from "./Heading";

export default function StepsCars() {
    return (
        <div
            className="p-5 bg-[#C0F65E] border-2 border-black
    "
        >
            <Image
                src={"/chatting.png"}
                height={250}
                width={250}
                alt="image"
                className=" mx-auto"
            />

            <div>
                <Heading
                    message={`Step-1 : `}
                    className="text-start text-2xl pt-10"
                />
                <Heading
                    message={`Kuch bhi nahi`}
                    className="text-start text-4xl mt-2"
                />
                <p className="pt-5 text-xl">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Pariatur, consequatur. Culpa ab quam aliquid praesentium.
                </p>
            </div>
        </div>
    );
}
