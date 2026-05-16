import Mascot from './Mascot';
import SoundToggle from './SoundToggle';

const LEVELS = [
  {
    id: 'beginner',
    icon: '🌱',
    name: 'Easy',
    desc: 'Numbers 0 to 5',
    colorClass: 'level-card--beginner',
  },
  {
    id: 'explorer',
    icon: '🌟',
    name: 'Medium',
    desc: 'Numbers 0 to 10',
    colorClass: 'level-card--explorer',
  },
  {
    id: 'star',
    icon: '🚀',
    name: 'Hard',
    desc: 'Numbers 0 to 20',
    colorClass: 'level-card--star',
  },
];

export default function LevelScreen({ onSelectLevel, onBack, soundEnabled, onToggleSound }) {
  return (
    <div className="screen screen--level">
      <div className="top-bar">
        <button className="btn-back" onClick={onBack} aria-label="Back to welcome">
          ← Back
        </button>
        <SoundToggle enabled={soundEnabled} onToggle={onToggleSound} />
      </div>

      <div className="mascot-area mascot-area--sm">
        <Mascot mood="happy" size={110} />
      </div>

      <h2 className="level-heading">Pick a level!</h2>

      <div className="level-list">
        {LEVELS.map((level) => (
          <button
            key={level.id}
            className={`level-card ${level.colorClass}`}
            onClick={() => onSelectLevel(level.id)}
            aria-label={`${level.name}: ${level.desc}`}
          >
            <span className="level-card-icon">{level.icon}</span>
            <div className="level-card-text">
              <span className="level-card-name">{level.name}</span>
              <span className="level-card-desc">{level.desc}</span>
            </div>
            <span className="level-card-arrow">›</span>
          </button>
        ))}
      </div>
    </div>
  );
}
