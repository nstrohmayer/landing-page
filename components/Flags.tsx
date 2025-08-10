import React from 'react';

export const GBFlag: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className={className} aria-label="UK flag">
        <rect width="60" height="30" fill="#00247d"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" strokeWidth="6"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#cf142b" strokeWidth="4"/>
        <path d="M-1,15 H61" stroke="#ffffff" strokeWidth="10"/>
        <path d="M-1,15 H61" stroke="#cf142b" strokeWidth="6"/>
        <path d="M30,-1 V31" stroke="#ffffff" strokeWidth="10"/>
        <path d="M30,-1 V31" stroke="#cf142b" strokeWidth="6"/>
    </svg>
);

export const DEFlag: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" className={className} aria-label="German flag">
        <path d="M0 0h5v3H0z" fill="#000000"/>
        <path d="M0 1h5v2H0z" fill="#dd0000"/>
        <path d="M0 2h5v1H0z" fill="#ffce00"/>
    </svg>
);

export const NLFlag: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className={className} aria-label="Netherlands flag">
        <path d="M0 0h3v2H0z" fill="#21468B"/>
        <path d="M0 0h3v1.333H0z" fill="#ffffff"/>
        <path d="M0 0h3v0.667H0z" fill="#AE1C28"/>
    </svg>
);
