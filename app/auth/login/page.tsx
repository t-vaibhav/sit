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
            // OPTION 2: Set withCredentials directly on the axios.post call (recommended for this specific use case if not setting globally)
            const loginPromise = axios.post(
                "/api/user/login", // Your login API endpoint
                {
                    email: values.email,
                    password: values.password,
                },
                {
                    withCredentials: true, // <--- Add this line here
                }
            );

            toast.promise(loginPromise, {
                loading: "Logging in...",
                success: (response) => {
                    console.log("Login successful:", response.data);
                    // If your backend sets a cookie (e.g., JWT in an HttpOnly cookie),
                    // the browser will automatically handle it due to `withCredentials: true`.
                    // You typically don't access the cookie directly on the frontend.
                    // You might get user details from response.data if your API returns them.

                    setTimeout(() => {
                        router.push("/app/home"); // Redirect to dashboard or home page after login
                        return;
                    }, 100);

                    return "Login successful!";
                },
                error: (err) => {
                    console.error("Login failed:", err);
                    // Check if err.response exists before accessing its properties
                    return (
                        err.response?.data?.message ||
                        "Login failed. Please check your credentials."
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

    return (
        <div className="p-10 flex items-center min-h-screen overflow-hidden">
            <div className="flex justify-around gap-10 w-full">
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
                    className="w-[30vw] bg-[#CCFFE6] py-20 px-10 h-full border-2 border-black shadow-2xl"
                >
                    <Heading
                        message="Login"
                        className="text-4xl font-extrabold text-center pb-3"
                    />
                    <p className="text-lg text-center mb-8">
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
                                                    className=" w-full bg-white   focus:outline-none shadow-none  rounded-nonefocus:outline-none focus:shadow-none focus-visible:ring-[0px] focus-visible:border-black border-2 border-black p-2 rounded-none h-10"
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
                                                <Input
                                                    type="password"
                                                    className=" w-full bg-white   focus:outline-none shadow-none  rounded-nonefocus:outline-none focus:shadow-none focus-visible:ring-[0px] focus-visible:border-black border-2 border-black p-2 rounded-none h-10"
                                                    placeholder="Password"
                                                    {...field}
                                                />
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
                                {/* Added loading text */}
                            </form>
                        </Form>
                        <div className="space-y-5 mt-5">
                            <div className="text-center space-y-3">
                                <p>
                                    Don&apos;t have an account?{" "}
                                    <Link
                                        href={"/auth/register"}
                                        className="hover:underline cursor-pointer hover:font-bold duration-200 ease-in-out"
                                    >
                                        Register
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
                    />
                </motion.div>
            </div>
        </div>
    );
}
