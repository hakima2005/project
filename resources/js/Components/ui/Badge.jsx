const TONES = {
    navy:    'bg-navy-100 text-navy-800 border-navy-200',
    gold:    'bg-gold-100 text-gold-700 border-gold-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    danger:  'bg-rose-50 text-rose-700 border-rose-200',
    neutral: 'bg-gray-100 text-gray-600 border-gray-200',
};

export default function Badge({ tone = 'neutral', children, className = '' }) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
            text-xs font-medium border ${TONES[tone] || TONES.neutral} ${className}`}
        >
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
            {children}
        </span>
    );
}

export function statutToTone(nomStatut) {
    const map = {
        'Créé': 'neutral',
        'Brouillon': 'neutral',
        'Publié': 'gold',
        'Attribué': 'navy',
        "En cours d'exécution": 'gold',
        'Terminé': 'success',
        'Annulé': 'danger',
    };
    return map[nomStatut] || 'neutral';
}