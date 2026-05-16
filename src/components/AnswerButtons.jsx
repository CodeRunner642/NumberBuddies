export default function AnswerButtons({
  choices,
  selected,
  correctAnswer,
  showCorrect,
  onSelect,
}) {
  return (
    <div className="answer-grid">
      {choices.map((val) => {
        const isSelected  = val === selected;
        const isCorrect   = showCorrect && val === correctAnswer;
        const isWrong     = showCorrect && isSelected && val !== correctAnswer;

        let cls = 'btn btn-answer';
        if (isCorrect) cls += ' btn-answer--correct';
        else if (isWrong) cls += ' btn-answer--wrong';
        else if (isSelected) cls += ' btn-answer--selected';

        return (
          <button
            key={val}
            className={cls}
            onClick={() => onSelect(val)}
            aria-label={`Answer ${val}`}
            aria-pressed={isSelected}
          >
            {val}
          </button>
        );
      })}
    </div>
  );
}
