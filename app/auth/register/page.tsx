"use client";
import Heading from "@/components/Heading";
import PastelButton from "@/components/PastelButton";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) {
            e.preventDefault();
        }
        setError("");
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/user/register",
                {
                    name: formData.fullName,
                    email: formData.email,
                    phone: formData.phoneNumber,
                    password: formData.password,
                    password_confirmation: formData.password,
                }
            );

            if (response.data) {
                // Registration successful
                router.push("/auth/login");
            }
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                    "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

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
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 text-base w-full mb-10"
                >
                    <input
                        className="w-full bg-white focus:outline-none shadow-none border-2 border-black p-2 rounded-none"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        required
                    />
                    <input
                        className="w-full bg-white focus:outline-none shadow-none border-2 border-black p-2 rounded-none"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                    <input
                        className="w-full bg-white focus:outline-none shadow-none border-2 border-black p-2 rounded-none"
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        required
                    />
                    <input
                        className="w-full bg-white focus:outline-none shadow-none border-2 border-black p-2 rounded-none"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                    <input
                        className="w-full bg-white focus:outline-none shadow-none border-2 border-black p-2 rounded-none"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        required
                    />
                    <PastelButton
                        message={loading ? "Registering..." : "Register"}
                        className="w-full text-center bg-white border-2"
                        wfull
                        onClick={handleSubmit}
                    />
                </form>
                <div className="space-y-5">
                    {/* <div className="h-full bg-white w-full cursor-pointer border-2 border-black px-4 py-2  flex items-center text-base justify-center space-x-2 ">
                        <BsGoogle />
                        <p>Continue with Google</p>
                    </div> */}

                    {/* <div className="h-full w-full bg-white cursor-pointer border-2 border-black px-4 py-2  flex items-center text-base justify-center space-x-2">
                        <BsGithub />
                        <p>Login with Github</p>
                    </div> */}
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
