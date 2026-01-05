import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, router } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { toast } from "react-hot-toast";

export default function LoginModal({ isOpen, onClose }) {
    const loginForm = useForm({
        email: "",
        password: "",
        remember: false,
        "g-recaptcha-response": "",
    });

    const [recaptchaToken, setRecaptchaToken] = useState("");
    const [isRecaptchaLoading, setIsRecaptchaLoading] = useState(false);
    const [recaptchaError, setRecaptchaError] = useState(false);

    // 🔑 Enhanced recaptcha token loading with retry mechanism
    const loadRecaptchaToken = useCallback(async () => {
        if (!window.grecaptcha || !isOpen) {
            console.log("reCAPTCHA not available or modal not open");
            return;
        }

        setIsRecaptchaLoading(true);
        setRecaptchaError(false);

        console.log(
            "Starting reCAPTCHA token generation at:",
            new Date().toISOString()
        );

        try {
            await new Promise((resolve, reject) => {
                window.grecaptcha.ready(async () => {
                    try {
                        const token = await window.grecaptcha.execute(
                            import.meta.env.VITE_RECAPTCHA_SITE_KEY,
                            { action: "login" }
                        );
                        console.log("reCAPTCHA token generated:", token);
                        setRecaptchaToken(token);
                        setIsRecaptchaLoading(false);
                        resolve(token);
                    } catch (err) {
                        console.error(
                            "Recaptcha token generation failed:",
                            err
                        );
                        setRecaptchaError(true);
                        setIsRecaptchaLoading(false);
                        reject(err);
                    }
                });

                // Timeout after 10 seconds
                setTimeout(() => {
                    reject(new Error("Recaptcha timeout"));
                }, 10000);
            });
        } catch (err) {
            console.error("Recaptcha loading failed:", err);
            setRecaptchaError(true);
            setIsRecaptchaLoading(false);

            // Retry after 2 seconds
            setTimeout(() => {
                if (isOpen) {
                    console.log(
                        "Retrying reCAPTCHA token generation at:",
                        new Date().toISOString()
                    );
                    loadRecaptchaToken();
                }
            }, 2000);
        }
    }, [isOpen]);

    // Load reCAPTCHA script and token
    useEffect(() => {
        // Load reCAPTCHA script only once when component mounts
        if (!window.grecaptcha) {
            const script = document.createElement("script");
            script.src = `https://www.google.com/recaptcha/api.js?render=${
                import.meta.env.VITE_RECAPTCHA_SITE_KEY
            }`;
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);

            script.onload = () => {
                console.log(
                    "reCAPTCHA script loaded at:",
                    new Date().toISOString()
                );
                if (isOpen) {
                    loadRecaptchaToken();
                }
            };

            script.onerror = () => {
                console.error("Failed to load reCAPTCHA script");
                setRecaptchaError(true);
            };

            return () => {
                if (document.body.contains(script)) {
                    document.body.removeChild(script);
                }
            };
        }

        // Load token when modal opens
        if (isOpen && window.grecaptcha) {
            loadRecaptchaToken();
        }

        // Reset states when modal closes
        if (!isOpen) {
            setRecaptchaToken("");
            setIsRecaptchaLoading(false);
            setRecaptchaError(false);
        }
    }, [isOpen, loadRecaptchaToken]);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        console.log("Submit clicked at:", new Date().toISOString());
        console.log("recaptchaToken:", recaptchaToken);
        console.log("grecaptcha available:", !!window.grecaptcha);

        if (!recaptchaToken) {
            console.log("No reCAPTCHA token, attempting to generate");
            toast.error("Preparing security check, please wait...");
            try {
                await loadRecaptchaToken();
                if (!recaptchaToken) {
                    console.log("Token still not available after retry");
                    toast.error("Security check failed. Please try again.");
                    return;
                }
            } catch (err) {
                console.error("Failed to generate token on submit:", err);
                toast.error("Security check failed. Please try again.");
                return;
            }
        }

        console.log("Submitting form with token:", recaptchaToken);

        // Use transform to add the token to the form data before posting
        loginForm.transform((data) => ({
            ...data,
            "g-recaptcha-response": recaptchaToken,
        }));

        loginForm.post(route("login"), {
            preserveScroll: true,
            onSuccess: () => {
                console.log("Login successful at:", new Date().toISOString());
                // tutup modal
                onClose();
                // force reload props auth
                router.reload({ only: ["auth", "flash"] });

                toast.success("Welcome back!", {
                    duration: 3000,
                });
            },
            onError: (errors) => {
                console.log("Login errors:", errors);
                if (errors.email || errors.password) {
                    toast.error("Invalid email or password.", {
                        duration: 3000,
                    });
                } else if (errors["g-recaptcha-response"]) {
                    console.log(
                        "Error captcha:",
                        errors["g-recaptcha-response"]
                    );
                    setRecaptchaToken("");
                    loadRecaptchaToken();
                    toast.error("Security check failed. Retrying...", {
                        duration: 3000,
                    });
                } else {
                    toast.error("Login failed. Please try again.", {
                        duration: 3000,
                    });
                }
            },
            onFinish: () => {
                console.log(
                    "Form submission finished at:",
                    new Date().toISOString()
                );
                // reset password field biar lebih aman
                loginForm.reset("password");
            },
        });
    };

    const handleGoogleLogin = () => {
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
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2"
                        >
                            ✕
                        </button>

                        {/* Header */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold mb-2">
                                Welcome Back
                            </h2>
                            <p className="text-gray-400">
                                Sign in to continue your journey
                            </p>
                        </div>

                        {/* Login Form */}
                        <form
                            onSubmit={handleLoginSubmit}
                            className="space-y-6"
                        >
                            <div>
                                <InputLabel
                                    htmlFor="modal-email"
                                    value="Email Address"
                                    className="block text-sm font-medium text-[#EDEDED]"
                                />
                                <TextInput
                                    id="modal-email"
                                    type="email"
                                    value={loginForm.data.email}
                                    onChange={(e) =>
                                        loginForm.setData(
                                            "email",
                                            e.target.value
                                        )
                                    }
                                    className="w-full mt-1 bg-[#444444] border-gray-600 text-[#EDEDED] rounded-lg focus:ring-2 focus:ring-[#DA0037] focus:border-[#DA0037] transition duration-200"
                                    autoComplete="email"
                                />
                                <InputError
                                    message={loginForm.errors.email}
                                    className="mt-2 text-sm text-[#DA0037]"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="modal-password"
                                    value="Password"
                                    className="block text-sm font-medium text-[#EDEDED]"
                                />
                                <TextInput
                                    id="modal-password"
                                    type="password"
                                    value={loginForm.data.password}
                                    onChange={(e) =>
                                        loginForm.setData(
                                            "password",
                                            e.target.value
                                        )
                                    }
                                    className="w-full mt-1 bg-[#444444] border-gray-600 text-[#EDEDED] rounded-lg focus:ring-2 focus:ring-[#DA0037] focus:border-[#DA0037] transition duration-200"
                                    autoComplete="current-password"
                                />
                                <InputError
                                    message={loginForm.errors.password}
                                    className="mt-2 text-sm text-[#DA0037]"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#DA0037] hover:bg-red-700 py-3 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-[1.01] shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#171717] focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={
                                    loginForm.processing ||
                                    isRecaptchaLoading ||
                                    !recaptchaToken ||
                                    recaptchaError
                                }
                            >
                                {loginForm.processing
                                    ? "Signing In..."
                                    : isRecaptchaLoading
                                    ? "Loading security check..."
                                    : !recaptchaToken || recaptchaError
                                    ? "Preparing secure login..."
                                    : "Start Watching"}
                            </button>

                            {/* reCAPTCHA Status Indicator */}
                            {isRecaptchaLoading && (
                                <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                    <span>
                                        Please wait, verifying security...
                                    </span>
                                </div>
                            )}

                            {recaptchaError && (
                                <div className="text-center text-sm text-yellow-400">
                                    <span>
                                        ⚠️ Security check failed. Retrying
                                        automatically... Please wait a moment.
                                    </span>
                                </div>
                            )}
                        </form>

                        {/* Divider */}
                        <div className="flex items-center my-6">
                            <div className="flex-1 border-t border-white/20"></div>
                            <span className="px-4 text-gray-400 text-sm">
                                or
                            </span>
                            <div className="flex-1 border-t border-white/20"></div>
                        </div>

                        {/* Google Login */}
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-full bg-white hover:bg-gray-50 py-3 px-4 rounded-xl text-black font-semibold flex items-center justify-center gap-3"
                        >
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
