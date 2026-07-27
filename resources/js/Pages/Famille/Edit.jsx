import AppLayout from '@/Layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';

export default function FamilleEdit({ famille, exercices }) {
    const { data, setData, put, processing, errors } = useForm({
        nom_fr: famille.nom_fr, nom_ar: famille.nom_ar || '', description: famille.description || '', id_exercice: famille.id_exercice,
    });
    return (
        <AppLayout title="Modifier famille">
            <div className="max-w-2xl bg-white rounded-xl shadow p-6">
                <form onSubmit={(e) => { e.preventDefault(); put(`/familles/${famille.code_famille}`); }} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                        <input type="text" value={famille.code_famille} disabled className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-100"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom FR *</label>
                        <input type="text" value={data.nom_fr} onChange={e => setData('nom_fr', e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom AR</label>
                        <input type="text" value={data.nom_ar} onChange={e => setData('nom_ar', e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" dir="rtl"/>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button type="submit" disabled={processing}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50">
                            {processing ? 'Enregistrement...' : 'Mettre à jour'}
                        </button>
                        <Link href="/familles" className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm hover:bg-gray-300">Annuler</Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
