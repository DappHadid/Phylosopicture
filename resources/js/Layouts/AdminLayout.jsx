import { Link, usePage } from "@inertiajs/react";
import { FiHome, FiFilm, FiLogOut } from "react-icons/fi";
import { FaNewspaper } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";

function NavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors duration-200 ${
                active
                    ? "bg-[#DA0037] text-white"
                    : "text-gray-300 hover:bg-[#444444] hover:text-white"
            }`}
        >
            {children}
        </Link>
    );
}

export default function AdminLayout({ children, header }) {
    const { auth } = usePage().props;
    const currentRoute = route().current();

    console.log("Auth data:", auth);

    if (!auth || !auth.user) {
        return (
            <div className="flex h-screen bg-[#171717] items-center justify-center">
                <div className="text-white">
                    <p>Loading authentication data...</p>
                    <p className="text-sm text-gray-400 mt-2">
                        If this persists, please refresh the page.
                    </p>
                </div>
            </div>
        );
    }

    // Cek apakah user memiliki role admin
    const hasAdminRole = auth?.user?.roles?.includes("admin");

    if (!hasAdminRole) {
        return (
            <div className="flex h-screen bg-[#171717] items-center justify-center">
                <div className="text-center text-white">
                    <h2 className="text-xl font-bold text-red-500 mb-2">
                        Access Denied
                    </h2>
                    <p>You don't have permission to access this area.</p>
                    <Link
                        href={route("home")}
                        className="mt-4 inline-block bg-[#DA0037] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Go to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#171717]">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 bg-[#171717] border-r border-gray-700 flex flex-col">
                {/* Logo Area - Diubah dari teks menjadi gambar */}
                <div className="h-20 flex items-center justify-center border-b border-gray-700 px-4">
                    <Link href={route("admin.dashboard")}>
                        <img
                            src="/storage/movies/PhylosopictureSamping.png"
                            alt="Phylosopicture Logo"
                            className="h-10 w-auto" // Anda bisa sesuaikan tinggi logo di sini (misal: h-12)
                        />
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-4 space-y-2">
                    <NavLink
                        href={route("admin.dashboard")}
                        active={currentRoute === "admin.dashboard"}
                    >
                        <FiHome className="h-5 w-5" />
                        Dashboard
                    </NavLink>
                    <NavLink
                        href={route("admin.movies.index")}
                        active={currentRoute.startsWith("admin.movies")}
                    >
                        <FiFilm className="h-5 w-5" />
                        Movies
                    </NavLink>
                    <NavLink
                        href={route("admin.news.index")}
                        active={currentRoute.startsWith("admin.news")}
                    >
                        <FaNewspaper className="h-5 w-5" />
                        News
                    </NavLink>
                    <NavLink
                        href={route("admin.payments.index")}
                        active={currentRoute.startsWith("admin.payments")}
                    >
                        <MdOutlinePayments className="h-5 w-5" />
                        Payment History
                    </NavLink>
                </nav>

                {/* Logout Button */}
                <div className="px-4 py-4 border-t border-gray-700">
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold rounded-lg text-gray-300 hover:bg-[#DA0037] hover:text-white transition-colors duration-200"
                    >
                        <FiLogOut className="h-5 w-5" />
                        Logout
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-[#171717] border-b border-gray-700 flex items-center justify-between px-8">
                    <div className="text-lg font-semibold text-[#EDEDED]">
                        {header}
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-300">
                            {auth.user?.name || "Unknown User"}
                        </span>
                        <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                auth.user?.name || "User"
                            )}&background=${encodeURIComponent(
                                "#444444"
                            )}&color=${encodeURIComponent("#EDEDED")}`}
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full ring-2 ring-offset-2 ring-offset-[#171717] ring-[#DA0037]"
                        />
                    </div>
                </header>
                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}
