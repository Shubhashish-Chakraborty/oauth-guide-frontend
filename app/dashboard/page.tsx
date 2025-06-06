'use client';
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/buttons/CustomButton";
import { motion } from "framer-motion";
import { EnterDoor } from "@/icons/EnterRoom";
import { Home } from "@/icons/Home";


export default function Dashboard() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);


    useEffect(() => {
        console.log(isAuthenticated);
        console.log(authLoading);
        console.log(isLoggedIn);
        console.log(error);
    } , [isAuthenticated, authLoading, isLoggedIn, error]);

    // Checking authentication status
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/auth/user/session`, {
                    withCredentials: true
                });
                setIsAuthenticated(response.status === 200);
            } catch (error) {
                console.error("Authentication check failed:", error);
                setIsAuthenticated(false);
                router.push("/");
            } finally {
                setAuthLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    useEffect(() => {
        async function getUserData() {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/auth/user/me`, {
                    withCredentials: true,
                });
                console.log(response.data)
                setEmail(response.data.finalUserData.email);
                setUsername(response.data.finalUserData.username);
                // setContactNumber(response.data.finalUserData.contactNumber);
            } catch (err) {
                console.error("Failed to fetch user data:", err);
                setError("Failed to fetch user data.");
            } finally {
                setLoading(false);
            }
        }
        getUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post(`${BACKEND_URL}/api/v1/auth/user/logout`, {}, { withCredentials: true });
            setIsLoggedIn(false);
            router.push("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

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
                <div className="flex justify-center items-center p-2">
                    <div className="w-full flex md:flex-row flex-col items-center justify-center gap-3 md:gap-10 max-w-screen-lg cursor-pointer h-36 border-2 mt-2 border-amber-300 rounded-2xl shadow-sm shadow-blue-200 hover:shadow-lg hover:shadow-emerald-200 transition-all duration-500 p-4">
                        <div>
                            <Button variant="blue_variant" onClick={() => { router.push('/') }} endIcon={<Home />} text="Home" />
                        </div>

                        <div>
                            <Button variant="red_variant" onClick={handleLogout} endIcon={<EnterDoor />} text="Logout" />
                        </div>
                    </div>
                </div>

                {loading ? (<div className="flex font-bold text-green-300 text-4xl mt-20 justify-center items-center">
                    Loading...
                </div>) : (<>
                    <div className="text-center cursor-pointer font-extrabold text-xl md:text-4xl mt-20 flex items-center justify-center gap-2">
                        Hello {username}!
                    </div>

                    <div className="flex item-center cursor-pointer mt-3 hover:underline justify-center font-bold text-blue-500 text-xl md:text-2xl">
                        {email}
                    </div></>)}

            </div>
        </div>
    )
}