import { useState, useCallback } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuestionCard from './components/QuestionCard';
import SummaryScreen from './components/SummaryScreen';
import ProgressStars from './components/ProgressStars';
import { generateQuestion } from './utils/questions';
import './App.css';

const TOTAL_QUESTIONS = 10;

function freshSession() {
  return {
    screen: 'welcome', // 'welcome' | 'question' | 'summary'
    questions: [],
    currentIndex: 0,
    stars: 0,
    selected: null,
    feedback: null, // null | true | false
  };
}

export default function App() {
  const [state, setState] = useState(freshSession);

  const startSession = useCallback(() => {
    const first = generateQuestion();
    setState({ ...freshSession(), screen: 'question', questions: [first] });
  }, []);

  const handleSelect = useCallback((value) => {
    setState((s) => ({ ...s, selected: value }));
  }, []);

  const handleCheck = useCallback(() => {
    setState((s) => {
      const isCorrect = s.selected === s.questions[s.currentIndex].answer;
      return { ...s, feedback: isCorrect, stars: isCorrect ? s.stars + 1 : s.stars };
    });
  }, []);

  const handleRetry = useCallback(() => {
    setState((s) => ({ ...s, selected: null, feedback: null }));
  }, []);

  const handleNext = useCallback(() => {
    setState((s) => {
      const nextIndex = s.currentIndex + 1;
      if (nextIndex >= TOTAL_QUESTIONS) {
        return { ...s, screen: 'summary' };
      }
      const nextQ = generateQuestion(s.questions[s.currentIndex]);
      return {
        ...s,
        currentIndex: nextIndex,
        questions: [...s.questions, nextQ],
        selected: null,
        feedback: null,
      };
    });
  }, []);

  const { screen, questions, currentIndex, stars, selected, feedback } = state;

  return (
    <div className="app-wrapper">
      {screen === 'welcome' && <WelcomeScreen onStart={startSession} />}

      {screen === 'question' && questions.length > 0 && (
        <div className="screen question-screen">
          <div className="top-bar">
            <ProgressStars stars={stars} total={currentIndex} />
          </div>
          <QuestionCard
            question={questions[currentIndex]}
            questionNumber={currentIndex + 1}
            totalQuestions={TOTAL_QUESTIONS}
            selected={selected}
            onSelect={handleSelect}
            onCheck={handleCheck}
            onRetry={handleRetry}
            onNext={handleNext}
            feedback={feedback}
          />
        </div>
      )}

      {screen === 'summary' && (
        <SummaryScreen stars={stars} total={TOTAL_QUESTIONS} onPlayAgain={startSession} />
      )}
    </div>
  );
}
