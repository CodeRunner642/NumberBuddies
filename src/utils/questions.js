export function generateQuestion(lastQuestion = null) {
  let question;
  let attempts = 0;

  do {
    const operation = Math.random() < 0.5 ? '+' : '-';
    let a, b;

    if (operation === '+') {
      a = Math.floor(Math.random() * 11); // 0–10
      b = Math.floor(Math.random() * (11 - a)); // b such that a+b <= 10
    } else {
      a = Math.floor(Math.random() * 11); // 0–10
      b = Math.floor(Math.random() * (a + 1)); // b such that a-b >= 0
    }

    const answer = operation === '+' ? a + b : a - b;
    question = { a, b, operation, answer };
    attempts++;
  } while (
    attempts < 10 &&
    lastQuestion &&
    question.a === lastQuestion.a &&
    question.b === lastQuestion.b &&
    question.operation === lastQuestion.operation
  );

  return question;
}
