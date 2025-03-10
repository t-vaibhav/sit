import Image from "next/image";
import { Manrope } from "next/font/google";
import PastelButton from "@/components/PastelButton";
import Heading from "@/components/Heading";

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
});

export default function Home() {
    return (
        <div className="p-6">
            <div className="flex justify-between">
                <Image src={"/logo.png"} height={30} width={80} alt="cover" />
                <PastelButton message="Login" />
            </div>
            <div
                className={` ${manrope.variable} bg-[#EDFCD1] heading text-5xl px-16  grid grid-cols-2 gap-10`}
            >
                <div className="py-20 px-10">
                    <Heading message="Connect" className="text-lg py-2" />
                    <Heading
                        message="Effortlessly send messages to WhatsApp"
                        className=" font-semibold heading text-5xl py-6 "
                    />
                    <Heading
                        message="Out tool allows you to send messages to WhatsApp without
                        logging in to your WhatsApp account"
                        className="text-lg py-2"
                    />
                    <div className="grid grid-cols-2 gap-5 py-4">
                        <div>
                            <h3 className="font-medium text-2xl pb-1">
                                Quick Sharing
                            </h3>
                            <h6 className={`font-normal text-base       `}>
                                Just enter the number and message and click send
                            </h6>
                        </div>
                        <div>
                            <h3 className="font-medium text-2xl pb-1">
                                No Number reuired
                            </h3>
                            <h6 className={`font-normal text-base       `}>
                                Just login with you email and start sending
                            </h6>
                        </div>
                    </div>
                    <div className="pt-6 text-xl">
                        <PastelButton
                            message="Start sending ->"
                            className="font-light "
                        />
                    </div>
                </div>
                <div className="flex  h-full w-full justify-center">
                    {/* <div className="h-full w-full"> */}
                    <Image
                        src={"/chat2.png"}
                        height={500}
                        width={500}
                        alt="cover"
                        className=" object-contain"
                        style={{ objectFit: "contain" }}
                    />
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
}
