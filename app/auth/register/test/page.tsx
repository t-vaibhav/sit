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

const formSchema = z
    .object({
        name: z
            .string()
            .min(2, { message: "Name must be at least 2 characters." })
            .max(50, { message: "Name must not exceed 50 characters." }),
        email: z.string().email({ message: "Invalid email address." }),
        password: z
            .string()
            .min(4, { message: "Password must be at least 4 characters." })
            .max(50, { message: "Password must not exceed 50 characters." }),
        confirmPassword: z
            .string()
            .min(4, {
                message: "Confirm password must be at least 4 characters.",
            })
            .max(50, {
                message: "Confirm password must not exceed 50 characters.",
            }),
        phoneNumber: z
            .string()
            .min(10, { message: "Phone number must be at least 10 digits." })
            .max(15, { message: "Phone number must not exceed 15 digits." }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);

        try {
            const registrationPromise = axios.post(
                "http://localhost:5000/api/user/register",
                {
                    name: values.name,
                    email: values.email,
                    phone: values.phoneNumber,
                    password: values.password,
                    password_confirmation: values.confirmPassword,
                }
            );

            // Use toast.promise directly. The await inside the try block for
            // registrationPromise is no longer needed after this, as sonner
            // handles the promise resolution/rejection internally for its states.
            toast.promise(registrationPromise, {
                // Await the toast.promise call itself
                loading: "Creating your account...",
                success: (response) => {
                    // 'response' here is the resolved value from axios.post
                    // Navigate after the toast shows, or immediately after success if you prefer
                    setTimeout(() => {
                        router.push("/auth/verify-email");
                    }, 1000); // Give the toast a moment to be visible

                    return "Registration successful!";
                },
                error: (err) => {
                    // Log the full error to the console for debugging
                    console.error("Registration failed:", err);
                    return (
                        err.response?.data?.message ||
                        "Registration failed. Please try again."
                    );
                },
            });

            // No need for a separate await registrationPromise; here because toast.promise
            // already handles the promise resolution and updates its state.
            // If you *must* access the resolved data here for further logic,
            // you'd typically await registrationPromise *before* toast.promise,
            // or handle it within the success callback.
            // For now, removing it simplifies the flow with sonner.
        } catch (err) {
            // This catch block will only execute for errors that occur *before*
            // the promise is even initiated or if `toast.promise` itself throws
            // an unexpected synchronous error (very rare).
            // Axios errors are handled by sonner's error callback.
            console.error(
                "Unexpected error during registration process setup:",
                err
            );
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-10 flex items-center justify-center">
            <div className="w-[30vw] bg-pink-200 p-10 h-full border-2 border-black shadow-2xl">
                <Heading
                    message="Register"
                    className="text-4xl font-extrabold text-center py-5"
                />
                <p className="text-lg text-center mb-8">
                    Enter your details to get started
                </p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            className="w-full bg-white focus:outline-none focus:shadow-none focus-visible:ring-[0px] focus-visible:border-black border-2 border-black p-2 rounded-none"
                                            placeholder="Enter your Full Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            className="w-full bg-white focus:outline-none focus:shadow-none focus-visible:ring-[0px] focus-visible:border-black border-2 border-black p-2 rounded-none"
                                            placeholder="Phone Number"
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
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            className="w-full bg-white focus:outline-none focus:shadow-none focus-visible:ring-[0px] focus-visible:border-black border-2 border-black p-2 rounded-none"
                                            placeholder="Confirm Password"
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
                            {loading ? "Registering..." : "Submit"}
                        </Button>
                    </form>
                </Form>
                <div className="space-y-5 mt-5">
                    <div className="text-center space-y-3">
                        <p>
                            Already have an account?{" "}
                            <Link
                                href={"/auth/login"}
                                className="hover:underline cursor-pointer"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
