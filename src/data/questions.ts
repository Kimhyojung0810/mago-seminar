import type { Question } from '../types';

export const questions: Question[] = [
  // ── 자기 인식 + 상황 판단을 교차 배치 ───────────────────

  { id: 1, type: 'likert', text: '나는 승부욕이 강한 편이다.', axis: 'A' },
  { id: 2, type: 'likert', text: '나는 지는 것을 싫어한다.', axis: 'A' },

  {
    id: 3,
    type: 'scenario',
    text: '보드게임 중 실수로 옆 사람의 카드를 봤다.',
    options: [
      { text: '슬쩍 전략에 참고한다', scores: { A: 2 } },
      { text: '솔직히 봤다고 말한다', scores: { B: 2 } },
      { text: '모른 척하고 넘긴다', scores: { C: 2 } },
      { text: '상황에 따라 다를 것 같다', scores: { A: 1, C: 1 } },
    ],
  },

  { id: 4, type: 'likert', text: '나는 관계 유지를 위해 내 이익을 양보할 수 있다.', axis: 'B' },
  { id: 5, type: 'likert', text: '나는 팀의 성공이 개인의 성공보다 중요하다고 생각한다.', axis: 'B' },

  {
    id: 6,
    type: 'scenario',
    text: '팀 게임에서 내 전략과 팀원의 의견이 정면으로 충돌한다.',
    options: [
      { text: '논리적으로 설득해서 내 전략을 관철한다', scores: { A: 2 } },
      { text: '팀원 의견을 존중하고 따른다', scores: { B: 2 } },
      { text: '절충안을 제시한다', scores: { C: 2 } },
      { text: '일단 해보고 안 되면 바꾼다', scores: { B: 1, C: 1 } },
    ],
  },

  { id: 7, type: 'likert', text: '나는 이기기 위해 전략적으로 행동하는 편이다.', axis: 'A' },

  {
    id: 8,
    type: 'scenario',
    text: '게임에서 1등을 달리고 있는데, 친한 친구가 꼴찌다.',
    options: [
      { text: '전력을 다해 1등을 유지한다', scores: { A: 2 } },
      { text: '슬쩍 기회를 만들어준다', scores: { B: 2 } },
      { text: '이기되, 압도적이지 않게 조절한다', scores: { C: 2 } },
      { text: '게임은 게임이니까 크게 신경쓰지 않는다', scores: { B: 1, C: 1 } },
    ],
  },

  { id: 9, type: 'likert', text: '나는 협력 상황에서 다른 사람의 의견을 존중하려고 한다.', axis: 'B' },

  {
    id: 10,
    type: 'scenario',
    text: '게임 막판, 역전할 수 있는 기회가 왔다. 대신 리스크가 크다.',
    options: [
      { text: '무조건 역전을 노린다', scores: { A: 2 } },
      { text: '같이 하는 사람들 반응을 보고 결정한다', scores: { B: 2 } },
      { text: '안전하게 현재 순위를 지킨다', scores: { C: 2 } },
      { text: '재미있는 쪽을 선택한다', scores: { A: 1, C: 1 } },
    ],
  },

  { id: 11, type: 'likert', text: '나는 스스로 승부욕을 억누르고 있다고 느낀다.', axis: 'C' },
  { id: 12, type: 'likert', text: '나는 상황에 따라 경쟁적이 되기도 하고 협력적으로 변한다.', axis: 'C' },

  {
    id: 13,
    type: 'scenario',
    text: '처음 만난 사람들과 보드게임을 하게 됐다.',
    options: [
      { text: '빠르게 판을 읽고 전략을 세운다', scores: { A: 2 } },
      { text: '분위기 파악하며 조심스럽게 참여한다', scores: { B: 2 } },
      { text: '룰 이해에 집중하며 나의 페이스를 유지한다', scores: { C: 2 } },
      { text: '가볍게 즐기면서 흐름을 탄다', scores: { B: 1, C: 1 } },
    ],
  },

  { id: 14, type: 'likert', text: '나는 경쟁 상황에서 더 집중하고 몰입한다.', axis: 'A' },

  {
    id: 15,
    type: 'scenario',
    text: '같이 하던 사람이 룰을 어기고 유리하게 플레이했다.',
    options: [
      { text: '바로 지적한다', scores: { A: 2 } },
      { text: '분위기를 위해 넘어간다', scores: { B: 2 } },
      { text: '게임 끝나고 부드럽게 말한다', scores: { C: 2 } },
      { text: '나도 유연하게 대응한다', scores: { B: 1, C: 1 } },
    ],
  },

  { id: 16, type: 'likert', text: '나는 팀 분위기를 중요하게 생각한다.', axis: 'B' },
  { id: 17, type: 'likert', text: '나는 경쟁 상황에서 나의 승부욕을 숨기려고 한다.', axis: 'C' },

  {
    id: 18,
    type: 'scenario',
    text: '내가 이기고 있는데 모든 사람이 나를 집중 견제한다.',
    options: [
      { text: '더 집중해서 이기겠다는 의지가 불타오른다', scores: { A: 2 } },
      { text: '다 같이 즐기는 거니까 웃으며 받아들인다', scores: { B: 2 } },
      { text: '티 안 내고 전략적으로 빠져나간다', scores: { C: 2 } },
      { text: '살짝 양보하는 척하면서 견제를 풀려 한다', scores: { A: 1, B: 1 } },
    ],
  },

  { id: 19, type: 'likert', text: '나는 협력 상황에서 나의 욕심을 조절할 수 있다.', axis: 'C' },

  {
    id: 20,
    type: 'scenario',
    text: '게임이 예상보다 훨씬 오래 걸리고 있다.',
    options: [
      { text: '결과가 날 때까지 끝까지 한다', scores: { A: 2 } },
      { text: '다 같이 적당히 마무리하자고 제안한다', scores: { B: 2 } },
      { text: '상황을 보고 적절한 마무리 타이밍을 찾는다', scores: { C: 2 } },
      { text: '하던 대로 계속하되 속도를 올린다', scores: { A: 1, C: 1 } },
    ],
  },
];

export const SCALE_OPTIONS = [
  { value: 1, label: '전혀 아니다' },
  { value: 2, label: '아니다' },
  { value: 3, label: '보통' },
  { value: 4, label: '그렇다' },
  { value: 5, label: '매우 그렇다' },
] as const;
