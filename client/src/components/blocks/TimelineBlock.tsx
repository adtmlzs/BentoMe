'use client';

import { motion } from 'framer-motion';
import type { TimelineBlockContent } from '@/types';

interface TimelineBlockProps {
  content: TimelineBlockContent;
}

export function TimelineBlock({ content }: TimelineBlockProps) {
  const items = content.items || [];

  return (
    <div 
      className="w-full h-full relative" 
      style={{ 
        maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', 
        WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' 
      }}
    >
      <div className="w-full h-full max-h-[100%] overflow-y-auto px-6 py-8 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
      <div className="relative border-l border-white/10 ml-3">
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
            <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-white/20 border-2 border-white/40 group-hover:bg-white group-hover:border-white transition-colors duration-300 shadow-[0_0_10px_rgba(255,255,255,0)] group-hover:shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            
            {/* Year */}
            <div className="text-xs font-mono font-medium tracking-widest text-white/40 mb-1">
              {item.year}
            </div>
            
            {/* Title */}
            <div className="text-lg font-bold tracking-tight text-white/90 leading-snug mb-0.5">
              {item.title}
            </div>
            
            {/* Subtitle / Company */}
            <div className="text-sm font-medium text-white/60">
              {item.subtitle}
            </div>
            
            {/* Optional Type Badge */}
            <div className="mt-2 inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white/50">
              {item.type}
            </div>
          </motion.div>
        ))}
        {items.length === 0 && (
          <div className="text-sm text-white/40 italic ml-6">No timeline items added.</div>
        )}
      </div>
      </div>
    </div>
  );
}
