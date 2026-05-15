const CORRECT_MESSAGES = [
  'Great job! 🎉',
  'Well done! ⭐',
  'Brilliant! 🌟',
  'Amazing! 🎊',
  'You got it! 🥳',
];

const INCORRECT_MESSAGES = [
  'Good try! Have another go. 💪',
  'Nearly there! Try again. 😊',
  'Don\'t worry! Give it another go. 🌈',
];

export default function FeedbackMessage({ isCorrect }) {
  const messages = isCorrect ? CORRECT_MESSAGES : INCORRECT_MESSAGES;
  const message = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className={`feedback-message ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
      {message}
    </div>
  );
}
