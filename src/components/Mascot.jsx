const BODY   = '#C8956C';
const BELLY  = '#F5D9B4';
const DARK   = '#A67550';
const BEAK   = '#E9A830';
const PUPIL  = '#2D3436';

const PUPILS = {
  happy:       [{ x: 46, y: 46 }, { x: 74, y: 46 }],
  thinking:    [{ x: 49, y: 43 }, { x: 76, y: 43 }],
  excited:     [{ x: 46, y: 46 }, { x: 74, y: 46 }],
  encouraging: [{ x: 46, y: 49 }, { x: 74, y: 49 }],
  proud:       [{ x: 46, y: 45 }, { x: 74, y: 45 }],
};

const SMILES = {
  happy:       'M 52 63 Q 60 69 68 63',
  thinking:    'M 54 63 Q 60 66 67 63',
  excited:     'M 50 63 Q 60 72 70 63',
  encouraging: 'M 52 63 Q 60 68 68 63',
  proud:       'M 51 63 Q 60 71 69 63',
};

export default function Mascot({ mood = 'happy', size = 120 }) {
  const pupils  = PUPILS[mood] ?? PUPILS.happy;
  const pupilR  = mood === 'excited' ? 8.5 : 6.5;
  const smilePt = SMILES[mood] ?? SMILES.happy;
  const smileFill = (mood === 'excited' || mood === 'proud') ? '#FF8A65' : 'none';
  const wingsUp   = mood === 'excited';

  return (
    <svg
      width={size}
      height={Math.round(size * 1.08)}
      viewBox="0 0 120 130"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Friendly owl mascot, feeling ${mood}`}
      style={{ display: 'block' }}
    >
      {/* Body */}
      <ellipse cx="60" cy="98" rx="30" ry="28" fill={BODY} />

      {/* Head */}
      <circle cx="60" cy="50" r="28" fill={BODY} />

      {/* Ear tufts */}
      <polygon points="38,28 34,10 52,26" fill={DARK} />
      <polygon points="82,28 86,10 68,26" fill={DARK} />

      {/* Belly */}
      <ellipse cx="60" cy="100" rx="20" ry="22" fill={BELLY} />

      {/* Wings */}
      {wingsUp ? (
        <>
          <ellipse cx="23" cy="84" rx="11" ry="19" fill={DARK} transform="rotate(-35 23 84)" />
          <ellipse cx="97" cy="84" rx="11" ry="19" fill={DARK} transform="rotate(35 97 84)" />
        </>
      ) : (
        <>
          <ellipse cx="23" cy="95" rx="11" ry="19" fill={DARK} transform="rotate(-15 23 95)" />
          <ellipse cx="97" cy="95" rx="11" ry="19" fill={DARK} transform="rotate(15 97 95)" />
        </>
      )}

      {/* Eye whites */}
      <circle cx="46" cy="46" r="12" fill="white" />
      <circle cx="74" cy="46" r="12" fill="white" />
      <circle cx="46" cy="46" r="12" fill="none" stroke={DARK} strokeWidth="1.5" />
      <circle cx="74" cy="46" r="12" fill="none" stroke={DARK} strokeWidth="1.5" />

      {/* Pupils */}
      <circle cx={pupils[0].x} cy={pupils[0].y} r={pupilR} fill={PUPIL} />
      <circle cx={pupils[1].x} cy={pupils[1].y} r={pupilR} fill={PUPIL} />
      <circle cx={pupils[0].x + 2} cy={pupils[0].y - 2} r="2.5" fill="white" />
      <circle cx={pupils[1].x + 2} cy={pupils[1].y - 2} r="2.5" fill="white" />

      {/* Beak */}
      <polygon points="55,57 65,57 60,64" fill={BEAK} />

      {/* Eyebrows (mood-specific) */}
      {mood === 'thinking' && (
        <>
          <path d="M 36 31 Q 46 26 56 31" stroke={DARK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 64 33 Q 74 29 84 33" stroke={DARK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      )}
      {mood === 'proud' && (
        <>
          <path d="M 36 31 Q 46 26 56 31" stroke={DARK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 64 31 Q 74 26 84 31" stroke={DARK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* Smile */}
      <path d={smilePt} stroke={DARK} strokeWidth="2" fill={smileFill} strokeLinecap="round" />

      {/* Accessories */}
      {mood === 'excited' && (
        <>
          <text x="6"  y="34" fontSize="14" fill="#FFD700">★</text>
          <text x="98" y="34" fontSize="14" fill="#FFD700">★</text>
          <text x="4"  y="54" fontSize="9"  fill="#FFB6C1">✦</text>
          <text x="106" y="54" fontSize="9" fill="#FFB6C1">✦</text>
        </>
      )}
      {mood === 'thinking' && (
        <>
          <circle cx="95" cy="26" r="3"  fill="#DFE6E9" />
          <circle cx="103" cy="18" r="5" fill="#DFE6E9" />
          <circle cx="112" cy="10" r="7" fill="#F0F4F5" stroke="#DFE6E9" strokeWidth="1" />
        </>
      )}

      {/* Feet */}
      <ellipse cx="50" cy="123" rx="9" ry="5" fill={BEAK} />
      <ellipse cx="70" cy="123" rx="9" ry="5" fill={BEAK} />
      <ellipse cx="43" cy="126" rx="4.5" ry="3" fill={BEAK} />
      <ellipse cx="50" cy="127" rx="4.5" ry="3" fill={BEAK} />
      <ellipse cx="57" cy="126" rx="4.5" ry="3" fill={BEAK} />
      <ellipse cx="63" cy="126" rx="4.5" ry="3" fill={BEAK} />
      <ellipse cx="70" cy="127" rx="4.5" ry="3" fill={BEAK} />
      <ellipse cx="77" cy="126" rx="4.5" ry="3" fill={BEAK} />
    </svg>
  );
}
