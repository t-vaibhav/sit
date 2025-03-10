"use client";
import React, { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { MdOutlineAttachment } from "react-icons/md";
import Image from "next/image";
import Heading from "@/components/Heading";
import PastelButton from "@/components/PastelButton";

const PhoneNumberInput: React.FC = () => {
    const [phone, setPhone] = useState<string>("");
    // const [isValid, setIsValid] = useState<boolean>(true);
    const [files, setFiles] = useState<File[]>([]);

    // Function to validate phone number (Example for Ukraine +380)
    // const validatePhone = (value: string) => {
    //     const isValidNumber = /^\+380\d{9}$/.test(value); // Example: +380XXXXXXXXX (9 digits after +380)
    //     setIsValid(isValidNumber);
    // };

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

    return (
        <div className="py-20 px-32">
            <div className="grid grid-cols-4">
                <div className=" col-span-2 w-full ">
                    <Heading
                        message="Enter details"
                        className="text-4xl pb-8"
                    />
                    <h3 className="text-xl mb-2 body">Phone number:</h3>
                    <PhoneInput
                        defaultCountry="in"
                        value={phone}
                        onChange={(value: string) => {
                            setPhone(value);
                            // validatePhone(value);
                        }}
                        inputProps={{
                            className: `w-full p-1 text-lg outline-none border bg-white`,
                            placeholder: "Enter your phone number",
                        }}
                        countrySelectorStyleProps={{
                            className: ` pl-0 pr-1 py-1 `,
                        }}
                        dialCodePreviewStyleProps={{
                            className: `text-lg p-1 bg-white `,
                        }}
                        className="flex w-full items-center  "
                        inputClassName="w-full text-lg outline-none border-2 bg-white"
                    />
                    {/* {!isValid && (
                        <p className="text-xs text-red-600 mt-1">
                            Phone number is not valid
                        </p>
                    )} */}
                    <h3 className="text-xl body mt-5">Enter message:</h3>

                    <textarea
                        name=""
                        id=""
                        className="w-full h-1/2 rounded-xs border mt-2 outline-none p-1 bg-white"
                        placeholder="Enter your message here"
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
                                        <p className="text-center">
                                            {file.name
                                                .split(".")
                                                .pop()
                                                ?.toUpperCase()}
                                        </p>
                                    </div>
                                )}
                                <Image
                                    src="/cross.png"
                                    alt="cross"
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
                                document.getElementById("attach")?.click()
                            } // Triggers input on button click
                        >
                            <div className="flex items-center space-x-2 w-full h-full">
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

                        <PastelButton className="cursor-pointer rounded-none">
                            Send
                        </PastelButton>
                    </div>
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
};

export default PhoneNumberInput;
