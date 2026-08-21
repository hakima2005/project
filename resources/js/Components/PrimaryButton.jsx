export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                'inline-flex items-center justify-center gap-2 rounded-lg ' +
                'bg-navy-800 px-4 py-2 text-sm font-medium text-white ' +
                'transition-colors duration-150 hover:bg-navy-700 ' +
                'focus:outline-none focus:ring-2 focus:ring-navy-300 focus:ring-offset-1 ' +
                (disabled ? 'opacity-50 cursor-not-allowed ' : '') +
                className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}