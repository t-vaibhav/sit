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
// import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

import { toast } from "sonner";
import PastelButton from "@/components/PastelButton";

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    otp: z.string().length(4, { message: "OTP must be 4 digits" }).optional(), // Make OTP optional initially
});

export default function VerifyEmailPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [sendingOTP, setSendingOTP] = useState(false); // Controls OTP input visibility

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            otp: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);

        try {
            const registrationPromise = axios.post("/api/user/verify-email", {
                email: values.email,
                otp: values.otp,
            });

            toast.promise(registrationPromise, {
                loading: "Verifying your email...",
                success: () => {
                    setTimeout(() => {
                        router.push("/auth/login");
                    }, 1000);
                    return "Verification successful!";
                },
                error: (err) => {
                    console.error("Verification failed:", err);
                    return (
                        err.response?.data?.message ||
                        "Verification failed. Please try again."
                    );
                },
            });
        } catch (err) {
            console.error(
                "Unexpected error during registration process setup:",
                err
            );
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function handleSendOTP() {
        // Validate only the email field before sending OTP
        const isValid = await form.trigger("email");
        if (!isValid) {
            return;
        }

        setLoading(true); // Use a single loading state for both actions

        try {
            const emailValue = form.getValues("email"); // Get the current email value
            const otpSendPromise = axios.post("/api/user/send-otp", {
                email: emailValue,
            });

            toast.promise(otpSendPromise, {
                loading: "Sending OTP to your email...",
                success: () => {
                    setSendingOTP(true); // Show OTP input after successful send
                    return "OTP sent successfully!";
                },
                error: (err) => {
                    console.error("Failed to send OTP:", err);
                    return err.response?.data?.message || "Please try again.";
                },
            });
        } catch (err) {
            console.error(
                "Unexpected error during OTP send process setup:",
                err
            );
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-10 flex items-center justify-center">
            <motion.div
                initial={{
                    transform: "translateY(300px)",
                    opacity: 0,
                    scale: 0,
                }}
                animate={{
                    transform: "translateY(0px)",
                    opacity: 1,
                    scale: 1,
                }}
                transition={{ type: "spring" }}
                className="w-[30vw] bg-[#CCFFE6] p-10 h-full border-2 border-black shadow-2xl"
            >
                <Heading
                    message="Verify your email"
                    className="text-4xl font-extrabold text-center py-5"
                />
                <p className="text-lg text-center mb-8">
                    {sendingOTP
                        ? "Please enter the OTP sent to your E-mail"
                        : "Enter your email to receive OTP"}
                </p>
                <Form {...form}>
                    <form
                        onSubmit={
                            sendingOTP
                                ? form.handleSubmit(onSubmit)
                                : handleSendOTP
                        } // Conditionally handle form submission
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
                                            placeholder="Enter your email"
                                            {...field}
                                            disabled={sendingOTP} // Disable email input after OTP is sent
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {!sendingOTP && (
                            <PastelButton
                                type="button" // Change to type="button" to prevent form submission
                                onClick={handleSendOTP}
                                className="w-full text-center bg-white border-2 h-10"
                                disabled={loading}
                                wfull
                            >
                                {loading ? "Sending OTP..." : "Send OTP"}
                            </PastelButton>
                        )}
                        {sendingOTP && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="otp"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <InputOTP
                                                    maxLength={4}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    className="gap-2"
                                                >
                                                    <InputOTPGroup className="gap-2 w-full">
                                                        <InputOTPSlot
                                                            index={0}
                                                            className="w-full bg-white focus:outline-none focus:shadow-none focus-visible:ring-[0px] focus-visible:border-black border-2 border-black p-2 rounded-none data-[active=true]:border-2 data-[active=true]:border-black  data-[active=true]:ring-1/2"
                                                        />
                                                        <InputOTPSlot
                                                            index={1}
                                                            className="w-full bg-white focus:outline-none focus:shadow-none focus-visible:ring-[0px] focus-visible:border-black border-2 border-black p-2 rounded-none data-[active=true]:border-2 data-[active=true]:border-black  data-[active=true]:ring-1/2"
                                                        />
                                                        <InputOTPSlot
                                                            index={2}
                                                            className="w-full bg-white focus:outline-none focus:shadow-none focus-visible:ring-[0px] focus-visible:border-black border-2 border-black p-2 rounded-none data-[active=true]:border-2 data-[active=true]:border-black  data-[active=true]:ring-1/2"
                                                        />
                                                        <InputOTPSlot
                                                            index={3}
                                                            className="w-full bg-white focus:outline-none focus:shadow-none focus-visible:ring-[0px] focus-visible:border-black border-2 border-black p-2 rounded-none data-[active=true]:border-2 data-[active=true]:border-black  data-[active=true]:ring-1/2"
                                                        />
                                                    </InputOTPGroup>
                                                </InputOTP>
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
                                    {loading ? "Verifying..." : "Verify Email"}
                                </PastelButton>
                            </>
                        )}
                    </form>
                </Form>
                <div className="space-y-5 mt-5">
                    <div className="text-center space-y-3">
                        <p>
                            Already Verified?{" "}
                            <Link
                                href={"/auth/login"}
                                className="hover:underline cursor-pointer"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
