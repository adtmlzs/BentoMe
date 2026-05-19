'use client';

import { useMemo } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { useBuilderStore } from '@/stores/builderStore';
import { BlockWrapper } from './BlockWrapper';
import { BlockRenderer } from '../blocks/BlockRenderer';

export function BuilderCanvas() {
  const blocks = useBuilderStore((s) => s.blocks);
  const grid = useBuilderStore((s) => s.grid);
  const theme = useBuilderStore((s) => s.theme);
  const reorderBlocks = useBuilderStore((s) => s.reorderBlocks);
  const setIsDragging = useBuilderStore((s) => s.setIsDragging);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor),
  );

  const blockIds = useMemo(() => blocks.map((b) => b.id), [blocks]);

  const handleDragStart = (_event: DragStartEvent) => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderBlocks(active.id as string, over.id as string);
    }
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
    gap: `${grid.gap}px`,
    maxWidth: `${grid.maxWidth}px`,
    margin: '0 auto',
    padding: '24px',
    minHeight: '60vh',
  };

  return (
    <div
      className="flex-1 overflow-y-auto"
      style={{ backgroundColor: theme.backgroundColor }}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={blockIds} strategy={rectSortingStrategy}>
          <div style={gridStyle}>
            {blocks.map((block) => (
              <BlockWrapper key={block.id} block={block}>
                <BlockRenderer block={block} isEditing />
              </BlockWrapper>
            ))}

            {blocks.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-32 text-white/30">
                <div className="text-6xl mb-4">🍱</div>
                <h3 className="text-xl font-semibold mb-2">Your Bento is empty</h3>
                <p className="text-sm">Add blocks from the sidebar to start building your profile</p>
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
