import { useState } from 'react';

const CORRECT = [
  'Great job! 🎉',
  'Well done! ⭐',
  'Brilliant! 🌟',
  'Amazing! 🎊',
  'You got it! 🥳',
];

const INCORRECT = [
  'Good try! Have another go. 💪',
  'Nearly there! Try again. 😊',
  "Don't worry! Give it another go. 🌈",
];

function pick(pool) {
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function FeedbackMessage({ correct }) {
  const [msg] = useState(() => pick(correct ? CORRECT : INCORRECT));

  return (
    <div
      className={`feedback-msg ${correct ? 'feedback-msg--correct' : 'feedback-msg--wrong'}`}
      role="status"
      aria-live="polite"
    >
      {msg}
    </div>
  );
}
