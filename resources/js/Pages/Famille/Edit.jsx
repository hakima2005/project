import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import { useForm, Link } from '@inertiajs/react';

export default function FamilleEdit({ famille, exercices }) {
    const { data, setData, put, processing, errors } = useForm({
        nom_fr: famille.nom_fr, nom_ar: famille.nom_ar || '', description: famille.description || '', id_exercice: famille.id_exercice,
    });
    return (
        <AppLayout title="Modifier famille">
            <div className="max-w-2xl">
                <Card title="Modifier la famille">
                    <form onSubmit={(e) => { e.preventDefault(); put(`/familles/${famille.code_famille}`); }} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                            <input type="text" value={famille.code_famille} disabled className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-cream-100 text-gray-500"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom FR *</label>
                            <input type="text" value={data.nom_fr} onChange={e => setData('nom_fr', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom AR</label>
                            <input type="text" value={data.nom_ar} onChange={e => setData('nom_ar', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400" dir="rtl"/>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <Button type="submit" variant="primary" disabled={processing}>
                                {processing ? 'Enregistrement...' : 'Mettre à jour'}
                            </Button>
                            <Button as={Link} href="/familles" variant="secondary">Annuler</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}