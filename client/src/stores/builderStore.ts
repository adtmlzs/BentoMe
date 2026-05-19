import type {
  Block,
  BlockType,
  BlockContentMap,
  BlockStyle,
  GridConfig,
  ThemeConfig,
  ProfileMeta,
  GridPosition,
} from '@bentobox/shared';
import { DEFAULT_BLOCK_STYLE, DEFAULT_GRID_CONFIG, DEFAULT_THEME_CONFIG } from '@bentobox/shared';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';

// ─── Builder State ─────────────────────────────────────────────────

interface BuilderState {
  // Data
  blocks: Block[];
  grid: GridConfig;
  theme: ThemeConfig;
  meta: ProfileMeta;
  displayName: string;
  bio: string;
  avatarUrl: string;

  // UI state
  selectedBlockId: string | null;
  isDragging: boolean;
  isDirty: boolean;
  isSaving: boolean;
  isPublished: boolean;

  // Actions
  addBlock: <T extends BlockType>(type: T, content: BlockContentMap[T], position?: GridPosition) => void;
  removeBlock: (id: string) => void;
  updateBlockContent: <T extends BlockType>(id: string, content: Partial<BlockContentMap[T]>) => void;
  updateBlockStyle: (id: string, style: Partial<BlockStyle>) => void;
  updateBlockPosition: (id: string, position: GridPosition) => void;
  toggleBlockVisibility: (id: string) => void;
  reorderBlocks: (activeId: string, overId: string) => void;
  selectBlock: (id: string | null) => void;
  setIsDragging: (isDragging: boolean) => void;

  // Grid & Theme
  updateGrid: (grid: Partial<GridConfig>) => void;
  updateTheme: (theme: Partial<ThemeConfig>) => void;
  updateMeta: (meta: Partial<ProfileMeta>) => void;
  updateProfile: (updates: { displayName?: string; bio?: string; avatarUrl?: string }) => void;

  // Persistence
  setBlocks: (blocks: Block[]) => void;
  loadProfile: (data: {
    blocks: Block[];
    grid: GridConfig;
    theme: ThemeConfig;
    meta: ProfileMeta;
    displayName: string;
    bio?: string;
    avatarUrl?: string;
    isPublished: boolean;
  }) => void;
  markSaved: () => void;
  setIsSaving: (isSaving: boolean) => void;
  setIsPublished: (isPublished: boolean) => void;
}

// ─── Helpers ───────────────────────────────────────────────────────

function findNextPosition(blocks: Block[], columns: number): GridPosition {
  if (blocks.length === 0) return { x: 0, y: 0, w: 2, h: 2 };

  const maxY = Math.max(...blocks.map((b) => b.position.y + b.position.h));
  const lastRowBlocks = blocks.filter((b) => b.position.y + b.position.h === maxY);
  const maxX = Math.max(...lastRowBlocks.map((b) => b.position.x + b.position.w));

  if (maxX + 2 <= columns) {
    return { x: maxX, y: maxY - 2, w: 2, h: 2 };
  }

  return { x: 0, y: maxY, w: 2, h: 2 };
}

// ─── Store ─────────────────────────────────────────────────────────

export const useBuilderStore = create<BuilderState>()(
  immer((set, get) => ({
    // Initial data
    blocks: [],
    grid: { ...DEFAULT_GRID_CONFIG },
    theme: { ...DEFAULT_THEME_CONFIG },
    meta: {},
    displayName: '',
    bio: '',
    avatarUrl: '',

    // UI state
    selectedBlockId: null,
    isDragging: false,
    isDirty: false,
    isSaving: false,
    isPublished: false,

    // ─── Block Actions ───────────────────────────────────────────

    addBlock: (type, content, position) => {
      set((state) => {
        const now = new Date().toISOString();
        const newBlock: Block = {
          id: uuidv4(),
          type,
          position: position ?? findNextPosition(state.blocks, state.grid.columns),
          content: content as Block['content'],
          style: { ...DEFAULT_BLOCK_STYLE },
          isVisible: true,
          createdAt: now,
          updatedAt: now,
        };
        state.blocks.push(newBlock);
        state.selectedBlockId = newBlock.id;
        state.isDirty = true;
      });
    },

    removeBlock: (id) => {
      set((state) => {
        state.blocks = state.blocks.filter((b) => b.id !== id);
        if (state.selectedBlockId === id) {
          state.selectedBlockId = null;
        }
        state.isDirty = true;
      });
    },

    updateBlockContent: (id, content) => {
      set((state) => {
        const block = state.blocks.find((b) => b.id === id);
        if (block) {
          block.content = { ...block.content, ...content } as Block['content'];
          block.updatedAt = new Date().toISOString();
          state.isDirty = true;
        }
      });
    },

    updateBlockStyle: (id, style) => {
      set((state) => {
        const block = state.blocks.find((b) => b.id === id);
        if (block) {
          block.style = { ...block.style, ...style };
          block.updatedAt = new Date().toISOString();
          state.isDirty = true;
        }
      });
    },

    updateBlockPosition: (id, position) => {
      set((state) => {
        const block = state.blocks.find((b) => b.id === id);
        if (block) {
          block.position = position;
          block.updatedAt = new Date().toISOString();
          state.isDirty = true;
        }
      });
    },

    toggleBlockVisibility: (id) => {
      set((state) => {
        const block = state.blocks.find((b) => b.id === id);
        if (block) {
          block.isVisible = !block.isVisible;
          state.isDirty = true;
        }
      });
    },

    reorderBlocks: (activeId, overId) => {
      set((state) => {
        const activeIndex = state.blocks.findIndex((b) => b.id === activeId);
        const overIndex = state.blocks.findIndex((b) => b.id === overId);
        if (activeIndex !== -1 && overIndex !== -1) {
          const [moved] = state.blocks.splice(activeIndex, 1);
          if (moved) {
            state.blocks.splice(overIndex, 0, moved);
          }
          state.isDirty = true;
        }
      });
    },

    selectBlock: (id) => {
      set((state) => {
        state.selectedBlockId = id;
      });
    },

    setIsDragging: (isDragging) => {
      set((state) => {
        state.isDragging = isDragging;
      });
    },

    // ─── Grid & Theme ────────────────────────────────────────────

    updateGrid: (grid) => {
      set((state) => {
        state.grid = { ...state.grid, ...grid };
        state.isDirty = true;
      });
    },

    updateTheme: (theme) => {
      set((state) => {
        state.theme = { ...state.theme, ...theme };
        state.isDirty = true;
      });
    },

    updateMeta: (meta) => {
      set((state) => {
        state.meta = { ...state.meta, ...meta };
        state.isDirty = true;
      });
    },

    updateProfile: (updates) => {
      set((state) => {
        if (updates.displayName !== undefined) state.displayName = updates.displayName;
        if (updates.bio !== undefined) state.bio = updates.bio;
        if (updates.avatarUrl !== undefined) state.avatarUrl = updates.avatarUrl;
        state.isDirty = true;
      });
    },

    // ─── Persistence ─────────────────────────────────────────────

    setBlocks: (blocks) => {
      set((state) => {
        state.blocks = blocks;
      });
    },

    loadProfile: (data) => {
      set((state) => {
        state.blocks = data.blocks;
        state.grid = data.grid;
        state.theme = data.theme;
        state.meta = data.meta;
        state.displayName = data.displayName;
        state.bio = data.bio ?? '';
        state.avatarUrl = data.avatarUrl ?? '';
        state.isPublished = data.isPublished;
        state.isDirty = false;
        state.selectedBlockId = null;
      });
    },

    markSaved: () => {
      set((state) => {
        state.isDirty = false;
        state.isSaving = false;
      });
    },

    setIsSaving: (isSaving) => {
      set((state) => {
        state.isSaving = isSaving;
      });
    },

    setIsPublished: (isPublished) => {
      set((state) => {
        state.isPublished = isPublished;
      });
    },
  })),
);
