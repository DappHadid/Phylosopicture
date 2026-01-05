import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { usePage, Link, useForm, router } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import axios from "axios";

// --- Komponen Helper ---
const StarRating = ({ rating, totalStars = 5 }) => {
    const fullStars = Math.round(rating);
    return (
        <div className="flex items-center">
            {[...Array(totalStars)].map((_, index) => (
                <svg
                    key={index}
                    className={`w-5 h-5 ${
                        index < fullStars ? "text-yellow-400" : "text-gray-500"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.073 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95.69l1.286-3.96z" />
                </svg>
            ))}
        </div>
    );
};

// --- Komponen Utama Halaman Detail ---
export default function MovieDetail() {
    // Ambil semua data yang sudah disiapkan dari MovieController@show
    const {
        movie,
        auth,
        user_has_purchased,
        average_rating,
        rating_count,
        user_rating,
    } = usePage().props;

    // Gunakan useForm dari Inertia untuk menangani form rating
    const { data, setData, post, processing, errors } = useForm({
        rating: user_rating || 0, // Nilai awal rating adalah rating user saat ini
    });

    // Method untuk menangani proses pembelian film
    const handleBuy = () => {
        axios
            .post(route("movie.buy", movie.slug))
            .then((res) => {
                if (res.data.snap_token) {
                    window.snap.pay(res.data.snap_token, {
                        onSuccess: () => {
                            toast.success("Payment successful! 🎉");
                            // Reload prop 'user_has_purchased' agar UI update tanpa refresh halaman
                            router.reload({
                                only: ["user_has_purchased", "user_rating"],
                            });
                        },
                        onPending: () =>
                            toast("Waiting for payment...", { icon: "⏳" }),
                        onError: () => toast.error("Payment failed."),
                        onClose: () =>
                            toast("You closed the payment popup.", {
                                icon: "⚠️",
                            }),
                    });
                } else {
                    toast.error("Failed to get payment token.");
                }
            })
            .catch(() => toast.error("An error occurred during payment."));
    };

    // Method untuk memberi tahu user yang belum login
    const handleLoginAlert = () => {
        toast.error("You must login first to buy this movie.");
    };

    // Method untuk mengirim data rating ke RatingController
    const handleRateSubmit = (e) => {
        e.preventDefault();
        post(route("movie.rate", movie.slug), {
            preserveScroll: true, // Agar halaman tidak scroll ke atas setelah submit
            onSuccess: () => {
                toast.success("Rating submitted successfully! 🎉");
            },
            onError: (errs) => {
                const errorMessage =
                    errs.rating || "Failed to submit rating. Please try again.";
                toast.error(errorMessage);
            },
        });
    };

    return (
        <GuestLayout>
            <div className="max-w-5xl mx-auto py-10 px-4 text-[#EDEDED]">
                <div className="mb-6">
                    <Link
                        href={route("movies.index")}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#444444] hover:bg-[#DA0037] transition"
                    >
                        <span className="text-lg">←</span> Back
                    </Link>
                </div>

                <div className="bg-[#171717] rounded-2xl shadow-xl overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        {/* Poster dengan Rating & Play Button Overlay */}
                        <div className="w-full md:w-1/3 relative group">
                            <img
                                src={`/storage/${movie.thumbnail_url}`}
                                alt={movie.title}
                                className="w-full h-full object-cover aspect-[4199/5939]"
                            />
                            {/* 1. Rating Badge di pojok kiri atas */}
                            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm p-2 rounded-lg flex items-center gap-2">
                                <StarRating rating={average_rating} />
                                <span className="text-white text-sm font-semibold">
                                    {Number(average_rating).toFixed(1)} (
                                    {rating_count})
                                </span>
                            </div>

                            {/* 3. Hover-to-Play (hanya untuk user yang sudah beli) */}
                            {user_has_purchased && (
                                <Link
                                    href={route("movie.play", movie.slug)}
                                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                                >
                                    <div className="w-20 h-20 bg-[#DA0037] rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                                        <svg
                                            className="w-10 h-10 text-white ml-2"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M6.32 2.577a.75.75 0 011.36 0l4.25 7.5a.75.75 0 010 .846l-4.25 7.5a.75.75 0 01-1.36-.846L10.09 10 6.32 3.423a.75.75 0 010-.846z" />
                                        </svg>
                                    </div>
                                </Link>
                            )}
                        </div>

                        {/* Detail Film */}
                        <div className="flex-1 p-6 flex flex-col">
                            <div className="space-y-4">
                                <h1 className="text-4xl font-extrabold text-[#DA0037] tracking-wide">
                                    {movie.title}
                                </h1>
                                {movie.genre && (
                                    <p className="text-sm text-[#EDEDED]/70">
                                        Genre: {movie.genre.name}
                                    </p>
                                )}
                                <p className="text-sm text-[#EDEDED]/70">
                                    Director: {movie.director}
                                </p>
                                <p className="text-sm text-[#EDEDED]/70">
                                    Producer: {movie.producer}
                                </p>
                                <p className="text-base leading-relaxed text-justify">
                                    {movie.description}
                                </p>
                                <p className="text-xl font-bold text-green-500">
                                    Price: Rp{" "}
                                    {Number(movie.price).toLocaleString(
                                        "id-ID"
                                    )}
                                </p>
                            </div>

                            <div className="mt-auto pt-6">
                                {/* Tombol Aksi: Beli atau Sudah Dibeli */}
                                <div className="flex items-center gap-4 mb-6">
                                    {auth?.user ? (
                                        user_has_purchased ? (
                                            <button
                                                disabled
                                                className="bg-green-600 text-white px-6 py-3 rounded-xl shadow cursor-not-allowed"
                                            >
                                                ✓ Purchased
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleBuy}
                                                className="bg-[#DA0037] text-[#EDEDED] px-6 py-3 rounded-xl shadow hover:bg-red-700 transition"
                                            >
                                                Buy Now
                                            </button>
                                        )
                                    ) : (
                                        <button
                                            onClick={handleLoginAlert}
                                            className="bg-[#444444] text-[#EDEDED] px-6 py-3 rounded-xl shadow hover:bg-[#DA0037] transition"
                                        >
                                            Login to Buy
                                        </button>
                                    )}
                                </div>

                                {/* 2. Fitur Pemberian Rating (hanya untuk user yang sudah beli) */}
                                {user_has_purchased && (
                                    <div className="border-t border-white/10 pt-6">
                                        <h3 className="text-xl font-bold mb-4">
                                            {user_rating
                                                ? "Change Your Rating"
                                                : "Give Your Rating"}
                                        </h3>
                                        <form
                                            onSubmit={handleRateSubmit}
                                            className="flex items-center gap-4"
                                        >
                                            <div className="flex items-center">
                                                {[...Array(5)].map(
                                                    (_, index) => {
                                                        const ratingValue =
                                                            index + 1;
                                                        return (
                                                            <button
                                                                type="button"
                                                                key={
                                                                    ratingValue
                                                                }
                                                                onClick={() =>
                                                                    setData(
                                                                        "rating",
                                                                        ratingValue
                                                                    )
                                                                }
                                                                className="focus:outline-none"
                                                            >
                                                                <svg
                                                                    className={`w-8 h-8 transition-colors ${
                                                                        ratingValue <=
                                                                        data.rating
                                                                            ? "text-yellow-400"
                                                                            : "text-gray-600 hover:text-yellow-300"
                                                                    }`}
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.073 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95.69l1.286-3.96z" />
                                                                </svg>
                                                            </button>
                                                        );
                                                    }
                                                )}
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={
                                                    processing ||
                                                    data.rating === 0
                                                }
                                                className="px-6 py-2 rounded-xl bg-[#DA0037] hover:bg-red-700 transition disabled:opacity-50"
                                            >
                                                {processing
                                                    ? "Saving..."
                                                    : "Save Rating"}
                                            </button>
                                        </form>
                                        {errors.rating && (
                                            <p className="text-red-500 text-sm mt-2">
                                                {errors.rating}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
