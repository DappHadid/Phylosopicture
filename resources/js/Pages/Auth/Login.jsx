import { Head, Link, useForm } from "@inertiajs/react";

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function LoginPage() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });
    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };
    return (
        <div className="mx-auto max-w-screen min-h-screen bg-black text-white md:px-10 px-3">
            <div className="fixed top-[-50px] hidden lg:block">
                <img
                    src="/images/signup-image.png"
                    className="hidden laptopLg:block laptopLg:max-w-[450px] laptopXl:max-w-[640px]"
                    alt=""
                />
            </div>
            <div className="py-24 flex laptopLg:ml-[680px] laptopXl:ml-[870px]">
                <div>
                    <img src="/images/moonton-white.svg" alt="" />
                    <div className="my-[70px]">
                        <div className="font-semibold text-[26px] mb-3">
                            Welcome Back
                        </div>
                        <p className="text-base text-[#767676] leading-7">
                            Explore our new movies and get <br />
                            the better insight for your life
                        </p>
                    </div>
                    <form className="w-[370px]" onSubmit={submit}>
                        <div className="flex flex-col gap-6">
                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="Email Address"
                                    className="text-base block mb-2"
                                ></InputLabel>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="rounded-2xl bg-[#1E1E1E] py-3 px-5 w-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Email Address"
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2 text-red-500"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                    className="text-base mb-2 block"
                                />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="rounded-2xl bg-[#1E1E1E] py-3 px-5 w-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Password"
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2 text-red-500"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 mt-8">
                            <Link>
                                <button
                                    type="submit"
                                    className="rounded-2xl bg-orange-500 hover:bg-orange-600 transition-colors py-3 text-center font-semibold disabled:opacity-50"
                                    disabled={processing}
                                >
                                    Start Watching
                                </button>
                            </Link>
                            <Link
                                href={route("register")}
                                className="rounded-2xl border border-gray-600 hover:bg-gray-800 transition-colors py-3 text-center"
                            >
                                Create New Account
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
