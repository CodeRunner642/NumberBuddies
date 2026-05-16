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
  const max = LEVEL_MAX[level] ?? 10;
  const correct = question.answer;
  const choices = new Set([correct]);

  let safety = 0;
  while (choices.size < 4 && safety < 60) {
    safety++;
    const delta = Math.floor(Math.random() * 4) + 1;
    const sign = Math.random() < 0.5 ? 1 : -1;
    const wrong = correct + delta * sign;
    if (wrong >= 0 && wrong <= max + 3 && wrong !== correct) {
      choices.add(wrong);
    }
  }

  // Fallback: fill with nearby integers if needed
  let n = 0;
  while (choices.size < 4) {
    if (n !== correct && n >= 0) choices.add(n);
    n++;
  }

  return [...choices].sort(() => Math.random() - 0.5);
}
