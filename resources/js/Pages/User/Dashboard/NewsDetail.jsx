import GuestLayout from "@/Layouts/GuestLayout";
import { usePage, Link } from "@inertiajs/react";

export default function NewsDetail({ news }) {
    return (
        <GuestLayout>
            <div className="max-w-4xl mx-auto px-4 py-10">
                {/* Back Button */}
                <Link
                    href="/news"
                    className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-[#EDEDED] bg-[#444444] hover:bg-[#DA0037] rounded-full transition-all duration-300"
                >
                    <span className="text-lg">←</span>
                    Back
                </Link>

                {/* Title */}
                <h1 className="text-3xl font-extrabold text-[#DA0037] mb-4">
                    {news.title}
                </h1>

                {/* Date */}
                <p className="text-sm text-gray-400 mb-6">
                    {new Date(news.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </p>

                {/* Image */}
                <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-80 object-cover rounded-xl shadow-md mb-6"
                />

                {/* Description */}
                <p className="text-base leading-relaxed text-white whitespace-pre-line">
                    {news.description}
                </p>
            </div>
        </GuestLayout>
    );
}
