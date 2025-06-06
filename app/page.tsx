"use client";
import GithubBtn from "@/components/GithubBtn";
import GoogleBtn from "@/components/GoogleBtn";

export default function Home() {
    return (
        <div className="h-screen flex flex-col md:flex-row gap-5 justify-center items-center bg-cyan-100">
            <GoogleBtn text="Continue with Google"/>
            <GithubBtn text="Continue with Github"/> 
        </div>
    )
}