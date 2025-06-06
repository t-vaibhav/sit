"use client";
import Image from "next/image";
import { Manrope } from "next/font/google";
import PastelButton from "@/components/PastelButton";
import Heading from "@/components/Heading";
import Navbar from "@/components/Navbar";
import FeatureCards from "@/components/FeatureCards";
import Steps from "@/components/Steps";
// import ChatUI from "@/components/ChatUI";
import ScrollTriggered from "./demo/page";
import { BsLinkedin, BsTwitterX } from "react-icons/bs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
});
import { motion } from "motion/react";
import { BiDevices } from "react-icons/bi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { LuFileSliders } from "react-icons/lu";
import { MdAccessTime } from "react-icons/md";
import { ImWhatsapp } from "react-icons/im";

const features = [
    {
        message: "No Need for WhatsApp Web",
        content:
            "Unlike traditional methods where you must scan a QR code and log in to an unfamiliar PC, our service eliminates this hassle.",
        icon: <ImWhatsapp className="text-7xl" />,
    },
    {
        message: "Secure & Private",
        content:
            "Your WhatsApp credentials remain untouched. You don't have to risk exposing personal chats or account details on someone else's device.",
        icon: <RiSecurePaymentLine className="text-7xl" />,
    },
    {
        message: "Seamless Email Authentication",
        content:
            "Simply log in with your email, enter the recipient's WhatsApp number, and send messages or files effortlessly.",
        icon: <HiOutlineMail className="text-7xl" />,
    },
    {
        message: "Send Messages from Any Device",
        content:
            "Whether you're using a work computer, public PC, or mobile phone, you can send WhatsApp messages without needing access to your WhatsApp account.",
        icon: <BiDevices className="text-7xl" />,
    },
    {
        message: "Send Text, Media & Files",
        content:
            "Not just text messages—attach images, documents, and more without logging into WhatsApp.",
        icon: <LuFileSliders className="text-7xl" />,
    },
    {
        message: "Time-Saving & Hassle-Free",
        content:
            "No need to log in and out of different WhatsApp accounts. Just enter your details and let our platform handle the rest.",
        icon: <MdAccessTime className="text-7xl" />,
    },
];
function LoadingSpinner() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFFCC]">
            <div className="loader"></div>
        </div>
    );
}
export default function Home() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const checkAuth = () => {
            const authCookie = Cookies.get("is_auth");
            const authenticated = authCookie === "true";
            if (authenticated) {
                router.push("/app/home");
                return;
            }
            setIsLoading(false);
        };

        checkAuth();
    });
    if (isLoading) {
        return <LoadingSpinner />;
    }
    return (
        <div>
            <div className="px-16">
                {/* hero section */}
                <div className="p-6">
                    <Navbar />
                    <div
                        className={` ${manrope.variable} bg-[#FFFFCC] heading text-5xl  grid grid-cols-2 gap-10`}
                    >
                        <motion.div
                            initial={{
                                y: 0,
                                opacity: 0,
                            }}
                            whileInView={{
                                y: 0,
                                opacity: 1,
                            }}
                            transition={{
                                duration: 0.4,
                                delay: 0.2,
                                type: "string",
                            }}
                        >
                            <div className="py-20 px-10">
                                <Heading
                                    message="Connect"
                                    className="text-lg py-2"
                                />
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
                                        <h6
                                            className={`font-normal text-base       `}
                                        >
                                            Just enter the number and message
                                            and click send
                                        </h6>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-2xl pb-1">
                                            No Number reuired
                                        </h3>
                                        <h6
                                            className={`font-normal text-base       `}
                                        >
                                            Just login with you email and start
                                            sending
                                        </h6>
                                    </div>
                                </div>
                                <div className="pt-6 text-xl">
                                    <Link href={"/auth/register"}>
                                        <PastelButton
                                            message="Start sending"
                                            className="font-light "
                                        />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{
                                y: 0,
                                opacity: 0,
                            }}
                            whileInView={{
                                y: 0,
                                opacity: 1,
                            }}
                            transition={{
                                duration: 0.4,
                                delay: 0.2,
                                type: "string",
                            }}
                            // initial={{ y: 100, opacity: 0, scale: 0.5 }}
                            // whileInView={{ y: 0, opacity: 1, scale: 1 }}
                            // transition={{ duration: 0.4, delay: 0.2 }}
                            // whileInView={{ opacity: 1, scale: 1 }}
                            // viewport={}

                            // animate = {
                            // }
                            className="flex  h-full w-full justify-center duration00"
                        >
                            {/* <div className="h-full w-full"> */}
                            <Image
                                src={"/cover.png"}
                                height={600}
                                width={600}
                                alt="cover"
                                className=" object-contain"
                                style={{ objectFit: "contain" }}
                            />
                            {/* </div> */}
                        </motion.div>
                    </div>
                </div>

                <div className="px-10">
                    <Heading
                        message="How It Works - A Simple Fix to a Big Problem "
                        className="text-4xl text-start pt-10"
                    />
                    <ScrollTriggered />
                </div>

                <div className="px-10 pb-10">
                    <Heading message="Features" className="text-4xl pb-20" />
                    <div className="grid grid-cols-2 gap-16 h-full">
                        {features.map((feature, index) => (
                            <FeatureCards key={index} {...feature} />
                        ))}
                    </div>
                </div>
                {/* steps */}

                <div className="px-10  ">
                    <Heading
                        message="Start in simple steps:"
                        className="text-4xl font-extrabold pt-16"
                    />
                    <Steps />
                </div>

                {/* demo video */}
                <div className="px-10">
                    <Heading
                        message="Demo Video: "
                        className="text-4xl py-10   "
                    />
                    <div className="p-10 flex justify-center">
                        <div className="h-[80vh] w-[80vw] border-[10px] rounded-lg border-[#A6F31A]">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/-oOoTIuoL8M?rel=0&modestbranding=1&controls=1&autohide=1"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{
                        y: 0,
                        opacity: 0,
                        scaleY: 0,
                    }}
                    whileInView={{
                        y: 0,
                        opacity: 1,
                        scaleY: 1,
                    }}
                    transition={{
                        duration: 0.3,
                    }}
                >
                    <div className="mx-10  p-10 bg-[#FFCCE6] border-2 border-black mb-10 mt-24 flex justify-center items-center ">
                        <Heading
                            message="So what are you waiting for??"
                            className="text-5xl "
                        />
                    </div>

                    <div className="flex justify-center items-center w-full">
                        <Link href={"/auth/register"}>
                            <PastelButton
                                message="Start sending"
                                className="font-light "
                            />
                        </Link>
                    </div>
                </motion.div>
            </div>
            <div className="h-8 mt-32 bg-[#F] border-t-2 border-t-black flex justify-between items-center px-16">
                <div>Designed and Developed by Vaibhav tiwari</div>
                <div className="flex space-x-5">
                    <BsLinkedin />
                    <BsTwitterX />
                </div>
            </div>{" "}
        </div>
    );
}
