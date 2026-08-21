import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-cream-100 px-4">

            {/* Logo / Branding */}
            <Link href="/" className="mb-8 text-center">
                <div className="w-16 h-16 rounded-xl bg-navy-800 flex items-center justify-center mx-auto mb-3">
                    <span className="font-display font-bold text-2xl text-gold-400">
                        C
                    </span>
                </div>
                <h1 className="font-display font-semibold text-2xl text-navy-900">
                    CASM
                </h1>
                <p className="text-xs text-gray-500 tracking-wide uppercase mt-1">
                    Gestion Budgétaire
                </p>
            </Link>

            {/* Card */}
            <div className="w-full sm:max-w-md bg-white rounded-2xl shadow-card border border-cream-200 px-8 py-8">
                {children}
            </div>

        </div>
    );
}