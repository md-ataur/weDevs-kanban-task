import React, { useEffect, useRef } from 'react';

const Dropdown = (props: any) => {
    const dropdownRef = useRef<HTMLInputElement>(null);

    // Click handler
    const handleClick = (e: any) => {
        if (dropdownRef && !dropdownRef?.current?.contains(e?.target)) {
            if (props.onClose) {
                props.onClose();
            }
        }
    };

    useEffect(() => {
        // Component mount
        document.addEventListener('click', handleClick);

        // Component unmount
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <div
            ref={dropdownRef}
            style={{
                position: 'absolute',
                top: '-25px',
                right: '26px',
            }}
        >
            {props.children}
        </div>
    );
};

export default Dropdown;
