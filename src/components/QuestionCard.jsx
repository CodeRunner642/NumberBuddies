import AnswerButtons from './AnswerButtons';
import FeedbackMessage from './FeedbackMessage';

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selected,
  onSelect,
  onCheck,
  onNext,
  onRetry,
  feedback,
}) {
  const hasSelected = selected !== null;
  const isCorrect = feedback === true;
  const isIncorrect = feedback === false;

  return (
    <div className="question-card">
      <div className="question-progress">
        Question {questionNumber} of {totalQuestions}
      </div>

      <div className="question-display">
        <div className="question-num">{question.a}</div>
        <div className="question-op">{question.operation}</div>
        <div className="question-num">{question.b}</div>
        <div className="question-equals">=</div>
        <div className="question-unknown">?</div>
      </div>

      {feedback !== null && <FeedbackMessage isCorrect={feedback} />}

      <AnswerButtons
        selected={selected}
        onSelect={onSelect}
        disabled={isCorrect}
      />

      <div className="question-actions">
        {feedback === null && (
          <button
            className="btn btn-primary"
            onClick={onCheck}
            disabled={!hasSelected}
          >
            Check
          </button>
        )}
        {isIncorrect && (
          <button className="btn btn-primary" onClick={onRetry}>
            Try Again
          </button>
        )}
        {isCorrect && (
          <button className="btn btn-primary" onClick={onNext}>
            Next →
          </button>
        )}
      </div>
    </div>
  );
}
