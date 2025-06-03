import Image from "next/image";
import React from "react";
import PastelButton from "./PastelButton";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex justify-between items-start">
            <Image src={"/sit.png"} height={40} width={120} alt="cover" />
            <Link href={"/auth/login"}>
                <PastelButton message="Login" />
            </Link>
        </div>
    );
}
