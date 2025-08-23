import React, { useEffect, useRef } from "react";
import { Head, Link } from "@inertiajs/react";
import Authenticated from "@/Layouts/Authenticated/Index";
import Flickity from "flickity";
import "flickity/css/flickity.css";
import FeaturedMovie from "@/Components/FeaturedMovie";
import MovieCard from "@/Components/MovieCard";
import ReactFlickity from "react-flickity-component";

export default function Dashboard({
    featuredMovies,
    browseMovies,
    featuredMovie,
}) {
    const carousel = useRef(null);

    useEffect(() => {
        if (carousel.current) {
            const flkty = new Flickity(carousel.current, {
                cellAlign: "left",
                contain: true,
                groupCells: 1,
                wrapAround: false,
                pageDots: false,
                prevNextButtons: false,
                draggable: true,
                freeScroll: true,
            });

            return () => {
                flkty.destroy();
            };
        }
    }, []);

    // Opsi untuk Flickity di bagian Browse
    const flickityOptions = {
        cellAlign: "left",
        contain: true,
        groupCells: 1,
        wrapAround: false,
        pageDots: false,
        prevNextButtons: false,
        draggable: true,
        freeScroll: true,
    };

    return (
        <Authenticated>
            <Head title="Dashboard - Movies" />
            <div className="px-4">
                {/* Featured Movies Section */}
                <div className="font-semibold text-[22px] text-black mb-4">
                    Featured Movies
                </div>
                <div className="carousel" ref={carousel}>
                    {featuredMovies &&
                        featuredMovies.map((movie) => (
                            <FeaturedMovie
                                key={movie.movie_id}
                                slug={movie.slug}
                                name={movie.title}
                                category={movie.genre?.name || "Unknown"}
                                thumbnail={
                                    movie.thumbnail_url ||
                                    "/images/default-movie.png"
                                }
                                rating={movie.rating}
                            />
                        ))}
                </div>

                {/* Browse Section */}
                <div className="mt-8">
                    <div className="font-semibold text-[22px] text-black mb-4">
                        Browse
                    </div>
                    <ReactFlickity
                        className="carousel"
                        options={flickityOptions}
                    >
                        {browseMovies &&
                            browseMovies.map((movie) => (
                                <MovieCard
                                    key={movie.movie_id}
                                    slug={movie.slug}
                                    name={movie.title}
                                    category={movie.genre?.name || "Unknown"}
                                    thumbnail={
                                        movie.thumbnail_url ||
                                        "/images/default-movie.png"
                                    }
                                />
                            ))}
                    </ReactFlickity>
                </div>
            </div>
        </Authenticated>
    );
}
