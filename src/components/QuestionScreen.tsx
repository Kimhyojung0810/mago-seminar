import { useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { ProgressBar } from './ProgressBar';
import { SCALE_OPTIONS } from '../data/questions';
import type { Question } from '../types';

interface Props {
  question: Question;
  currentStep: number;
  totalQuestions: number;
  currentAnswer: number | undefined;
  onAnswer: (questionId: number, value: number) => void;
  onNext: () => void;
  onPrev: () => void;
  canGoBack: boolean;
}

const pageTransition = { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] };
const questionTransition = { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] };

export function QuestionScreen({
  question,
  currentStep,
  totalQuestions,
  currentAnswer,
  onAnswer,
  onNext,
  onPrev,
  canGoBack,
}: Props) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleSelect = useCallback(
    (value: number) => {
      onAnswer(question.id, value);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (currentStep < totalQuestions - 1) {
        timerRef.current = setTimeout(onNext, 350);
      }
    },
    [question.id, onAnswer, onNext, currentStep, totalQuestions],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [question.id]);

  const isScenario = question.type === 'scenario';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={pageTransition}
      className="space-y-4"
    >
      {canGoBack && (
        <button
          onClick={onPrev}
          className="flex items-center gap-0.5 text-sm text-white/40 active:text-white/70 transition-colors -ml-1 py-1"
          aria-label="이전 문항으로"
        >
          <ChevronLeft className="h-4 w-4" />
          이전
        </button>
      )}

      <GlassCard className="p-5">
        <div className="space-y-6">
          <ProgressBar current={currentStep + 1} total={totalQuestions} />

          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={questionTransition}
              className="space-y-6"
            >
              {/* question header */}
              <div className="space-y-2 pt-1">
                {isScenario ? (
                  <span className="inline-block text-[11px] font-medium text-amber-400/60 bg-amber-400/[0.08] rounded-md px-1.5 py-0.5">
                    상황
                  </span>
                ) : (
                  <span className="text-[11px] text-white/30 font-medium">
                    Q{currentStep + 1}
                  </span>
                )}
                <h2 className="text-xl font-semibold leading-snug tracking-tight">
                  {question.text}
                </h2>
              </div>

              {/* answer options */}
              {isScenario ? (
                <div
                  className="space-y-2"
                  role="radiogroup"
                  aria-label={`상황 ${question.id}`}
                >
                  {question.options.map((opt, idx) => {
                    const active = currentAnswer === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        role="radio"
                        aria-checked={active}
                        className={`w-full rounded-2xl border px-4 py-3.5 text-left text-[14px] leading-relaxed transition-all duration-150 active:scale-[0.98] ${
                          active
                            ? 'bg-white/[0.14] border-white/40 text-white'
                            : 'bg-white/[0.04] border-white/[0.08] text-white/60'
                        }`}
                      >
                        {opt.text}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div
                  className="space-y-3"
                  role="radiogroup"
                  aria-label={`문항 ${question.id}`}
                >
                  <div className="grid grid-cols-5 gap-2">
                    {SCALE_OPTIONS.map((opt) => {
                      const active = currentAnswer === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleSelect(opt.value)}
                          role="radio"
                          aria-checked={active}
                          aria-label={`${opt.value}점 - ${opt.label}`}
                          className={`py-3.5 rounded-xl text-center text-base font-semibold transition-all duration-150 active:scale-95 ${
                            active
                              ? 'bg-white text-gray-900 shadow-lg shadow-white/15'
                              : 'bg-white/[0.06] text-white/60 border border-white/[0.08]'
                          }`}
                        >
                          {opt.value}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex justify-between text-[11px] text-white/30 px-1">
                    <span>전혀 아니다</span>
                    <span>매우 그렇다</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </GlassCard>
    </motion.div>
  );
}
