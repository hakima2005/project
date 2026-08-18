import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function AppLayout({ children, title }) {
    const { auth, flash } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (flash?.success) {
            setMessage({
                type: 'success',
                text: flash.success,
            });
        } else if (flash?.error) {
            setMessage({
                type: 'error',
                text: flash.error,
            });
        } else {
            setMessage(null);
        }

        if (flash?.success || flash?.error) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [flash]);

    const menuItems = [
        { label: 'Dashboard', href: '/dashboard', icon: '📊' },
        { label: 'Exercices', href: '/exercices', icon: '📅' },
        { label: 'Types de montant', href: '/type-mts', icon: '💰' },
        { label: 'Familles', href: '/familles', icon: '📁' },
        { label: 'Types de catégorie', href: '/type-categories', icon: '🏷️' },
        { label: 'Nature de prestation', href: '/natures-prestation', icon: '🛠️' },
        { label: 'Situation budgétaire', href: '/situation-budgetaire', icon: '📈' },
        { label: 'Catégories', href: '/categories', icon: '🗂️' },
        { label: 'Max Nature', href: '/max-nature', icon: '🎯' },
        { label: 'Décret RAS', href: '/decret-ras', icon: '📜' },
        { label: 'Décret TVA', href: '/decret-tva', icon: '📜' },
        { label: 'Bons de commande', href: '/bons-commande', icon: '📝' },
        { label: 'Fournisseurs', href: '/fournisseurs', icon: '🏢' },
        { label: 'Devis', href: '/devis', icon: '💼' },
        { label: 'Utilisateurs', href: '/utilisateurs', icon: '👥' },
        { label: 'Journal', href: '/journals', icon: '📜' },
    ];

    return (
        <div className="flex h-screen bg-gray-100">

            {/* Sidebar */}
            <aside
                className={`${
                    sidebarOpen ? 'w-64' : 'w-16'
                } bg-blue-900 text-white transition-all duration-300 flex flex-col`}
            >
                {/* Logo */}
                <div className="flex items-center justify-between p-4 border-b border-blue-700">
                    {sidebarOpen && (
                        <div>
                            <h1 className="text-sm font-bold">CASM</h1>
                            <p className="text-xs text-blue-300">
                                Gestion Budgétaire
                            </p>
                        </div>
                    )}

                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-white hover:text-blue-300 text-xl"
                    >
                        {sidebarOpen ? '◀' : '▶'}
                    </button>
                </div>

                {/* Menu */}
                <nav className="flex-1 overflow-y-auto py-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-blue-700 transition-colors text-sm"
                        >
                            <span className="text-lg">{item.icon}</span>

                            {sidebarOpen && (
                                <span>{item.label}</span>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* User info */}
                {sidebarOpen && (
                    <div className="p-4 border-t border-blue-700 text-xs text-blue-300">
                        <p>{auth?.user?.name}</p>

                        <Link
                            href="/logout"
                            method="post"
                            className="text-red-300 hover:text-red-100"
                        >
                            Déconnexion
                        </Link>
                    </div>
                )}
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">

                {/* Topbar */}
                <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-700">
                        {title}
                    </h2>

                    <div className="text-sm text-gray-500">
                        {new Date().toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </div>
                </header>

                {/* Flash message */}
                {message && (
                    <div
                        className={`mx-6 mt-4 px-4 py-3 rounded-lg text-sm ${
                            message.type === 'success'
                                ? 'bg-green-100 text-green-700 border border-green-300'
                                : 'bg-red-100 text-red-700 border border-red-300'
                        }`}
                    >
                        {message.text}
                    </div>
                )}

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}