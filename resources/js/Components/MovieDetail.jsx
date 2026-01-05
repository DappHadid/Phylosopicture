import React, { useState, useEffect } from "react"; // --- BARU --- : Impor useState dan useEffect
import PropTypes from "prop-types";
import axios from "axios"; // --- BARU --- : Impor axios untuk memanggil API

// Hapus Link dari inertia jika tidak digunakan lagi untuk tombol beli
// import { Link } from "@inertiajs/react";

export default function MovieDetail({ movie }) {
    // ... (semua konstanta format data Anda tetap sama) ...
    const genreName = movie.genre?.name ?? "Unknown Genre";
    const releaseYear = movie.release_year ?? "Unknown Year";
    const formatDuration = (minutes) => {
        if (!minutes) return "1h 30m";
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    };
    const duration = formatDuration(movie.duration);
    const price = movie.price
        ? new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
          }).format(movie.price)
        : "Price Not Available";
    const rating = movie.rating ? `${movie.rating.toFixed(1)}/10` : "No Rating";

    // --- BARU --- : State untuk loading dan error
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // --- BARU --- : useEffect untuk memuat script Snap.js
    useEffect(() => {
        // Ambil client key dari .env di sisi frontend
        const midtransScriptUrl =
            "https://app.sandbox.midtrans.com/snap/snap.js";
        // Ganti dengan Client Key Midtrans Anda
        const myMidtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

        let script = document.createElement("script");
        script.src = midtransScriptUrl;
        script.setAttribute("data-client-key", myMidtransClientKey);
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // --- BARU --- : Fungsi untuk menangani proses pembayaran
    const handleBuyTicket = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // 1. Panggil API backend untuk membuat transaksi
            const response = await axios.post("/api/create-transaction", {
                movie_id: movie.movie_id,
            });

            const { snap_token } = response.data;

            if (!snap_token) {
                throw new Error("Snap token not received from server.");
            }

            // 2. Tampilkan pop-up pembayaran Midtrans
            window.snap.pay(snap_token, {
                onSuccess: function (result) {
                    console.log("success", result);
                    alert(
                        "Pembayaran berhasil! Anda sekarang memiliki akses ke film ini."
                    );
                    // Di sini Anda bisa redirect atau refresh halaman jika perlu
                },
                onPending: function (result) {
                    console.log("pending", result);
                    alert("Menunggu pembayaran Anda!");
                },
                onError: function (result) {
                    console.log("error", result);
                    setError("Pembayaran gagal.");
                },
                onClose: function () {
                    console.log(
                        "customer closed the popup without finishing the payment"
                    );
                },
            });
        } catch (err) {
            console.error("Payment Error:", err);
            setError(
                err.response?.data?.message ||
                    "Terjadi kesalahan. Silakan coba lagi."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 p-6 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* ... (bagian Cover Banner Anda tetap sama) ... */}
                <div className="relative w-full h-80 mb-8 overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-gray-100 to-gray-200">
                    <img
                        src={
                            movie.thumbnail_url
                                ? `/storage/${movie.thumbnail_url}`
                                : "/images/default-thumbnail.jpg"
                        }
                        alt={`${movie.title} Cover`}
                        className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6">
                        <h2 className="text-4xl font-extrabold text-white drop-shadow-lg tracking-tight">
                            {movie.title}
                        </h2>
                        <div className="flex items-center gap-4 mt-3">
                            <span className="text-gray-200 text-sm font-medium">
                                {releaseYear} • {duration}
                            </span>
                            <span className="text-yellow-400 text-sm font-semibold">
                                ★ {rating}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ... (bagian Poster and Details Anda, tapi kita ubah tombolnya) ... */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="md:col-span-1">
                        <div className="relative overflow-hidden rounded-2xl shadow-xl">
                            <img
                                src={
                                    movie.thumbnail_url
                                        ? `/storage/${movie.thumbnail_url}`
                                        : "/images/default-thumbnail.jpg"
                                }
                                alt={movie.title}
                                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
                            />
                            <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                                {genreName}
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-2 space-y-8">
                        <div>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {movie.description ??
                                    "No description available."}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4 items-center">
                            {/* --- BARU --- : Tombol diubah menjadi button dengan onClick */}
                            <button
                                onClick={handleBuyTicket}
                                disabled={isLoading}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Memproses..." : "Beli Tiket"}
                            </button>

                            {/* ... (tombol-tombol lain tetap sama) ... */}
                        </div>

                        {/* --- BARU --- : Tampilkan pesan error jika ada */}
                        {error && <p className="text-red-500 mt-4">{error}</p>}

                        {/* ... (sisa kode detail movie Anda tetap sama) ... */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-600 text-sm">
                            <p>
                                <strong className="font-semibold text-gray-900">
                                    Movie ID:
                                </strong>{" "}
                                {movie.movie_id}
                            </p>
                            <p>
                                <strong className="font-semibold text-gray-900">
                                    Genre ID:
                                </strong>{" "}
                                {movie.genre_id ?? "Unknown"}
                            </p>
                            <p>
                                <strong className="font-semibold text-gray-900">
                                    Penulis:
                                </strong>{" "}
                                {movie.producer ?? "Unknown"}
                            </p>
                            <p>
                                <strong className="font-semibold text-gray-900">
                                    Sutradara:
                                </strong>{" "}
                                {movie.director ?? "Unknown"}
                            </p>
                            <p>
                                <strong className="font-semibold text-gray-900">
                                    Harga:
                                </strong>{" "}
                                {price}
                            </p>
                            <p>
                                <strong className="font-semibold text-gray-900">
                                    Storage URL:
                                </strong>{" "}
                                {movie.storage_url ?? "Not Available"}
                            </p>
                            <p>
                                <strong className="font-semibold text-gray-900">
                                    Thumbnail URL:
                                </strong>{" "}
                                {movie.thumbnail_url ?? "Not Available"}
                            </p>
                            <p>
                                <strong className="font-semibold text-gray-900">
                                    Slug:
                                </strong>{" "}
                                {movie.slug ?? "Not Available"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ... (PropTypes Anda tetap sama) ...
MovieDetail.propTypes = {
    movie: PropTypes.shape({
        movie_id: PropTypes.number.isRequired,
        genre_id: PropTypes.number,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        producer: PropTypes.string,
        director: PropTypes.string,
        price: PropTypes.number,
        duration: PropTypes.number,
        rating: PropTypes.number,
        release_year: PropTypes.number,
        storage_url: PropTypes.string,
        thumbnail_url: PropTypes.string,
        genre: PropTypes.shape({
            name: PropTypes.string,
        }),
        slug: PropTypes.string,
    }).isRequired,
};
