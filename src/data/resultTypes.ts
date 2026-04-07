import type { ResultType, ResultTypeInfo } from '../types';

export const resultTypes: Record<ResultType, ResultTypeInfo> = {
  tiger: {
    key: 'tiger',
    title: '이겨야 직성 풀리는 호랑이',
    emoji: '🐯',
    subtitle: '승부욕이 에너지로 바뀌는 몰입형 플레이어',
    description:
      '당신은 승부욕이 높고, 게임이 시작되면 집중력이 급상승하는 타입이에요. 흐름을 빠르게 읽고 이기기 위한 전략을 세우는 데 강합니다.',
    points: ['몰입도 높음', '전략적 판단', '판을 끌고 가는 추진력'],
    tip: '너무 몰입하면 주변이 긴장할 수 있어요. 게임의 재미와 팀 분위기도 같이 챙기면 더 멋져요.',
    gradient: 'from-amber-400/25 via-orange-400/10 to-transparent',
    cardBg: 'linear-gradient(170deg, #2a2010 0%, #1a1520 40%, #12151e 100%)',
  },
  puppy: {
    key: 'puppy',
    title: '일단 같이 살자 강아지',
    emoji: '🐶',
    subtitle: '관계와 분위기를 먼저 보는 따뜻한 협력형',
    description:
      '당신은 게임에서도 사람을 먼저 보는 편이에요. 이기는 것보다 함께 즐기고, 서로 기분 좋게 끝나는 걸 더 중요하게 생각합니다.',
    points: ['배려와 공감', '팀워크 중심', '분위기 조율 능력'],
    tip: '가끔은 하고 싶은 말을 더 분명하게 내도 괜찮아요. 당신의 의견도 팀에 꼭 필요하니까요.',
    gradient: 'from-sky-400/20 via-cyan-400/10 to-transparent',
    cardBg: 'linear-gradient(170deg, #101a2a 0%, #141520 40%, #12151e 100%)',
  },
  fox: {
    key: 'fox',
    title: '상황 봐서 간다 여우',
    emoji: '🦊',
    subtitle: '경쟁과 협력 사이를 유연하게 오가는 균형형',
    description:
      '당신은 판을 읽는 감각이 좋아요. 지금이 경쟁할 때인지, 힘을 합칠 때인지 빠르게 파악하고 행동을 조절합니다.',
    points: ['눈치와 전략', '높은 적응력', '균형 잡힌 판단'],
    tip: '너무 계산적으로 보일 수 있어요. 가끔은 직관대로 움직여도 충분히 매력적입니다.',
    gradient: 'from-orange-400/20 via-rose-400/10 to-transparent',
    cardBg: 'linear-gradient(170deg, #2a1510 0%, #1a1520 40%, #12151e 100%)',
  },
  penguin: {
    key: 'penguin',
    title: '그냥 흐름 탄다 펭귄',
    emoji: '🐧',
    subtitle: '자연스럽고 편안하게 판에 녹아드는 적응형',
    description:
      '당신은 긴장보다 재미를 우선하는 편이에요. 상황을 편하게 받아들이고, 과열되지 않으면서도 모두와 잘 어울립니다.',
    points: ['편안한 참여', '유연한 태도', '낮은 부담감'],
    tip: '조금 더 적극적으로 개입하면 생각보다 더 재밌어질 수 있어요. 당신의 한마디가 흐름을 바꿀 수도 있어요.',
    gradient: 'from-slate-300/15 via-blue-300/8 to-transparent',
    cardBg: 'linear-gradient(170deg, #141820 0%, #141520 40%, #12151e 100%)',
  },
};
