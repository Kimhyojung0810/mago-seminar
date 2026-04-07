import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, RotateCcw, Link2 } from 'lucide-react';
import { ResultCard } from './ResultCard';
import { GlassCard } from './GlassCard';
import { captureCard, downloadImage } from '../utils/capture';
import { buildShareURL, copyToClipboard } from '../utils/sharing';
import {
  MAX_SCORE_PER_AXIS,
  getScoreLevel,
  getBalanceInsight,
  getSeminarReport,
} from '../utils/scoring';
import { resultTypes } from '../data/resultTypes';
import type { ResultType, Scores } from '../types';

interface Props {
  nickname: string;
  resultKey: ResultType;
  scores: Scores;
  onReset: () => void;
}

type BusyState = 'idle' | 'saving' | 'sharing';

const pageTransition = { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] };

export function ResultScreen({ nickname, resultKey, scores, onReset }: Props) {
  const [busy, setBusy] = useState<BusyState>('idle');
  const [toast, setToast] = useState<string | null>(null);
  const r = resultTypes[resultKey];

  const flash = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const filename = `mago-seminar-${nickname || 'result'}.png`;

  const axes = [
    { label: '승부욕', value: scores.A },
    { label: '협력', value: scores.B },
    { label: '조절', value: scores.C },
  ];

  const handleShare = useCallback(async () => {
    if (busy !== 'idle') return;
    setBusy('sharing');
    try {
      const url = buildShareURL(nickname, resultKey, scores);
      const text = `${nickname}님의 보드게임 성향: ${r.title}`;

      if (navigator.share) {
        try {
          await navigator.share({
            title: '나는 왜 게임에서 진심이 될까?',
            text,
            url,
          });
          setBusy('idle');
          return;
        } catch (e) {
          if (e instanceof Error && e.name === 'AbortError') {
            setBusy('idle');
            return;
          }
        }
      }
      const ok = await copyToClipboard(url);
      flash(ok ? '링크가 복사되었습니다' : '공유에 실패했습니다');
    } catch {
      flash('공유에 실패했습니다');
    } finally {
      setBusy('idle');
    }
  }, [busy, nickname, resultKey, scores, r.title, flash]);

  const handleSave = useCallback(async () => {
    if (busy !== 'idle') return;
    setBusy('saving');
    try {
      const blob = await captureCard('result-card');
      if (!blob) {
        flash('이미지 생성에 실패했습니다');
        setBusy('idle');
        return;
      }
      const ok = await downloadImage(blob, filename);
      if (ok) flash('이미지가 저장되었습니다');
      else flash('저장에 실패했습니다');
    } catch {
      flash('저장에 실패했습니다');
    } finally {
      setBusy('idle');
    }
  }, [busy, filename, flash]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={pageTransition}
      className="space-y-3"
    >
      {/* capturable visual card */}
      <ResultCard nickname={nickname} resultKey={resultKey} />

      {/* detailed analysis */}
      <GlassCard className="p-5 space-y-5">
        {/* score bars with level labels */}
        <div className="space-y-3">
          <span className="text-[11px] text-white/35 font-medium">성향 분석</span>
          {axes.map((a) => {
            const level = getScoreLevel(a.value);
            const pct = Math.min((a.value / MAX_SCORE_PER_AXIS) * 100, 100);
            return (
              <div key={a.label} className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-white/55">{a.label}</span>
                  <span className="flex items-center gap-2">
                    <span className="text-white/45 text-[10px]">{level}</span>
                    <span className="text-white/30 tabular-nums">{a.value}점</span>
                  </span>
                </div>
                <div className="h-[5px] rounded-full bg-white/[0.08] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-white/55"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* balance insight */}
        <InfoBlock title="성향 밸런스">{getBalanceInsight(scores)}</InfoBlock>

        {/* seminar report */}
        <InfoBlock title="세미나 한 줄 리포트">{getSeminarReport(scores)}</InfoBlock>

        {/* key points */}
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
      </GlassCard>

      {/* actions */}
      <div className="space-y-2.5 px-0.5">
        <button
          onClick={handleShare}
          disabled={busy !== 'idle'}
          className="w-full rounded-2xl bg-white text-gray-900 py-3.5 text-[15px] font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none"
          aria-label="결과 공유하기"
        >
          <Link2 className="h-4 w-4" />
          {busy === 'sharing' ? '준비 중...' : '결과 공유하기'}
        </button>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={handleSave}
            disabled={busy !== 'idle'}
            className="rounded-2xl border border-white/[0.12] bg-white/[0.07] py-3.5 text-[14px] font-medium flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none"
            aria-label="이미지 저장"
          >
            <Download className="h-4 w-4 text-white/60" />
            {busy === 'saving' ? '저장 중...' : '이미지 저장'}
          </button>

          <button
            onClick={onReset}
            className="rounded-2xl border border-white/[0.12] bg-white/[0.07] py-3.5 text-[14px] font-medium flex items-center justify-center gap-1.5 text-white/60 active:scale-[0.98] transition-all duration-150"
            aria-label="다시 하기"
          >
            <RotateCcw className="h-4 w-4" />
            다시 하기
          </button>
        </div>
      </div>

      <p className="text-center text-[11px] text-white/30 leading-relaxed px-4 pb-2">
        우리는 모두 승부욕을 가지고 있지만,
        <br />
        그걸 어떻게 드러내느냐는 다릅니다.
      </p>

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-sm text-gray-900 text-[13px] font-medium px-5 py-2.5 rounded-full shadow-xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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
