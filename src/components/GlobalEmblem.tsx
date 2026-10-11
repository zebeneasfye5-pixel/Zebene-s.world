import React from 'react';

interface GlobalEmblemProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showGlow?: boolean;
}

export const GlobalEmblem: React.FC<GlobalEmblemProps> = ({
  size = 'md',
  className = '',
  showGlow = true,
}) => {
  // Dimensions mapping
  const sizeMap = {
    xs: { px: 28, text: 'text-[9px]' },
    sm: { px: 36, text: 'text-[11px]' },
    md: { px: 44, text: 'text-sm' },
    lg: { px: 64, text: 'text-lg' },
    xl: { px: 96, text: 'text-2xl' },
  };

  const { px } = sizeMap[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: px, height: px }}
    >
      {/* Ambient Radial Golden/Azure Aura */}
      {showGlow && (
        <div
          className="absolute inset-0 rounded-full blur-md bg-gradient-to-tr from-amber-500/30 via-rose-500/20 to-cyan-500/30 scale-125 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Main SVG International Emblem */}
      <svg
        viewBox="0 0 200 200"
        width={px}
        height={px}
        className="relative drop-shadow-[0_4px_12px_rgba(245,158,11,0.35)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Deep Sovereign Night Outer Gradient */}
          <radialGradient id="emblemBg" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="60%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>

          {/* Pure 24K Sovereign Gold Gradient */}
          <linearGradient id="goldLinear" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="25%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="75%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          {/* International Celestial Cyan / Azure Gradient */}
          <linearGradient id="celestialCyan" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#a5f3fc" />
          </linearGradient>

          {/* Soft Shimmer Highlight */}
          <linearGradient id="shimmerRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="30%" stopColor="#f59e0b" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#6366f1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* 1. Base Sovereign Disc with Polished Golden Bezel */}
        <circle cx="100" cy="100" r="94" fill="url(#emblemBg)" />
        <circle
          cx="100"
          cy="100"
          r="93"
          fill="none"
          stroke="url(#goldLinear)"
          strokeWidth="3.5"
        />
        <circle
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1"
          strokeDasharray="2 3"
          opacity="0.6"
        />

        {/* 2. Seven Sovereign Stars around the perimeter (Representing the 7 Chambers) */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const angle = (i * (360 / 7) - 90) * (Math.PI / 180);
          const starX = 100 + 82 * Math.cos(angle);
          const starY = 100 + 82 * Math.sin(angle);
          return (
            <g key={i} transform={`translate(${starX}, ${starY})`}>
              <polygon
                points="0,-3 1,-1 3,0 1,1 0,3 -1,1 -3,0 -1,-1"
                fill="#fde047"
                stroke="#d97706"
                strokeWidth="0.5"
              />
            </g>
          );
        })}

        {/* 3. Global Coordinates Sphere Grid (Meridians & Parallels) */}
        {/* Outer Globe Border */}
        <circle
          cx="100"
          cy="100"
          r="66"
          fill="#091428"
          stroke="url(#celestialCyan)"
          strokeWidth="2.5"
          opacity="0.9"
        />

        {/* Parallels (Latitude lines) */}
        <ellipse
          cx="100"
          cy="100"
          rx="66"
          ry="24"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.2"
          opacity="0.5"
        />
        <ellipse
          cx="100"
          cy="80"
          rx="58"
          ry="16"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="0.9"
          strokeDasharray="3 2"
          opacity="0.4"
        />
        <ellipse
          cx="100"
          cy="120"
          rx="58"
          ry="16"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="0.9"
          strokeDasharray="3 2"
          opacity="0.4"
        />

        {/* Meridians (Longitude ellipses) */}
        <ellipse
          cx="100"
          cy="100"
          rx="32"
          ry="66"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.2"
          opacity="0.5"
        />
        <ellipse
          cx="100"
          cy="100"
          rx="12"
          ry="66"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.2"
          opacity="0.4"
        />
        <line
          x1="100"
          y1="34"
          x2="100"
          y2="166"
          stroke="url(#celestialCyan)"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <line
          x1="34"
          y1="100"
          x2="166"
          y2="100"
          stroke="url(#celestialCyan)"
          strokeWidth="1.5"
          opacity="0.6"
        />

        {/* 4. Elegant Tilted Orbital Golden Rings (Universal Connectivity / Planetary Orbit) */}
        <ellipse
          cx="100"
          cy="100"
          rx="76"
          ry="22"
          transform="rotate(-28 100 100)"
          fill="none"
          stroke="url(#goldLinear)"
          strokeWidth="2.5"
          strokeDasharray="140 10 40 10"
        />
        <ellipse
          cx="100"
          cy="100"
          rx="79"
          ry="24"
          transform="rotate(28 100 100)"
          fill="none"
          stroke="url(#shimmerRing)"
          strokeWidth="1.5"
          opacity="0.7"
        />

        {/* Orbit Satellite Nodes */}
        <circle cx="34" cy="65" r="3" fill="#fef08a" stroke="#d97706" strokeWidth="1" />
        <circle cx="166" cy="135" r="3" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />

        {/* 5. Center Golden Insignia Medallion */}
        <circle
          cx="100"
          cy="100"
          r="34"
          fill="#020617"
          stroke="url(#goldLinear)"
          strokeWidth="3"
        />
        <circle
          cx="100"
          cy="100"
          r="30"
          fill="none"
          stroke="#d97706"
          strokeWidth="1"
          opacity="0.6"
        />

        {/* International Olive Peace Laurel Wreath Arc */}
        <path
          d="M74,106 C74,118 85,126 100,126 C115,126 126,118 126,106"
          fill="none"
          stroke="url(#goldLinear)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Laurel Leaves */}
        <path d="M78,114 Q74,110 76,107" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
        <path d="M86,122 Q82,120 83,116" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
        <path d="M122,114 Q126,110 124,107" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
        <path d="M114,122 Q118,120 117,116" fill="none" stroke="#fbbf24" strokeWidth="1.5" />

        {/* Sovereign Crown Apex */}
        <path
          d="M90,78 L95,84 L100,75 L105,84 L110,78 L108,86 L92,86 Z"
          fill="url(#goldLinear)"
        />

        {/* Typography: "ZW" Prestige Monogram */}
        <text
          x="100"
          y="107"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="23"
          letterSpacing="1.5"
          fill="url(#goldLinear)"
          textAnchor="middle"
          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))"
        >
          ZW
        </text>

        {/* Top Glint of Radiance */}
        <circle cx="100" cy="74" r="1.5" fill="#ffffff" />
      </svg>
    </div>
  );
};
