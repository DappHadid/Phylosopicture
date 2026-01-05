import { useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { usePage, Link } from "@inertiajs/react";
import { FiExternalLink } from "react-icons/fi"; // Impor ikon untuk link eksternal

export default function News() {
    const { news = [] } = usePage().props;
    const [activeTab, setActiveTab] = useState("latest");

    const filteredNews = news.filter(
        (n) => n.category.toLowerCase() === activeTab.toLowerCase()
    );

    return (
        <GuestLayout>
            <div className="max-w-6xl mx-auto px-4 py-10">
                {/* Background container */}
                <div className="relative flex items-center justify-center h-40 rounded-xl overflow-hidden mb-8">
                    {/* Background Image */}
                    <img
                        src="/storage/movies/News.jpg" // Asumsi ini gambar statis
                        alt="News Background"
                        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
                    />
                    {/* Overlay hitam transparan */}
                    <div className="absolute inset-0 bg-black/40"></div>
                    {/* Text */}
                    <h1 className="relative text-4xl md:text-6xl font-extrabold text-center text-[#EDEDED] tracking-wide">
                        News
                    </h1>
                </div>

                {/* Tabs */}
                <div className="flex justify-center gap-4 mb-8">
                    {[
                        { key: "latest", label: "Latest" },
                        { key: "achievement", label: "Achievement" },
                        { key: "newsEvent", label: "News & Event" },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-6 py-2.5 text-sm rounded-full font-semibold transition-all duration-300 transform hover:scale-105
                                ${
                                    activeTab === tab.key
                                        ? "bg-[#DA0037] hover:bg-[#DA0037]/90 text-white shadow-lg hover:shadow-[#DA0037]/25"
                                        : "bg-[#EDEDED] text-[#171717] border border-[#444444]/30"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* News List */}
                <div className="space-y-6">
                    {filteredNews.map((n) => (
                        <div
                            key={n.news_id}
                            className="flex gap-4 items-start p-4 bg-[#EDEDED] rounded-xl shadow-sm border border-[#444444]/20 hover:shadow-md transition"
                        >
                            <img
                                src={n.image}
                                alt={n.title}
                                className="w-40 h-28 object-cover rounded-lg shadow-md"
                            />
                            <div className="flex-1">
                                <Link
                                    href={route("news.show", n.news_id)}
                                    className="text-lg font-semibold mb-1 text-black hover:text-[#DA0037] transition-colors"
                                >
                                    {n.title}
                                </Link>
                                <p className="text-sm text-gray-500 mb-2">
                                    {new Date(n.date).toLocaleDateString(
                                        "id-ID",
                                        {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        }
                                    )}
                                </p>
                                <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
                                    {n.description}
                                </p>
                                {n.link && (
                                    <a
                                        href={n.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-[#DA0037] hover:underline"
                                    >
                                        Read More
                                        <FiExternalLink />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </GuestLayout>
    );
}
