import React from "react";
import ReactPlayer from "react-player";
import { Link } from "@inertiajs/react";

export default function Watching() {
    return (
        <section
            class="mx-auto w-screen relative watching-page font-poppins"
            id="stream"
        >
            <ReactPlayer
                url="https://youtu.be/OnWsRUKGDeo?si=v6biKO9zT_VFKq04"
                controls={true}
                width="100%"
                height="auto"
                playing={false}
            ></ReactPlayer>
            {/* Button back to dashboard */}
            <div class="absolute top-5 left-5 z-20">
                <a href="/">
                    <img
                        src="assets/icons/ic_arrow-left.svg"
                        class="transition-all btn-back w-[46px]"
                        alt="stream"
                    />
                </a>
            </div>

            {/* Video Title */}
            <div class="absolute title-video top-7 left-1/2 -translate-x-1/2 max-w-[310px] md:max-w-[620px] text-center">
                <span class="font-medium text-2xl transition-all text-white drop-shadow-md select-none">
                    Details Screen Part Final
                </span>
            </div>
        </section>
    );
}
