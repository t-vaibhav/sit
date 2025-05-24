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
    FormLabel, // Useful for accessibility
    FormMessage,
} from "@/components/ui/form";
// import { Textarea } from "@/components/ui/textarea"; // Assuming you have shadcn's textarea
import { toast } from "sonner"; // For notifications

// 1. Define your Zod schema
const formSchema = z.object({
    phoneNumber: z.string().min(1, { message: "Phone number is required." }),
    message: z.string().min(1, { message: "Message cannot be empty." }),
    // Files will be handled separately as react-hook-form doesn't directly manage FileList
    // but we can add a placeholder for validation if needed, though often handled before submission.
});

export default function PhoneNumberInput() {
    const [files, setFiles] = useState<File[]>([]);

    // 2. Initialize react-hook-form with Zod resolver
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phoneNumber: "",
            message: "",
        },
    });

    // Function to handle file input change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles((prevFiles) => [
                ...prevFiles,
                ...Array.from(event.target.files!),
            ]);
        }
    };

    const removeFile = (index: number) => {
        setFiles((prevFiles) => {
            const newFiles = [...prevFiles];
            newFiles.splice(index, 1);
            return newFiles;
        });
    };

    // 3. Define the onSubmit function for form submission
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Form values:", values);
        console.log("Attached files:", files);
        // toast("Messageeeeeeeee sent successfully!");
        // Here you would typically send this data to your backend
        // Example: Using FormData for files and other data
        const formData = new FormData();
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("message", values.message);
        files.forEach((file) => {
            formData.append("attachments", file); // 'attachments' is the field name your backend expects for files
        });

        try {
            // Replace with your actual API endpoint
            // const response = await fetch('/api/send-message', {
            //     method: 'POST',
            //     body: formData,
            // });
            // const data = await response.json();

            // Simulate API call
            console.log("Sending data to API...");
            await new Promise((resolve) => setTimeout(resolve, 1500));
            toast.success("Message sent successfully!");
            // form.reset(); // Reset form fields after successful submission
            setFiles([]); // Clear attached files
        } catch (error) {
            console.error("Failed to send message:", error);
            toast.error("Failed to send message. Please try again.");
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
                    {/* 4. Wrap your form elements with Shadcn's Form */}
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
                                {files.map((file, index) => (
                                    <div
                                        key={index}
                                        className="flex-shrink-0 mt-2 flex justify-between items-center relative"
                                    >
                                        {file.type.startsWith("image/") ? (
                                            <Image
                                                height={100}
                                                width={100}
                                                src={URL.createObjectURL(file)}
                                                alt={file.name}
                                                className="w-16 h-16 object-cover border-gray-400 shadow-md border-2"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 flex items-center justify-center border-gray-400 bg-gray-200 font-semibold shadow-md border-2">
                                                <p className="text-center text-xs p-1 break-words">
                                                    {file.name
                                                        .split(".")
                                                        .pop()
                                                        ?.toUpperCase()}
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
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 gap-5 mt-5">
                                <PastelButton
                                    className="cursor-pointer rounded-none w-full"
                                    onClick={() =>
                                        document
                                            .getElementById("attach")
                                            ?.click()
                                    }
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
                                />

                                <PastelButton
                                    className="cursor-pointer rounded-none"
                                    // Set type to submit
                                    onClick={() => {
                                        onSubmit;
                                    }}
                                >
                                    Send
                                </PastelButton>
                            </div>
                        </form>
                    </Form>
                </div>

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
