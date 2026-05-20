'use client';

import { motion } from 'framer-motion';
import type { Block, ThemeConfig } from '@/types';

interface ProgressBarBlockProps {
  block: Block<'progressBar'>;
  isEditing?: boolean;
  theme?: ThemeConfig;
}

export function ProgressBarBlock({ block, theme }: ProgressBarBlockProps) {
  const { title, currentValue, targetValue } = block.content;
  const isLight = theme?.mode === 'light';

  const clampedCurrent = Math.max(0, currentValue);
  const clampedTarget = Math.max(1, targetValue); // avoid division by zero
  const percentage = Math.min(
    100,
    Math.round((clampedCurrent / clampedTarget) * 100),
  );

  return (
    <div className="flex flex-col justify-center w-full h-full gap-2 select-none">
      {/* Header row */}
      <div className="flex items-baseline justify-between gap-2">
        <p className={`${isLight ? 'text-zinc-900' : 'text-white'} text-sm font-medium truncate leading-snug`}>
          {title}
        </p>
        <span className={`text-[11px] font-semibold ${isLight ? 'text-violet-600' : 'text-violet-300/80'} tabular-nums flex-shrink-0`}>
          {percentage}%
        </span>
      </div>

      {/* Outer track */}
      <div className={`relative w-full h-3 rounded-full ${isLight ? 'bg-zinc-200/80' : 'bg-white/[0.06]'} overflow-hidden`}>
        {/* Inner fill — animated on viewport entry */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background:
              'linear-gradient(90deg, rgba(139,92,246,0.7) 0%, rgba(167,139,250,0.95) 100%)',
          }}
          initial={{ width: '0%' }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 1.1,
            ease: [0.4, 0, 0.2, 1],
            delay: 0.15,
          }}
        />

        {/* Subtle shimmer overlay */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
          }}
          initial={{ backgroundPosition: '-200% 0' }}
          whileInView={{ backgroundPosition: '200% 0' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 2,
            ease: 'linear',
            delay: 1,
          }}
        />
      </div>

      {/* Footer values */}
      <div className="flex items-center justify-between">
        <span className={`text-[10px] ${isLight ? 'text-zinc-500' : 'text-white/30'} tabular-nums`}>
          {clampedCurrent.toLocaleString()} / {clampedTarget.toLocaleString()}
        </span>
        {percentage >= 100 && (
          <span className={`text-[10px] font-medium ${isLight ? 'text-emerald-600' : 'text-emerald-400/80'}`}>
            ✓ Complete
          </span>
        )}
      </div>
    </div>
  );
}
