export type Axis = 'A' | 'B' | 'C';

export interface Question {
  id: number;
  text: string;
  axis: Axis;
}

export type ResultType = 'tiger' | 'puppy' | 'fox' | 'penguin';

export interface ResultTypeInfo {
  key: ResultType;
  title: string;
  emoji: string;
  subtitle: string;
  description: string;
  points: string[];
  tip: string;
  gradient: string;
  cardBg: string;
}

export interface Scores {
  A: number;
  B: number;
  C: number;
}

export interface SavedResult {
  nickname: string;
  answers: Record<number, number>;
  resultKey: ResultType;
  scores: Scores;
  timestamp: number;
}
