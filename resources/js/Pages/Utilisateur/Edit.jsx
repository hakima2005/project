import AppLayout from '@/Layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';

export default function UtilisateurEdit({ utilisateur, profils, statuts }) {
    const { data, setData, put, processing, errors } = useForm({
        nom: utilisateur.nom || '',
        prenom: utilisateur.prenom || '',
        login: utilisateur.login || '',
        mot_de_passe: '',
        mot_de_passe_confirmation: '',
        id_profil: utilisateur.id_profil || '',
        id_statut: utilisateur.id_statut || '',
    });

    return (
        <AppLayout title="Modifier l'utilisateur">
            <div className="max-w-2xl bg-white rounded-xl shadow p-6">
                <form onSubmit={(e) => { e.preventDefault(); put(`/utilisateurs/${utilisateur.id_utilisateur}`); }} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                            <input type="text" value={data.nom} onChange={e => setData('nom', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"/>
                            {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                            <input type="text" value={data.prenom} onChange={e => setData('prenom', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"/>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Login *</label>
                            <input type="text" value={data.login} onChange={e => setData('login', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"/>
                            {errors.login && <p className="text-red-500 text-xs mt-1">{errors.login}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Profil *</label>
                            <select value={data.id_profil} onChange={e => setData('id_profil', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                                <option value="">-- Choisir --</option>
                                {profils?.map(p => <option key={p.id_profil} value={p.id_profil}>{p.libelle}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                            <select value={data.id_statut} onChange={e => setData('id_statut', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                                <option value="">-- Choisir --</option>
                                {statuts?.map(s => <option key={s.id_statut} value={s.id_statut}>{s.nom_fr}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
                            <input type="password" value={data.mot_de_passe} onChange={e => setData('mot_de_passe', e.target.value)}
                                placeholder="Laisser vide pour ne pas changer"
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"/>
                            {errors.mot_de_passe && <p className="text-red-500 text-xs mt-1">{errors.mot_de_passe}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmation</label>
                            <input type="password" value={data.mot_de_passe_confirmation} onChange={e => setData('mot_de_passe_confirmation', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"/>
                        </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button type="submit" disabled={processing}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50">
                            {processing ? 'Enregistrement...' : 'Enregistrer'}
                        </button>
                        <Link href="/utilisateurs" className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg text-sm hover:bg-gray-300">Annuler</Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}