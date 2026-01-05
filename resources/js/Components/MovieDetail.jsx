import React from "react";
import PropTypes from "prop-types";
import { Link } from "@inertiajs/react";

export default function MovieDetail({ movie }) {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-6xl mx-auto">
                {/* Cover Banner */}
                <div className="relative w-full h-64 mb-8 overflow-hidden rounded-xl shadow-2xl">
                    <img
                        src={movie.cover || movie.thumbnail} // Gunakan cover jika ada, jika tidak pakai thumbnail
                        alt={`${movie.name} Cover`}
                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-6">
                        <h2 className="text-3xl font-bold text-white drop-shadow-md">
                            {movie.name}
                        </h2>
                        <div className="flex items-center gap-4 mt-2">
                            <span className="text-gray-400 text-sm">
                                {movie.releaseYear || "2018"} •{" "}
                                {movie.duration || "1h 30m"} Menit
                            </span>
                            <span className="text-yellow-400 text-sm">
                                ★ 8.5/10
                            </span>{" "}
                            {/* Rating contoh, bisa diubah */}
                        </div>
                    </div>
                </div>

                {/* Poster dan Detail */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <div className="relative overflow-hidden rounded-xl shadow-2xl">
                            <img
                                src={movie.thumbnail}
                                alt={movie.name}
                                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                            />
                            <div className="absolute top-4 left-4 bg-blue-500 text-xs px-2 py-1 rounded-full opacity-90">
                                {movie.category}
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-3 space-y-6">
                        <div>
                            <p className="text-gray-300 leading-relaxed">
                                {movie.description ||
                                    "Tidak ada deskripsi tersedia untuk film ini."}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href={`/buy/${movie.slug}`}
                                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Beli Tiket
                            </Link>
                            <Link
                                href={`/watch/${movie.slug}`} // Rute fiktif untuk play
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Putar Sekarang
                            </Link>
                            <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1">
                                Daftar
                            </button>
                            <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1">
                                Bagikan
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                            <p>
                                <strong>Pemeran:</strong>{" "}
                                {movie.cast ||
                                    "Siti Arita, Jihan Kler, Ical D'Academy, Vira Kdi, Yuluar Arief"}
                            </p>
                            <p>
                                <strong>Harga:</strong> Rp
                                {movie.price || "20.000"},00
                            </p>
                            <p>
                                <strong>Penulis:</strong>{" "}
                                {movie.writer || "Aca Hasauddin Mt"}
                            </p>
                            <p>
                                <strong>Sutradara:</strong>{" "}
                                {movie.director || "Aca Hasauddin Mt"}
                            </p>
                            <p className="col-span-2">
                                <strong>Perusahaan Produksi:</strong>{" "}
                                {movie.production || "SKY Movie Entertainment"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

MovieDetail.propTypes = {
    movie: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired,
        cover: PropTypes.string, // Tambahkan prop untuk cover
        duration: PropTypes.string,
        price: PropTypes.string,
        description: PropTypes.string,
        cast: PropTypes.string,
        releaseYear: PropTypes.string,
        writer: PropTypes.string,
        director: PropTypes.string,
        production: PropTypes.string,
    }).isRequired,
};
