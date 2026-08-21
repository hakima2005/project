import Button from '@/Components/ui/Button';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Vérification de l'email" />

            <h2 className="font-display text-lg font-semibold text-navy-900 mb-3">
                Vérifiez votre email
            </h2>

            <div className="mb-4 text-sm text-gray-600">
                Merci de votre inscription ! Avant de commencer, pourriez-vous
                vérifier votre adresse email en cliquant sur le lien que nous
                venons de vous envoyer ? Si vous n'avez pas reçu l'email, nous
                vous en enverrons un autre volontiers.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-emerald-600">
                    Un nouveau lien de vérification a été envoyé à l'adresse
                    email fournie lors de l'inscription.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <Button type="submit" variant="primary" disabled={processing}>
                        Renvoyer l'email
                    </Button>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="rounded-md text-sm text-navy-700 underline hover:text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-300 focus:ring-offset-2"
                    >
                        Déconnexion
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}