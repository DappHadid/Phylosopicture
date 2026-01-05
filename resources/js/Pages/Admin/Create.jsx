import React, { useState } from "react";
import { Head, useForm, usePage, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { FiArrowLeft } from "react-icons/fi";

export default function Create({ auth, genres }) {
    const { flash = {} } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        genre_id: "",
        title: "",
        slug: "",
        description: "",
        producer: "",
        director: "",
        price: "",
        duration: "",
        release_year: "",
        video_file: null,
        thumbnail_url: null,
    });

    const [preview, setPreview] = useState(null);

    const handleTitleChange = (e) => {
        const title = e.target.value;
        setData("title", title);
        const newSlug = title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
        setData("slug", newSlug);
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        setData("thumbnail_url", file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.movies.store"), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setPreview(null);
            },
        });
    };

    const inputClassName =
        "w-full bg-[#444444]/30 border border-gray-600 text-[#EDEDED] rounded-lg focus:ring-[#DA0037] focus:border-[#DA0037] transition px-3 py-2";
    const labelClassName = "block mb-1 font-medium text-gray-300 text-sm";
    const errorClassName = "text-sm text-red-400 mt-1";

    return (
        <AdminLayout header="Add New Movie">
            <Head title="Admin - Create Movie" />
            <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <form
                    onSubmit={submit}
                    className="bg-[#171717] border border-gray-700 shadow-lg rounded-xl p-8 space-y-8"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
                        <h1 className="text-xl font-bold text-[#EDEDED]">
                            🎬 Add New Movie
                        </h1>
                        <Link
                            href={route("admin.movies.index")}
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition"
                        >
                            <FiArrowLeft />
                            Back to List
                        </Link>
                    </div>

                    {flash.success && (
                        <div className="mb-4 text-green-400">
                            {flash.success}
                        </div>
                    )}
                    {flash.error && (
                        <div className="mb-4 text-red-400">{flash.error}</div>
                    )}

                    {/* Group 1: Basic Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-[#EDEDED] mb-4">
                            Basic Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClassName}>
                                    Title{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={handleTitleChange}
                                    className={inputClassName}
                                />
                                {errors.title && (
                                    <p className={errorClassName}>
                                        {errors.title}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className={labelClassName}>
                                    Genre{" "}
                                    <span className="text-red-500">*</span>
                                </label>
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
                                    <p className={errorClassName}>
                                        {errors.genre_id}
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
                                <p className={errorClassName}>
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
                                    <p className={errorClassName}>
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
                                    <p className={errorClassName}>
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
                                    <p className={errorClassName}>
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
                                    <p className={errorClassName}>
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
                                    <p className={errorClassName}>
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
                                    Video File (MP4)
                                </label>
                                <input
                                    type="file"
                                    accept="video/mp4"
                                    onChange={(e) =>
                                        setData("video_file", e.target.files[0])
                                    }
                                    className="block w-full text-sm text-gray-300 
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-md file:border-0
                   file:text-sm file:font-semibold
                   file:bg-[#DA0037] file:text-white
                   hover:file:bg-red-700"
                                />
                                {errors.video_file && (
                                    <p className={errorClassName}>
                                        {errors.video_file}
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
                                    onChange={handleThumbnailChange}
                                    className="block w-full text-sm text-gray-300 
                                               file:mr-4 file:py-2 file:px-4
                                               file:rounded-md file:border-0
                                               file:text-sm file:font-semibold
                                               file:bg-[#DA0037] file:text-white
                                               hover:file:bg-red-700"
                                />
                                {errors.thumbnail_url && (
                                    <p className={errorClassName}>
                                        {errors.thumbnail_url}
                                    </p>
                                )}
                                {preview && (
                                    <img
                                        src={preview}
                                        alt="Thumbnail Preview"
                                        className="mt-4 w-48 h-28 object-cover rounded-lg border border-gray-600"
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="mt-8 pt-6 border-t border-gray-700 text-right">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#DA0037] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-[#a10028] disabled:bg-gray-500"
                        >
                            {processing ? "Saving..." : "Save Movie"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
