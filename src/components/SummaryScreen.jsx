import ProgressStars from './ProgressStars';

export default function SummaryScreen({ stars, total, onPlayAgain }) {
  const allCorrect = stars === total;
  const message = allCorrect
    ? 'Perfect score! You\'re a maths superstar! 🌟'
    : stars >= Math.ceil(total / 2)
    ? 'Great work! Keep it up! 🎉'
    : 'Well done for trying! Practice makes perfect! 💪';

  return (
    <div className="screen summary-screen">
      <h2 className="summary-title">Well done!</h2>
      <p className="summary-score">
        You answered <strong>{stars}</strong> out of <strong>{total}</strong> correctly!
      </p>
      <div className="summary-stars-label">Your stars:</div>
      <ProgressStars stars={stars} total={total} />
      <p className="summary-message">{message}</p>
      <button className="btn btn-primary btn-large" onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  );
}
