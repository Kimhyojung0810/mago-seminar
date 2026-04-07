import type { Question } from '../types';

export const questions: Question[] = [
  { id: 1, text: '나는 승부욕이 강한 편이다.', axis: 'A' },
  { id: 2, text: '나는 지는 것을 싫어한다.', axis: 'A' },
  { id: 3, text: '나는 이기기 위해 전략적으로 행동하는 편이다.', axis: 'A' },
  { id: 4, text: '나는 경쟁 상황에서 더 집중하고 몰입한다.', axis: 'A' },
  { id: 5, text: '나는 관계 유지를 위해 내 이익을 양보할 수 있다.', axis: 'B' },
  { id: 6, text: '나는 팀의 성공이 개인의 성공보다 중요하다고 생각한다.', axis: 'B' },
  { id: 7, text: '나는 협력 상황에서 다른 사람의 의견을 존중하려고 한다.', axis: 'B' },
  { id: 8, text: '나는 팀 분위기를 중요하게 생각한다.', axis: 'B' },
  { id: 9, text: '나는 스스로 승부욕을 억누르고 있다고 느낀다.', axis: 'C' },
  { id: 10, text: '나는 상황에 따라 경쟁적이 되기도 하고 협력적으로 변한다.', axis: 'C' },
  { id: 11, text: '나는 경쟁 상황에서 나의 승부욕을 숨기려고 한다.', axis: 'C' },
  { id: 12, text: '나는 협력 상황에서 나의 욕심을 조절할 수 있다.', axis: 'C' },
];

export const SCALE_OPTIONS = [
  { value: 1, label: '전혀 아니다' },
  { value: 2, label: '아니다' },
  { value: 3, label: '보통' },
  { value: 4, label: '그렇다' },
  { value: 5, label: '매우 그렇다' },
] as const;
