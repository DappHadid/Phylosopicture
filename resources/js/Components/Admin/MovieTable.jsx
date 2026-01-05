import React from "react";
import { Link, router } from "@inertiajs/react";
import PropTypes from "prop-types";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

function Pagination({ links }) {
    return (
        <div className="mt-6 flex justify-center">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url || "#"}
                    preserveScroll
                    className={`px-4 py-2 mx-1 text-sm rounded-md transition ${
                        link.active
                            ? "bg-[#DA0037] text-white"
                            : "bg-[#444444]/20 text-gray-300 hover:bg-[#444444]/50"
                    } ${!link.url ? "text-gray-600 cursor-not-allowed" : ""}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}

export default function MovieTable({ movies, onEdit }) {
    const hasMovies = movies?.data?.length > 0;

    const handleDelete = (movieSlug, movieTitle) => {
        if (confirm(`Are you sure you want to delete "${movieTitle}"?`)) {
            router.delete(route("admin.movies.destroy", movieSlug), {
                preserveScroll: true,
            });
        }
    };

    return (
        <div className="bg-[#171717] border border-gray-700 shadow-lg rounded-xl p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h2 className="text-xl font-bold text-[#EDEDED] mb-4 md:mb-0">
                    Movie Library
                </h2>
                <div className="flex gap-3">
                    <Link
                        href={route("admin.genres.create")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition"
                    >
                        <FiPlus /> Add Genre
                    </Link>
                    <Link
                        href={route("admin.movies.create")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#DA0037] hover:bg-[#a10028] text-white rounded-lg text-sm font-medium transition"
                    >
                        <FiPlus /> Add Movie
                    </Link>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs text-gray-400 uppercase bg-[#444444]/20">
                        <tr>
                            <th className="px-6 py-3">Thumbnail</th>
                            <th className="px-6 py-3">Title</th>
                            <th className="px-6 py-3">Genre</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Year</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hasMovies ? (
                            movies.data.map((movie) => (
                                <tr
                                    key={movie.movie_id}
                                    className="border-b border-gray-700 hover:bg-[#444444]/10"
                                >
                                    <td className="px-6 py-4">
                                        <img
                                            src={`/storage/${movie.thumbnail_url}`}
                                            alt={movie.title}
                                            className="w-24 h-16 object-cover rounded-md border border-gray-600"
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                        {movie.title}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-full">
                                            {movie.genre?.name || "N/A"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-white">
                                        {movie.price
                                            ? new Intl.NumberFormat("id-ID", {
                                                  style: "currency",
                                                  currency: "IDR",
                                              }).format(movie.price)
                                            : "Free"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {movie.release_year}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex gap-2 justify-end">
                                            <button
                                                onClick={() => onEdit(movie)}
                                                className="p-2 text-gray-400 hover:text-white hover:bg-[#444444]/50 rounded-md"
                                            >
                                                <FiEdit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        movie.slug,
                                                        movie.title
                                                    )
                                                }
                                                className="p-2 text-red-500 hover:text-white hover:bg-red-500/50 rounded-md"
                                            >
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="text-center py-12 text-gray-500"
                                >
                                    No movies found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {hasMovies && <Pagination links={movies.links} />}
        </div>
    );
}
