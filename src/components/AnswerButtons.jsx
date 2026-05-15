export default function AnswerButtons({ selected, onSelect, disabled }) {
  return (
    <div className="answer-grid">
      {Array.from({ length: 11 }, (_, i) => (
        <button
          key={i}
          className={`btn btn-answer ${selected === i ? 'btn-answer-selected' : ''}`}
          onClick={() => !disabled && onSelect(i)}
          disabled={disabled}
        >
          {i}
        </button>
      ))}
    </div>
  );
}
