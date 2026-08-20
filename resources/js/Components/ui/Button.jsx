const VARIANTS = {
    primary:
        'bg-navy-800 text-white hover:bg-navy-700 focus-visible:ring-navy-800',
    gold:
        'bg-gold-500 text-white hover:bg-gold-600 focus-visible:ring-gold-500',
    secondary:
        'bg-white text-navy-800 border border-navy-200 hover:bg-navy-50 focus-visible:ring-navy-300',
    danger:
        'bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-600',
    ghost:
        'bg-transparent text-navy-700 hover:bg-navy-50 focus-visible:ring-navy-300',
};

export default function Button({
    as: Component = 'button',
    variant = 'primary',
    className = '',
    disabled = false,
    children,
    ...props
}) {
    return (
        <Component
            disabled={disabled}
            className={`inline-flex items-center justify-center gap-2
            px-4 py-2 rounded-lg text-sm font-medium
            transition-colors duration-150
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
            disabled:opacity-50 disabled:cursor-not-allowed
            ${VARIANTS[variant] || VARIANTS.primary} ${className}`}
            {...props}
        >
            {children}
        </Component>
    );
}