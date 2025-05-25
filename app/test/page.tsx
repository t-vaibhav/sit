"use client";
import * as React from "react";
import { useEdgeStore } from "@/lib/edgeStore";
export default function Page() {
    const [file, setFile] = React.useState<File>();
    const { edgestore } = useEdgeStore();
    return (
        <div>
            <input
                type="file"
                onChange={(e) => {
                    setFile(e.target.files?.[0]);
                }}
            />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                onClick={async () => {
                    if (file) {
                        const res = await edgestore.publicFiles.upload({
                            file,
                            onProgressChange: (progress) => {
                                // you can use this to show a progress bar
                                console.log(progress);
                            },
                        });
                        // you can run some server action or api here
                        // to add the necessary data to your database
                        console.log(res);
                    }
                }}
            >
                Upload
            </button>
        </div>
    );
}
