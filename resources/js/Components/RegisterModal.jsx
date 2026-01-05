import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, router } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { toast } from "react-hot-toast";

export default function RegisterModal({ isOpen, onClose }) {
    const registerForm = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        "g-recaptcha-response": "",
    });

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        if (!window.grecaptcha) {
            toast.error("Captcha not loaded yet. Please try again.");
            return;
        }

        try {
            const token = await window.grecaptcha.execute(
                import.meta.env.VITE_RECAPTCHA_SITE_KEY,
                { action: "register" }
            );

            registerForm.setData("g-recaptcha-response", token);

            registerForm.post(route("register"), {
                onFinish: () =>
                    registerForm.reset("password", "password_confirmation"),
                onSuccess: () => {
                    onClose();
                    toast.success("Welcome to Phylosopicture!", {
                        duration: 3000,
                    });
                    router.visit(route("home"));
                },
                onError: () => {
                    toast.error(
                        "Registration failed. Please check your information.",
                        { duration: 4000 }
                    );
                },
            });
        } catch (error) {
            toast.error("Captcha validation failed. Please try again.");
        }
    };

    const handleGoogleRegister = () => {
        window.location.href = route("socialite.redirect", {
            provider: "google",
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-black/90 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md text-white relative overflow-hidden"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>

                        <div className="mb-8">
                            <h2 className="text-3xl font-bold mb-2">
                                Join Phylosopicture
                            </h2>
                            <p className="text-gray-400">
                                Create your account to start watching
                            </p>
                        </div>
                        <form
                            onSubmit={handleRegisterSubmit}
                            className="space-y-6"
                        >
                            {/* Full Name */}
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Full Name"
                                    className="block text-sm font-medium text-[#EDEDED]"
                                />
                                <TextInput
                                    id="name"
                                    type="text"
                                    value={registerForm.data.name}
                                    onChange={(e) =>
                                        registerForm.setData(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    className="w-full mt-1 bg-[#444444] border-gray-600 text-[#EDEDED] rounded-lg focus:ring-2 focus:ring-[#DA0037] focus:border-[#DA0037] transition duration-200"
                                    autoComplete="name"
                                />
                                <InputError
                                    message={registerForm.errors.name}
                                    className="mt-2 text-sm text-[#DA0037]"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="Email"
                                    className="block text-sm font-medium text-[#EDEDED]"
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    value={registerForm.data.email}
                                    onChange={(e) =>
                                        registerForm.setData(
                                            "email",
                                            e.target.value
                                        )
                                    }
                                    className="w-full mt-1 bg-[#444444] border-gray-600 text-[#EDEDED] rounded-lg focus:ring-2 focus:ring-[#DA0037] focus:border-[#DA0037] transition duration-200"
                                    autoComplete="email"
                                />
                                <InputError
                                    message={registerForm.errors.email}
                                    className="mt-2 text-sm text-[#DA0037]"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                    className="block text-sm font-medium text-[#EDEDED]"
                                />
                                <TextInput
                                    id="password"
                                    type="password"
                                    value={registerForm.data.password}
                                    onChange={(e) =>
                                        registerForm.setData(
                                            "password",
                                            e.target.value
                                        )
                                    }
                                    className="w-full mt-1 bg-[#444444] border-gray-600 text-[#EDEDED] rounded-lg focus:ring-2 focus:ring-[#DA0037] focus:border-[#DA0037] transition duration-200"
                                    autoComplete="new-password"
                                />
                                <InputError
                                    message={registerForm.errors.password}
                                    className="mt-2 text-sm text-[#DA0037]"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                    className="block text-sm font-medium text-[#EDEDED]"
                                />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    value={
                                        registerForm.data.password_confirmation
                                    }
                                    onChange={(e) =>
                                        registerForm.setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    className="w-full mt-1 bg-[#444444] border-gray-600 text-[#EDEDED] rounded-lg focus:ring-2 focus:ring-[#DA0037] focus:border-[#DA0037] transition duration-200"
                                    autoComplete="new-password"
                                />
                                <InputError
                                    message={
                                        registerForm.errors
                                            .password_confirmation
                                    }
                                    className="mt-2 text-sm text-[#DA0037]"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#DA0037] hover:bg-red-700 py-3 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-[1.01] shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#171717] focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={registerForm.processing}
                            >
                                {registerForm.processing
                                    ? "Creating Account..."
                                    : "Create Account"}
                            </button>
                        </form>

                        <div className="flex items-center my-6">
                            <div className="flex-1 border-t border-white/20"></div>
                            <span className="px-4 text-gray-400 text-sm">
                                or
                            </span>
                            <div className="flex-1 border-t border-white/20"></div>
                        </div>

                        {/* Button Google */}
                        <button
                            type="button"
                            onClick={handleGoogleRegister}
                            className="w-full bg-white hover:bg-gray-50 py-3 px-4 rounded-xl text-black font-semibold flex items-center justify-center gap-3"
                        >
                            {/* Google Logo */}
                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 
            1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 
            3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 
            1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 
            20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 
            8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 
            1.64l3.15-3.15C17.45 2.09 14.97 1 
            12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 
            2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Continue with Google
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
