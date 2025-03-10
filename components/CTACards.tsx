import Image from "next/image";
import React from "react";
import Heading from "./Heading";

export default function CTACards({
    src,
    title,
    content,
}: {
    src: string;
    title: string;
    content?: string;
}) {
    return (
        <div className=" border border-[#00000033] bg-[#FCD1EF] h-full px-10 pt-5 pb-10 relative">
            <div></div>
            <div className="flex justify-between items-center">
                <div className=" ">
                    <Heading message={title} className="text-3xl pt-2 pb-4" />
                    <h6>{content}</h6>
                </div>
                <div className="">
                    {/* <RxAvatar className="text-4xl" /> */}
                    <Image src={src} height={100} width={100} alt="user" />
                </div>
            </div>

            <div className="absolute h-1/10 bg-black/20 bottom-0 left-0 right-0"></div>
        </div>
    );
}
