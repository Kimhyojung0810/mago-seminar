import { motion } from 'framer-motion';

interface Props {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: Props) {
  const pct = (current / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-white/45 tabular-nums">
          {current} / {total}
        </span>
        <span className="text-white/45 tabular-nums">{Math.round(pct)}%</span>
      </div>
      <div className="h-[5px] rounded-full bg-white/[0.08] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-white/70"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
}
