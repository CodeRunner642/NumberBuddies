import Mascot from './Mascot';
import SoundToggle from './SoundToggle';

export default function WelcomeScreen({ onStart, soundEnabled, onToggleSound }) {
  return (
    <div className="screen screen--welcome">
      <div className="welcome-sound-row">
        <SoundToggle enabled={soundEnabled} onToggle={onToggleSound} />
      </div>

      <div className="mascot-area">
        <Mascot mood="happy" size={150} />
      </div>

      <div className="welcome-text-block">
        <h1 className="app-title">
          Number <span className="app-title-accent">Buddies</span>
        </h1>
        <p className="welcome-subtitle">Let&apos;s play with numbers!</p>
      </div>

      <button className="btn btn-primary btn-large" onClick={onStart}>
        Start! →
      </button>
    </div>
  );
}
