import React, { useEffect, useRef } from "react";
import { Head, Link } from "@inertiajs/react";
import Authenticated from "@/Layouts/Authenticated/Index";
import Flickity from "flickity";
import "flickity/css/flickity.css";
import FeaturedMovie from "@/Components/FeaturedMovie";
import MovieCard from "@/Components/MovieCard";
import ReactFlickity from "react-flickity-component";

export default function Dashboard() {
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
            });

            return () => {
                flkty.destroy();
            };
        }
    }, []);

    // Data untuk Featured Movies
    const featuredMovies = [
        {
            slug: "the-batman-in-love",
            name: "The Batman In Love",
            category: "Comedy",
            thumbnail: "/images/featured-1.png",
            rating: 4.5,
        },
        {
            slug: "ghost-in-the-shell",
            name: "Ghost in the Shell",
            category: "Sci-Fi",
            thumbnail: "https://picsum.photos/id/2/520/340",
            rating: 4.8,
        },
        {
            slug: "avengers-endgame",
            name: "Avengers: Endgame",
            category: "Action",
            thumbnail: "https://picsum.photos/id/3/520/340",
            rating: 4.9,
        },
        {
            slug: "joker",
            name: "Joker",
            category: "Drama",
            thumbnail: "https://picsum.photos/id/4/520/340",
            rating: 4.7,
        },
    ];

    // Data untuk Browse
    const browseMovies = [
        {
            slug: "meong-golden",
            name: "Meong Golden",
            category: "Horror • Love",
            thumbnail: "/images/browse-1.png",
        },
        {
            slug: "movie-2",
            name: "Movie Two",
            category: "Action • Drama",
            thumbnail: "https://picsum.photos/id/5/250/340",
        },
        {
            slug: "movie-3",
            name: "Movie Three",
            category: "Comedy",
            thumbnail: "https://picsum.photos/id/6/250/340",
        },
    ];

    // Opsi untuk Flickity di bagian Browse
    const flickityOptions = {
        cellAlign: "left",
        contain: true,
        groupCells: 1,
        wrapAround: false,
        pageDots: false,
        prevNextButtons: false,
        draggable: true,
    };

    return (
        <Authenticated>
            <Head title="Dashboard - Movies" />
            <div>
                {/* Featured Movies Section */}
                <div className="font-semibold text-[22px] text-black mb-4">
                    Featured Movies
                </div>
                <div className="carousel" ref={carousel}>
                    {featuredMovies.map((movie) => (
                        <FeaturedMovie
                            key={movie.slug}
                            slug={movie.slug}
                            name={movie.name}
                            category={movie.category}
                            thumbnail={movie.thumbnail}
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
                        {browseMovies.map((movie) => (
                            <MovieCard
                                key={movie.slug}
                                slug={movie.slug}
                                name={movie.name}
                                category={movie.category}
                                thumbnail={movie.thumbnail}
                            />
                        ))}
                    </ReactFlickity>
                </div>
            </div>
        </Authenticated>
    );
}
