import PropTypes from "prop-types"; // Perbaiki import
import { Link } from "@inertiajs/react"; // Gunakan Link untuk Inertia.js

export default function FeaturedMovie({
    slug,
    name,
    category,
    thumbnail,
    rating = 0,
}) {
    return (
        <div className="w-[520px] h-[340px] relative overflow-hidden group mr-[30px]">
            {/* Movie Thumbnail */}
            <img
                src={thumbnail}
                className="object-cover rounded-[30px] w-full h-full"
                alt="Featured Movie"
            />
            {/* Rating */}
            <div className="rating absolute top-0 left-0">
                <div className="p-[30px] flex items-center gap-1">
                    <img src="/icons/ic_star.svg" alt="Star" />
                    <span className="text-sm font-medium text-white mt-1">
                        {rating.toFixed(1)}/5.0
                    </span>
                </div>
            </div>
            {/* Bottom Detail */}
            <div className="absolute bottom-0 h-[100px] left-0 right-0 bg-gradient-to-t from-black rounded-bl-[28px] rounded-br-[28px] flex justify-between items-center px-7">
                <div>
                    <div className="font-medium text-[22px] text-white">
                        {name}
                    </div>
                    <p className="mb-0 text-white text-sm font-light">
                        {category}
                    </p>
                </div>
                <div className="translate-x-[100px] group-hover:translate-x-0 transition ease-in-out duration-500">
                    <img src="/icons/ic_play.svg" width="50" alt="Play" />
                </div>
            </div>
            <Link href={slug} className="inset-0 absolute z-50" />
        </div>
    );
}

FeaturedMovie.propTypes = {
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    rating: PropTypes.number,
};
