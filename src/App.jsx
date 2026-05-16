import { useState, useCallback } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import LevelScreen from './components/LevelScreen';
import QuestionScreen from './components/QuestionScreen';
import SummaryScreen from './components/SummaryScreen';
import { generateQuestion, generateAnswerChoices } from './utils/questions';
import './App.css';

const TOTAL_QUESTIONS = 10;

function buildSession(level) {
  const questions = [];
  let last = null;
  for (let i = 0; i < TOTAL_QUESTIONS; i++) {
    const q = generateQuestion(level, last);
    q.choices = generateAnswerChoices(q, level);
    questions.push(q);
    last = q;
  }
  return questions;
}

export default function App() {
  const [screen, setScreen]           = useState('welcome');
  const [level, setLevel]             = useState(null);
  const [questions, setQuestions]     = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stars, setStars]             = useState(0);
  const [correct, setCorrect]         = useState(0);
  const [selected, setSelected]       = useState(null);
  const [feedback, setFeedback]       = useState(null); // null | 'correct' | 'incorrect'
  const [soundEnabled, setSoundEnabled] = useState(
    () => localStorage.getItem('soundEnabled') !== 'false'
  );

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      localStorage.setItem('soundEnabled', String(next));
      return next;
    });
  }, []);

  const startSession = useCallback((selectedLevel) => {
    setLevel(selectedLevel);
    setQuestions(buildSession(selectedLevel));
    setCurrentIndex(0);
    setStars(0);
    setCorrect(0);
    setSelected(null);
    setFeedback(null);
    setScreen('question');
  }, []);

  const handleSelect = useCallback((value) => {
    setSelected(value);
  }, []);

  const handleCheck = useCallback(() => {
    if (selected === null) return;
    const isCorrect = selected === questions[currentIndex].answer;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
      setStars((s) => s + 1);
      setCorrect((c) => c + 1);
    }
  }, [selected, questions, currentIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((idx) => {
      const next = idx + 1;
      if (next >= TOTAL_QUESTIONS) {
        setScreen('summary');
        return idx;
      }
      setSelected(null);
      setFeedback(null);
      return next;
    });
  }, []);

  const handleRetry = useCallback(() => {
    setSelected(null);
    setFeedback(null);
  }, []);

  const goToLevel   = useCallback(() => setScreen('level'), []);
  const goToWelcome = useCallback(() => setScreen('welcome'), []);

  if (screen === 'welcome') {
    return (
      <div className="app-wrapper">
        <WelcomeScreen
          onStart={goToLevel}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
        />
      </div>
    );
  }

  if (screen === 'level') {
    return (
      <div className="app-wrapper">
        <LevelScreen
          onSelectLevel={startSession}
          onBack={goToWelcome}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
        />
      </div>
    );
  }

  if (screen === 'question' && questions.length > 0) {
    return (
      <div className="app-wrapper">
        <QuestionScreen
          question={questions[currentIndex]}
          questionNumber={currentIndex + 1}
          totalQuestions={TOTAL_QUESTIONS}
          level={level}
          stars={stars}
          selected={selected}
          feedback={feedback}
          soundEnabled={soundEnabled}
          onSelect={handleSelect}
          onCheck={handleCheck}
          onNext={handleNext}
          onRetry={handleRetry}
          onBack={goToLevel}
          onToggleSound={toggleSound}
        />
      </div>
    );
  }

  if (screen === 'summary') {
    return (
      <div className="app-wrapper">
        <SummaryScreen
          stars={stars}
          correct={correct}
          total={TOTAL_QUESTIONS}
          level={level}
          onPlayAgain={() => startSession(level)}
          onNewLevel={goToLevel}
        />
      </div>
    );
  }

  return null;
}
