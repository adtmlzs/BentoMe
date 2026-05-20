import type { Block } from '@/types';

export function autoOrganizeGrid(blocks: Block[], columns: number): Block[] {
  // 1. Clone and clamp blocks
  const clampedBlocks = blocks.map((b) => ({
    ...b,
    position: {
      ...b.position,
      w: Math.min(b.position.w, columns),
    },
  }));

  // 1.5. Shuffle randomly first to break ties and ensure completely unique patterns on every click
  clampedBlocks.sort(() => Math.random() - 0.5);

  // 2. Sort by area descending (largest first) with a slight randomization factor
  // This allows blocks of similar sizes to swap order, giving the magic wand immense variety!
  clampedBlocks.sort((a, b) => {
    const areaA = (a.position.w * a.position.h) + (Math.random() * 1.5);
    const areaB = (b.position.w * b.position.h) + (Math.random() * 1.5);
    return areaB - areaA; // Descending
  });

  // 3. 2D grid matrix to track occupied cells
  const occupied: boolean[][] = Array.from({ length: 100 }, () => Array(columns).fill(false));
  
  // Ensure we can grow grid infinitely down
  const isOccupied = (x: number, y: number) => {
    while (occupied.length <= y) {
      occupied.push(Array(columns).fill(false));
    }
    return occupied[y][x];
  };

  const markOccupied = (x: number, y: number, w: number, h: number) => {
    for (let dy = 0; dy < h; dy++) {
      while (occupied.length <= y + dy) {
        occupied.push(Array(columns).fill(false));
      }
      for (let dx = 0; dx < w; dx++) {
        occupied[y + dy][x + dx] = true;
      }
    }
  };

  // 4. Place each block
  const placedBlocks = clampedBlocks.map((block) => {
    const { w, h } = block.position;
    
    // Find first available spot reading top-to-bottom, left-to-right
    let foundX = 0;
    let foundY = 0;
    let found = false;

    let searchY = 0;
    while (!found) {
      for (let searchX = 0; searchX <= columns - w; searchX++) {
        let fits = true;
        
        // Check if region is clear
        for (let dy = 0; dy < h; dy++) {
          for (let dx = 0; dx < w; dx++) {
            if (isOccupied(searchX + dx, searchY + dy)) {
              fits = false;
              break;
            }
          }
          if (!fits) break;
        }

        if (fits) {
          foundX = searchX;
          foundY = searchY;
          found = true;
          break;
        }
      }
      searchY++;
    }

    markOccupied(foundX, foundY, w, h);
    
    return {
      ...block,
      position: {
        ...block.position,
        x: foundX,
        y: foundY,
      },
    };
  });

  // 5. Sort the final array by y, then x so CSS grid auto-flow matches the algorithm output
  placedBlocks.sort((a, b) => {
    if (a.position.y === b.position.y) {
      return a.position.x - b.position.x;
    }
    return a.position.y - b.position.y;
  });

  return placedBlocks;
}
