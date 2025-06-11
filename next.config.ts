const nextConfig = {
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
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/:path*`,
            },
        ];
    },
};

export default nextConfig;
