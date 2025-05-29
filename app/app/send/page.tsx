"use client";

import React, { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { MdOutlineAttachment } from "react-icons/md";
import Image from "next/image";
import Heading from "@/components/Heading";
import PastelButton from "@/components/PastelButton"; // Assuming this is your custom button
import { number, z } from "zod";
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
                console.error("Failed to upload file to Edge Store:", error);
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

        console.log("Attempting to remove file from Edge Store:", fileToRemove);
        if (fileToRemove) {
            edgestore.publicFiles
                .delete({
                    url: fileToRemove.url,
                })
                .then(() => {
                    toast.success(
                        `Removed '${fileToRemove.name}' from Edge Store.`
                    );
                })
                .catch((err) => {
                    toast.error(
                        `Failed to delete '${fileToRemove.name}' from Edge Store.`
                    );
                    console.error("Error deleting from Edge Store:", err);
                });
        }
    };

    // Define the onSubmit function for form submission
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Form values:", values);
        console.log("here");
        console.log("Attached files (Edge Store URLs):", uploadedFiles);
        
        // Prepare data to send to your MENN backend
        const payload = {
            number: values.phoneNumber.substring(1),
            message: values.message,
            files: uploadedFiles.map((file) => ({
                url: file.url,
                filename: file.name,
            })),
        };
        const files = uploadedFiles.map((file) => ({
            url: file.url,
            filename: file.name,
        }));
        console.log("Payload to send to backend:", payload);

        try {
            // Send this data to your Next.js API route
            const messagePromise = axios.post(
                "http://localhost:5000/api/send", // Your message sending API endpoint
                {
                    number: values.phoneNumber.substring(1),
                    message: values.message,
                    files: files, // Send the payload with phone number, message, and files
                },
                {
                    withCredentials: true, // <--- Add this line here
                }
            );

            toast.promise(messagePromise, {
                loading: "Sending message...", // Changed from "Logging in..."
                success: (response) => {
                    console.log("Message sent successfully:", response.data); // Changed from "Login successful:"
                    // If your backend sets a cookie (e.g., JWT in an HttpOnly cookie),
                    // the browser will automatically handle it due to `withCredentials: true`.
                    // You typically don't access the cookie directly on the frontend.
                    // You might get user details from response.data if your API returns them.

                    return "Message sent successfully!"; // Changed from "Login successful!"
                },
                error: (err) => {
                    console.error("Failed to send message:", err); // Changed from "Login failed:"
                    // Check if err.response exists before accessing its properties
                    return (
                        err.response?.data?.message ||
                        "Failed to send message. Please try again." // Changed message
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

    return (
        <div className="py-20 px-32">
            <div className="grid grid-cols-4">
                <div className="col-span-2 w-full">
                    <Heading
                        message="Enter details"
                        className="text-4xl pb-8"
                    />
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-5"
                        >
                            {/* Phone Number Input */}
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xl body">
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
                                        <FormLabel className="text-xl body mt-5">
                                            Enter message:
                                        </FormLabel>
                                        <FormControl>
                                            <textarea // Use Shadcn's Textarea
                                                placeholder="Enter your message here"
                                                className="w-full h-48 rounded-xs border mt-2 outline-none p-3 bg-white"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex space-x-2 overflow-x-auto max-w-full mt-5 scroll">
                                {/* show the file preview here */}
                                {isUploading && (
                                    <div className="flex items-center justify-center w-full">
                                        <p className="text-blue-600">
                                            Uploading files...{" "}
                                            {uploadProgress.toFixed(0)}%
                                        </p>
                                    </div>
                                )}
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
                                                className="w-16 h-16 object-cover border-gray-400 shadow-md border-2"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 flex items-center justify-center border-gray-400 bg-gray-200 font-semibold shadow-md border-2">
                                                <p className="text-center text-xs p-2 break-words">
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
                </div>

                {/* left side image */}
                <div className="col-span-2 flex justify-center h-full w-full">
                    <Image
                        src={"/messaging.png"}
                        height={500}
                        width={500}
                        alt="illustrate"
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
