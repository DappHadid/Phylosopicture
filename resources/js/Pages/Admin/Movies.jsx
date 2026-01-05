import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, usePage } from "@inertiajs/react";
import MovieTable from "@/Components/Admin/MovieTable";
import MovieEditModal from "@/Components/Admin/MovieEditModal";

export default function Movies({ auth, movies, genres, totalDuration }) {
    const { flash } = usePage().props;
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (flash?.success && selectedMovie) {
            setSelectedMovie(null);
        }
    }, [flash?.success]);

    const handleEditMovie = (movie) => {
        setSelectedMovie(movie);
    };

    const handleCloseModal = () => {
        setSelectedMovie(null);
    };

    const StatCard = ({ icon, title, value }) => (
        <div className="bg-[#171717] border border-gray-700 rounded-xl p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-[#DA0037]/10 text-[#DA0037]">
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-400">{title}</p>
                <p className="text-2xl font-semibold text-[#EDEDED]">{value}</p>
            </div>
        </div>
    );

    return (
        <AdminLayout header="Movies Management">
            <Head title="Admin - Movies" />

            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                {flash?.success && (
                    <div
                        className="mb-6 bg-green-500/10 border border-green-500/20 text-green-300 px-4 py-3 rounded-lg"
                        role="alert"
                    >
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div
                        className="mb-6 bg-red-500/10 border border-red-500/20 text-red-300 px-4 py-3 rounded-lg"
                        role="alert"
                    >
                        {flash.error}
                    </div>
                )}

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon="🎬"
                        title="Total Movies"
                        value={movies?.total || 0}
                    />
                    <StatCard
                        icon="🏷️"
                        title="Genres"
                        value={genres?.length || 0}
                    />
                    <StatCard
                        icon="⏱️"
                        title="Total Durasi (Menit)"
                        value={totalDuration?.toLocaleString("id-ID") || 0}
                    />
                    <StatCard
                        icon="📄"
                        title="Current Page"
                        value={`${movies?.current_page || 1} / ${
                            movies?.last_page || 1
                        }`}
                    />
                </div>

                {/* Main Movie Table */}
                <div className="bg-[#171717] border border-gray-700 shadow-lg rounded-xl p-6">
                    <MovieTable movies={movies} onEdit={handleEditMovie} />
                </div>

                {/* Edit Modal */}
                {selectedMovie && (
                    <MovieEditModal
                        isOpen={!!selectedMovie}
                        onClose={handleCloseModal}
                        movie={selectedMovie}
                        genres={genres}
                    />
                )}
            </div>
        </AdminLayout>
    );
}
