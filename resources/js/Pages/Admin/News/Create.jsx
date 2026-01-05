import React, { useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { FiArrowLeft } from "react-icons/fi";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        category: "latest",
        date: "",
        link: "",
        image: null,
    });

    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("image", file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.news.store"), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setPreview(null);
            },
        });
    };

    // ClassNames dari referensi untuk konsistensi UI
    const inputClassName =
        "w-full bg-[#444444]/30 border border-gray-600 text-[#EDEDED] rounded-lg focus:ring-[#DA0037] focus:border-[#DA0037] transition px-3 py-2";
    const labelClassName = "block mb-1 font-medium text-gray-300 text-sm";
    const errorClassName = "text-sm text-red-400 mt-1";

    return (
        <AdminLayout header="Add New News">
            <Head title="Admin - Create News" />
            <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <form
                    onSubmit={submit}
                    className="bg-[#171717] border border-gray-700 shadow-lg rounded-xl p-8 space-y-8"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                        <h1 className="text-xl font-bold text-[#EDEDED]">
                            ✍️ Add New News Article
                        </h1>
                        <Link
                            href={route("admin.news.index")}
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition"
                        >
                            <FiArrowLeft />
                            Back to List
                        </Link>
                    </div>

                    {/* Group 1: Main Content */}
                    <div>
                        <h3 className="text-lg font-semibold text-[#EDEDED] mb-4">
                            Main Content
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
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
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
                                    Category{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) =>
                                        setData("category", e.target.value)
                                    }
                                    className={inputClassName}
                                >
                                    <option value="latest">Latest</option>
                                    <option value="achievement">
                                        Achievement
                                    </option>
                                    <option value="newsEvent">
                                        News & Event
                                    </option>
                                </select>
                                {errors.category && (
                                    <p className={errorClassName}>
                                        {errors.category}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className={labelClassName}>
                                Description{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className={`${inputClassName} min-h-[150px]`}
                            />
                            {errors.description && (
                                <p className={errorClassName}>
                                    {errors.description}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Group 2: Details & Media */}
                    <div>
                        <h3 className="text-lg font-semibold text-[#EDEDED] mb-4">
                            Details & Media
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClassName}>
                                    Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.date}
                                    onChange={(e) =>
                                        setData("date", e.target.value)
                                    }
                                    className={inputClassName}
                                />
                                {errors.date && (
                                    <p className={errorClassName}>
                                        {errors.date}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className={labelClassName}>
                                    Link (Optional)
                                </label>
                                <input
                                    type="url"
                                    value={data.link}
                                    onChange={(e) =>
                                        setData("link", e.target.value)
                                    }
                                    className={inputClassName}
                                    placeholder="https://example.com"
                                />
                                {errors.link && (
                                    <p className={errorClassName}>
                                        {errors.link}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="mt-6">
                            <label className={labelClassName}>
                                Image <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#DA0037] file:text-white hover:file:bg-red-700"
                            />
                            {errors.image && (
                                <p className={errorClassName}>{errors.image}</p>
                            )}
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Image Preview"
                                    className="mt-4 w-56 h-32 object-cover rounded-lg border border-gray-600"
                                />
                            )}
                        </div>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="mt-8 pt-6 border-t border-gray-700 text-right">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#DA0037] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-[#a10028] disabled:bg-gray-500 transition"
                        >
                            {processing ? "Saving..." : "Save News"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
