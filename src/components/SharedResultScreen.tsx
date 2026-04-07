import { motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import { ResultCard } from './ResultCard';
import { MAX_SCORE_PER_AXIS, getScoreLevel } from '../utils/scoring';
import type { ResultType, Scores } from '../types';

interface Props {
  nickname: string;
  resultKey: ResultType;
  scores: Scores;
  onStartTest: () => void;
}

const pageTransition = { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] };

export function SharedResultScreen({ nickname, resultKey, scores, onStartTest }: Props) {
  const axes = [
    { label: '승부욕', value: scores.A },
    { label: '협력', value: scores.B },
    { label: '조절', value: scores.C },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={pageTransition}
      className="space-y-4"
    >
      <div className="px-1 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.06] px-3 py-1.5 text-[11px] text-white/55 backdrop-blur-xl">
          <Sparkles className="h-3 w-3" />
          마고의 세미나: 심리편
        </span>
      </div>

      <div className="text-center space-y-1 px-2">
        <p className="text-[13px] text-white/50">
          <span className="text-white/80 font-medium">{nickname}</span>님의 결과
        </p>
      </div>

      <ResultCard nickname={nickname} resultKey={resultKey} />

      <div className="rounded-[20px] bg-white/[0.05] border border-white/[0.08] p-4 space-y-2.5">
        {axes.map((a) => {
          const pct = Math.min((a.value / MAX_SCORE_PER_AXIS) * 100, 100);
          return (
            <div key={a.label} className="flex items-center gap-3">
              <span className="text-[11px] text-white/45 w-10 shrink-0">{a.label}</span>
              <div className="flex-1 h-[4px] rounded-full bg-white/[0.08] overflow-hidden">
                <div
                  className="h-full rounded-full bg-white/50"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-[10px] text-white/30 w-14 text-right">
                {getScoreLevel(a.value)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="space-y-2.5 pt-1">
        <button
          onClick={onStartTest}
          className="w-full rounded-2xl bg-white text-gray-900 py-3.5 text-[15px] font-semibold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all duration-150"
        >
          나도 테스트 해보기
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <p className="text-center text-[11px] text-white/25 leading-relaxed px-4 pb-2">
        20문항으로 나의 보드게임 성향을 확인해보세요
      </p>
    </motion.div>
  );
}
