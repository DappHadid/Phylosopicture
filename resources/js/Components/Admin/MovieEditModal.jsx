import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import PropTypes from "prop-types";

export default function MovieEditModal({ isOpen, onClose, movie, genres }) {
    // PERBAIKAN 1: Tambahkan _method: 'put' ke dalam data form.
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            _method: "put",
            genre_id: "",
            slug: "",
            title: "",
            description: "",
            producer: "",
            director: "",
            price: "",
            duration: "",
            release_year: "",
            storage_url: "",
            thumbnail_url: null,
        });

    useEffect(() => {
        if (movie) {
            setData({
                _method: "put",
                slug: movie.slug || "",
                genre_id: movie.genre_id || "",
                title: movie.title || "",
                description: movie.description || "",
                producer: movie.producer || "",
                director: movie.director || "",
                price: movie.price || "",
                duration: movie.duration || "",
                release_year: movie.release_year || "",
                storage_url: movie.storage_url || "",
                thumbnail_url: null,
            });
            clearErrors();
        }
    }, [movie]);

    if (!isOpen) return null;

    const handleClose = () => {
        reset();
        clearErrors();
        onClose();
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.movies.update", movie), {
            onSuccess: () => handleClose(),
        });
    };

    const inputClassName =
        "w-full bg-[#444444]/30 border border-gray-600 text-[#EDEDED] rounded-lg focus:ring-[#DA0037] focus:border-[#DA0037] transition px-3 py-2";
    const labelClassName = "block mb-1 font-medium text-gray-300 text-sm";

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4">
            <div className="bg-[#171717] border border-gray-700 rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-700 sticky top-0 bg-[#171717] z-10">
                    <h2 className="text-xl font-bold text-[#EDEDED]">
                        Edit Movie: {movie?.title}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-white text-2xl"
                    >
                        &times;
                    </button>
                </div>

                {/* Form */}
                <form
                    id="movie-edit-form"
                    onSubmit={submit}
                    className="p-6 space-y-8 overflow-y-auto"
                >
                    {/* Group 1: Basic Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-[#EDEDED] mb-4">
                            Basic Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClassName}>Genre</label>
                                <select
                                    value={data.genre_id}
                                    onChange={(e) =>
                                        setData("genre_id", e.target.value)
                                    }
                                    className={inputClassName}
                                >
                                    <option value="">Select Genre</option>
                                    {genres.map((g) => (
                                        <option
                                            key={g.genre_id}
                                            value={g.genre_id}
                                        >
                                            {g.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.genre_id && (
                                    <p className="text-sm text-red-400 mt-1">
                                        {errors.genre_id}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className={labelClassName}>Title</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    className={inputClassName}
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-400 mt-1">
                                        {errors.title}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className={labelClassName}>
                                Description
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className={`${inputClassName} min-h-[120px]`}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-400 mt-1">
                                    {errors.description}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Group 2: Production Details */}
                    <div>
                        <h3 className="text-lg font-semibold text-[#EDEDED] mb-4">
                            Production Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClassName}>
                                    Producer
                                </label>
                                <input
                                    type="text"
                                    value={data.producer}
                                    onChange={(e) =>
                                        setData("producer", e.target.value)
                                    }
                                    className={inputClassName}
                                />
                                {errors.producer && (
                                    <p className="text-sm text-red-400 mt-1">
                                        {errors.producer}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className={labelClassName}>
                                    Director
                                </label>
                                <input
                                    type="text"
                                    value={data.director}
                                    onChange={(e) =>
                                        setData("director", e.target.value)
                                    }
                                    className={inputClassName}
                                />
                                {errors.director && (
                                    <p className="text-sm text-red-400 mt-1">
                                        {errors.director}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                            <div>
                                <label className={labelClassName}>
                                    Release Year
                                </label>
                                <input
                                    type="number"
                                    value={data.release_year}
                                    onChange={(e) =>
                                        setData("release_year", e.target.value)
                                    }
                                    className={inputClassName}
                                />
                                {errors.release_year && (
                                    <p className="text-sm text-red-400 mt-1">
                                        {errors.release_year}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className={labelClassName}>
                                    Duration (minutes)
                                </label>
                                <input
                                    type="number"
                                    value={data.duration}
                                    onChange={(e) =>
                                        setData("duration", e.target.value)
                                    }
                                    className={inputClassName}
                                />
                                {errors.duration && (
                                    <p className="text-sm text-red-400 mt-1">
                                        {errors.duration}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className={labelClassName}>Price</label>
                                <input
                                    type="number"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                    className={inputClassName}
                                />
                                {errors.price && (
                                    <p className="text-sm text-red-400 mt-1">
                                        {errors.price}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Group 3: Media */}
                    <div>
                        <h3 className="text-lg font-semibold text-[#EDEDED] mb-4">
                            Media
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClassName}>
                                    Storage URL
                                </label>
                                <input
                                    type="text"
                                    value={data.storage_url}
                                    onChange={(e) =>
                                        setData("storage_url", e.target.value)
                                    }
                                    className={inputClassName}
                                />
                                {errors.storage_url && (
                                    <p className="text-sm text-red-400 mt-1">
                                        {errors.storage_url}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className={labelClassName}>
                                    Thumbnail
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setData(
                                            "thumbnail_url",
                                            e.target.files[0]
                                        )
                                    }
                                    className="block w-full text-sm text-gray-300
                                               file:mr-4 file:py-2 file:px-4
                                               file:rounded-md file:border-0
                                               file:text-sm file:font-semibold
                                               file:bg-[#DA0037] file:text-white
                                               hover:file:bg-red-700"
                                />
                                {errors.thumbnail_url && (
                                    <p className="text-sm text-red-400 mt-1">
                                        {errors.thumbnail_url}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="flex justify-end gap-4 p-6 border-t border-gray-700 sticky bottom-0 bg-[#171717]">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="movie-edit-form"
                        disabled={processing}
                        className="px-6 py-2 bg-[#DA0037] hover:bg-[#a10028] text-white rounded-lg font-medium disabled:opacity-50"
                    >
                        {processing ? "Updating..." : "Update Movie"}
                    </button>
                </div>
            </div>
        </div>
    );
}

MovieEditModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    movie: PropTypes.object,
    genres: PropTypes.array.isRequired,
};
