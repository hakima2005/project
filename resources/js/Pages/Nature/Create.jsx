import AppLayout from '@/Layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';

export default function NatureCreate({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        code_nature: '', nom_fr: '', nom_ar: '', description: '', code_categorie: '',
    });
    return (
        <AppLayout title="Nouvelle nature">
            <div className="max-w-2xl bg-white rounded-xl shadow p-6">
                <form onSubmit={(e) => { e.preventDefault(); post('/natures'); }} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
                            <input type="text" value={data.code_nature} onChange={e => setData('code_nature', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"/>
                            {errors.code_nature && <p className="text-red-500 text-xs mt-1">{errors.code_nature}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
                            <select value={data.code_categorie} onChange={e => setData('code_categorie', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                                <option value="">-- Choisir --</option>
                                {categories?.map(c => <option key={c.code_categorie} value={c.code_categorie}>{c.nom_fr}</option>)}
                            </select>
                        </div>
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea value={data.description} rows={3} onChange={e => setData('description', e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button type="submit" disabled={processing}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50">
                            {processing ? 'Enregistrement...' : 'Enregistrer'}
                        </button>
                        <Link href="/natures" className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm hover:bg-gray-300">Annuler</Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
