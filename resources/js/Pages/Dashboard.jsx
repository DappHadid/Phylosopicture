import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    return (
        // Jika Anda tidak menggunakan AuthenticatedLayout, hapus saja dan ganti dengan <div>
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard Test
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1>Halo, {auth.user.name}!</h1>
                            <p>
                                Jika halaman ini muncul, berarti routing dan
                                layout Anda bekerja.
                            </p>
                            <p>
                                Masalahnya ada di kode asli file Dashboard.jsx
                                Anda.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
