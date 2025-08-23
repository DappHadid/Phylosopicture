import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/Authenticated/Index";
import MovieCard from "@/Components/MovieCard";

export default function Favorite({ favoriteMovies }) {
    return (
        <AuthenticatedLayout>
            <Head title="Your Favorites" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-bold mb-6">
                                Your Favorite Movies
                            </h2>

                            {favoriteMovies && favoriteMovies.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                    {favoriteMovies.map((movie) => (
                                        <MovieCard
                                            key={movie.movie_id} // Gunakan movie_id sebagai key
                                            movie={movie}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg">
                                        You haven't added any movies to your
                                        favorites yet.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
