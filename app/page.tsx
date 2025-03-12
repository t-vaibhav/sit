import Image from "next/image";
import { Manrope } from "next/font/google";
import PastelButton from "@/components/PastelButton";
import Heading from "@/components/Heading";
import Navbar from "@/components/Navbar";
import FeatureCards from "@/components/FeatureCards";
import Steps from "@/components/Steps";
// import ChatUI from "@/components/ChatUI";
import ScrollTriggered from "./demo/page";

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
});

const features = [
    {
        message: "No Need for WhatsApp Web",
        content:
            "Unlike traditional methods where you must scan a QR code and log in to an unfamiliar PC, our service eliminates this hassle.",
        src: "/whatsapp.png",
    },
    {
        message: "Secure & Private",
        content:
            "Your WhatsApp credentials remain untouched. You don’t have to risk exposing personal chats or account details on someone else's device.",
        src: "/secure.png",
    },
    {
        message: "Seamless Email Authentication",
        content:
            "Simply log in with your email, enter the recipient’s WhatsApp number, and send messages or files effortlessly.",
        src: "/email.png",
    },
    {
        message: "Send Messages from Any Device",
        content:
            "Whether you’re using a work computer, public PC, or mobile phone, you can send WhatsApp messages without needing access to your WhatsApp account.",
        src: "/device.png",
    },
    {
        message: "Send Text, Media & Files",
        content:
            "Not just text messages—attach images, documents, and more without logging into WhatsApp.",
        src: "/files.png",
    },
    {
        message: "Time-Saving & Hassle-Free",
        content:
            "No need to log in and out of different WhatsApp accounts. Just enter your details and let our platform handle the rest.",
        src: "/hassle.png",
    },
];
export default function Home() {
    return (
        <div className="px-16">
            {/* hero section */}
            <div className="p-6">
                <Navbar />
                <div
                    className={` ${manrope.variable} bg-[#EDFCD1] heading text-5xl  grid grid-cols-2 gap-10`}
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
                                    Just enter the number and message and click
                                    send
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
                            src={"/demo.png"}
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

            {/* demo video */}
            {/* <div className="p-10 flex justify-center">
                <div className="h-[80vh] w-[80vw] border-[10px] rounded-lg border-[#A6F31A]">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/-oOoTIuoL8M?si=THRpnycXG3wBqQWs&amp;controls=0"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>
            </div> */}

            <div className="px-10 pb-">
                <Heading message="Features" className="text-4xl pb-10" />
                <div className="grid grid-cols-2 gap-10 h-full">
                    {features.map((feature, index) => (
                        <FeatureCards key={index} {...feature} />
                    ))}
                </div>
            </div>

            {/* steps */}

            <div className="px-10  ">
                <Steps />
            </div>
            <div className="px-10 pt-20">
                {/* <ChatUI /> */}
                <ScrollTriggered />
            </div>
        </div>
    );
}
