import React, { useMemo } from 'react';
import { CharacterClass, PortraitConfig } from '../types';

interface PortraitCanvasProps {
  className: CharacterClass;
  config: PortraitConfig;
  characterName: string;
  size?: number;
  interactive?: boolean;
}

export const PortraitCanvas: React.FC<PortraitCanvasProps> = ({
  className,
  config,
  size = 280,
}) => {
  const {
    seed,
    variant,
    skinTone,
    hairColor,
    eyeColor,
    auraColor,
    bgGradient,
    accessoryType,
    facialHair = 0,
    expression,
  } = config;

  const s = useMemo(() => {
    const pseudo = (offset: number) => {
      const val = Math.sin(seed + offset) * 10000;
      return val - Math.floor(val);
    };

    return {
      tilt: (pseudo(1) - 0.5) * 6,
      scar: pseudo(2) > 0.55,
      tattoos: pseudo(3) > 0.65,
      earType: pseudo(4) > 0.5 ? 'pointed' : 'round',
      eyebrowAngle: pseudo(5) * 6 - 3,
      particleOffset: pseudo(6) * 20,
      sparkleScale: 0.8 + pseudo(7) * 0.4,
    };
  }, [seed]);

  return (
    <div
      className="relative overflow-hidden rounded-xl border-2 border-[#b89345] shadow-[inset_0_0_20px_rgba(0,0,0,0.8),0_10px_25px_rgba(0,0,0,0.6)] select-none bg-black"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 300 300"
        className="w-full h-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`bg-${seed}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={bgGradient[0]} />
            <stop offset="100%" stopColor={bgGradient[1]} />
          </linearGradient>

          <radialGradient id={`aura-${seed}`} cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor={auraColor} stopOpacity="0.4" />
            <stop offset="60%" stopColor={auraColor} stopOpacity="0.15" />
            <stop offset="100%" stopColor={auraColor} stopOpacity="0" />
          </radialGradient>

          <linearGradient id={`gold-metal-${seed}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="45%" stopColor="#d97706" />
            <stop offset="85%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          <linearGradient id={`steel-metal-${seed}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="40%" stopColor="#64748b" />
            <stop offset="80%" stopColor="#334155" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          <linearGradient id={`leather-${seed}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#854d0e" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>

          <linearGradient id={`rim-light-${seed}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="300" height="300" fill={`url(#bg-${seed})`} />
        <circle cx="150" cy="140" r="130" fill={`url(#aura-${seed})`} />

        {className === 'Mage' && (
          <g opacity="0.35" stroke={auraColor} strokeWidth="1.5" fill="none">
            <circle cx="150" cy="140" r="95" strokeDasharray="6 4" />
            <polygon points="150,55 228,190 72,190" />
            <polygon points="150,225 228,90 72,90" />
            <circle cx="150" cy="140" r="30" />
          </g>
        )}

        {className === 'Cleric' && (
          <g opacity="0.4" fill={auraColor}>
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line
                key={deg}
                x1="150"
                y1="130"
                x2={150 + 130 * Math.cos((deg * Math.PI) / 180)}
                y2={130 + 130 * Math.sin((deg * Math.PI) / 180)}
                stroke={auraColor}
                strokeWidth="2"
                strokeOpacity="0.35"
              />
            ))}
            <circle cx="150" cy="130" r="80" fill="none" stroke={auraColor} strokeWidth="2" strokeOpacity="0.4" />
          </g>
        )}

        {className === 'Druid' && (
          <g opacity="0.3" fill={auraColor}>
            <path d="M 60 70 Q 75 60 80 75 Q 65 85 60 70 Z" />
            <path d="M 230 90 Q 245 80 250 95 Q 235 105 230 90 Z" />
            <path d="M 45 190 Q 55 180 62 195 Q 48 202 45 190 Z" />
            <path d="M 240 200 Q 252 192 258 204 Q 246 212 240 200 Z" />
          </g>
        )}

        {className === 'Warrior' && (
          <g opacity="0.25" fill="#f87171">
            <circle cx="70" cy="80" r="3" />
            <circle cx="230" cy="110" r="4" />
            <circle cx="90" cy="220" r="2.5" />
            <circle cx="210" cy="65" r="3.5" />
          </g>
        )}

        <g id="body-layer">
          <path
            d="M 65 300 L 80 230 L 125 210 L 150 215 L 175 210 L 220 230 L 235 300 Z"
            fill={
              className === 'Warrior' || className === 'Paladin'
                ? `url(#${className === 'Paladin' ? 'gold-metal' : 'steel-metal'}-${seed})`
                : className === 'Rogue' || className === 'Ranger'
                ? `url(#leather-${seed})`
                : className === 'Cleric'
                ? '#f8fafc'
                : '#312e81'
            }
            stroke="#1e293b"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {className === 'Warrior' && (
            <g>
              <path d="M 60 250 L 85 215 L 115 225 L 85 270 Z" fill="#475569" stroke="#0f172a" strokeWidth="2.5" />
              <path d="M 240 250 L 215 215 L 185 225 L 215 270 Z" fill="#475569" stroke="#0f172a" strokeWidth="2.5" />
              <path d="M 120 210 L 150 240 L 180 210 Z" fill="#64748b" stroke="#0f172a" strokeWidth="2" />
              <polygon points="75,210 85,185 95,212" fill="#94a3b8" stroke="#0f172a" strokeWidth="1.5" />
              <polygon points="225,210 215,185 205,212" fill="#94a3b8" stroke="#0f172a" strokeWidth="1.5" />
            </g>
          )}

          {className === 'Paladin' && (
            <g>
              <path d="M 50 240 Q 80 195 120 218 L 105 260 Z" fill={`url(#gold-metal-${seed})`} stroke="#78350f" strokeWidth="2" />
              <path d="M 250 240 Q 220 195 180 218 L 195 260 Z" fill={`url(#gold-metal-${seed})`} stroke="#78350f" strokeWidth="2" />
              <polygon points="150,225 162,240 150,255 138,240" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
              <circle cx="150" cy="240" r="3" fill="#ffffff" />
            </g>
          )}

          {className === 'Cleric' && (
            <g>
              <path d="M 120 210 L 130 300 L 145 300 L 140 215 Z" fill="#eab308" stroke="#a16207" strokeWidth="1.5" />
              <path d="M 180 210 L 170 300 L 155 300 L 160 215 Z" fill="#eab308" stroke="#a16207" strokeWidth="1.5" />
              <circle cx="150" cy="245" r="14" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
              <circle cx="150" cy="245" r="8" fill="#fef08a" />
            </g>
          )}

          {className === 'Druid' && (
            <g>
              <path d="M 70 230 Q 95 210 120 225 Q 100 255 75 250 Z" fill="#15803d" stroke="#052e16" strokeWidth="2" />
              <path d="M 230 230 Q 205 210 180 225 Q 200 255 225 250 Z" fill="#15803d" stroke="#052e16" strokeWidth="2" />
              <circle cx="150" cy="235" r="9" fill="#d97706" stroke="#78350f" strokeWidth="1.5" />
              <path d="M 150 244 L 150 270" stroke="#78350f" strokeWidth="2" />
            </g>
          )}

          {className === 'Rogue' && (
            <g>
              <line x1="85" y1="225" x2="195" y2="295" stroke="#1c1917" strokeWidth="8" />
              <line x1="85" y1="225" x2="195" y2="295" stroke="#78716c" strokeWidth="2" />
              <rect x="90" y="215" width="22" height="6" rx="2" fill="#0f172a" transform="rotate(-30 90 215)" />
              <circle cx="82" cy="220" r="4" fill="#10b981" />
            </g>
          )}

          {className === 'Ranger' && (
            <g>
              <line x1="210" y1="220" x2="105" y2="295" stroke="#713f12" strokeWidth="7" />
              <circle cx="150" cy="225" r="8" fill="#22c55e" stroke="#14532d" strokeWidth="2" />
            </g>
          )}

          {className === 'Mage' && (
            <g>
              <path d="M 110 215 Q 150 240 190 215 L 180 200 Q 150 215 120 200 Z" fill="#6d28d9" stroke="#4c1d95" strokeWidth="2" />
              <polygon points="150,230 158,242 150,254 142,242" fill="#c084fc" stroke="#7e22ce" strokeWidth="2" />
            </g>
          )}
        </g>

        <path
          d="M 132 175 L 132 215 Q 150 220 168 215 L 168 175 Z"
          fill={skinTone}
          stroke="#1e293b"
          strokeWidth="2.5"
        />
        <path d="M 132 175 Q 150 195 168 175 L 168 185 Q 150 205 132 185 Z" fill="#000000" fillOpacity="0.2" />

        <g id="head-layer" transform={`rotate(${s.tilt} 150 140)`}>
          {s.earType === 'pointed' ? (
            <g>
              <polygon points="108,125 78,110 110,140" fill={skinTone} stroke="#1e293b" strokeWidth="2" />
              <polygon points="192,125 222,110 190,140" fill={skinTone} stroke="#1e293b" strokeWidth="2" />
            </g>
          ) : (
            <g>
              <ellipse cx="106" cy="135" rx="8" ry="12" fill={skinTone} stroke="#1e293b" strokeWidth="2" />
              <ellipse cx="194" cy="135" rx="8" ry="12" fill={skinTone} stroke="#1e293b" strokeWidth="2" />
            </g>
          )}

          <path
            d={
              className === 'Warrior'
                ? 'M 108 115 C 105 155 118 190 150 195 C 182 190 195 155 192 115 C 190 75 110 75 108 115 Z'
                : 'M 112 115 C 110 155 125 188 150 192 C 175 188 190 155 188 115 C 186 75 114 75 112 115 Z'
            }
            fill={skinTone}
            stroke="#1e293b"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          <ellipse cx="120" cy="148" rx="8" ry="4" fill="#000000" fillOpacity="0.08" />
          <ellipse cx="180" cy="148" rx="8" ry="4" fill="#000000" fillOpacity="0.08" />

          {s.scar && (
            <path
              d="M 125 110 L 138 145 M 128 122 L 134 120 M 130 134 L 136 132"
              stroke="#991b1b"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.75"
            />
          )}

          {s.tattoos && (
            <g stroke={auraColor} strokeWidth="1.5" fill="none" opacity="0.8">
              <path d="M 165 110 Q 175 125 170 140" />
              <circle cx="170" cy="145" r="1.5" fill={auraColor} />
            </g>
          )}

          <g id="eyes">
            <path d="M 122 128 Q 132 122 142 128 Q 132 136 122 128 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
            <circle cx="132" cy="128" r="4.5" fill={eyeColor} />
            <circle cx="132" cy="128" r="2.2" fill="#0f172a" />
            <circle cx="134" cy="126" r="1.2" fill="#ffffff" />

            <path d="M 158 128 Q 168 122 178 128 Q 168 136 158 128 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
            <circle cx="168" cy="128" r="4.5" fill={eyeColor} />
            <circle cx="168" cy="128" r="2.2" fill="#0f172a" />
            <circle cx="170" cy="126" r="1.2" fill="#ffffff" />

            {(className === 'Mage' || className === 'Cleric') && (
              <g opacity="0.5">
                <circle cx="132" cy="128" r="6" fill={auraColor} filter="blur(2px)" />
                <circle cx="168" cy="128" r="6" fill={auraColor} filter="blur(2px)" />
              </g>
            )}

            <path
              d={
                expression === 'fierce'
                  ? 'M 120 122 L 142 120'
                  : expression === 'smirking'
                  ? 'M 120 120 L 142 123'
                  : 'M 120 121 Q 131 118 142 122'
              }
              stroke={hairColor}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d={
                expression === 'fierce'
                  ? 'M 179 122 L 157 120'
                  : expression === 'smirking'
                  ? 'M 179 118 L 157 122'
                  : 'M 179 121 Q 168 118 157 122'
              }
              stroke={hairColor}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </g>

          <path
            d="M 150 128 L 147 148 L 154 148"
            stroke="#1e293b"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          <path
            d={
              expression === 'fierce'
                ? 'M 138 165 Q 150 161 162 165'
                : expression === 'smirking'
                ? 'M 139 166 Q 150 167 164 162'
                : expression === 'noble'
                ? 'M 140 165 L 160 165'
                : 'M 140 164 Q 150 168 160 164'
            }
            stroke="#1e293b"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {facialHair === 1 && (
            <g fill="#1e293b" opacity="0.4">
              <circle cx="145" cy="172" r="0.8" />
              <circle cx="155" cy="172" r="0.8" />
              <circle cx="140" cy="176" r="0.8" />
              <circle cx="150" cy="178" r="0.8" />
              <circle cx="160" cy="176" r="0.8" />
              <circle cx="146" cy="184" r="0.8" />
              <circle cx="154" cy="184" r="0.8" />
            </g>
          )}

          {facialHair === 2 && (
            <path
              d="M 143 170 Q 150 188 150 193 Q 150 188 157 170 Z"
              fill={hairColor}
              stroke="#1e293b"
              strokeWidth="1.5"
            />
          )}

          {facialHair === 3 && (
            <g>
              <path
                d="M 132 165 Q 150 185 150 220 Q 150 185 168 165 C 160 185 140 185 132 165 Z"
                fill={hairColor}
                stroke="#1e293b"
                strokeWidth="2"
              />
              <circle cx="150" cy="205" r="3.5" fill="#eab308" stroke="#78350f" strokeWidth="1" />
            </g>
          )}

          {variant % 3 === 0 && (
            <path
              d="M 105 115 Q 110 70 150 68 Q 190 70 195 115 Q 185 85 150 85 Q 115 85 105 115 Z"
              fill={hairColor}
              stroke="#1e293b"
              strokeWidth="2"
            />
          )}

          {variant % 3 === 1 && (
            <g>
              <path
                d="M 102 120 Q 110 65 150 62 Q 190 65 198 120 Q 190 90 170 85 L 175 140 L 165 90 Q 150 82 135 90 L 125 140 L 130 85 Q 110 90 102 120 Z"
                fill={hairColor}
                stroke="#1e293b"
                strokeWidth="2.5"
              />
            </g>
          )}

          {variant % 3 === 2 && (
            <path
              d="M 106 110 Q 120 70 150 72 Q 180 70 194 110 Q 198 140 188 150 L 182 120 Q 150 85 118 120 L 112 150 Z"
              fill={hairColor}
              stroke="#1e293b"
              strokeWidth="2"
            />
          )}

          {className === 'Mage' && (
            <g id="mage-hat">
              {accessoryType % 2 === 0 ? (
                <g>
                  <ellipse cx="150" cy="85" rx="58" ry="16" fill="#312e81" stroke="#1e1b4b" strokeWidth="3" />
                  <path
                    d="M 105 82 Q 125 35 180 8 Q 155 45 195 82 Z"
                    fill="#3730a3"
                    stroke="#1e1b4b"
                    strokeWidth="3"
                  />
                  <path d="M 112 80 Q 150 88 188 80" stroke="#f59e0b" strokeWidth="6" fill="none" />
                  <rect x="144" y="77" width="12" height="10" rx="1.5" fill="#fde047" stroke="#78350f" strokeWidth="1.5" />
                  <polygon points="180,8 184,3 188,8 184,13" fill="#c084fc" />
                </g>
              ) : (
                <g>
                  <path
                    d="M 95 105 Q 105 55 150 50 Q 195 55 205 105 Q 192 75 150 75 Q 108 75 95 105 Z"
                    fill="#4c1d95"
                    stroke="#2e1065"
                    strokeWidth="3"
                  />
                  <polygon points="150,65 156,74 150,83 144,74" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.5" />
                </g>
              )}
            </g>
          )}

          {className === 'Rogue' && (
            <g id="rogue-mask">
              {accessoryType % 2 === 0 ? (
                <g>
                  <path
                    d="M 96 115 Q 105 55 150 50 Q 195 55 204 115 Q 188 78 150 78 Q 112 78 96 115 Z"
                    fill="#1c1917"
                    stroke="#0c0a09"
                    strokeWidth="3"
                  />
                  <path
                    d="M 120 145 Q 150 148 180 145 L 175 185 Q 150 196 125 185 Z"
                    fill="#292524"
                    stroke="#0c0a09"
                    strokeWidth="2"
                  />
                  <line x1="126" y1="162" x2="174" y2="162" stroke="#44403c" strokeWidth="1" />
                </g>
              ) : (
                <g>
                  <path d="M 102 108 Q 150 96 198 108 L 195 120 Q 150 108 105 120 Z" fill="#047857" stroke="#064e3b" strokeWidth="2" />
                  <circle cx="106" cy="116" r="4" fill="#059669" />
                </g>
              )}
            </g>
          )}

          {className === 'Warrior' && (
            <g id="warrior-helm">
              {accessoryType % 2 === 0 ? (
                <g>
                  <path
                    d="M 102 110 Q 106 50 150 45 Q 194 50 198 110 L 190 115 Q 150 82 110 115 Z"
                    fill="url(#steel-metal)"
                    stroke="#0f172a"
                    strokeWidth="3"
                  />
                  <rect x="105" y="105" width="90" height="14" rx="2" fill="#475569" stroke="#0f172a" strokeWidth="2" />
                  <polygon points="144,45 150,15 156,45" fill="#cbd5e1" stroke="#0f172a" strokeWidth="2" />
                  <path d="M 105 95 Q 85 85 75 55 Q 85 75 105 85" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
                  <path d="M 195 95 Q 215 85 225 55 Q 215 75 195 85" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
                </g>
              ) : (
                <g>
                  <path d="M 105 108 Q 150 98 195 108 L 193 118 Q 150 108 107 118 Z" fill="#7f1d1d" stroke="#450a0a" strokeWidth="2" />
                  <circle cx="150" cy="112" r="5" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
                </g>
              )}
            </g>
          )}

          {className === 'Ranger' && (
            <g id="ranger-hood">
              <path
                d="M 96 115 Q 105 52 150 48 Q 195 52 204 115 Q 185 78 150 76 Q 115 78 96 115 Z"
                fill="#166534"
                stroke="#052e16"
                strokeWidth="3"
              />
              <path
                d="M 185 85 Q 215 50 230 35 Q 210 65 190 95 Z"
                fill="#ea580c"
                stroke="#7c2d12"
                strokeWidth="2"
              />
              <line x1="187" y1="90" x2="228" y2="38" stroke="#fed7aa" strokeWidth="1.5" />
            </g>
          )}

          {className === 'Cleric' && (
            <g id="cleric-halo">
              <circle cx="150" cy="80" r="32" fill="none" stroke="#f59e0b" strokeWidth="3" opacity="0.8" />
              <path
                d="M 110 105 Q 150 96 190 105 L 188 114 Q 150 105 112 114 Z"
                fill="#fbbf24"
                stroke="#b45309"
                strokeWidth="2"
              />
              <polygon points="150,96 153,104 161,104 154,109 157,117 150,112 143,117 146,109 139,104 147,104" fill="#ffffff" />
            </g>
          )}

          {className === 'Paladin' && (
            <g id="paladin-crown">
              <path
                d="M 104 105 Q 108 55 150 50 Q 192 55 196 105 Q 180 80 150 78 Q 120 80 104 105 Z"
                fill={`url(#gold-metal-${seed})`}
                stroke="#78350f"
                strokeWidth="3"
              />
              <polygon points="150,42 162,68 150,60 138,68" fill="#fde047" stroke="#78350f" strokeWidth="2" />
              <polygon points="120,62 128,78 118,74" fill="#fde047" stroke="#78350f" strokeWidth="1.5" />
              <polygon points="180,62 172,78 182,74" fill="#fde047" stroke="#78350f" strokeWidth="1.5" />
              <circle cx="150" cy="68" r="4.5" fill="#38bdf8" stroke="#0369a1" strokeWidth="1" />
            </g>
          )}

          {className === 'Druid' && (
            <g id="druid-antlers">
              <g stroke="#78350f" strokeWidth="3" fill="#a16207" strokeLinejoin="round" strokeLinecap="round">
                <path d="M 115 80 Q 95 45 75 35 M 92 52 L 80 65 M 82 40 L 92 25" />
                <path d="M 185 80 Q 205 45 225 35 M 208 52 L 220 65 M 218 40 L 208 25" />
              </g>
              <path d="M 108 102 Q 150 92 192 102" stroke="#15803d" strokeWidth="4" fill="none" />
              <circle cx="130" cy="98" r="3" fill="#ef4444" />
              <circle cx="170" cy="98" r="3" fill="#ef4444" />
              <circle cx="150" cy="95" r="3.5" fill="#22c55e" />
            </g>
          )}
        </g>

        <rect
          x="4"
          y="4"
          width="292"
          height="292"
          rx="12"
          fill="none"
          stroke="#eab308"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />

        <g fill="#d97706" opacity="0.8">
          <polygon points="10,10 24,10 10,24" />
          <polygon points="290,10 276,10 290,24" />
          <polygon points="10,290 24,290 10,276" />
          <polygon points="290,290 276,290 290,276" />
        </g>
      </svg>
    </div>
  );
};
