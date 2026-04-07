import { AnimatePresence } from 'framer-motion';
import { useQuiz } from './hooks/useQuiz';
import { IntroScreen } from './components/IntroScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { ResultScreen } from './components/ResultScreen';

export default function App() {
  const quiz = useQuiz();

  return (
    <div className="app-shell bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_50%),linear-gradient(to_bottom,#0c0f18,#111827_40%,#0c0f18)] text-white flex items-start justify-center">
      <div className="w-full max-w-[400px] px-5 py-6">
        <AnimatePresence mode="wait">
          {quiz.phase === 'intro' && (
            <IntroScreen
              key="intro"
              nickname={quiz.nickname}
              onNicknameChange={quiz.setNickname}
              onStart={quiz.startQuiz}
            />
          )}

          {quiz.phase === 'quiz' && quiz.currentQuestion && (
            <QuestionScreen
              key="quiz"
              question={quiz.currentQuestion}
              currentStep={quiz.currentStep}
              totalQuestions={quiz.totalQuestions}
              currentAnswer={quiz.answers[quiz.currentQuestion.id]}
              onAnswer={quiz.answerQuestion}
              onNext={quiz.goToNext}
              onPrev={quiz.goToPrev}
              canGoBack={quiz.currentStep > 0}
            />
          )}

          {quiz.phase === 'result' && (
            <ResultScreen
              key="result"
              nickname={quiz.nickname}
              resultKey={quiz.resultKey}
              scores={quiz.scores}
              onReset={quiz.reset}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
