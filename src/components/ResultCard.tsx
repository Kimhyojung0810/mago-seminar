import type { ResultType } from '../types';
import { resultTypes } from '../data/resultTypes';
import { Mascot } from './Mascots';

interface Props {
  nickname: string;
  resultKey: ResultType;
}

export function ResultCard({ nickname, resultKey }: Props) {
  const r = resultTypes[resultKey];

  return (
    <div
      id="result-card"
      className="rounded-[24px] overflow-hidden relative"
      style={{ background: r.cardBg }}
    >
      <div
        className={`absolute inset-x-0 top-0 h-52 bg-gradient-to-b ${r.gradient} pointer-events-none`}
      />
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />

      <div className="relative p-6 space-y-5">
        <div className="flex justify-center pt-2 pb-1">
          <Mascot type={resultKey} />
        </div>

        <div className="text-center space-y-2">
          <div className="text-4xl leading-none">{r.emoji}</div>
          <h2 className="text-[22px] font-bold tracking-tight leading-tight">{r.title}</h2>
          <p className="text-[13px] text-white/50">{nickname}님의 보드게임 성향</p>
        </div>

        <div className="flex justify-center">
          <span className="text-[12px] text-white/55 border border-white/[0.1] rounded-full px-3.5 py-1.5">
            {r.subtitle}
          </span>
        </div>

        <div className="rounded-2xl bg-white/[0.06] border border-white/[0.08] p-4">
          <p className="text-[13px] leading-[1.7] text-white/70">{r.description}</p>
        </div>

        <div className="text-center pt-1 pb-0.5">
          <span className="text-[10px] text-white/20 tracking-wide">마고의 세미나 : 심리편</span>
        </div>
      </div>
    </div>
  );
}
