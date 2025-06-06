/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { Manrope } from "next/font/google";
import Heading from "@/components/Heading";
import Image from "next/image";
import { Loader2, PlusCircle, XCircle } from "lucide-react";
import { BsTrash } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { easeInOut, motion } from "motion/react";

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

import { toast } from "sonner";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import PastelButton from "@/components/PastelButton";

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
});

const favouriteFormSchema = z.object({
    name: z.string().min(1, { message: "Name must be at least 1 character" }),
    number: z
        .string()
        .min(4, { message: "Number must be at least 4 characters." })
        .max(15, { message: "Number must not exceed 15 characters." }),
});

// Define the Favourite component to accept props
const Favourite = ({ name, number, id, onDelete, onEdit }: any) => {
    const [editOpen, setEditOpen] = useState(false);

    // Form for editing (scoped to each Favourite component)
    const editForm = useForm<z.infer<typeof favouriteFormSchema>>({
        resolver: zodResolver(favouriteFormSchema),
        defaultValues: {
            name: name,
            number: number,
        },
    });

    // Reset form values when the dialog opens (if the favorite data changes)
    useEffect(() => {
        if (editOpen) {
            editForm.reset({ name: name, number: number });
        }
    }, [editOpen, name, number, editForm]);

    return (
        <div className="flex justify-between gap-5 bg-[#CCFFE6] px-5 p-3 border border-black">
            <Link href={`/app/send/?number=${number}`} className="flex-1">
                <div className="flex-1 flex gap-5">
                    <Image
                        src={"/user.png"}
                        height={50}
                        width={50}
                        alt={name}
                        className="rounded-full border border-black"
                    />
                    <div>
                        <h3 className="font-medium text-xl pb-1">{name}</h3>
                        <h6 className={`font-normal text-base`}>{number}</h6>
                    </div>
                </div>
            </Link>
            <div className="flex gap-5 items-center ">
                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                    <DialogTrigger asChild>
                        <MdOutlineEdit className="scale-110 hover:scale-150 transition-all duration-200 ease-in-out cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent className="border-2 border-black rounded-none bg-[#FFFFCC]">
                        <DialogTitle className="mb-5">
                            <Heading
                                message="Edit your favourite contact"
                                className="text-3xl text-black"
                            />
                        </DialogTitle>
                        <DialogDescription>
                            <div className="flex flex-col gap-5">
                                <Form {...editForm}>
                                    <form
                                        onSubmit={editForm.handleSubmit(
                                            (values) =>
                                                onEdit(
                                                    id,
                                                    values.name,
                                                    values.number,
                                                    setEditOpen
                                                )
                                        )}
                                        className="space-y-5"
                                    >
                                        <FormField
                                            control={editForm.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            className="text-black w-full bg-white   focus:outline-none shadow-none  rounded-nonefocus:outline-none focus:shadow-none focus-visible:ring-[0px] focus-visible:border-black border-2 border-black p-2 rounded-none h-10"
                                                            placeholder="Enter Name"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={editForm.control}
                                            name="number"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <PhoneInput
                                                            defaultCountry="in"
                                                            value={field.value}
                                                            onChange={
                                                                field.onChange
                                                            }
                                                            inputProps={{
                                                                className: `text-black w-full p-1 text-lg outline-none border bg-white`,
                                                                placeholder:
                                                                    "Enter your phone number",
                                                            }}
                                                            countrySelectorStyleProps={{
                                                                className: ` pl-0 pr-1 py-1 `,
                                                            }}
                                                            dialCodePreviewStyleProps={{
                                                                className: `text-lg p-1 bg-white `,
                                                            }}
                                                            className="flex w-full items-center"
                                                            inputClassName="w-full text-lg outline-none border-2 bg-white text-black"
                                                            disabled
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <PastelButton
                                            type="submit"
                                            message=""
                                            className=" w-full text-center bg-[#CCCCFF] text-black border-2 h-10"
                                            wfull
                                            // disabled={loading}
                                        >
                                            Save Changes
                                        </PastelButton>
                                    </form>
                                </Form>
                            </div>
                        </DialogDescription>
                    </DialogContent>
                </Dialog>
                <BsTrash
                    className="hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer hover:text-red-500 hover:font-semibold"
                    onClick={() => onDelete(number)}
                />
            </div>
        </div>
    );
};

export default function Home() {
    const [favourites, setFavourites] = useState([]);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchFavourites = () => {
        setLoading(true); // Ensure loading is true when fetch starts
        setError(null); // Clear any previous errors
        axios
            .get(
                process.env.NEXT_PUBLIC_BACKEND_HOST_URL + "/api/favourites/",
                {
                    withCredentials: true,
                }
            )
            .then((response) => {
                setFavourites(response.data.data.users);
            })
            .catch((error) => {
                // console.error("Error fetching favourites:", error);
                setError(
                    error.response?.data?.message ||
                        "Failed to fetch favourites. Please try again."
                );
                toast.error("Failed to fetch favourites. Please try again.");
            })
            .finally(() => {
                setLoading(false); // Ensure loading is false after fetch completes
            });
    };

    const deleteFavourites = async (number: string) => {
        try {
            const deletePromise = axios.delete(
                process.env.NEXT_PUBLIC_BACKEND_HOST_URL + "/api/favourites/",
                {
                    data: { number: number },
                    withCredentials: true,
                }
            );

            toast.promise(deletePromise, {
                loading: "Deleting favourite contact...",
                success: () => {
                    // console.log(
                    //     "Favourite contact deleted successfully:",
                    //     response.data
                    // );
                    fetchFavourites(); // Refetch to update the list
                    return "Favourite contact deleted successfully!";
                },
                error: (err) => {
                    // console.error("Failed to delete favourite contact:", err);
                    return (
                        err.response?.data?.message ||
                        "Failed to delete favourite contact. Please try again."
                    );
                },
            });
        } catch (error) {
            console.error(
                "Unexpected error during favourite deletion process setup:",
                error
            );
            toast.error("An unexpected error occurred. Please try again.");
        }
    };

    // New function to handle editing a favourite contact
    const editFavourite = async (
        id: string,
        name: string,
        number: string,
        setEditOpen: (open: boolean) => void
    ) => {
        try {
            const editPromise = axios.put(
                `process.env.NEXT_PUBLIC_BACKEND_HOST_URL/api/favourites/`, // Assuming your API uses ID for PUT
                {
                    name: name,
                    number: number,
                },
                {
                    withCredentials: true,
                }
            );

            toast.promise(editPromise, {
                loading: "Updating favourite contact...",
                success: () => {
                    // console.log(
                    //     "Favourite contact updated successfully:",
                    //     response.data
                    // );
                    fetchFavourites(); // Refetch to update the list
                    setEditOpen(false); // Close the dialog on success
                    return "Favourite contact updated successfully!";
                },
                error: (err) => {
                    // console.error("Failed to update favourite contact:", err);
                    return (
                        err.response?.data?.message ||
                        "Failed to update favourite contact. Please try again."
                    );
                },
            });
        } catch (error) {
            console.error(
                "Unexpected error during favourite update process setup:",
                error
            );
            toast.error("An unexpected error occurred. Please try again.");
        }
    };

    const LoadingSpinner = () => (
        <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="h-12 w-12 animate-spin text-gray-500" />
            <p className="mt-4 text-lg text-gray-600">Loading chats...</p>
        </div>
    );
    const ErrorDisplay = ({ message }: { message: string }) => (
        <div className="flex flex-col items-center justify-center h-full text-red-700">
            <XCircle className="h-8 w-8 text-red-500" />
            <p className="mt-4 text-xl font-semibold">Error:</p>
            <p className="text-center px-4 text-lg">{message}</p>
            <button
                onClick={fetchFavourites}
                className="mt-6 px-4 py-2 bg-red-500 text-white  cursor-pointer hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 "
            >
                Retry
            </button>
        </div>
    );

    useEffect(() => {
        fetchFavourites();
    }, []);

    const addForm = useForm<z.infer<typeof favouriteFormSchema>>({
        // Renamed from 'form' to 'addForm' for clarity
        resolver: zodResolver(favouriteFormSchema),
        defaultValues: {
            name: "",
            number: "",
        },
    });

    async function onSubmit(values: z.infer<typeof favouriteFormSchema>) {
        try {
            const addFavouritePromise = axios.post(
                process.env.NEXT_PUBLIC_BACKEND_HOST_URL + "/api/favourites/",
                {
                    name: values.name,
                    number: values.number,
                },
                {
                    withCredentials: true,
                }
            );

            toast.promise(addFavouritePromise, {
                loading: "Adding favourite contact...",
                success: (response) => {
                    console.log(
                        "Favourite contact added successfully:",
                        response.data
                    );
                    fetchFavourites();
                    addForm.reset();
                    setAddDialogOpen(false);
                    return "Favourite contact added successfully!";
                },
                error: (err) => {
                    // console.error("Failed to add favourite contact:", err);
                    return (
                        err.response?.data?.message ||
                        "Failed to add favourite contact. Please try again."
                    );
                },
            });
        } catch (err) {
            console.error(
                "Unexpected error during favourite addition process setup:",
                err
            );
            toast.error("An unexpected error occurred. Please try again.");
        }
    }

    return (
        <div className="p-6 text-black">
            <div
                className={` ${manrope.variable} bg-[#FFFFCC] heading text-lg pt-5 px-5 gap-10`}
            >
                <Heading
                    message="Your favourites"
                    className="text-4xl pb-8 space-y-5"
                />
                <div className="space-y-5">
                    {loading ? (
                        <LoadingSpinner />
                    ) : error ? (
                        <ErrorDisplay message={error} />
                    ) : favourites.length > 0 ? (
                        favourites.map((fav: any, index) => (
                            <>
                                <motion.div
                                    key={index}
                                    initial={{
                                        y: 30,
                                        opacity: 0,
                                        // scale: 0.7,
                                    }}
                                    whileInView={{
                                        y: 0,
                                        opacity: 1,
                                        // scale: 1,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        delay: index * 0.1,
                                        ease: easeInOut,
                                    }}
                                >
                                    <Favourite
                                        key={fav._id}
                                        name={fav.name}
                                        number={fav.number}
                                        id={fav._id}
                                        onDelete={deleteFavourites}
                                        onEdit={editFavourite} // Pass the edit function
                                    />
                                </motion.div>

                                <div className="flex justify-center items-center mt-10 ">
                                    <div className="flex items-center space-x-5 hover:cursor-pointer hover:bg- bg-[#CCCCFF] transition-all duration-200 ease-in-out px-3 py-2 border border-black">
                                        <Dialog
                                            open={addDialogOpen}
                                            onOpenChange={setAddDialogOpen}
                                        >
                                            <DialogTrigger className="flex items-center cursor-pointer bg-[#CCCCFF]">
                                                Add{" "}
                                                <PlusCircle className="ml-2 h-5 w-5" />
                                            </DialogTrigger>
                                            <DialogContent className="border-2 border-black rounded-none bg-[#FFFFCC]">
                                                <DialogTitle className="mb-5">
                                                    <Heading
                                                        message="Add your favourite contact"
                                                        className="text-3xl text-black"
                                                    />
                                                </DialogTitle>
                                                <DialogDescription>
                                                    <div className="flex flex-col gap-5">
                                                        <Form {...addForm}>
                                                            <form
                                                                onSubmit={addForm.handleSubmit(
                                                                    onSubmit
                                                                )}
                                                                className="space-y-5"
                                                            >
                                                                <FormField
                                                                    control={
                                                                        addForm.control
                                                                    }
                                                                    name="name"
                                                                    render={({
                                                                        field,
                                                                    }) => (
                                                                        <FormItem>
                                                                            <FormControl>
                                                                                <Input
                                                                                    className=" w-full bg-white   focus:outline-none shadow-none  rounded-nonefocus:outline-none focus:shadow-none focus-visible:ring-[0px] focus-visible:border-black border-2 border-black p-2 rounded-none h-10"
                                                                                    placeholder="Enter Name"
                                                                                    {...field}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />

                                                                <FormField
                                                                    control={
                                                                        addForm.control
                                                                    }
                                                                    name="number"
                                                                    render={({
                                                                        field,
                                                                    }) => (
                                                                        <FormItem>
                                                                            <FormControl>
                                                                                <PhoneInput
                                                                                    defaultCountry="in"
                                                                                    value={
                                                                                        field.value
                                                                                    }
                                                                                    onChange={
                                                                                        field.onChange
                                                                                    }
                                                                                    inputProps={{
                                                                                        className: `w-full p-1 text-lg outline-none border bg-white`,
                                                                                        placeholder:
                                                                                            "Enter your phone number",
                                                                                    }}
                                                                                    countrySelectorStyleProps={{
                                                                                        className: ` pl-0 pr-1 py-1 `,
                                                                                    }}
                                                                                    dialCodePreviewStyleProps={{
                                                                                        className: `text-lg p-1 bg-white `,
                                                                                    }}
                                                                                    className="flex w-full items-center"
                                                                                    inputClassName="w-full text-lg outline-none border-2 bg-white"
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />

                                                                <PastelButton
                                                                    type="submit"
                                                                    message=""
                                                                    className=" w-full text-center bg-[#CCCCFF] text-black border-2 h-10"
                                                                    wfull
                                                                    disabled={
                                                                        loading
                                                                    }
                                                                >
                                                                    Add contact
                                                                </PastelButton>
                                                            </form>
                                                        </Form>
                                                    </div>
                                                </DialogDescription>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            </>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">
                            No favourites added yet.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
