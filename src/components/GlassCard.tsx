import type { ReactNode, CSSProperties } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
}

export function GlassCard({ children, className = '', id, style }: Props) {
  return (
    <div
      id={id}
      style={style}
      className={`backdrop-blur-2xl bg-white/[0.07] border border-white/[0.12] shadow-2xl shadow-black/25 rounded-[24px] ${className}`}
    >
      {children}
    </div>
  );
}
