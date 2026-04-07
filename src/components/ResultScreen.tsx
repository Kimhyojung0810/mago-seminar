import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Share2, RotateCcw } from 'lucide-react';
import { ResultCard } from './ResultCard';
import { captureCard, downloadImage, shareOrDownload } from '../utils/capture';
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

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const filename = `mago-seminar-${nickname || 'result'}.png`;

  const handleSave = useCallback(async () => {
    if (busy !== 'idle') return;
    setBusy('saving');
    try {
      const blob = await captureCard('result-card');
      if (blob) {
        await downloadImage(blob, filename);
        flash('이미지가 저장되었습니다');
      } else {
        flash('이미지 생성에 실패했습니다');
      }
    } catch {
      flash('저장에 실패했습니다');
    } finally {
      setBusy('idle');
    }
  }, [busy, filename]);

  const handleShare = useCallback(async () => {
    if (busy !== 'idle') return;
    setBusy('sharing');
    try {
      const blob = await captureCard('result-card');
      if (!blob) {
        flash('이미지 생성에 실패했습니다');
        setBusy('idle');
        return;
      }
      const outcome = await shareOrDownload(
        blob,
        filename,
        '마고의 세미나: 심리편',
        `${nickname}님의 보드게임 성향 결과`,
      );
      if (outcome === 'downloaded') flash('공유가 지원되지 않아 저장되었습니다');
      else if (outcome === 'error') flash('공유에 실패했습니다');
    } catch {
      flash('공유에 실패했습니다');
    } finally {
      setBusy('idle');
    }
  }, [busy, filename, nickname]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={pageTransition}
      className="space-y-4"
    >
      <ResultCard nickname={nickname} resultKey={resultKey} scores={scores} />

      {/* actions */}
      <div className="space-y-2.5 px-0.5">
        <button
          onClick={handleShare}
          disabled={busy !== 'idle'}
          className="w-full rounded-2xl bg-white text-gray-900 py-3.5 text-[15px] font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none"
          aria-label="결과 공유하기"
        >
          <Share2 className="h-4 w-4" />
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
