'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Block } from '@/types';

export function useResponsiveGrid(blocks: Block[]) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is defined (browser environment)
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    // Initial check
    setIsMobile(mediaQuery.matches);

    // Listener
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    
    // Modern browsers use addEventListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);

  const responsiveBlocks = useMemo(() => {
    if (!isMobile) return blocks;
    
    // Clamp block width to a maximum of 2 on mobile devices
    // This allows blocks to resize automatically without changing their stored desktop values
    return blocks.map((block) => {
      if (block.position.w > 2) {
        return {
          ...block,
          position: {
            ...block.position,
            w: 2,
          },
        };
      }
      return block;
    });
  }, [blocks, isMobile]);

  return { responsiveBlocks, isMobile };
}
