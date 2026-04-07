import { useState, useMemo, useCallback, useEffect } from 'react';
import { questions } from '../data/questions';
import { calculateScores, determineType } from '../utils/scoring';
import { saveResult, getResult, clearResult } from '../utils/storage';
import type { ResultType, Scores } from '../types';

export type Phase = 'intro' | 'quiz' | 'result';

export function useQuiz() {
  const saved = useMemo(() => getResult(), []);

  const [phase, setPhase] = useState<Phase>(saved ? 'result' : 'intro');
  const [nickname, setNickname] = useState(saved?.nickname ?? '');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>(saved?.answers ?? {});

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentStep];

  const scores: Scores = useMemo(() => calculateScores(answers), [answers]);
  const resultKey: ResultType = useMemo(() => determineType(scores), [scores]);

  const isComplete = Object.keys(answers).length === totalQuestions;

  const startQuiz = useCallback(() => {
    const trimmed = nickname.trim();
    if (!trimmed) return;
    setNickname(trimmed);
    setPhase('quiz');
    setCurrentStep(0);
    setAnswers({});
  }, [nickname]);

  const answerQuestion = useCallback((questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentStep((s) => (s < totalQuestions - 1 ? s + 1 : s));
  }, [totalQuestions]);

  const goToPrev = useCallback(() => {
    setCurrentStep((s) => (s > 0 ? s - 1 : s));
  }, []);

  const reset = useCallback(() => {
    clearResult();
    setPhase('intro');
    setCurrentStep(0);
    setAnswers({});
    setNickname('');
  }, []);

  useEffect(() => {
    if (isComplete && phase === 'quiz') {
      const timer = setTimeout(() => {
        setPhase('result');
        saveResult({ nickname, answers, resultKey, scores, timestamp: Date.now() });
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isComplete, phase, nickname, answers, resultKey, scores]);

  return {
    phase,
    nickname,
    setNickname,
    currentStep,
    currentQuestion,
    answers,
    scores,
    resultKey,
    totalQuestions,
    startQuiz,
    answerQuestion,
    goToNext,
    goToPrev,
    reset,
  };
}
