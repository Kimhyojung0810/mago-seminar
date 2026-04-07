import type { Axis, ResultType, Scores } from '../types';
import { questions } from '../data/questions';

export const MAX_SCORE_PER_AXIS = 36;

export function calculateScores(answers: Record<number, number>): Scores {
  const scores: Scores = { A: 0, B: 0, C: 0 };

  for (const q of questions) {
    const answer = answers[q.id];
    if (answer === undefined) continue;

    if (q.type === 'likert') {
      scores[q.axis] += answer;
    } else {
      const opt = q.options[answer];
      if (opt) {
        for (const [axis, val] of Object.entries(opt.scores)) {
          scores[axis as Axis] += val;
        }
      }
    }
  }

  return scores;
}

export function determineType(scores: Scores): ResultType {
  const { A, B, C } = scores;
  const T = 17;
  const GAP = 4;

  const highA = A >= T;
  const highB = B >= T;
  const highC = C >= T;

  if (highA && A - B >= GAP) return 'tiger';
  if (highB && B - A >= GAP) return 'puppy';
  if (highA && highB) return 'fox';
  if (highC && C >= A && C >= B) return 'fox';

  return 'penguin';
}

export function getScoreLevel(score: number): string {
  if (score >= 28) return '매우 높음';
  if (score >= 22) return '높음';
  if (score >= 15) return '보통';
  return '낮음';
}

export function getBalanceInsight(scores: Scores): string {
  const diff = scores.A - scores.B;
  if (diff >= 10)
    return '승부욕이 협력 성향보다 확실히 강해요. 이기는 것 자체가 큰 원동력이 되는 타입이에요.';
  if (diff >= 5)
    return '승부욕이 상대적으로 강한 편이에요. 경쟁 상황에서 에너지가 올라가는 타입이에요.';
  if (diff <= -10)
    return '협력 성향이 승부욕보다 훨씬 강해요. 함께하는 경험 자체를 중시하는 타입이에요.';
  if (diff <= -5)
    return '협력 성향이 상대적으로 강한 편이에요. 관계와 분위기를 먼저 살피는 타입이에요.';
  if (scores.C >= 22)
    return '자기 조절 감각이 돋보여요. 상황에 따라 경쟁과 협력 사이를 능숙하게 오가는 타입이에요.';
  return '세 가지 성향이 비교적 균형 잡혀 있어요. 상황에 따라 자연스럽게 적응하는 타입이에요.';
}

export function getSeminarReport(scores: Scores): string {
  const max = Math.max(scores.A, scores.B, scores.C);
  if (max >= 26)
    return '매우 뚜렷한 주도 성향이 나타났어요. 게임이 시작되면 당신의 플레이 스타일이 금방 드러나는 편입니다.';
  if (max >= 20)
    return '비교적 뚜렷한 성향이 드러났어요. 게임이 시작되면 당신의 선택 기준이 꽤 선명하게 나타나는 편입니다.';
  return '특정 성향 하나보다 상황 적응력이 더 돋보였어요. 판의 분위기에 맞춰 유연하게 움직이는 타입에 가깝습니다.';
}
