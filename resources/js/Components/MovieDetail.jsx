import React from "react";
import PropTypes from "prop-types";
import { Link } from "@inertiajs/react";

export default function MovieDetail({ movie }) {
    const genreName = movie.genre ? movie.genre.name : "Unknown Genre";
    const releaseYear = movie.release_year || "2018";
    const duration = movie.duration || "1h 30m";
    const price = movie.price
        ? `Rp ${movie.price.toLocaleString()},00`
        : "Rp 20.000,00";
    const rating = movie.rating ? `${movie.rating.toFixed(1)}/10` : "8.5/10";

    return (
        <div className="min-h-screen bg-white text-gray-900 p-6 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Cover Banner */}
                <div className="relative w-full h-80 mb-8 overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-gray-100 to-gray-200">
                    <img
                        src={
                            movie.thumbnail_url ||
                            "/images/default-thumbnail.jpg"
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

                {/* Poster and Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="md:col-span-1">
                        <div className="relative overflow-hidden rounded-2xl shadow-xl">
                            <img
                                src={
                                    movie.thumbnail_url ||
                                    "/images/default-thumbnail.jpg"
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
                                {movie.description ||
                                    "Tidak ada deskripsi tersedia untuk film ini."}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href={route("movie.buy", { slug: movie.slug })}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                            >
                                Beli Tiket
                            </Link>
                            <Link
                                href={route("movie.buy", { slug: movie.slug })}
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                            >
                                Putar Sekarang
                            </Link>
                            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                                Daftar
                            </button>
                            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                                Bagikan
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-600 text-sm">
                            <p>
                                <strong className="font-semibold text-gray-900">
                                    Pemeran:
                                </strong>{" "}
                                {movie.cast ||
                                    "Siti Arita, Jihan Kler, Ical D'Academy"}
                            </p>
                            <p>
                                <strong className="font-semibold text-gray-900">
                                    Harga:
                                </strong>{" "}
                                {price}
                            </p>
                            <p>
                                <strong className="font-semibold text-gray-900">
                                    Penulis:
                                </strong>{" "}
                                {movie.scriptwriter || "Aca Hasauddin Mt"}
                            </p>
                            <p>
                                <strong className="font-semibold text-gray-900">
                                    Sutradara:
                                </strong>{" "}
                                {movie.director || "Aca Hasauddin Mt"}
                            </p>
                            <p className="sm:col-span-2">
                                <strong className="font-semibold text-gray-900">
                                    Perusahaan Produksi:
                                </strong>{" "}
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
        movie_id: PropTypes.number.isRequired,
        genre_id: PropTypes.number,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        scriptwriter: PropTypes.string,
        director: PropTypes.string,
        price: PropTypes.number,
        duration: PropTypes.number,
        rating: PropTypes.number,
        release_year: PropTypes.number,
        storage_url: PropTypes.string,
        thumbnail_url: PropTypes.string,
        is_featured: PropTypes.bool,
        genre: PropTypes.shape({
            name: PropTypes.string,
        }),
        slug: PropTypes.string,
        cast: PropTypes.string,
        production: PropTypes.string,
    }).isRequired,
};
