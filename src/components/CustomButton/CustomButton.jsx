import React, { useState } from 'react';

export default function CustomButton({ onClick, children, image, alt, style, tooltip }) {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseOver = () => {
        setShowTooltip(true);
    };

    const handleMouseOut = () => {
        setShowTooltip(false);
    };

    return (
        <div
            style={{
                display: 'flex',
                cursor: 'pointer',
                borderRadius: '100px',
                display: 'inline-flex',
                alignItems: 'center',
                position: 'relative',
                textAlign: 'center',
            }}
            onClick={onClick}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            {image && <img src={image} alt={alt} style={style} />}
            {children}
            {showTooltip && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '150%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#fff',
                        padding: '5px',
                        borderRadius: '5px',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                        zIndex: '999',
                    }}
                    data-testid="tooltip"
                >
                <p style={{ margin: '0', textAlign: 'center' }}>{tooltip}</p>                </div>
            )}
        </div>
    );
}
