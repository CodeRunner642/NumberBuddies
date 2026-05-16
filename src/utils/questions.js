const LEVEL_MAX = { beginner: 5, explorer: 10, star: 20 };

export function generateQuestion(level, lastQuestion = null) {
  const max = LEVEL_MAX[level] ?? 10;
  let q;
  let attempts = 0;

  do {
    const isAdd = Math.random() < 0.5;
    if (isAdd) {
      const a = Math.floor(Math.random() * (max + 1));
      const b = Math.floor(Math.random() * (max - a + 1));
      q = { a, b, operation: '+', answer: a + b };
    } else {
      const a = Math.floor(Math.random() * (max + 1));
      const b = Math.floor(Math.random() * (a + 1));
      q = { a, b, operation: '-', answer: a - b };
    }
    attempts++;
  } while (
    attempts < 10 &&
    lastQuestion &&
    q.a === lastQuestion.a &&
    q.b === lastQuestion.b &&
    q.operation === lastQuestion.operation
  );

  return q;
}

export function generateAnswerChoices(question, level) {
  const levelMax = LEVEL_MAX[level] ?? 10;
  const max = Math.max(9, levelMax);
  return Array.from({ length: max + 1 }, (_, i) => i);
}
