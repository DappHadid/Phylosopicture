// resources/js/Pages/User/Dashboard/HomePage.jsx
import React from "react";
import { Head } from "@inertiajs/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import GuestLayout from "@/Layouts/GuestLayout";
import { motion } from "framer-motion";

// Variants umum
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
};

// Variants untuk stagger misi
const staggerContainer = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.25,
        },
    },
};

const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const YouTubeIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
    </svg>
);

const InstagramIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.44-1.441-1.44z" />
    </svg>
);

const TikTokIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.86-.95-6.69-2.81-1.77-1.8-2.5-4.14-2.4-6.51.09-2.02 1.03-3.96 2.45-5.44 1.52-1.57 3.5-2.51 5.6-2.66.11-2.5.08-5 .02-7.5.01-.14.01-.28.01-.42z" />
    </svg>
);

export default function HomePage() {
    return (
        <GuestLayout>
            <Head title="Phylosopicture - Home" />

            {/* HERO SECTION */}
            <section className="relative w-full h-[90vh] flex items-center justify-center bg-[#171717]">
                <img
                    src="/storage/movies/HomePage.JPG"
                    alt="Hero"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <motion.div
                    className="relative text-center z-10"
                    initial="hidden"
                    animate="show"
                    variants={fadeInUp}
                >
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold mb-4 text-[#EDEDED]"
                        variants={fadeInUp}
                    >
                        Phylosopicture
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-xl max-w-2xl mx-auto mb-6 text-[#EDEDED]/90"
                        variants={fadeInUp}
                    >
                        Komunitas film kreatif yang menginspirasi dan mendukung
                        perkembangan seni perfilman.
                    </motion.p>
                    <motion.a
                        href="#about"
                        className="px-6 py-3 bg-[#DA0037] hover:bg-red-700 text-white rounded-lg font-medium transition"
                        variants={fadeInUp}
                    >
                        Explore More
                    </motion.a>
                </motion.div>
            </section>

            {/* ABOUT US */}
            <section id="about" className="py-20 px-6 md:px-20 bg-[#171717]">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInUp}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-[#DA0037] mb-8 leading-tight">
                            ABOUT US
                        </h2>
                        <p className="text-lg md:text-xl leading-relaxed text-[#EDEDED]/95 mb-6 font-light text-justify">
                            Phylosopicture adalah komunitas film yang bernaung
                            di bawah jurusan Komunikasi dan Penyiaran Islam
                            (KPI) UIN Walisongo Semarang. Komunitas ini menjadi
                            wadah bagi mahasiswa yang memiliki minat dan bakat
                            di bidang perfilman untuk mengembangkan keterampilan
                            mereka, mulai dari penulisan naskah, penyutradaraan,
                            sinematografi, hingga editing film.
                        </p>
                        <p className="text-lg md:text-xl leading-relaxed text-[#EDEDED]/95 font-light text-justify">
                            Melalui berbagai kegiatan seperti diskusi film,
                            workshop, produksi film pendek, dan festival
                            internal, Phylosopicture mendorong anggotanya untuk
                            berkarya secara kreatif dan profesional. Selain
                            sebagai ruang belajar, komunitas ini juga berperan
                            dalam membangun jejaring dengan sineas lokal maupun
                            nasional, serta menjadi media ekspresi bagi
                            mahasiswa untuk menyampaikan gagasan dan kritik
                            sosial melalui karya audiovisual.
                        </p>
                    </motion.div>

                    <motion.div
                        className="relative"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={scaleIn}
                    >
                        <img
                            src="/storage/movies/News.jpg"
                            alt="About Us - Phylosopicture Community"
                            className="rounded-2xl shadow-2xl w-full h-auto transform hover:scale-105 transition-transform duration-300 border border-white/10"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#DA0037]/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.div>
                </div>
            </section>

            {/* VISI & MISI */}
            <motion.section
                id="visi"
                className="py-20 px-6 md:px-20 bg-[#444444]"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
            >
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#DA0037] mb-12 leading-tight text-center md:text-left">
                        VISI & MISI
                    </h2>

                    {/* Visi */}
                    <motion.div
                        className="bg-[#171717] rounded-2xl p-8 md:p-10 mb-12 border border-white/10 shadow-2xl"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <div className="flex items-start gap-4">
                            <div className="bg-[#DA0037] rounded-full p-3 flex-shrink-0">
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold text-[#DA0037] mb-4">
                                    VISI
                                </h3>
                                <p className="text-lg md:text-xl leading-relaxed text-[#EDEDED]/95 font-light">
                                    Komunitas kreatif yang menginspirasi dan
                                    mendukung perkembangan seni perfilman.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Misi */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="bg-[#DA0037] rounded-full p-3">
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-[#DA0037]">
                                MISI
                            </h3>
                        </div>

                        <motion.div
                            className="grid md:grid-cols-2 gap-8"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                        >
                            {[
                                {
                                    title: "Mendukung Kreativitas",
                                    description:
                                        "Menyediakan ruang bagi peminat film untuk mengekspresikan kreativitas mereka secara bebas dan inovatif.",
                                },
                                {
                                    title: "Pendidikan & Pelatihan",
                                    description:
                                        "Menyelenggarakan workshop dan diskusi untuk meningkatkan pengetahuan dan keterampilan anggota di bidang perfilman.",
                                },
                                {
                                    title: "Pemutaran & Diskusi",
                                    description:
                                        "Menyelenggarakan screening film secara rutin untuk mengapresiasi karya-karya sinematografi berkualitas.",
                                },
                                {
                                    title: "Produksi Berkualitas",
                                    description:
                                        "Mendorong pembuatan karya film yang berkualitas tinggi dengan standar profesional.",
                                },
                                {
                                    title: "Kolaborasi & Jaringan",
                                    description:
                                        "Membangun jaringan kerjasama dengan berbagai komunitas film dan industri perfilman.",
                                },
                            ].map((misi, i) => (
                                <motion.div
                                    key={i}
                                    className="bg-[#171717] rounded-2xl shadow-2xl p-8 hover:shadow-3xl hover:transform hover:scale-105 transition-all duration-300 border border-white/10 group"
                                    variants={staggerItem}
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="bg-gradient-to-r from-[#DA0037] to-red-600 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                                            {i + 1}
                                        </div>
                                        <h4 className="text-xl md:text-2xl font-bold text-[#EDEDED] group-hover:text-[#DA0037] transition-colors">
                                            {misi.title}
                                        </h4>
                                    </div>
                                    <p className="text-lg md:text-xl leading-relaxed text-[#EDEDED]/95 font-light pl-14">
                                        {misi.description}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* SLIDE KEGIATAN */}
            <motion.section
                className="py-16 px-6 md:px-20 bg-[#171717]"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-[#DA0037] mb-8 text-center">
                        OUR ACTIVITIES
                    </h2>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        className="rounded-xl shadow-lg"
                    >
                        {[
                            "/storage/movies/activities-1.JPG",
                            "/storage/movies/activities-2.JPG",
                            "/storage/movies/activities-3.JPG",
                            "/storage/movies/activities-4.JPG",
                        ].map((src, i) => (
                            <SwiperSlide key={i}>
                                <motion.img
                                    src={src}
                                    alt={`Slide ${i + 1}`}
                                    className="w-full h-[400px] object-cover rounded-xl"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </motion.section>

            <motion.section className="bg-[#171717] py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    {/* Judul */}
                    <h2 className="text-white font-bold tracking-widest mb-6">
                        FOLLOW US!
                    </h2>

                    {/* Wrapper untuk Ikon */}
                    <div className="flex justify-center items-center gap-5 md:gap-6">
                        {/* Link YouTube */}
                        <a
                            href="https://youtube.com/@phylosopicture?si=uVQx7If2fZdIdVJx"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#282828] p-3 rounded-full text-white transition-transform hover:scale-110"
                            aria-label="YouTube"
                        >
                            <YouTubeIcon />
                        </a>

                        {/* Link Instagram */}
                        <a
                            href="https://www.instagram.com/phylosopicture/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#282828] p-3 rounded-full text-white transition-transform hover:scale-110"
                            aria-label="Instagram"
                        >
                            <InstagramIcon />
                        </a>

                        {/* Link TikTok */}
                        <a
                            href="https://www.tiktok.com/@phylosopicture"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#282828] p-3 rounded-full text-white transition-transform hover:scale-110"
                            aria-label="TikTok"
                        >
                            <TikTokIcon />
                        </a>
                    </div>
                </div>
            </motion.section>
        </GuestLayout>
    );
}
