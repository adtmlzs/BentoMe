'use client';

import { useEffect } from 'react';
import { useBuilderStore } from '@/stores/builderStore';
import { BlockWrapper } from './BlockWrapper';
import { BlockRenderer } from '../blocks/BlockRenderer';
import { ParticleBackground } from '../effects/ParticleBackground';
import { CanvasBackground } from '../effects/CanvasBackground';
import { getCursorClass } from '@/lib/cursorStyles';
import { useResponsiveGrid } from '@/hooks/useResponsiveGrid';

export function BuilderCanvas() {
  const blocks = useBuilderStore((s) => s.blocks);
  const grid = useBuilderStore((s) => s.grid);
  const theme = useBuilderStore((s) => s.theme);
  const selectBlock = useBuilderStore((s) => s.selectBlock);

  const { responsiveBlocks, isMobile } = useResponsiveGrid(blocks);
  const activeColumns = isMobile ? 2 : grid.columns;

  // ─── ESC to deselect ─────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        selectBlock(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectBlock]);

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${activeColumns}, 1fr)`,
    gridAutoRows: `${grid.rowHeight}px`,
    gridAutoFlow: 'row dense',
    gap: `${grid.gap}px`,
    maxWidth: `${grid.maxWidth}px`,
    margin: '0 auto',
    padding: '24px',
    minHeight: '60vh',
  };

  return (
    <div
      className={`flex-1 overflow-y-auto relative ${getCursorClass(theme.cursorStyle)}`}
      style={{ backgroundColor: theme.backgroundColor }}
      onClick={() => selectBlock(null)}
    >
      {/* Particle Background (builder preview) */}
      {theme.particleEffect && theme.particleEffect !== 'none' && (
        <ParticleBackground effect={theme.particleEffect} />
      )}

      {/* WebGL / Canvas Background (builder preview) */}
      {theme.canvasMode && theme.canvasMode !== 'none' && (
        <CanvasBackground mode={theme.canvasMode} />
      )}

      <div style={gridStyle} className="relative z-10">
        {responsiveBlocks.map((block) => (
          <BlockWrapper key={block.id} block={block}>
            <BlockRenderer block={block} isEditing theme={theme} />
          </BlockWrapper>
        ))}

        {responsiveBlocks.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-32 text-white/30">
            <div className="text-6xl mb-4">🍱</div>
            <h3 className="text-xl font-semibold mb-2">Your Bento is empty</h3>
            <p className="text-sm">Add blocks from the sidebar to start building your profile</p>
          </div>
        )}
      </div>
    </div>
  );
}
