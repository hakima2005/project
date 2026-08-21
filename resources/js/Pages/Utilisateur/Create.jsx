import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import { useForm, Link } from '@inertiajs/react';

export default function UtilisateurCreate({ profils }) {
    const { data, setData, post, processing, errors } = useForm({
        nom: '', prenom: '', login: '', mot_de_passe: '', mot_de_passe_confirmation: '', id_profil: '',
    });
    return (
        <AppLayout title="Nouvel utilisateur">
            <div className="max-w-2xl">
                <Card title="Nouvel utilisateur">
                    <form onSubmit={(e) => { e.preventDefault(); post('/utilisateurs'); }} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                                <input type="text" value={data.nom} onChange={e => setData('nom', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"/>
                                {errors.nom && <p className="text-rose-500 text-xs mt-1">{errors.nom}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                                <input type="text" value={data.prenom} onChange={e => setData('prenom', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"/>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Login *</label>
                                <input type="text" value={data.login} onChange={e => setData('login', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"/>
                                {errors.login && <p className="text-rose-500 text-xs mt-1">{errors.login}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Profil *</label>
                                <select value={data.id_profil} onChange={e => setData('id_profil', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400">
                                    <option value="">-- Choisir --</option>
                                    {profils?.map(p => <option key={p.id_profil} value={p.id_profil}>{p.libelle}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe *</label>
                                <input type="password" value={data.mot_de_passe} onChange={e => setData('mot_de_passe', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"/>
                                {errors.mot_de_passe && <p className="text-rose-500 text-xs mt-1">{errors.mot_de_passe}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirmation *</label>
                                <input type="password" value={data.mot_de_passe_confirmation} onChange={e => setData('mot_de_passe_confirmation', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"/>
                            </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <Button type="submit" variant="primary" disabled={processing}>
                                {processing ? 'Enregistrement...' : 'Enregistrer'}
                            </Button>
                            <Button as={Link} href="/utilisateurs" variant="secondary">Annuler</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}