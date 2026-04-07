import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface Props {
  nickname: string;
  onNicknameChange: (v: string) => void;
  onStart: () => void;
}

const MAX_LEN = 12;

const transition = { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] };

export function IntroScreen({ nickname, onNicknameChange, onStart }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isValid = nickname.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onStart();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={transition}
      className="space-y-5"
    >
      <div className="px-1">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.06] px-3 py-1.5 text-[11px] text-white/55 backdrop-blur-xl">
          <Sparkles className="h-3 w-3" />
          마고의 세미나: 심리편
        </span>
      </div>

      <GlassCard className="p-6">
        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="space-y-2.5">
            <h1 className="text-[28px] font-bold tracking-tight leading-[1.25]">
              나는 왜 게임에서
              <br />
              진심이 될까?
            </h1>
            <p className="text-[15px] leading-relaxed text-white/50">
              보드게임 속 나의 승부 본능을 확인해보세요.
            </p>
          </div>

          <div className="flex gap-3 text-center text-[11px] text-white/45">
            {[
              { val: '12', label: '문항' },
              { val: '1분', label: '소요시간' },
              { val: '4', label: '유형' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex-1 rounded-2xl border border-white/[0.08] bg-white/[0.04] py-3"
              >
                <div className="text-lg font-semibold text-white/85">{item.val}</div>
                <div className="mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between px-0.5">
              <label htmlFor="nickname" className="text-[11px] text-white/40 font-medium">
                닉네임
              </label>
              <span className="text-[10px] text-white/25 tabular-nums">
                {nickname.length}/{MAX_LEN}
              </span>
            </div>
            <input
              ref={inputRef}
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => {
                if (e.target.value.length <= MAX_LEN) onNicknameChange(e.target.value);
              }}
              placeholder="닉네임을 입력해주세요"
              maxLength={MAX_LEN}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              enterKeyHint="go"
              className="w-full rounded-2xl border border-white/[0.1] bg-white/[0.05] px-4 py-3.5 text-base outline-none placeholder:text-white/25 focus:border-white/25 focus:bg-white/[0.08] transition-colors duration-200"
              aria-label="닉네임 입력"
            />
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="w-full rounded-2xl bg-white text-gray-900 py-3.5 text-[15px] font-semibold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all duration-150 disabled:opacity-30 disabled:pointer-events-none"
          >
            테스트 시작하기
            <ChevronRight className="h-4 w-4" />
          </button>
        </form>
      </GlassCard>
    </motion.div>
  );
}
