import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "picsum.photos",
                port: "",
                pathname: "/**",
                search: "",
            },
            {
                protocol: "https",
                hostname: "files.edgestore.dev",
                port: "",
                pathname: "/**",
                search: "",
            },
        ],
    },
};

export default nextConfig;
