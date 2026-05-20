'use client';

import { motion } from 'framer-motion';
import type { TimelineBlockContent, ThemeConfig } from '@/types';

interface TimelineBlockProps {
  content: TimelineBlockContent;
  theme?: ThemeConfig;
}

export function TimelineBlock({ content, theme }: TimelineBlockProps) {
  const items = content.items || [];
  const isLight = theme?.mode === 'light';

  return (
    <div 
      className="w-full h-full relative" 
      style={{ 
        maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', 
        WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' 
      }}
    >
      <div className={`w-full h-full max-h-[100%] overflow-y-auto px-6 py-8 scrollbar-thin ${isLight ? 'scrollbar-thumb-black/20' : 'scrollbar-thumb-white/20'} scrollbar-track-transparent`}>
      <div className={`relative border-l ${isLight ? 'border-zinc-200' : 'border-white/10'} ml-3`}>
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-8 ml-6 relative group"
          >
            {/* Timeline Dot */}
            <div className={`absolute -left-[31px] top-1.5 w-3 h-3 rounded-full ${
              isLight 
                ? 'bg-zinc-200 border-2 border-zinc-400 group-hover:bg-zinc-800 group-hover:border-zinc-800' 
                : 'bg-white/20 border-2 border-white/40 group-hover:bg-white group-hover:border-white'
            } transition-colors duration-300 shadow-[0_0_10px_rgba(255,255,255,0)] group-hover:shadow-[0_0_10px_rgba(255,255,255,0.5)]`} />
            
            {/* Year */}
            <div className={`text-xs font-mono font-medium tracking-widest ${isLight ? 'text-zinc-500' : 'text-white/40'} mb-1`}>
              {item.year}
            </div>
            
            {/* Title */}
            <div className={`text-lg font-bold tracking-tight ${isLight ? 'text-zinc-900' : 'text-white/90'} leading-snug mb-0.5`}>
              {item.title}
            </div>
            
            {/* Subtitle / Company */}
            <div className={`text-sm font-medium ${isLight ? 'text-zinc-600' : 'text-white/60'}`}>
              {item.subtitle}
            </div>
            
            {/* Optional Type Badge */}
            {item.type && (
              <div className={`mt-2 inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${isLight ? 'bg-zinc-100 text-zinc-600' : 'bg-white/10 text-white/50'}`}>
                {item.type}
              </div>
            )}
          </motion.div>
        ))}
        {items.length === 0 && (
          <div className={`text-sm ${isLight ? 'text-zinc-400' : 'text-white/40'} italic ml-6`}>No timeline items added.</div>
        )}
      </div>
      </div>
    </div>
  );
}
