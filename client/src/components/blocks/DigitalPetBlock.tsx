'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import type { DigitalPetBlockContent } from '@/types';

interface DigitalPetBlockProps {
  content: DigitalPetBlockContent;
  isEditing?: boolean;
}

export function DigitalPetBlock({ content, isEditing }: DigitalPetBlockProps) {
  const params = useParams();
  const username = params?.username as string;
  const [clicks, setClicks] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);
  let heartCounter = 0;

  // Fetch initial clicks if viewing a profile
  useEffect(() => {
    if (isEditing || !username) return;

    async function fetchClicks() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('profiles')
        .select('pet_clicks')
        .eq('username', username)
        .single() as any;

      if (!error && data) {
        setClicks(data.pet_clicks || 0);
      }
    }

    void fetchClicks();
  }, [username, isEditing]);

  const handleClick = async () => {
    // Prevent spam jumping animation
    if (isJumping) return;

    // Optimistic UI
    setClicks((c) => c + 1);
    setIsJumping(true);
    
    // Add floating heart
    setHearts((prev) => [...prev, { id: Date.now(), x: (Math.random() - 0.5) * 40 }]);
    setTimeout(() => setIsJumping(false), 400);

    // If viewing public profile, trigger RPC
    if (!isEditing && username) {
      const supabase = createClient();
      try {
        await (supabase as any).rpc('increment_pet_clicks', { target_username: username });
      } catch (err) {}
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-full gap-4 cursor-pointer select-none relative overflow-hidden px-4 py-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Pet Character (CSS Pixel Art Ghost) */}
      <motion.div
        animate={isJumping ? { y: -15, scale: 1.1 } : { y: isHovered ? -5 : 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className="relative origin-bottom"
      >
        {/* Simple SVG Pixel Ghost */}
        <svg
          width="64"
          height="64"
          viewBox="0 0 16 16"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))' }}
        >
          <path d="M4 1h8v1h1v1h1v8h-1v1h-1v1h-1v-1h-1v1h-2v-1h-1v1h-2v-1h-1v-1h-1v-8h1v-1h1v-1z" />
          
          {/* Eyes: change based on hover/jump */}
          {isJumping ? (
            // Happy eyes ^ ^
            <>
              <path fill="#0F0F0F" d="M4 6h1v1h-1zM6 6h1v1h-1z" />
              <path fill="#0F0F0F" d="M5 5h1v1h-1z" />
              
              <path fill="#0F0F0F" d="M9 6h1v1h-1zM11 6h1v1h-1z" />
              <path fill="#0F0F0F" d="M10 5h1v1h-1z" />
            </>
          ) : isHovered ? (
            // Open eyes O O
            <>
              <rect x="4" y="5" width="2" height="3" fill="#0F0F0F" />
              <rect x="10" y="5" width="2" height="3" fill="#0F0F0F" />
            </>
          ) : (
            // Sleepy eyes - -
            <>
              <rect x="4" y="6" width="2" height="1" fill="#0F0F0F" />
              <rect x="10" y="6" width="2" height="1" fill="#0F0F0F" />
            </>
          )}

          {/* Blush */}
          {(isHovered || isJumping) && (
            <>
              <rect x="3" y="8" width="1" height="1" fill="#FF8BA7" />
              <rect x="12" y="8" width="1" height="1" fill="#FF8BA7" />
            </>
          )}
        </svg>

        {/* Floating Hearts Array */}
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ opacity: 1, y: 0, x: heart.x, scale: 0.5 }}
              animate={{ opacity: 0, y: -60, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              onAnimationComplete={() => setHearts((h) => h.filter((v) => v.id !== heart.id))}
              className="absolute top-0 left-1/2 text-rose-500 pointer-events-none text-xl z-10"
              style={{ marginLeft: '-10px' }}
            >
              ❤️
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Pet Stats */}
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">
          {content.petName || 'Digital Pet'}
        </span>
        <div className="flex items-center gap-1.5 mt-1 bg-white/10 px-3 py-1 rounded-full border border-white/10">
          <span className="text-xs">✨</span>
          <span className="text-xs font-bold text-white tabular-nums tracking-wider">
            {clicks}
          </span>
        </div>
      </div>
    </div>
  );
}
