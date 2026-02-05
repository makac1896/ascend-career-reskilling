import React from 'react';

export const GlassLightning: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad-lightning" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#FFA500', stopOpacity: 1 }} />
      </linearGradient>
      <filter id="glow-lightning" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <path
      d="M55 5 L25 55 H50 L45 95 L75 45 H50 L55 5Z"
      fill="url(#grad-lightning)"
      filter="url(#glow-lightning)"
      stroke="white"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

export const GlassHandshake: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="grad-handshake" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" style={{ stopColor: '#60A5FA', stopOpacity: 0.8 }} />
        <stop offset="100%" style={{ stopColor: '#2563EB', stopOpacity: 0.9 }} />
      </radialGradient>
       <filter id="glass-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.2"/>
       </filter>
    </defs>
    <circle cx="50" cy="50" r="40" fill="url(#grad-handshake)" filter="url(#glass-shadow)" />
    <path d="M30 50 L45 65 L70 35" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ClayCube: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad-cube-top" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#A78BFA', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="grad-cube-left" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#7C3AED', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#6D28D9', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="grad-cube-right" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#C4B5FD', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#A78BFA', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path d="M50 20 L80 35 V65 L50 80 L20 65 V35 L50 20Z" fill="url(#grad-cube-left)" />
    <path d="M50 20 L80 35 L50 50 L20 35 L50 20Z" fill="url(#grad-cube-top)" opacity="0.9"/>
    <path d="M50 50 L80 35 V65 L50 80 V50Z" fill="url(#grad-cube-right)" opacity="0.8"/>
    <path d="M20 35 L50 50 V80 L20 65 V35Z" fill="url(#grad-cube-left)" opacity="0.6"/>
  </svg>
);

export const GlassGlobe: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="grad-globe" cx="40%" cy="40%" r="60%" fx="40%" fy="40%">
        <stop offset="0%" style={{ stopColor: '#67E8F9', stopOpacity: 0.6 }} />
        <stop offset="100%" style={{ stopColor: '#06B6D4', stopOpacity: 0.2 }} />
      </radialGradient>
      <filter id="inner-glow">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="arithmetic" k2="0.6" k3="0.4" />
      </filter>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#grad-globe)" stroke="#22D3EE" strokeWidth="1.5" />
    <ellipse cx="50" cy="50" rx="45" ry="15" stroke="#22D3EE" strokeWidth="1" strokeDasharray="4 4" transform="rotate(-15 50 50)" opacity="0.6" />
    <ellipse cx="50" cy="50" rx="45" ry="15" stroke="#22D3EE" strokeWidth="1" strokeDasharray="4 4" transform="rotate(45 50 50)" opacity="0.6" />
    <circle cx="70" cy="30" r="8" fill="white" opacity="0.3" filter="url(#inner-glow)" />
  </svg>
);

export const GlassDNA: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-dna" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#F472B6', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#DB2777', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path d="M30 20 Q50 35 70 20" stroke="url(#grad-dna)" strokeWidth="8" strokeLinecap="round" opacity="0.8"/>
      <path d="M30 50 Q50 65 70 50" stroke="url(#grad-dna)" strokeWidth="8" strokeLinecap="round" opacity="0.8"/>
      <path d="M30 80 Q50 95 70 80" stroke="url(#grad-dna)" strokeWidth="8" strokeLinecap="round" opacity="0.8"/>
      <line x1="30" y1="20" x2="30" y2="80" stroke="white" strokeWidth="4" strokeLinecap="round"/>
      <line x1="70" y1="20" x2="70" y2="80" stroke="white" strokeWidth="4" strokeLinecap="round"/>
    </svg>
);

export const GlassLeaf: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-leaf" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#4ADE80', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#166534', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path d="M50 90 Q20 50 50 10 Q80 50 50 90 Z" fill="url(#grad-leaf)" />
      <path d="M50 10 Q50 50 50 90" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
    </svg>
);
