/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */

"use client";

import React, { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { MdOutlineAttachment } from "react-icons/md";
import Image from "next/image";
import Heading from "@/components/Heading";
import PastelButton from "@/components/PastelButton"; // Assuming this is your custom button
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
// import { Textarea } from "@/components/ui/textarea"; // Assuming you have shadcn's textarea
import { toast } from "sonner"; // For notifications
import { useEdgeStore } from "@/lib/edgeStore";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";

// Define your Zod schema
const formSchema = z.object({
    phoneNumber: z.string().min(1, { message: "Phone number is required." }),
    message: z.string().min(1, { message: "Message cannot be empty." }),
});

// Define a type for your uploaded files
type UploadedFile = {
    url: string;
    size: number;
    name: string;
    type: string;
    resourceType: "image" | "video" | "raw" | "audio"; // As per Edge Store type
};

export default function PhoneNumberInput() {
    const { edgestore } = useEdgeStore(); // Initialize Edge Store client
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const searchParams = useSearchParams();

    const number = searchParams.get("number");

    // Initialize react-hook-form with Zod resolver
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phoneNumber: number || "",
            message: "",
        },
    });

    // Function to handle file input change and immediately upload to Edge Store
    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!event.target.files) return;

        const selectedFiles = Array.from(event.target.files);
        const filesToUpload = selectedFiles.slice(0, 5 - uploadedFiles.length); // Enforce 5-file limit

        if (filesToUpload.length === 0 && selectedFiles.length > 0) {
            toast.warning("You can only attach a maximum of 5 files.");
            return;
        }
        if (filesToUpload.length < selectedFiles.length) {
            toast.warning(
                `Only the first ${filesToUpload.length} files out of ${selectedFiles.length} were selected due to the 5-file limit.`
            );
        }

        if (filesToUpload.length === 0) return; // No files to process

        setIsUploading(true);
        setUploadProgress(0); // Reset progress for new upload batch
        toast.loading(`Uploading ${filesToUpload.length} file(s)...`, {
            id: "upload-toast",
        });

        const uploadPromises = filesToUpload.map(async (file) => {
            try {
                // Determine resourceType based on MIME type or set to 'raw' by default
                let resourceType: "image" | "video" | "raw" | "audio" = "raw";
                if (file.type.startsWith("image/")) resourceType = "image";
                else if (file.type.startsWith("video/")) resourceType = "video";
                else if (file.type.startsWith("audio/")) resourceType = "audio";

                const res = await edgestore.publicFiles.upload({
                    file,
                    onProgressChange: (progress) => {
                        // You can update a global progress bar here if needed
                        // For simplicity, we'll let the toast handle overall progress
                        setUploadProgress(progress);
                    },
                    options: {
                        temporary: true,
                    },
                });

                toast.success(`'${file.name}' uploaded!`, {
                    id: "upload-toast",
                });
                return {
                    url: res.url,
                    size: file.size,
                    name: file.name,
                    type: file.type,
                    resourceType: resourceType,
                };
            } catch (error: any) {
                // console.error("Failed to upload files:", error);
                toast.error(
                    `Failed to upload '${file.name}': ${
                        error.message || "Unknown error"
                    }`,
                    { id: "upload-toast" }
                );
                return null; // Return null for failed uploads
            }
        });

        const results = await Promise.all(uploadPromises);
        const successfulUploads = results.filter(Boolean) as UploadedFile[];

        setUploadedFiles((prevUploadedFiles) => [
            ...prevUploadedFiles,
            ...successfulUploads,
        ]);

        setIsUploading(false);
        setUploadProgress(100);
        toast.dismiss("upload-toast");
        if (successfulUploads.length > 0) {
            toast.success(
                `${successfulUploads.length} file(s) uploaded successfully!`
            );
        } else {
            toast.error("No files were successfully uploaded.");
        }

        // Clear the file input value so the same file can be selected again
        event.target.value = "";
    };

    const removeFile = (index: number) => {
        // Immediately remove from UI state for a responsive feel
        const fileToRemove = uploadedFiles[index];
        setUploadedFiles((prevFiles) => {
            const newFiles = [...prevFiles];
            newFiles.splice(index, 1);
            return newFiles;
        });

        console.log("Attempting to remove files from server:", fileToRemove);
        if (fileToRemove) {
            edgestore.publicFiles
                .delete({
                    url: fileToRemove.url,
                })
                .then(() => {
                    toast.success(
                        `Removed '${fileToRemove.name}' from server.`
                    );
                })
                .catch((err) => {
                    toast.error(
                        `Failed to delete '${fileToRemove.name}' from server.`
                    );
                    console.error("Error deleting from server:", err);
                });
        }
    };

    // Define the onSubmit function for form submission
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const files = uploadedFiles.map((file) => ({
            url: file.url,
            filename: file.name,
        }));

        try {
            const messagePromise = axios.post(
                "/api/send", // Your message sending API endpoint
                {
                    number: values.phoneNumber.substring(1),
                    message: values.message,
                    files: files, // Send the payload with phone number, message, and files
                },
                {
                    withCredentials: true,
                }
            );

            toast.promise(messagePromise, {
                loading: "Sending message...",
                success: (response) => {
                    console.log("Message sent successfully:", response.data);

                    // --- Add these lines to clear form values and files ---
                    // Assuming `form` is the object returned by `useForm` (e.g., const { form, reset } = useForm();)
                    // You'll need to pass `form` or `reset` as a prop or have it accessible in this scope.
                    form.reset({
                        message: "", // Reset message to empty
                    });
                    setUploadedFiles([]); // Clear the uploaded files state
                    // --- End of added lines ---

                    return "Message sent successfully!";
                },
                error: (err) => {
                    console.error("Failed to send message:", err);
                    return (
                        err.response?.data?.message ||
                        "Failed to send message. Please try again."
                    );
                },
            });
        } catch (error) {
            console.error("Network or API error:", error);
            toast.error(
                "Failed to send message. Please check your connection."
            );
        }
    }
    const getFileTypeBackgroundColorClass = (fileName: string) => {
        const extension = fileName.split(".").pop()?.toLowerCase();
        switch (extension) {
            case "pdf":
                return "bg-red-500 text-white"; // Reddish for PDF
            case "docx":
            case "doc": // Also covers older .doc files
                return "bg-blue-500 text-white"; // Green for DOCX
            case "xlsx":
            case "xls": // Also covers older .xls files
                return "bg-green-500 text-white"; // Orange for XLSX
            case "pptx":
            case "ppt": // Also covers older .ppt files
                return "bg-orange-500 text-white"; // Purple for PPT
            default:
                return "bg-gray-200 text-black"; // Default for other file types
        }
    };
    return (
        <div className="px-5 py-10 md:px-10 md:py-16 lg:py-16 lg:px-16 xl:py-20 xl:px-32 overflow-hidden">
            <div className="grid grid-cols-4 gap-5">
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
                    transition={{ type: "tween" }}
                    className="col-span-4 md:col-span-2 w-full"
                >
                    <Heading
                        message="Enter details"
                        className="text-2xl font-bold md:text-4xl pb-8"
                    />
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-2 md:space-y-5"
                        >
                            {/* Phone Number Input */}
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg md:text-xl body">
                                            Phone number:
                                        </FormLabel>
                                        <FormControl>
                                            <PhoneInput
                                                defaultCountry="in"
                                                value={field.value}
                                                onChange={field.onChange}
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

                            {/* Message Textarea */}
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg md:text-xl body mt-5">
                                            Enter message:
                                        </FormLabel>
                                        <FormControl>
                                            <textarea // Use Shadcn's Textarea
                                                placeholder="Enter your message here"
                                                className="w-full h-56 md:h-48 rounded-xs border md:mt-2 outline-none p-3 bg-white"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex space-x-2 overflow-x-auto max-w-full mt-5 scroll">
                                {uploadedFiles.map((file, index) => (
                                    <div
                                        key={index}
                                        className="flex-shrink-0 mt-2 flex justify-between items-center relative"
                                    >
                                        {file.type.startsWith("image/") ? (
                                            <Image
                                                height={100}
                                                width={100}
                                                src={file.url}
                                                alt={file.name}
                                                className="w-12 h-12 object-cover border-gray-400 shadow-md border-2"
                                            />
                                        ) : (
                                            <div
                                                className={`w-12 h-12 flex items-center justify-center border-black font-semibold shadow-md border-2 ${getFileTypeBackgroundColorClass(
                                                    file.name
                                                )}`}
                                            >
                                                <p className="text-center text-xs p-2 overflow-hidden">
                                                    {file.name}
                                                </p>
                                            </div>
                                        )}
                                        <Image
                                            src="/cross.png"
                                            alt="remove"
                                            height={15}
                                            width={15}
                                            onClick={() => removeFile(index)}
                                            className="text-xl hover:scale-110 hover:font-bold ease-in-out duration-150 text-red-500 font-semibold absolute -top-1 -right-1 cursor-pointer"
                                            aria-label={`Remove ${file.name}`}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-5 mt-5">
                                <PastelButton
                                    className="cursor-pointer rounded-none w-full"
                                    onClick={() => {
                                        // Only allow attachment if fewer than 5 files are already attached
                                        if (
                                            uploadedFiles.length < 5 &&
                                            !isUploading
                                        ) {
                                            document
                                                .getElementById("attach")
                                                ?.click();
                                        } else if (isUploading) {
                                            toast.info(
                                                "Please wait for current uploads to finish."
                                            );
                                        } else {
                                            toast.warning(
                                                "You can only attach a maximum of 5 files."
                                            );
                                        }
                                    }}
                                    disabled={
                                        uploadedFiles.length >= 5 || isUploading
                                    } // Disable button if max files reached or uploading
                                >
                                    <div className="flex items-center space-x-2 w-full h-full justify-center">
                                        <p>Attach</p>
                                        <MdOutlineAttachment className="ml-2" />
                                    </div>
                                </PastelButton>

                                <input
                                    type="file"
                                    id="attach"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    multiple
                                    disabled={
                                        uploadedFiles.length >= 5 || isUploading
                                    } // Disable input itself too
                                    accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.txt" // Suggest accepted types
                                />

                                <PastelButton
                                    className="cursor-pointer rounded-none"
                                    type="submit" // Set type to submit for react-hook-form
                                    onClick={() => {
                                        onSubmit;
                                    }} // Set type to submit for react-hook-form
                                    disabled={
                                        form.formState.isSubmitting ||
                                        isUploading
                                    } // Disable if form submitting or files are uploading
                                >
                                    {form.formState.isSubmitting
                                        ? "Sending..."
                                        : "Send"}
                                </PastelButton>
                            </div>
                        </form>
                    </Form>
                </motion.div>

                {/* left side image */}
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
                    transition={{ type: "tween" }}
                    className="md:flex hidden md:col-span-2 flex justify-center h-full w-full"
                >
                    <Image
                        src={"/messaging.png"}
                        height={500}
                        width={500}
                        alt="illustrate"
                        className="object-cover "
                    />
                </motion.div>
            </div>
        </div>
    );
}
