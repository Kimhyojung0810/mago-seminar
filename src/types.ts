export type Axis = 'A' | 'B' | 'C';

export interface LikertQuestion {
  id: number;
  type: 'likert';
  text: string;
  axis: Axis;
}

export interface ScenarioOption {
  text: string;
  scores: Partial<Record<Axis, number>>;
}

export interface ScenarioQuestion {
  id: number;
  type: 'scenario';
  text: string;
  options: ScenarioOption[];
}

export type Question = LikertQuestion | ScenarioQuestion;

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
  version: number;
  nickname: string;
  answers: Record<number, number>;
  resultKey: ResultType;
  scores: Scores;
  timestamp: number;
}
