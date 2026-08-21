import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import { useForm, Link } from '@inertiajs/react';

export default function FamilleCreate({ exercices }) {
    const { data, setData, post, processing, errors } = useForm({
        code_famille: '', nom_fr: '', nom_ar: '', description: '', id_exercice: '',
    });
    return (
        <AppLayout title="Nouvelle famille">
            <div className="max-w-2xl">
                <Card title="Nouvelle famille">
                    <form onSubmit={(e) => { e.preventDefault(); post('/familles'); }} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
                                <input type="text" value={data.code_famille} onChange={e => setData('code_famille', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400" placeholder="FAM001"/>
                                {errors.code_famille && <p className="text-rose-500 text-xs mt-1">{errors.code_famille}</p>}
                            </div>

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
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea value={data.description} rows={3} onChange={e => setData('description', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"/>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <Button type="submit" variant="primary" disabled={processing}>
                                {processing ? 'Enregistrement...' : 'Enregistrer'}
                            </Button>
                            <Button as={Link} href="/familles" variant="secondary">Annuler</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}