import Heading from "@/components/Heading";
import PastelButton from "@/components/PastelButton";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";

export default function page() {
    return (
        <div className="p-10 flex items-center justify-center">
            <div className=" w-[30vw] bg-pink-200 p-10 h-full border-2 border-black shadow-2xl">
                <Heading
                    message="Login"
                    className="text-4xl font-extrabold text-center py-5"
                />
                <p className="text-lg text-center mb-8">
                    Access you account to get started!
                </p>
                <div className="space-y-5 text-base w-full mb-10">
                    <input
                        className="w-full bg-white   focus:outline-none shadow-none border-2 border-black p-2 rounded-none"
                        type="text"
                        name=""
                        id=""
                        placeholder="Email"
                    />
                    <input
                        className="w-full bg-white focus:outline-none shadow-none border-2 border-black p-2 rounded-none"
                        type="text"
                        name=""
                        id=""
                        placeholder="Password"
                    />
                    <PastelButton
                        message="Login"
                        className="w-full text-center bg-white border-2"
                        wfull
                    />
                </div>
                <div className="space-y-5">
                    <div className="h-full bg-white w-full cursor-pointer border-2 border-black px-4 py-2  flex items-center text-base justify-center space-x-2 ">
                        <BsGoogle />
                        <p>Login with Google</p>
                    </div>

                    <div className="h-full w-full bg-white cursor-pointer border-2 border-black px-4 py-2  flex items-center text-base justify-center space-x-2">
                        <BsGithub />
                        <p>Login with Github</p>
                    </div>
                    <div className="text-center space-y-3">
                        <p className="hover:underline cursor-pointer">
                            Forgot your Password?
                        </p>
                        <p>
                            Don't have an account?{" "}
                            <Link
                                href={"auth//register"}
                                className="hover:underline cursor-pointer"
                            >
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
