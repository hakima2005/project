import AppLayout from '@/Layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';

export default function FournisseurCreate() {
    const { data, setData, post, processing, errors } = useForm({
        raison_sociale: '', identifiant_fiscal: '', ICE: '', RC: '', CNSS: '',
        telephone: '', email: '', representation: '', activite_principale: '',
    });
    return (
        <AppLayout title="Nouveau fournisseur">
            <div className="max-w-3xl bg-white rounded-xl shadow p-6">
                <form onSubmit={(e) => { e.preventDefault(); post('/fournisseurs'); }} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Raison sociale *</label>
                        <input type="text" value={data.raison_sociale} onChange={e => setData('raison_sociale', e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"/>
                        {errors.raison_sociale && <p className="text-red-500 text-xs mt-1">{errors.raison_sociale}</p>}
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ICE</label>
                            <input type="text" value={data.ICE} onChange={e => setData('ICE', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">IF</label>
                            <input type="text" value={data.identifiant_fiscal} onChange={e => setData('identifiant_fiscal', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">RC</label>
                            <input type="text" value={data.RC} onChange={e => setData('RC', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"/>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                            <input type="text" value={data.telephone} onChange={e => setData('telephone', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" value={data.email} onChange={e => setData('email', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"/>
                        </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button type="submit" disabled={processing}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50">
                            {processing ? 'Enregistrement...' : 'Enregistrer'}
                        </button>
                        <Link href="/fournisseurs" className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm hover:bg-gray-300">Annuler</Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
