import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, usePage, router } from "@inertiajs/react";
import { toast, Toaster } from "react-hot-toast";
import LoginModal from "@/Components/LoginModal";
import RegisterModal from "@/Components/RegisterModal";

export default function Topbar() {
    const { auth, flash } = usePage().props;
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isRegisterOpen, setRegisterOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    // Flash messages
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, {
                duration: 3000,
                position: "top-right",
            });
        }
        if (flash?.error) {
            toast.error(flash.error, { duration: 3000, position: "top-right" });
        }
    }, [flash]);

    // Logout handler
    const handleLogout = () => {
        router.post(
            route("logout"),
            {},
            {
                onSuccess: () => {
                    toast.success("You have been logged out successfully!", {
                        duration: 2000,
                    });
                    setShowUserMenu(false);
                },
            }
        );
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showUserMenu && !event.target.closest(".user-menu")) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [showUserMenu]);

    return (
        <>
            <Toaster />

            <header className="bg-transparent backdrop-blur-md sticky top-0 z-40 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center hover:opacity-80 transition-opacity"
                    >
                        <img
                            src="/storage/movies/PhylosopictureSamping.png"
                            alt="Phylosopicture Logo"
                            className="h-8 w-auto"
                            onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextElementSibling.style.display =
                                    "block";
                            }}
                        />
                        <span
                            className="text-2xl font-bold text-white hidden"
                            style={{ display: "none" }}
                        >
                            🎥 Phylosopicture
                        </span>
                    </Link>

                    {/* Menu */}
                    <nav className="hidden md:flex gap-8 text-white/90 font-medium">
                        <Link
                            href={route("home")}
                            className="hover:text-[#DA0037] transition-colors relative group"
                        >
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#DA0037] transition-all group-hover:w-full"></span>
                        </Link>
                        <Link
                            href={route("news.index")}
                            className="hover:text-[#DA0037] transition-colors relative group"
                        >
                            News
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#DA0037] transition-all group-hover:w-full"></span>
                        </Link>
                        <Link
                            href={route("movies.index")}
                            className="hover:text-[#DA0037] transition-colors relative group"
                        >
                            Movies
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#DA0037] transition-all group-hover:w-full"></span>
                        </Link>
                    </nav>

                    {/* Auth Section */}
                    {auth?.user ? (
                        <div className="relative user-menu">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-3 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-medium transition-all"
                            >
                                <div className="w-8 h-8 bg-gradient-to-r from-[#DA0037] to-red-600 rounded-full flex items-center justify-center text-sm font-bold">
                                    {auth.user.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="hidden md:block">
                                    Hello, {auth.user.name.split(" ")[0]}
                                </span>
                                <svg
                                    className={`w-4 h-4 transition-transform ${
                                        showUserMenu ? "rotate-180" : ""
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            <AnimatePresence>
                                {showUserMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-2 w-64 bg-black/90 border border-white/10 rounded-2xl shadow-2xl py-2"
                                    >
                                        <div className="px-4 py-3 border-b border-white/10">
                                            <p className="text-white font-semibold">
                                                {auth.user.name}
                                            </p>
                                            <p className="text-gray-400 text-xs">
                                                {auth.user.email}
                                            </p>
                                        </div>
                                        <div className="py-2">
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 w-full text-left"
                                            >
                                                <span className="text-sm font-medium">
                                                    Logout
                                                </span>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <button
                                onClick={() => setLoginOpen(true)}
                                className="px-6 py-2.5 text-sm bg-[#DA0037] hover:bg-[#DA0037]/90 rounded-full text-white font-semibold transition-all"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setRegisterOpen(true)}
                                className="px-6 py-2.5 text-sm bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-semibold transition-all"
                            >
                                Register
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Modals */}
            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setLoginOpen(false)}
            />
            <RegisterModal
                isOpen={isRegisterOpen}
                onClose={() => setRegisterOpen(false)}
            />
        </>
    );
}
