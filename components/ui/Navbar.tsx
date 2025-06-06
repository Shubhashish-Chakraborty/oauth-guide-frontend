"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../buttons/CustomButton";
import { Github } from "@/icons/Github";
import { Youtube } from "@/icons/Youtube";
import { EnterDoor } from "@/icons/EnterRoom";


export const Navbar = () => {
    const router = useRouter();

    return (
        <div className="flex justify-center items-center p-2">
            <div className="w-full flex md:flex-row flex-col items-center justify-center gap-3 md:gap-10 max-w-screen-lg cursor-pointer h-36 border-2 mt-2 border-amber-300 rounded-2xl shadow-sm shadow-blue-200 hover:shadow-lg hover:shadow-emerald-200 transition-all duration-500 p-4">
                <div className="md:block hidden">
                    <Link href="https://github.com/Shubhashish-Chakraborty/oauth-guide-frontend" target="_blank">
                        <Button variant="general_1" endIcon={<Github />} text="Frontend" />
                    </Link>
                </div>

                <div className="md:block hidden">
                    <Link href="https://github.com/Shubhashish-Chakraborty/oauth-guide-backend" target="_blank">
                        <Button variant="general_1" endIcon={<Github />} text="Backend" />
                    </Link>
                </div>

                <div>
                    <Link href="https://www.youtube.com/live/pFtk81Az_nI" target="_blank">
                        <Button variant="red_variant" endIcon={<Youtube className="size-6" />} text="Live" />
                    </Link>
                </div>

                <div>
                    <Button variant="purple_variant" endIcon={<EnterDoor />} onClick={() => { router.push("/dashboard") }} text="Dashboard" />
                </div>
            </div>
        </div>
    );
};