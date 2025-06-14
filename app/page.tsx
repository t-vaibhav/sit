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
            <div className="2xl:px-16 xl:px-12 lg:px-5  sm:pt-5 pt-8">
                {/* hero section */}
                <div className=" px-5 lg:px-0 md:min-h-screen flex flex-col items-center md:justify-start">
                    <Navbar />
                    <div
                        className={` ${manrope.variable}  sm:pt-0 md:pt-0 bg-[#FFFFCC] heading text-5xl  flex flex-col-reverse md:grid  lg:grid-cols-2 md:grid-cols-5 md:gap-10`}
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
                            className="lg:col-span-1 col-span-3"
                        >
                            <div className=" pt-5 lg:pt-10 xl:pt-20 px-0 lg:px-10">
                                <Heading
                                    message="Welcome!"
                                    className="text-lg py-2"
                                />
                                <Heading
                                    message="Effortlessly send messages to WhatsApp"
                                    className=" font-semibold heading text-3xl lg:text-4xl xl:text-5xl md:py-6 py-3 "
                                />
                                {/* <Heading
                                    message=""
                                    className="font- text-lg md:text-xl py-2"
                                    className="font- text-lg md:text-xl py-2"
                                /> */}
                                <h3 className="font- text-lg md:text-xl py-2">
                                    Out tool allows you to send messages to
                                    WhatsApp without logging in to your WhatsApp
                                    account
                                </h3>
                                <div className="grid grid-cols-2 gap-5 py-4">
                                    <div>
                                        <h3 className="font-medium text-lg md:text-2xl pb-1">
                                            Quick sharing
                                        </h3>
                                        <h6
                                            className={`font-normal text-base      `}
                                        >
                                            Just enter the number and message
                                            and click send
                                        </h6>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-lg md:text-2xl pb-1">
                                            No number required
                                        </h3>
                                        <h6
                                            className={`font-normal text-base      `}
                                        >
                                            Just login with your email and start
                                            sending
                                        </h6>
                                    </div>
                                </div>
                                <div className="pt-10 lg:pt-6 text-xl">
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
                            className="flex lg:col-span-1 col-span-2 h-full w-full justify-center "
                        >
                            <Image
                                src={"/cover.png"}
                                height={600}
                                width={600}
                                alt="cover"
                                className="xl:block hidden object-cover"
                                style={{ objectFit: "contain" }}
                            />
                            <Image
                                src={"/cover.png"}
                                height={400}
                                width={400}
                                alt="cover"
                                className="md:block xl:hidden hidden object-cover"
                                style={{ objectFit: "contain" }}
                            />
                        </motion.div>
                    </div>
                </div>

                <div className="px-5 md:px-10">
                    <Heading
                        message="How It Works - A Simple Fix to a Big Problem "
                        className="text-3xl md:text-4xl text-start pt-10 sm:mb-5 mb-10"
                    />
                    <ScrollTriggered />
                </div>

                <div className="px-5 md:px-10sm:pt-0 pt-10 pb-10">
                    <Heading
                        message="Features"
                        className="text-3xl md:text-4xl pb-10 md:pb-10 lg:pb-20"
                    />
                    <div className="grid md:grid-cols-2 gap-10 lg:gap-16 h-full">
                        {features.map((feature, index) => (
                            <FeatureCards key={index} {...feature} />
                        ))}
                    </div>
                </div>
                {/* steps */}

                <div className="px-5 md:px-10  ">
                    <Heading
                        message="Start in simple steps"
                        className="text-3xl md:text-4xl font-extrabold pt-16"
                    />
                    <Steps />
                </div>

                {/* demo video */}
                <div className="px-5 md:px-10">
                    <Heading
                        message="Demo Video"
                        className="text-3xl md:text-4xl py-10   "
                    />
                    <div className="md:p-10 flex justify-center">
                        <div className=" w-[100vw] h-[40vh] sm:h-[60vh] md:h-[80vh] md:w-[80vw] border-4  md:border-[10px] rounded-lg border-[#CCCCFF]">
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
                    <div className="mx-5 md:mx-10 p-3 md:p-10 bg-[#FFCCE6] border-2 border-black mb-10 mt-24 flex justify-center items-center ">
                        <Heading
                            message="So what are you waiting for??"
                            className="text-2xl text-center md:text-3xl   lg:text-4xl xl:text-5xl "
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
            <div className="h-8 mt-32  border-t-2 border-t-black flex justify-between items-center md:px-16 px-5 bg-[#CCCCFF] text-xs sm:text-sm md:text-lg">
                <div>Designed and Developed by Vaibhav tiwari</div>
                <div className="flex space-x-5">
                    <Link
                        href={
                            "https://www.linkedin.com/in/vaibhav-tiwari-91880325a/"
                        }
                        target="_blank"
                    >
                        <BsLinkedin />
                    </Link>

                    <Link href={"https://x.com/Paipup"} target="_blank">
                        <BsTwitterX />
                    </Link>
                </div>
            </div>{" "}
        </div>
    );
}
