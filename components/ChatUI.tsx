import React from "react";
import Heading from "./Heading";
import PastelButton from "./PastelButton";
import Image from "next/image";

const ChatUI = () => {
    return (
        <div className=" mx-auto text-center">
            <Heading
                message="How It Works - A Simple Fix to a Big Problem "
                className="text-4xl text-start pb-16"
            />

            <div className="grid space-y-16">
                <div className="grid grid-cols-5 gap-5 bg-[#FCD1EF] p-10 border-2 border-black">
                    <div className="col-span-3">
                        <Heading
                            message="Problem: "
                            className="text-3xl pb-2 text-start"
                        />
                        <div className="space-y-6 text-start text-xl font-semibold pt-10">
                            <p>
                                Your phone is dead, and you can&apos;t scan the
                                QR code. ❌
                            </p>
                            <p>
                                You&apos;re using a public computer and
                                don&apos;t want to log into WhatsApp. ❌
                            </p>
                            <p>
                                You have to log in and out multiple times for
                                different numbers. ❌
                            </p>
                        </div>
                    </div>
                    <div className="col-span-2 flex justify-center items-center">
                        <Image
                            src={"/frustated.png"}
                            height={250}
                            width={250}
                            alt="user"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-5 bg-[#FCD1EF] p-10 border-2 border-black">
                    <div className="col-span-3">
                        <Heading
                            message="Solution: "
                            className="text-3xl pb-2 text-start"
                        />
                        <div className="space-y-6 text-start text-xl font-semibold pt-10">
                            <p>
                                Log in with your email and send messages
                                instantly. ✅
                            </p>
                            <p>No WhatsApp login needed. Stay secure. ✅</p>
                            <p>
                                Just enter the number and send. No extra steps.
                                ✅
                            </p>
                        </div>
                    </div>
                    <div className="col-span-2 flex justify-center">
                        <Image
                            src={"/happy.png"}
                            height={250}
                            width={250}
                            alt="user"
                        />
                    </div>
                </div>
            </div>
            <div>
                <Heading
                    message="Too easy to be real? Try it and see the magic happen!"
                    className="pt-20 text-5xl font-extrabold"
                />
            </div>
            <div className="mt-10">
                <PastelButton message="Let's Go" className="" />
            </div>
        </div>
    );
};

export default ChatUI;
{
    /* <Heading
message="Before: "
className="text-2xl pb-10 text-start"
/>
<div className="space-y-6 text-start p-10 bg-pink-200 border border-black">
<p>
    Your phone is dead, and you can't scan the QR
    code.✅
</p>
<p>
    You're using a public computer and don't want to log
    into WhatsApp.✅
</p>
<p>
    You have to log in and out multiple times for
    different numbers.✅
</p>
</div> */
}
