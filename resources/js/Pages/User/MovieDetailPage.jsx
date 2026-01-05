import { Head, Link } from "@inertiajs/react";
import PropTypes from "prop-types";
import MovieDetail from "@/Components/MovieDetail";
import Authenticated from "@/Layouts/Authenticated/Index";

export default function MovieDetailPage({ movie, auth }) {
    return (
        <Authenticated
            header={
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold text-gray-200">
                        Movie Detail
                    </h2>
                    <nav className="text-sm text-gray-400">
                        <Link href="/" className="hover:text-gray-300">
                            Home
                        </Link>{" "}
                        / <span className="text-gray-500">Movie Detail</span>
                    </nav>
                </div>
            }
        >
            <Head title={movie.title} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <MovieDetail movie={movie} />
                </div>
            </div>
        </Authenticated>
    );
}

MovieDetailPage.propTypes = {
    movie: PropTypes.shape({
        movie_id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        // ... tambahkan prop lain sesuai kebutuhan
    }).isRequired,
    auth: PropTypes.object,
};
