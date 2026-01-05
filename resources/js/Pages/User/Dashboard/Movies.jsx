import { Link, usePage } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Movies() {
    const { movies = [] } = usePage().props;

    return (
        <GuestLayout>
            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="relative flex items-center justify-center h-40 rounded-xl overflow-hidden mb-8">
                    {/* Background Image */}
                    <img
                        src="/storage/movies/Movie.jpg"
                        alt="News Background"
                        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
                    />

                    {/* Overlay hitam transparan */}
                    <div className="absolute inset-0 bg-black/40"></div>

                    {/* Text */}
                    <h1 className="relative text-4xl md:text-6xl font-extrabold text-center text-[#EDEDED] tracking-wide">
                        Movie
                    </h1>
                </div>

                {/* Movie Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {movies.map((movie) => (
                        <div
                            key={movie.movie_id}
                            className="bg-[#171717] rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:scale-105 border border-transparent hover:border-white/20"
                        >
                            {/* Container untuk Gambar dan Rating Badge */}
                            <div className="relative">
                                <img
                                    src={`/storage/${movie.thumbnail_url}`}
                                    alt={movie.title}
                                    className="w-full object-cover aspect-[4/5]"
                                />
                                {/* Rating Badge */}
                                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-sm">
                                    <svg
                                        className="w-4 h-4 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.073 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.96z" />
                                    </svg>
                                    <span className="text-white font-bold">
                                        {/* Tampilkan rating dengan satu angka desimal */}
                                        {Number(movie.average_rating).toFixed(
                                            1
                                        )}
                                    </span>
                                </div>
                            </div>

                            <div className="p-5 flex flex-col justify-between h-[130px]">
                                <h2 className="text-xl font-bold text-[#EDEDED] mb-2 line-clamp-2">
                                    {movie.title}
                                </h2>
                                <div className="mt-auto">
                                    <Link
                                        href={route("movies.show", movie.slug)}
                                        className="inline-block px-4 py-2 bg-[#DA0037] hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-300"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </GuestLayout>
    );
}
