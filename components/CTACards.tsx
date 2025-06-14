import Image from "next/image";
import React from "react";
import Heading from "./Heading";
import Link from "next/link";

export default function CTACards({
    src,
    title,
    content,
    link,
}: {
    src: string;
    title: string;
    content?: string;
    link: string;
}) {
    return (
        <Link href={link}>
            <div className=" border border-[#00000033] bg-[#CCFFE6] h-full px-5 pb-5 lg:px-5 lg:pb-5 xl:px-10 xl:pt-5 xl:pb-10 relative ">
                <div></div>
                <div className="flex justify-between items-center">
                    <div className=" ">
                        <Heading
                            message={title}
                            className="text-xl md:text-2xl xl:text-3xl pt-2 pb-2 lg:pt-2 lg:pb-4"
                        />
                        <h6>{content}</h6>
                    </div>
                    <div className="">
                        {/* <RxAvatar className="text-4xl" /> */}
                        <Image src={src} height={100} width={100} alt="user" />
                    </div>
                </div>

                <div className="absolute h-1/10 bg-black/20 bottom-0 left-0 right-0 xl:text-lg text-base"></div>
            </div>
        </Link>
    );
}
