'use client';

import type { Block, GridConfig, ThemeConfig } from '@bentobox/shared';
import { motion } from 'framer-motion';
import { BlockRenderer } from '../blocks/BlockRenderer';
import { getBlockStyles, getAnimationClass } from '@/lib/utils';

interface ProfileGridProps {
  blocks: Block[];
  grid: GridConfig;
  theme: ThemeConfig;
}

export function ProfileGrid({ blocks, grid, theme }: ProfileGridProps) {
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
    gap: `${grid.gap}px`,
    maxWidth: `${grid.maxWidth}px`,
    margin: '0 auto',
    padding: '24px',
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: theme.backgroundColor,
        fontFamily: theme.fontFamily,
      }}
    >
      <div style={gridStyle}>
        {blocks.map((block, index) => (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.06,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={getAnimationClass(block.style.animation)}
            style={{
              gridColumn: `span ${block.position.w}`,
              gridRow: `span ${block.position.h}`,
              ...getBlockStyles(block.style),
            }}
          >
            <BlockRenderer block={block} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
