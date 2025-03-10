import CTACards from "@/components/CTACards";
import { Manrope } from "next/font/google";
import PastelButton from "@/components/PastelButton";
import Heading from "@/components/Heading";

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
});

export default function Home() {
    return (
        <div className="p-6">
            <div
                className={` ${manrope.variable} bg-[#EDFCD1] heading text-lg  grid grid-cols-2 gap-10`}
            >
                <div className="py-20 px-10">
                    <Heading message="Hey! Vaibhav" className="text-lg py-2" />
                    <Heading
                        message="Start sending now"
                        className=" font-semibold heading text-5xl py-4 "
                    />
                </div>
                <div className="flex items-center h-full justify-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                    sit cumque, possimus nisi facilis consequatur laudantium
                    accusantium sapiente molestiae corporis, aperiam voluptatum
                    inventore tenetur ex qui
                </div>
            </div>
            <div className=" h-full grid grid-cols-3 gap-10 px-5">
                <CTACards
                    src="/user.png"
                    title="To yourself"
                    content="Send files, docs or messages to yourself"
                />
                <CTACards
                    src="/friends.png"
                    title="To number"
                    content="Send files, docs or messages to any number"
                />
                <CTACards
                    src="/favourite.png"
                    title="To your favourites"
                    content="Start sending to your favourite contacts   "
                />
            </div>
            <div className="px-5 pt-20 ">
                <PastelButton message="Check History" />
            </div>
        </div>
    );
}
