export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-navy-800 shadow-sm ' +
                'focus:ring-2 focus:ring-navy-300 focus:outline-none ' +
                'accent-navy-800 ' +
                className
            }
        />
    );
}