import type { Scores, ResultType } from '../types';
import { resultTypes } from '../data/resultTypes';
import { Mascot } from './Mascots';

interface Props {
  nickname: string;
  resultKey: ResultType;
  scores: Scores;
}

export function ResultCard({ nickname, resultKey, scores }: Props) {
  const r = resultTypes[resultKey];

  const axes = [
    { label: '승부욕', value: scores.A, max: 20 },
    { label: '협력', value: scores.B, max: 20 },
    { label: '조절', value: scores.C, max: 20 },
  ];

  const hasStrongAxis = scores.A >= 16 || scores.B >= 16 || scores.C >= 16;

  const comparisonText = (() => {
    if (scores.A >= 16)
      return '승부욕 점수가 꽤 높은 편이에요. 게임이 시작되면 생각보다 더 진심이 되는 타입일 수 있어요.';
    if (scores.B >= 16)
      return '협력 점수가 높은 편이에요. 이기는 것만큼 함께 즐기는 경험을 중요하게 보는 타입이에요.';
    if (scores.C >= 16)
      return '조절 점수가 높은 편이에요. 상황에 따라 나의 승부욕을 유연하게 다루는 감각이 돋보여요.';
    return '세 가지 성향이 비교적 고르게 나타났어요. 상황에 따라 다양한 모습이 드러나는 균형형에 가까워요.';
  })();

  return (
    <div
      id="result-card"
      className="rounded-[24px] overflow-hidden relative"
      style={{ background: r.cardBg }}
    >
      {/* decorative gradient overlay */}
      <div
        className={`absolute inset-x-0 top-0 h-52 bg-gradient-to-b ${r.gradient} pointer-events-none`}
      />
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />

      <div className="relative p-6 space-y-5">
        {/* mascot */}
        <div className="flex justify-center pt-2 pb-1">
          <Mascot type={resultKey} />
        </div>

        {/* header */}
        <div className="text-center space-y-2">
          <div className="text-4xl leading-none">{r.emoji}</div>
          <h2 className="text-[22px] font-bold tracking-tight leading-tight">{r.title}</h2>
          <p className="text-[13px] text-white/50">{nickname}님의 보드게임 성향</p>
        </div>

        {/* subtitle pill */}
        <div className="flex justify-center">
          <span className="text-[12px] text-white/55 border border-white/[0.1] rounded-full px-3.5 py-1.5">
            {r.subtitle}
          </span>
        </div>

        {/* description */}
        <div className="rounded-2xl bg-white/[0.06] border border-white/[0.08] p-4">
          <p className="text-[13px] leading-[1.7] text-white/70">{r.description}</p>
        </div>

        {/* score bars */}
        <div className="space-y-3">
          <span className="text-[11px] text-white/35 font-medium">성향 분석</span>
          {axes.map((a) => (
            <div key={a.label} className="space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-white/55">{a.label}</span>
                <span className="text-white/35 tabular-nums">
                  {a.value}/{a.max}
                </span>
              </div>
              <div className="h-[5px] rounded-full bg-white/[0.08] overflow-hidden">
                <div
                  className="h-full rounded-full bg-white/55"
                  style={{ width: `${(a.value / a.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* seminar report */}
        <InfoBlock title="세미나 한 줄 리포트">
          {hasStrongAxis
            ? '비교적 뚜렷한 성향이 드러났어요. 게임이 시작되면 당신의 선택 기준이 꽤 선명하게 나타나는 편입니다.'
            : '특정 성향 하나보다 상황 적응력이 더 돋보였어요. 판의 분위기에 맞춰 유연하게 움직이는 타입에 가깝습니다.'}
        </InfoBlock>

        {/* comparison */}
        <InfoBlock title="비교 멘트">{comparisonText}</InfoBlock>

        {/* points */}
        <div className="space-y-2">
          <span className="text-[11px] text-white/35 font-medium">핵심 포인트</span>
          <div className="grid gap-1.5">
            {r.points.map((p) => (
              <div
                key={p}
                className="rounded-xl bg-white/[0.05] border border-white/[0.08] px-4 py-2.5 text-[13px] text-white/65"
              >
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* tip */}
        <InfoBlock title="한 줄 팁">{r.tip}</InfoBlock>

        {/* branding */}
        <div className="text-center pt-2 pb-1">
          <span className="text-[10px] text-white/20 tracking-wide">마고의 세미나 : 심리편</span>
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ title, children }: { title: string; children: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.05] border border-white/[0.08] p-4 space-y-1.5">
      <span className="text-[11px] text-white/30 font-medium">{title}</span>
      <p className="text-[13px] leading-[1.7] text-white/65">{children}</p>
    </div>
  );
}
