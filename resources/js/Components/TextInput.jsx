import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-lg border border-gray-300 text-sm text-gray-900 shadow-sm ' +
                'focus:border-navy-400 focus:ring-2 focus:ring-navy-300 focus:outline-none ' +
                'px-3 py-2 ' +
                className
            }
            ref={localRef}
        />
    );
});