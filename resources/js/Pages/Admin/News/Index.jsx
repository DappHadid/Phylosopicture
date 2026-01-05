import AdminLayout from "@/Layouts/AdminLayout";
import { Link, usePage } from "@inertiajs/react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { NewspaperIcon } from "@heroicons/react/24/solid";

export default function Index({ auth, news }) {
    const { flash } = usePage().props;

    // Helper untuk menampilkan URL gambar dengan aman
    const getImageUrl = (path) => {
        return path
            ? `/storage/${path}`
            : "https://via.placeholder.com/150x80?text=No+Image";
    };

    return (
        <AdminLayout header="News Management">
            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                {/* Flash Message untuk notifikasi sukses */}
                {flash?.success && (
                    <div
                        className="mb-6 bg-green-500/10 border border-green-500/20 text-green-300 px-4 py-3 rounded-lg relative"
                        role="alert"
                    >
                        <strong className="font-bold">Success!</strong>
                        <span className="block sm:inline ml-2">
                            {flash.success}
                        </span>
                    </div>
                )}

                {/* Header: Judul dan Tombol Add News */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-[#EDEDED]">
                        All News Articles
                    </h1>
                    <Link
                        href={route("admin.news.create")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#DA0037] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-[#a10028] focus:outline-none focus:ring-2 focus:ring-[#DA0037] focus:ring-offset-2 focus:ring-offset-[#171717] transition ease-in-out duration-150"
                    >
                        <FiPlus className="h-4 w-4" />
                        <span>Add News</span>
                    </Link>
                </div>

                {/* Container Tabel Berita */}
                <div className="bg-[#171717] border border-gray-700 shadow-lg rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-300">
                            <thead className="text-xs text-gray-400 uppercase bg-[#444444]/20">
                                <tr>
                                    <th scope="col" className="px-6 py-4">
                                        Image
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Date
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-4 text-center"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {news.length > 0 ? (
                                    news.map((n) => (
                                        <tr
                                            key={n.news_id}
                                            className="border-b border-gray-700 hover:bg-[#444444]/10"
                                        >
                                            <td className="px-6 py-4">
                                                <img
                                                    src={getImageUrl(n.image)}
                                                    alt={n.title}
                                                    className="w-24 h-14 object-cover rounded-md bg-gray-500"
                                                />
                                            </td>
                                            <td className="px-6 py-4 font-medium text-white">
                                                {n.title}
                                            </td>
                                            <td className="px-6 py-4 capitalize">
                                                {n.category}
                                            </td>
                                            <td className="px-6 py-4">
                                                {new Date(
                                                    n.date
                                                ).toLocaleDateString("id-ID", {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </td>
                                            <td className="px-6 py-4 flex justify-center items-center gap-4 h-full">
                                                <Link
                                                    href={route(
                                                        "admin.news.edit",
                                                        n.news_id
                                                    )}
                                                    className="font-medium text-blue-400 hover:text-blue-300"
                                                    aria-label="Edit"
                                                >
                                                    <FaRegEdit className="h-5 w-5" />
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "admin.news.destroy",
                                                        n.news_id
                                                    )}
                                                    method="delete"
                                                    as="button"
                                                    className="font-medium text-red-500 hover:text-red-400"
                                                    onBefore={() =>
                                                        confirm(
                                                            "Are you sure you want to delete this article?"
                                                        )
                                                    }
                                                    aria-label="Delete"
                                                >
                                                    <FaRegTrashAlt className="h-5 w-5" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    // Tampilan saat tidak ada data berita
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-6 py-20 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center text-gray-500">
                                                <NewspaperIcon className="w-16 h-16 mb-4" />
                                                <h3 className="text-xl font-semibold text-gray-400">
                                                    No News Found
                                                </h3>
                                                <p className="mt-2 text-sm">
                                                    Get started by adding a new
                                                    news article.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
