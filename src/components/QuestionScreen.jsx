import { useEffect } from 'react';
import Mascot from './Mascot';
import StarTracker from './StarTracker';
import SoundToggle from './SoundToggle';
import AnswerButtons from './AnswerButtons';
import FeedbackMessage from './FeedbackMessage';
import { playCorrect, playIncorrect, playTap } from '../utils/sound';

const LEVEL_LABELS = {
  beginner: '🌱 Beginner',
  explorer: '🌟 Explorer',
  star:     '🚀 Star',
};

export default function QuestionScreen({
  question,
  questionNumber,
  totalQuestions,
  level,
  stars,
  selected,
  feedback,
  soundEnabled,
  onSelect,
  onCheck,
  onNext,
  onRetry,
  onBack,
  onToggleSound,
}) {
  useEffect(() => {
    if (!soundEnabled || !feedback) return;
    if (feedback === 'correct') playCorrect();
    else playIncorrect();
  }, [feedback, soundEnabled]);

  const mascotMood =
    feedback === 'correct'   ? 'excited'     :
    feedback === 'incorrect' ? 'encouraging' :
    'thinking';

  const isLastQuestion = questionNumber >= totalQuestions;

  function handleSelect(val) {
    if (feedback) return;
    if (soundEnabled) playTap();
    onSelect(val);
  }

  return (
    <div className="screen screen--question">
      {/* Top bar */}
      <div className="top-bar">
        <button className="btn-back" onClick={onBack} aria-label="Back to level selection">
          ← Back
        </button>
        <span className="level-badge">{LEVEL_LABELS[level]}</span>
        <SoundToggle enabled={soundEnabled} onToggle={onToggleSound} />
      </div>

      {/* Progress row */}
      <div className="progress-row">
        <span className="q-counter">Q {questionNumber} of {totalQuestions}</span>
        <StarTracker stars={stars} total={totalQuestions} />
      </div>

      {/* Mascot */}
      <div className="mascot-area mascot-area--sm">
        <Mascot mood={mascotMood} size={100} />
      </div>

      {/* Question card */}
      <div className="question-card">
        <div className="math-display">
          <span className="math-tile">{question.a}</span>
          <span className="math-op">{question.operation}</span>
          <span className="math-tile">{question.b}</span>
          <span className="math-eq">=</span>
          <span className="math-tile math-tile--blank">?</span>
        </div>

        {feedback && (
          <FeedbackMessage correct={feedback === 'correct'} key={`${questionNumber}-${feedback}`} />
        )}
      </div>

      {/* Answer choices */}
      <AnswerButtons
        choices={question.choices}
        selected={selected}
        correctAnswer={question.answer}
        showCorrect={!!feedback}
        onSelect={handleSelect}
      />

      {/* Action button */}
      <div className="action-row">
        {!feedback && (
          <button
            className="btn btn-primary btn-check"
            onClick={onCheck}
            disabled={selected === null}
          >
            Check ✓
          </button>
        )}
        {feedback === 'incorrect' && (
          <button className="btn btn-primary btn-retry" onClick={onRetry}>
            Try Again 💪
          </button>
        )}
        {feedback === 'correct' && (
          <button className="btn btn-primary" onClick={onNext}>
            {isLastQuestion ? 'Finish! 🎉' : 'Next →'}
          </button>
        )}
      </div>
    </div>
  );
}
