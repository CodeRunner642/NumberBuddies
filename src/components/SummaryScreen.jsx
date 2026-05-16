import Mascot from './Mascot';
import StarTracker from './StarTracker';

const LEVEL_LABELS = {
  beginner: '🌱 Beginner',
  explorer: '🌟 Explorer',
  star:     '🚀 Star',
};

export default function SummaryScreen({ stars, correct, total, level, onPlayAgain, onNewLevel }) {
  const message =
    correct === total
      ? "Perfect score! You're a maths superstar! 🌟"
      : correct >= Math.ceil(total / 2)
      ? 'Great work! Keep it up! 🎉'
      : 'Well done for trying! Practice makes perfect! 💪';

  return (
    <div className="screen screen--summary">
      <div className="mascot-area">
        <Mascot mood="proud" size={140} />
      </div>

      <div className="summary-card">
        <h2 className="summary-title">All done! 🎉</h2>
        <p className="summary-score">
          You answered <strong>{correct}</strong> out of <strong>{total}</strong>!
        </p>
        <p className="summary-stars-text">
          You collected <strong>{stars}</strong> star{stars !== 1 ? 's' : ''}!
        </p>

        <div className="summary-stars-row">
          <StarTracker stars={stars} total={total} />
        </div>

        {level && (
          <p className="summary-level">Level: {LEVEL_LABELS[level]}</p>
        )}

        <p className="summary-message">{message}</p>
      </div>

      <div className="summary-actions">
        <button className="btn btn-primary btn-large" onClick={onPlayAgain}>
          Play Again
        </button>
        <button className="btn btn-secondary" onClick={onNewLevel}>
          Pick a New Level
        </button>
      </div>
    </div>
  );
}
