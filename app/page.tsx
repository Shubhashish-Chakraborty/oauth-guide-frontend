"use client";

import GithubBtn from "@/components/buttons/GithubBtn";
import GoogleBtn from "@/components/buttons/GoogleBtn";
import { Navbar } from "@/components/ui/Navbar";
import { motion } from "framer-motion";
import { useEffect } from "react";


// Type augmentation for Navigator
declare global {
    interface Navigator {
        brave?: {
            isBrave?: unknown;
        };
    }
}

export default function Home() {
    // Brave detection and alert
    useEffect(() => {
        const isBrave = navigator.brave !== undefined ||
            navigator.userAgent.includes('Brave');

        if (isBrave) {
            const alertDiv = document.createElement('div');
            alertDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                max-width: 400px;
                padding: 20px;
                background: #f0f3ff;
                border-left: 5px solid #4C6EF5;
                border-radius: 4px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                z-index: 9999;
                font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                color: #333;
                line-height: 1.5;
            `;

            alertDiv.innerHTML = `
                <button style="
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: none;
                    border: none;
                    font-size: 18px;
                    cursor: pointer;
                    color: #666;
                " onclick="this.parentNode.remove()">×</button>
                <strong style="display: block; margin-bottom: 10px; color: #4C6EF5">
                    <svg width="18" height="18" viewBox="0 0 24 24" style="vertical-align: middle; margin-right: 8px;">
                        <path fill="#4C6EF5" d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z"/>
                    </svg>
                    Brave Browser Settings Required
                </strong>
                <p>For login to work properly:</p>
                <ol style="padding-left: 20px; margin: 10px 0;">
                    <li>Click the <strong>Brave Shields icon</strong> (🦁) in address bar</li>
                    <li>Select <strong>"Advanced Controls"</strong></li>
                    <li>Under <strong>"Cookies"</strong>, choose <strong>"Allow all cookies"</strong></li>
                    <li><strong>Refresh</strong> the page</li>
                </ol>
                <p style="font-size: 0.9em; color: #666; margin-top: 10px;">
                    <em>Note: You can re-enable shields after logging in.</em><br>
                    This is required because Brave blocks authentication cookies by default.
                </p>
            `;

            document.body.appendChild(alertDiv);
            setTimeout(() => alertDiv.remove(), 20 * 1000);
        }
    }, []);

    return (
        <div className="relative min-h-screen bg-mainBgColor overflow-hidden">
            {/* Fixed glow effects - made smaller on mobile */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 1 }}
                    className="absolute animate-pulse bottom-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-amber-300/30 blur-[80px] md:blur-[150px]"
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1.2 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="absolute animate-pulse top-0 left-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full bg-blue-500/20 blur-[60px] md:blur-[120px]"
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 2.4 }}
                    transition={{ duration: 2, delay: 1 }}
                    className="absolute animate-pulse top-1/2 left-1/2 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full bg-emerald-500/20 blur-[50px] md:blur-[100px] transform -translate-x-1/2 -translate-y-1/2"
                />
            </div>

            {/* main content section!! */}
            <div className="relative z-10 text-white container mx-auto px-4 sm:px-6 lg:px-8">
                <Navbar/>

                <div className="flex justify-center flex-col md:flex-row items-center gap-5 mt-30">
                    <GoogleBtn text="Continue with Google" />
                    <GithubBtn text="Continue with Github" />
                </div>
            </div>
        </div>
    )
}