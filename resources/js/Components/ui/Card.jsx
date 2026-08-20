export default function Card({ title, subtitle, actions, children, className = '' }) {
    return (
        <div className={`bg-white rounded-xl shadow-card border border-cream-200 ${className}`}>
            {(title || actions) && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-cream-200">
                    <div>
                        {title && (
                            <h3 className="font-display font-semibold text-navy-900 text-base">
                                {title}
                            </h3>
                        )}
                        {subtitle && (
                            <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
                        )}
                    </div>
                    {actions && <div className="flex items-center gap-2">{actions}</div>}
                </div>
            )}
            <div className="p-6">{children}</div>
        </div>
    );
}