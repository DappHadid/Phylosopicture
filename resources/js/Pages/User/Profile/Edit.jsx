import { Head, usePage } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import Authenticated from "@/Layouts/Authenticated/Index";

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props; // Ambil data autentikasi dari Inertia props

    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* Update Profile Information Form */}
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                            user={auth.user} // Kirim data user untuk form dinamis
                        />
                    </div>

                    {/* Update Password Form */}
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm
                            className="max-w-xl"
                            user={auth.user} // Kirim data user jika diperlukan
                        />
                    </div>

                    {/* Delete User Form */}
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm
                            className="max-w-xl"
                            user={auth.user} // Kirim data user untuk konfirmasi penghapusan
                        />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
