import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import ReactPlayer from "react-player";
import { Link, usePage } from "@inertiajs/react";

export default function MoviePlayPage() {
    const { movie } = usePage().props;

    return (
        <GuestLayout>
            <div className="max-w-5xl mx-auto py-10 px-4 text-[#EDEDED]">
                <div className="mb-6">
                    <Link
                        href={route("movies.index")}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#444444] hover:bg-[#DA0037] transition"
                    >
                        ← Back
                    </Link>
                </div>

                <div className="bg-[#171717] rounded-2xl p-6 shadow-xl">
                    <h1 className="text-3xl font-bold mb-6 text-[#DA0037]">
                        {movie.title}
                    </h1>

                    <div className="w-full rounded-xl overflow-hidden">
                        <ReactPlayer
                            url={`/storage/${movie.storage_url}`}
                            controls
                            width="100%"
                            height="500px"
                        />
                    </div>

                    <p className="mt-4 text-sm text-gray-300">
                        Kamu sedang menonton. Selamat menikmati.
                    </p>
                </div>
            </div>
        </GuestLayout>
    );
}
