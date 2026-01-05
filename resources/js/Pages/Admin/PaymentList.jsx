import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

function StatusBadge({ status }) {
    const styles = {
        pending: "bg-yellow-500/10 text-yellow-400",
        success: "bg-green-500/10 text-green-400",
        failed: "bg-red-500/10 text-red-400",
    };
    return (
        <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                styles[status] || "bg-gray-500/10 text-gray-400"
            }`}
        >
            {status}
        </span>
    );
}

export default function PaymentList({ auth, payments, filters }) {
    const hasPayments = payments?.data?.length > 0;
    const [search, setSearch] = useState(filters.search || "");
    const [status, setStatus] = useState(filters.status || "");

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(
            route("admin.payments.index"),
            { search, status },
            { preserveState: true, replace: true }
        );
    };

    const inputClassName =
        "w-full bg-[#444444]/30 border border-gray-600 text-[#EDEDED] rounded-lg focus:ring-[#DA0037] focus:border-[#DA0037] transition duration-150";

    return (
        <AdminLayout header="Transactions">
            <Head title="Payments" />
            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="bg-[#171717] border border-gray-700 shadow-lg rounded-xl p-6">
                    <h2 className="text-lg font-bold text-[#EDEDED] mb-4">
                        Payment History
                    </h2>

                    <form
                        onSubmit={handleFilter}
                        className="flex flex-col md:flex-row gap-4 mb-6"
                    >
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={`${inputClassName} md:w-1/3`}
                        />
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className={`${inputClassName} md:w-1/4`}
                        >
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="success">Success</option>
                            <option value="failed">Failed</option>
                        </select>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#DA0037] text-white rounded-lg text-sm font-medium hover:bg-[#a10028]"
                        >
                            Filter
                        </button>
                    </form>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-300">
                            <thead className="text-xs text-gray-400 uppercase bg-[#444444]/20">
                                <tr>
                                    <th className="px-6 py-3">Order ID</th>
                                    <th className="px-6 py-3">User</th>
                                    <th className="px-6 py-3">Movie</th>
                                    <th className="px-6 py-3">Amount</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hasPayments ? (
                                    payments.data.map((payment) => (
                                        <tr
                                            key={payment.payment_id}
                                            className="border-b border-gray-700 hover:bg-[#444444]/10"
                                        >
                                            <td className="px-6 py-4 font-medium text-white">
                                                {payment.order_id}
                                            </td>
                                            <td className="px-6 py-4">
                                                {payment.user?.name || "N/A"}
                                            </td>
                                            <td className="px-6 py-4">
                                                {payment.movie?.title || "N/A"}
                                            </td>
                                            <td className="px-6 py-4 font-semibold">
                                                {new Intl.NumberFormat(
                                                    "id-ID",
                                                    {
                                                        style: "currency",
                                                        currency: "IDR",
                                                    }
                                                ).format(payment.amount)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge
                                                    status={payment.status}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                {new Date(
                                                    payment.created_at
                                                ).toLocaleDateString("id-ID")}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center py-10 text-gray-500"
                                        >
                                            No transactions found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                </div>
            </div>
        </AdminLayout>
    );
}
