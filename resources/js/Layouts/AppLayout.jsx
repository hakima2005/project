import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    LayoutDashboard,
    CalendarRange,
    Coins,
    FolderOpen,
    Tags,
    Wrench,
    TrendingUp,
    LayoutGrid,
    Target,
    ScrollText,
    ClipboardList,
    Building2,
    FileText,
    Users,
    History,
    ChevronLeft,
    ChevronRight,
    LogOut,
    CheckCircle2,
    AlertCircle,
    X,
} from 'lucide-react';

export default function AppLayout({ children, title }) {
    const { auth, flash } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (flash?.success) {
            setMessage({ type: 'success', text: flash.success });
        } else if (flash?.error) {
            setMessage({ type: 'error', text: flash.error });
        } else {
            setMessage(null);
        }

        if (flash?.success || flash?.error) {
            const timer = setTimeout(() => setMessage(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const menuItems = [
        { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { label: 'Exercices', href: '/exercices', icon: CalendarRange },
        { label: 'Types de montant', href: '/type-mts', icon: Coins },
        { label: 'Familles', href: '/familles', icon: FolderOpen },
        { label: 'Types de catégorie', href: '/type-categories', icon: Tags },
        { label: 'Nature de prestation', href: '/natures-prestation', icon: Wrench },
        { label: 'Situation budgétaire', href: '/situation-budgetaire', icon: TrendingUp },
        { label: 'Catégories', href: '/categories', icon: LayoutGrid },
        { label: 'Max Nature', href: '/max-nature', icon: Target },
        { label: 'Décret RAS', href: '/decret-ras', icon: ScrollText },
        { label: 'Décret TVA', href: '/decret-tva', icon: ScrollText },
        { label: 'Bons de commande', href: '/bons-commande', icon: ClipboardList },
        { label: 'Fournisseurs', href: '/fournisseurs', icon: Building2 },
        { label: 'Devis', href: '/devis', icon: FileText },
        { label: 'Utilisateurs', href: '/utilisateurs', icon: Users },
        { label: 'Journal', href: '/journals', icon: History },
    ];

    const currentPath =
        typeof window !== 'undefined' ? window.location.pathname : '';

    return (
        <div className="flex h-screen bg-cream-100 font-sans">
            {/* Sidebar */}
            <aside
                className={`${
                    sidebarOpen ? 'w-64' : 'w-[72px]'
                } bg-navy-800 text-white transition-all duration-300 flex flex-col shrink-0`}
            >
                {/* Logo */}
                <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
                    {sidebarOpen ? (
                        <div>
                            <h1 className="font-display font-semibold tracking-wide text-lg">
                                CASM
                            </h1>
                            <p className="text-[11px] text-navy-200 tracking-wide uppercase mt-0.5">
                                Gestion Budgétaire
                            </p>
                        </div>
                    ) : (
                        <div className="w-8 h-8 rounded-md bg-gold-500 flex items-center justify-center font-display font-bold text-sm mx-auto">
                            C
                        </div>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-navy-300 hover:text-white transition-colors shrink-0"
                        aria-label={sidebarOpen ? 'Réduire le menu' : 'Agrandir le menu'}
                    >
                        {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                    </button>
                </div>

                {/* Menu */}
                <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const active = currentPath.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                title={!sidebarOpen ? item.label : undefined}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                                transition-colors duration-150 relative
                                ${
                                    active
                                        ? 'bg-white/10 text-white font-medium'
                                        : 'text-navy-200 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                {active && (
                                    <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-gold-500" />
                                )}
                                <Icon size={18} strokeWidth={1.8} className="shrink-0" />
                                {sidebarOpen && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* User info */}
                <div className="px-4 py-4 border-t border-white/10">
                    {sidebarOpen ? (
                        <div className="flex items-center justify-between">
                            <div className="min-w-0">
                                <p className="text-sm font-medium truncate">
                                    {auth?.user?.name}
                                </p>
                                <p className="text-[11px] text-navy-300 truncate">
                                    {auth?.user?.email}
                                </p>
                            </div>
                            <Link
                                href="/logout"
                                method="post"
                                className="text-navy-300 hover:text-rose-300 transition-colors shrink-0"
                                title="Déconnexion"
                            >
                                <LogOut size={16} />
                            </Link>
                        </div>
                    ) : (
                        <Link
                            href="/logout"
                            method="post"
                            className="flex justify-center text-navy-300 hover:text-rose-300 transition-colors"
                            title="Déconnexion"
                        >
                            <LogOut size={16} />
                        </Link>
                    )}
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="bg-white border-b border-cream-200 px-8 py-5 flex items-center justify-between shrink-0">
                    <h2 className="font-display font-semibold text-xl text-navy-900">
                        {title}
                    </h2>
                    <div className="text-sm text-gray-500 capitalize">
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
                        className={`mx-8 mt-4 flex items-center gap-3 px-4 py-3 rounded-lg border text-sm
                        ${
                            message.type === 'success'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : 'bg-rose-50 text-rose-800 border-rose-200'
                        }`}
                    >
                        {message.type === 'success' ? (
                            <CheckCircle2 size={18} className="shrink-0" />
                        ) : (
                            <AlertCircle size={18} className="shrink-0" />
                        )}
                        <span className="flex-1">{message.text}</span>
                        <button
                            onClick={() => setMessage(null)}
                            className="opacity-60 hover:opacity-100"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-8">{children}</main>
            </div>
        </div>
    );
}