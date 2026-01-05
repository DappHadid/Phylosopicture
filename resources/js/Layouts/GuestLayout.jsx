// resources/js/Layouts/GuestLayout.jsx
import React from "react";
import Topbar from "@/Components/Topbar";
import Footer from "@/Components/Footer";

export default function GuestLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen bg-[#171717] text-[#EDEDED]">
            {/* Topbar */}
            <Topbar />

            {/* Main content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
