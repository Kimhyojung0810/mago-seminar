import type { ResultType, Scores } from '../types';
import { questions } from '../data/questions';

export function calculateScores(answers: Record<number, number>): Scores {
  const scores: Scores = { A: 0, B: 0, C: 0 };
  for (const q of questions) {
    scores[q.axis] += answers[q.id] || 0;
  }
  return scores;
}

export function determineType(scores: Scores): ResultType {
  const { A, B, C } = scores;
  if (A >= 14 && B < 14) return 'tiger';
  if (B >= 14 && A < 14) return 'puppy';
  if (A >= 14 && B >= 14) return 'fox';
  if (C >= 14 || (A < 14 && B < 14)) return 'penguin';
  return 'fox';
}
