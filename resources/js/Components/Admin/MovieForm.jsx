import React from "react";
import { useForm, usePage } from "@inertiajs/react";

export default function MovieForm({ movie = null, genres = [], onClose }) {
    const { flash } = usePage().props;
    const { data, setData, post, put, processing, errors, reset } = useForm({
        // form data initialization...
    });

    // ... submit and other handlers ...

    const inputClassName =
        "w-full bg-[#444444]/30 border border-gray-600 text-[#EDEDED] rounded-lg focus:ring-[#DA0037] focus:border-[#DA0037] transition";
    const labelClassName = "block mb-2 font-medium text-gray-300";

    return (
        <div>
            {flash?.success && (
                <div className="mb-4 text-green-400">{flash.success}</div>
            )}
            <form onSubmit={submit} className="space-y-6">
                {/* Form fields styled for dark theme */}
                <div>
                    <label className={labelClassName}>
                        Genre <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={data.genre_id}
                        onChange={(e) => setData("genre_id", e.target.value)}
                        className={inputClassName}
                    >
                        <option value="">-- Select Genre --</option>
                        {genres.map((genre) => (
                            <option key={genre.genre_id} value={genre.genre_id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                    {errors.genre_id && (
                        <p className="text-sm text-red-400 mt-1">
                            {errors.genre_id}
                        </p>
                    )}
                </div>
                {/* ... other form fields follow the same pattern */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-2 bg-[#DA0037] hover:bg-[#a10028] text-white rounded-lg font-medium disabled:opacity-50"
                    >
                        {processing
                            ? movie
                                ? "Updating..."
                                : "Saving..."
                            : movie
                            ? "Update Movie"
                            : "Save Movie"}
                    </button>
                </div>
            </form>
        </div>
    );
}
