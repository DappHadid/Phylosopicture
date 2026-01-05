import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import ValidationErrors from "@/Components/ValidationErrors";

export default function RegisterPage() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    const handleGoogleRegister = () => {
        window.location.href = route("socialite.redirect", {
            provider: "google",
        });
    };

    return (
        <div className="mx-auto min-h-screen w-full bg-black text-white md:px-10 px-3">
            <Head title="Sign Up" />
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed top-0 left-0 hidden lg:block h-full w-1/2">
                    <img
                        src="/images/signup-image.png"
                        className="object-cover w-full h-full"
                        alt="Ilustrasi Halaman Registrasi"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                                "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                        }}
                    />
                </div>
                <div className="relative z-10 w-full max-w-md lg:ml-[50%] lg:px-16">
                    <div>
                        <img
                            src="/images/moonton-white.svg"
                            alt="Logo Moonton"
                            className="mb-12"
                            onError={(e) => {
                                e.target.style.display = "none";
                            }}
                        />
                        <div className="my-[50px]">
                            <div className="font-semibold text-3xl mb-3">
                                Sign Up
                            </div>
                            <p className="text-base text-gray-1 leading-7">
                                Explore our new movies and get <br />
                                the better insight for your life
                            </p>
                            <ValidationErrors errors={errors} />
                        </div>

                        <form className="w-full" onSubmit={submit}>
                            <div className="flex flex-col gap-6">
                                {/* Input untuk Full Name */}
                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="Full Name"
                                        className="text-base block mb-2"
                                    />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="rounded-2xl bg-form-bg py-3 px-5 w-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-alerange"
                                        placeholder="Your full name..."
                                        isFocused={true}
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2 text-red-500"
                                    />
                                </div>
                                {/* Input untuk Email */}
                                <div>
                                    <InputLabel
                                        htmlFor="email"
                                        value="Email Address"
                                        className="text-base block mb-2"
                                    />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="rounded-2xl bg-form-bg py-3 px-5 w-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-alerange"
                                        placeholder="Your email address..."
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2 text-red-500"
                                    />
                                </div>
                                {/* Input untuk Password */}
                                <div>
                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                        className="text-base block mb-2"
                                    />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className="rounded-2xl bg-form-bg py-3 px-5 w-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-alerange"
                                        placeholder="Your password..."
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-2 text-red-500"
                                    />
                                </div>
                                {/* Input untuk Confirm Password */}
                                <div>
                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="Confirm Password"
                                        className="text-base block mb-2"
                                    />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        className="rounded-2xl bg-form-bg py-3 px-5 w-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-alerange"
                                        placeholder="Confirm your password..."
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2 text-red-500"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 mt-8">
                                <button
                                    type="submit"
                                    className="rounded-2xl bg-alerange hover:bg-alerange/90 transition-colors py-3 text-center font-semibold disabled:opacity-50 w-full text-white"
                                    disabled={processing}
                                >
                                    {processing
                                        ? "Creating Account..."
                                        : "Sign Up"}
                                </button>
                                <Link
                                    href={route("login")}
                                    className="rounded-2xl border border-gray-600 hover:bg-gray-800 transition-colors py-3 text-center"
                                >
                                    Sign In to My Account
                                </Link>
                            </div>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center my-6">
                            <div className="flex-1 border-t border-gray-600"></div>
                            <span className="px-4 text-gray-400 text-sm">
                                or
                            </span>
                            <div className="flex-1 border-t border-gray-600"></div>
                        </div>

                        {/* Google Register Button */}
                        <div className="mb-6">
                            <button
                                type="button"
                                onClick={handleGoogleRegister}
                                className="w-full rounded-2xl bg-white hover:bg-gray-100 transition-colors py-3 px-5 text-black font-medium flex items-center justify-center gap-3"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Sign up with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
