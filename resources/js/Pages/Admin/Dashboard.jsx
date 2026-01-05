import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import StatCard from "@/Components/Admin/StatCard";
import SalesChart from "@/Components/Admin/SalesChart";
import MoviesChart from "@/Components/Admin/MoviesChart";
import UsersChart from "@/Components/Admin/UsersChart";
import { FiDollarSign, FiFilm, FiUsers, FiCreditCard } from "react-icons/fi";

// NOTE: Komponen StatCard, SalesChart, dkk. mungkin perlu penyesuaian warna secara terpisah.
// Kode ini hanya menyesuaikan layout utama dashboard.

export default function Dashboard({
    auth,
    stats = {},
    chartData = [],
    usersChartData = [],
    moviesChartData = [],
}) {
    const {
        totalRevenue = 0,
        revenueChange = 0,
        totalMovies = 0,
        moviesChange = 0,
        totalUsers = 0,
        usersChange = 0,
        totalPayments = 0,
        paymentsChange = 0,
    } = stats;

    return (
        <AdminLayout header="Dashboard Overview">
            <Head title="Admin Dashboard" />

            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                {/* Statistik */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={
                            <FiDollarSign
                                size={24}
                                className="text-[#DA0037]"
                            />
                        }
                        title="Total Revenue"
                        value={new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                        }).format(totalRevenue)}
                        percentage={revenueChange}
                    />
                    <StatCard
                        icon={<FiFilm size={24} className="text-[#DA0037]" />}
                        title="Total Movies"
                        value={totalMovies.toString()}
                        percentage={moviesChange}
                    />
                    <StatCard
                        icon={<FiUsers size={24} className="text-[#DA0037]" />}
                        title="Total Users"
                        value={totalUsers.toString()}
                        percentage={usersChange}
                    />
                    <StatCard
                        icon={
                            <FiCreditCard
                                size={24}
                                className="text-[#DA0037]"
                            />
                        }
                        title="Total Payments"
                        value={totalPayments.toString()}
                        percentage={paymentsChange}
                    />
                </div>

                {/* Grafik */}
                <div className="grid grid-cols-1 gap-8">
                    <div className="bg-[#171717] border border-gray-700 shadow-lg rounded-xl p-6">
                        <SalesChart data={chartData} />
                    </div>
                    <div className="bg-[#171717] border border-gray-700 shadow-lg rounded-xl p-6">
                        <UsersChart data={usersChartData} />
                    </div>
                    <div className="bg-[#171717] border border-gray-700 shadow-lg rounded-xl p-6">
                        <MoviesChart data={moviesChartData} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
