import { useState, useRef } from "react";
import { Link, usePage, router } from "@inertiajs/react";

export default function Topbar() {
    const { auth } = usePage().props; // Ambil data autentikasi dari Inertia props
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownTarget = useRef(null);

    const triggerDropdown = () => {
        setDropdownOpen(!dropdownOpen);
        if (dropdownOpen) {
            dropdownTarget.current.classList.add("hidden");
        } else {
            dropdownTarget.current.classList.remove("hidden");
        }
    };

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route("logout"));
    };

    return (
        <div className="flex justify-between items-center cursor-pointer">
            <input
                type="text"
                className="top-search"
                placeholder="Search movie, cast, genre"
            />
            <div className="flex items-center gap-4">
                <span className="text-black text-sm font-medium">
                    Welcome, {auth.user?.name || "Guest"}
                </span>
                <div className="collapsible-dropdown flex flex-col gap-2 relative">
                    <div
                        className="outline outline-2 outline-gray-2 p-[5px] rounded-full w-[60px] dropdown-button"
                        onClick={triggerDropdown}
                    >
                        <img
                            src={
                                auth.user.avatar ||
                                `https://ui-avatars.com/api/?name=${auth.user.name}&background=e0e7ff&color=4338ca`
                            }
                            className="rounded-full object-cover w-full"
                            alt={auth.user?.name || "User Avatar"}
                        />
                    </div>
                    <div
                        className={`bg-white rounded-2xl text-black font-medium flex flex-col gap-1 absolute z-[999] right-0 top-[80px] min-w-[180px] overflow-hidden ${
                            dropdownOpen ? "" : "hidden"
                        }`}
                        ref={dropdownTarget}
                    >
                        <Link
                            href={route("user.dashboard")}
                            className="transition-all hover:bg-sky-100 p-4"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={route("profile.edit")}
                            className="transition-all hover:bg-sky-100 p-4"
                        >
                            Settings
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="transition-all hover:bg-sky-100 p-4 text-left w-full"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
            <style jsx="true">
                {`
                    .top-search {
                        background-image: url("/icons/ic_search.svg");
                    }
                `}
            </style>
        </div>
    );
}
