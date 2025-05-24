import Image from "next/image";
import React from "react";
import PastelButton from "./PastelButton";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex justify-between items-start">
            <Image src={"/logo.png"} height={30} width={80} alt="cover" />
            <Link href={"/auth/login"}>
                <PastelButton message="Login" />
            </Link>
        </div>
    );
}
