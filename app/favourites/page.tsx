"use client";
import CTACards from "@/components/CTACards";
import { Manrope } from "next/font/google";
import PastelButton from "@/components/PastelButton";
import Heading from "@/components/Heading";
import Image from "next/image";
import { Edit2Icon, PlusCircle, X } from "lucide-react";
import { BsTrash } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

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

import { toast } from "sonner";
import axios from "axios";
import { Input } from "@/components/ui/input";

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
        <div className="flex justify-between gap-5 bg-pink-200 px-5 p-3 border border-black">
            <div className="flex gap-5">
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
            <div className="flex gap-5 items-center">
                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                    <DialogTrigger asChild>
                        <MdOutlineEdit className="scale-110 hover:scale-150 transition-all duration-200 ease-in-out cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent className="border-2 border-black rounded-none bg-[#EDFCD1]">
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
                                                            className="w-full bg-white focus:outline-none focus:shadow-none focus-visible:ring-[0px] focus-visible:border-black border-2 border-black p-2 rounded-none"
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
                                                        <Input
                                                            type="string"
                                                            className="w-full bg-white focus:outline-none focus:shadow-none focus-visible:ring-[0px] focus-visible:border-black border-2 border-black p-2 rounded-none"
                                                            placeholder="Enter Phone Number"
                                                            {...field}
                                                            disabled
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <Button
                                            type="submit"
                                            className="w-full rounded-none cursor-pointer"
                                        >
                                            Save Changes
                                        </Button>
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

    const fetchFavourites = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/favourites/",
                {
                    withCredentials: true,
                }
            );
            setFavourites(response.data.data.users);
        } catch (error) {
            console.error("Error fetching favourites:", error);
            toast.error("Failed to fetch favourites. Please try again.");
        }
    };

    const deleteFavourites = async (number: string) => {
        try {
            const deletePromise = axios.delete(
                "http://localhost:5000/api/favourites/",
                {
                    data: { number: number },
                    withCredentials: true,
                }
            );

            toast.promise(deletePromise, {
                loading: "Deleting favourite contact...",
                success: (response) => {
                    console.log(
                        "Favourite contact deleted successfully:",
                        response.data
                    );
                    fetchFavourites(); // Refetch to update the list
                    return "Favourite contact deleted successfully!";
                },
                error: (err) => {
                    console.error("Failed to delete favourite contact:", err);
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
                `http://localhost:5000/api/favourites/`, // Assuming your API uses ID for PUT
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
                success: (response) => {
                    console.log(
                        "Favourite contact updated successfully:",
                        response.data
                    );
                    fetchFavourites(); // Refetch to update the list
                    setEditOpen(false); // Close the dialog on success
                    return "Favourite contact updated successfully!";
                },
                error: (err) => {
                    console.error("Failed to update favourite contact:", err);
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
                "http://localhost:5000/api/favourites/",
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
                    console.error("Failed to add favourite contact:", err);
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
        <div className="p-6">
            <div
                className={` ${manrope.variable} bg-[#EDFCD1] heading text-lg pt-5 px-5 gap-10`}
            >
                <Heading
                    message="Your favourites"
                    className="text-4xl pb-8 space-y-5"
                />
                <div className="space-y-5">
                    {favourites.length > 0 ? (
                        favourites.map((fav: any) => (
                            <Favourite
                                key={fav._id}
                                name={fav.name}
                                number={fav.number}
                                id={fav._id}
                                onDelete={deleteFavourites}
                                onEdit={editFavourite} // Pass the edit function
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500">
                            No favourites added yet.
                        </p>
                    )}
                </div>
                <div className="flex justify-center items-center mt-10 ">
                    <div className="flex items-center space-x-5 hover:cursor-pointer hover:bg-pink-300 bg-pink-200 transition-all duration-200 ease-in-out px-3 py-2 border border-black">
                        <Dialog
                            open={addDialogOpen}
                            onOpenChange={setAddDialogOpen}
                        >
                            <DialogTrigger className="flex items-center cursor-pointer">
                                Add More <PlusCircle className="ml-2 h-5 w-5" />
                            </DialogTrigger>
                            <DialogContent className="border-2 border-black rounded-none bg-[#EDFCD1]">
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
                                                    control={addForm.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input
                                                                    className="w-full bg-white focus:outline-none focus:shadow-none focus-visible:ring-[0px] focus-visible:border-black border-2 border-black p-2 rounded-none"
                                                                    placeholder="Enter Name"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={addForm.control}
                                                    name="number"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input
                                                                    type="string"
                                                                    className="w-full bg-white focus:outline-none focus:shadow-none focus-visible:ring-[0px] focus-visible:border-black border-2 border-black p-2 rounded-none"
                                                                    placeholder="Enter Phone Number"
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
                                                >
                                                    Submit
                                                </Button>
                                            </form>
                                        </Form>
                                    </div>
                                </DialogDescription>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
}
