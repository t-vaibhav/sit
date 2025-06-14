"use client";
import Heading from "@/components/Heading";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react"; // Import Eye and EyeOff icons from lucide-react

import { toast } from "sonner"; // Import toast from sonner
import PastelButton from "@/components/PastelButton";
import Image from "next/image";

// OPTION 1: Set withCredentials globally for all axios requests
// This is often done in a separate file, like a utility or an entry point like layout.tsx or _app.tsx
// if you want it to apply to all axios calls in your application.
// import axios from "axios";
// axios.defaults.withCredentials = true;

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z
        .string()
        .min(4, { message: "Password must be at least 4 characters." })
        .max(50, { message: "Password must not exceed 50 characters." }),
});

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    // --- Add new state for password visibility ---
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);

        try {
            const loginPromise = axios.post(
                "/api/user/login", // Your login API endpoint
                {
                    email: values.email,
                    password: values.password,
                },
                {
                    withCredentials: true,
                }
            );

            toast.promise(loginPromise, {
                loading: "Logging in...",
                success: (response) => {
                    console.log("Login successful:", response.data);

                    setTimeout(() => {
                        router.push("/app/home"); // Redirect to dashboard or home page after login
                        return;
                    }, 100);

                    return "Login successful!";
                },
                error: (err) => {
                    console.error("Login failed:", err);
                    return (
                        err.response?.data?.message ||
                        "Login failed. Please try again"
                    );
                },
            });
        } catch (err) {
            console.error("Unexpected error during login process setup:", err);
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    // --- New function to toggle password visibility ---
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="sm:p-8 p-5 md:p-10 flex items-center min-h-screen overflow-hidden">
            <div className="flex justify-center md:justify-around lg:gap-8 xl:gap-10 w-full">
                <motion.div
                    initial={{
                        transform: "translateX(-300px)",
                        opacity: 0,
                        scale: 0,
                    }}
                    animate={{
                        transform: "translateX(0px)",
                        opacity: 1,
                        scale: 1,
                    }}
                    transition={{ type: "spring" }}
                    className="lg:w-[40vw] md:w-[60vw] xl:w-[30vw] bg-[#CCFFE6] py-10 sm:py-20 sm:px-10 px-5 h-full border-2 border-black shadow-2xl"
                >
                    <Heading
                        message="Login"
                        className="text-3xl sm:text-4xl font-extrabold text-center pb-3 sm:pb-5"
                    />
                    <p className="text-base sm:text-lg text-center mb-8">
                        Welcome back! Please log in to your account.
                    </p>
                    <div className="pt-3">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-5 text-xl"
                            >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    className=" w-full bg-white   focus:outline-none shadow-none   focus:shadow-none focus-visible:ring-[0px] focus-visible:border-black border-2 border-black p-2 rounded-none h-10"
                                                    placeholder="Email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                {/* --- Modified Input for password visibility --- */}
                                                <div className="relative">
                                                    <Input
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        className="w-full bg-white focus:outline-none shadow-none rounded-none  focus:shadow-none focus-visible:ring-[0px] focus-visible:border-black border-2 border-black p-2 h-10 pr-10" // Add padding to the right for the icon
                                                        placeholder="Password"
                                                        {...field}
                                                    />
                                                    <button
                                                        type="button" // Important: set type="button" to prevent form submission
                                                        onClick={
                                                            togglePasswordVisibility
                                                        }
                                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                                                        aria-label={
                                                            showPassword
                                                                ? "Hide password"
                                                                : "Show password"
                                                        }
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="h-5 w-5 text-black cursor-pointer" />
                                                        ) : (
                                                            <Eye className="h-5 w-5 text-black cursor-pointer" />
                                                        )}
                                                    </button>
                                                </div>
                                                {/* --- End of Modified Input --- */}
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <PastelButton
                                    type="submit"
                                    message=""
                                    className=" w-full text-center bg-white border-2 h-10"
                                    wfull
                                    disabled={loading}
                                >
                                    {loading ? "Submitting..." : "Submit"}{" "}
                                </PastelButton>
                            </form>
                        </Form>
                        <div className="space-y-5 mt-5">
                            <div className="text-center ">
                                <p>
                                    Don&apos;t have an account?{" "}
                                    <Link
                                        href={"/auth/register"}
                                        className="hover:underline cursor-pointer hover:font-bold duration-200 ease-in-out"
                                    >
                                        Register
                                    </Link>
                                </p>
                                <p>
                                    <Link
                                        href={"/"}
                                        className="hover:underline cursor-pointer hover:font-bold duration-200 ease-in-out"
                                    >
                                        Return to landing page
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{
                        transform: "translateX(300px)",
                        opacity: 0,
                        scale: 0,
                    }}
                    animate={{
                        transform: "translateX(0px)",
                        opacity: 1,
                        scale: 1,
                    }}
                    transition={{ type: "spring" }}
                >
                    <Image
                        src={"/login.png"}
                        height={500}
                        width={500}
                        alt="login"
                        className="xl:scale-100 scale-75 lg:scale-90 md:block hidden"
                    />
                    {/* <Image
                        src={"/login.png"}
                        height={400}
                        width={400}
                        alt="login"
                        className="lg:block hidden"
                    /> */}
                    {/* <Image
                        src={"/login.png"}
                        height={500}
                        width={500}
                        alt="login"
                        className="md:block hidden"
                    /> */}
                </motion.div>
            </div>
        </div>
    );
}
