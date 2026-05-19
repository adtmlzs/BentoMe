'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Block } from '@bentobox/shared';
import { useBuilderStore } from '@/stores/builderStore';
import { getBlockStyles } from '@/lib/utils';

interface BlockWrapperProps {
  block: Block;
  children: React.ReactNode;
}

export function BlockWrapper({ block, children }: BlockWrapperProps) {
  const selectedBlockId = useBuilderStore((s) => s.selectedBlockId);
  const selectBlock = useBuilderStore((s) => s.selectBlock);
  const removeBlock = useBuilderStore((s) => s.removeBlock);
  const toggleBlockVisibility = useBuilderStore((s) => s.toggleBlockVisibility);

  const isSelected = selectedBlockId === block.id;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    gridColumn: `span ${block.position.w}`,
    gridRow: `span ${block.position.h}`,
    opacity: isDragging ? 0.5 : block.isVisible ? 1 : 0.4,
    zIndex: isDragging ? 50 : isSelected ? 10 : 1,
    ...getBlockStyles(block.style),
    position: 'relative',
    cursor: 'grab',
    overflow: 'hidden',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group transition-all duration-200 ${
        isSelected
          ? 'ring-2 ring-violet-500 ring-offset-2 ring-offset-transparent'
          : 'hover:ring-1 hover:ring-white/20'
      }`}
      onClick={(e) => {
        e.stopPropagation();
        selectBlock(block.id);
      }}
      {...attributes}
      {...listeners}
    >
      {/* Block content */}
      {children}

      {/* Hover overlay with actions */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleBlockVisibility(block.id);
          }}
          className="w-7 h-7 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all"
          title={block.isVisible ? 'Hide block' : 'Show block'}
        >
          {block.isVisible ? (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          )}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeBlock(block.id);
          }}
          className="w-7 h-7 rounded-lg bg-red-500/60 backdrop-blur-sm flex items-center justify-center text-white/90 hover:bg-red-500 transition-all"
          title="Delete block"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Drag handle indicator */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
