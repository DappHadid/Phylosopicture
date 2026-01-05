import React from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";

export default function Footer() {
    return (
        <footer className="bg-[#171717] text-[#EDEDED] pt-16 pb-8 mt-16 relative z-40">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
                {/* Brand / Logo */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <img
                        src="/storage/movies/PhylosopictureSamping.png"
                        alt="Phylosopicture Logo"
                        className="h-10 w-auto mb-4"
                        onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextElementSibling.style.display = "block";
                        }}
                    />
                    <p className="text-sm text-[#EDEDED]/70 leading-relaxed">
                        Komunitas kreatif yang menginspirasi dan mendukung
                        perkembangan seni perfilman melalui karya dan
                        kolaborasi.
                    </p>
                </motion.div>

                {/* Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h3 className="text-lg font-semibold mb-4 text-[#DA0037]">
                        Navigation
                    </h3>
                    <nav className="flex flex-col gap-3 text-white/90 font-medium">
                        <Link
                            href={route("home")}
                            className="hover:text-[#DA0037] transition-colors relative group"
                        >
                            Home
                            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#DA0037] transition-all group-hover:w-full"></span>
                        </Link>
                        <Link
                            href={route("news.index")}
                            className="hover:text-[#DA0037] transition-colors relative group"
                        >
                            News
                            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#DA0037] transition-all group-hover:w-full"></span>
                        </Link>
                        <Link
                            href={route("movies.index")}
                            className="hover:text-[#DA0037] transition-colors relative group"
                        >
                            Movies
                            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#DA0037] transition-all group-hover:w-full"></span>
                        </Link>
                    </nav>
                </motion.div>

                {/* Contact */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h3 className="text-lg font-semibold mb-4 text-[#DA0037]">
                        Contact
                    </h3>
                    <ul className="space-y-2 text-sm text-[#EDEDED]/80">
                        <li>
                            📞 <span className="ml-1">08123456789</span>
                        </li>
                        <li>
                            ✉️{" "}
                            <a
                                href="mailto:phylosopicture@gmail.com"
                                className="hover:text-[#DA0037] transition"
                            >
                                phylosopicture@gmail.com
                            </a>
                        </li>
                        <li>
                            📍{" "}
                            <span className="ml-1 text-justify">
                                Jl. Prof. Dr. Hamka No.3, RW.5, Tambakaji, Kec.
                                Ngaliyan, Kota Semarang, Jawa Tengah 50185
                            </span>
                        </li>
                    </ul>
                </motion.div>

                {/* Social Media */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    className="flex flex-col"
                >
                    <h3 className="text-lg font-semibold mb-4 text-[#DA0037]">
                        Follow Us!
                    </h3>
                    <div className="flex gap-6">
                        <a
                            href="https://youtube.com/@phylosopicture?si=uVQx7If2fZdIdVJx"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition-transform"
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                                alt="YouTube"
                                className="w-6 h-6"
                            />
                        </a>
                        <a
                            href="https://www.instagram.com/phylosopicture/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition-transform"
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                                alt="Instagram"
                                className="w-6 h-6"
                            />
                        </a>
                        <a
                            href="https://www.tiktok.com/@phylosopicture"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition-transform"
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png"
                                alt="TikTok"
                                className="w-6 h-6"
                            />
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Copyright */}
            <div className="border-t border-[#444444] mt-12 pt-4 text-center text-sm text-[#EDEDED]/70">
                © {new Date().getFullYear()} Phylosopicture. All rights
                reserved.
            </div>
        </footer>
    );
}
