import React, { useState } from "react";
import { router, Link, Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { FiArrowLeft } from "react-icons/fi";

export default function GenreCreate() {
    const [values, setValues] = useState({ name: "" });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("admin.genres.store"), values, {
            onError: (err) => setErrors(err),
        });
    };

    const inputClassName =
        "w-full bg-[#444444]/30 border border-gray-600 text-[#EDEDED] rounded-lg focus:ring-[#DA0037] focus:border-[#DA0037] transition px-3 py-2";
    const labelClassName = "block mb-2 font-medium text-gray-300 text-sm";
    const errorClassName = "text-sm text-red-400 mt-1";

    return (
        <AdminLayout header="Add New Genre">
            <Head title="Admin - Create Genre" />
            <div className="max-w-xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#171717] border border-gray-700 shadow-lg rounded-xl p-8"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
                        <h1 className="text-xl font-bold text-[#EDEDED]">
                            🏷️ New Genre
                        </h1>
                        <Link
                            href={route("admin.movies.index")}
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition"
                        >
                            <FiArrowLeft />
                            Back to List
                        </Link>
                    </div>

                    {/* Field */}
                    <div>
                        <label htmlFor="name" className={labelClassName}>
                            Genre Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            className={inputClassName}
                        />
                        {errors.name && (
                            <p className={errorClassName}>{errors.name}</p>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-700 text-right">
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#DA0037] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-[#a10028]"
                        >
                            Save Genre
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
