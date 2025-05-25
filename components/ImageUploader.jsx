// frontend/components/ImageUploader.jsx
"use client"; // This component must be a client component

import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

const ImageUploader = ({ onUploadSuccess }) => {
    const [uploadedAsset, setUploadedAsset] = useState(null); // Stores { url, resource_type, original_filename }
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
        return (
            <p className="text-red-500">
                Error: Cloudinary environment variables not set!
            </p>
        );
    }

    const sendUrlToBackend = async (url, resourceType, originalFilename) => {
        setUploading(true);
        setError(null);
        setMessage("Saving file URL to backend...");
        try {
            // This calls your Next.js API Route (which then calls your MENN backend)
            const response = await fetch("/api/save-file-url", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    publicUrl: url,
                    resourceType: resourceType,
                    originalFilename: originalFilename,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage("File URL saved successfully!");
                console.log(
                    "URL sent to Next.js API route successfully:",
                    data
                );
                onUploadSuccess(); // Trigger a re-fetch of files on the parent page
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Failed to send URL to backend.");
                console.error("Failed to send URL to backend:", errorData);
            }
        } catch (err) {
            setError("Network error or issue sending URL to backend.");
            console.error("Error sending URL to backend:", err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <CldUploadWidget
                cloudName={cloudName}
                uploadPreset={uploadPreset}
                onSuccess={(result, { widget }) => {
                    if (result.event === "success") {
                        const secureUrl = result.info.secure_url;
                        const resourceType = result.info.resource_type; // 'image', 'video', 'raw', 'audio'
                        const originalFilename = result.info.original_filename; // Get original filename

                        console.log("Cloudinary Upload Success:", {
                            secureUrl,
                            resourceType,
                            originalFilename,
                        });
                        setUploadedAsset({
                            url: secureUrl,
                            resource_type: resourceType,
                            original_filename: originalFilename,
                        });
                        setMessage("Upload complete, saving URL...");
                        sendUrlToBackend(
                            secureUrl,
                            resourceType,
                            originalFilename
                        ); // Send to your Next.js API route
                        widget.close(); // Close the widget after successful upload
                    }
                }}
                onError={(error, { widget }) => {
                    setError(
                        "Cloudinary upload failed: " +
                            (error?.message || "Unknown error")
                    );
                    console.error("Cloudinary Upload Error:", error);
                    widget.close();
                }}
                options={{
                    sources: ["local", "url", "camera"], // Allowed upload sources
                    clientAllowedFormats: [
                        "png",
                        "gif",
                        "jpeg",
                        "jpg",
                        "webp",
                        "mp4",
                        "webm",
                        "pdf",
                        "docx",
                        "xlsx",
                        "mp3",
                        "wav",
                        "txt",
                    ],
                    maxFileSize: 50000000, // 50MB (adjust as needed)
                    // For more control, you could specify `resourceType: "auto"` in your Cloudinary preset,
                    // or explicitly here if you only want to allow one type for a specific uploader, e.g., `resourceType: "video"`
                }}
            >
                {({ open }) => {
                    return (
                        <button
                            type="button"
                            onClick={() => {
                                setUploadedAsset(null); // Clear previous asset
                                setError(null);
                                setMessage(null);
                                open(); // Open the upload widget
                            }}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out"
                            disabled={uploading}
                        >
                            {uploading
                                ? "Uploading..."
                                : "Open Cloudinary Uploader"}
                        </button>
                    );
                }}
            </CldUploadWidget>

            {message && (
                <p className="text-gray-700 mt-4 text-center">{message}</p>
            )}
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            {uploadedAsset && (
                <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50 text-center">
                    <p className="text-green-600 font-semibold mb-2">
                        Last Uploaded Asset:
                    </p>
                    {uploadedAsset.resource_type === "image" && (
                        <img
                            src={uploadedAsset.url}
                            alt="Uploaded"
                            className="max-w-full h-48 object-contain mx-auto rounded"
                        />
                    )}
                    {uploadedAsset.resource_type === "video" && (
                        <video
                            src={uploadedAsset.url}
                            controls
                            className="max-w-full h-48 object-contain mx-auto rounded"
                        />
                    )}
                    {uploadedAsset.resource_type === "audio" && (
                        <audio
                            src={uploadedAsset.url}
                            controls
                            className="w-full mt-2"
                        />
                    )}
                    {uploadedAsset.resource_type === "raw" && (
                        <p className="text-gray-700">
                            Document:{" "}
                            {uploadedAsset.original_filename ||
                                "Unnamed Document"}
                        </p>
                    )}
                    <a
                        href={uploadedAsset.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline mt-2 block break-all"
                    >
                        View/Download File
                    </a>
                    <p className="text-sm text-gray-500 mt-1 break-words">
                        Type: {uploadedAsset.resource_type}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
