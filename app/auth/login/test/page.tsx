"use client";
import Heading from "@/components/Heading";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

import { toast } from "sonner"; // Import toast from sonner

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

export default function RegisterPage() {
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
                "http://localhost:5000/api/user/login", // Your login API endpoint
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
                        router.push("/dashboard"); // Redirect to dashboard or home page after login
                    }, 1000);

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
        <div className="p-10 flex items-center justify-center">
            <div className="w-[30vw] bg-pink-200 p-10 h-full border-2 border-black shadow-2xl">
                <Heading
                    message="Login"
                    className="text-4xl font-extrabold text-center py-5"
                />
                <p className="text-lg text-center mb-8">
                    Access your account to get started!
                </p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            className="w-full bg-white focus:outline-none focus:shadow-none focus-visible:ring-[0px] focus-visible:border-black border-2 border-black p-2 rounded-none"
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
                                            className="w-full bg-white focus:outline-none focus:shadow-none focus-visible:ring-[0px] focus-visible:border-black border-2 border-black p-2 rounded-none"
                                            placeholder="Password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full rounded-none cursor-pointer"
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit"}{" "}
                            {/* Added loading text */}
                        </Button>
                    </form>
                </Form>
                <div className="space-y-5 mt-5">
                    <div className="text-center space-y-3">
                        <p>
                            Don't have an account?{" "}
                            <Link
                                href={"/auth/register"}
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
