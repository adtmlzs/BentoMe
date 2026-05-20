'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';

interface LikeButtonProps {
  username: string;
  initialLikes: number;
}

export function LikeButton({ username, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [showHeartPop, setShowHeartPop] = useState(false);

  useEffect(() => {
    // Check local storage on mount
    const likedProfiles = JSON.parse(localStorage.getItem('liked_profiles') || '{}');
    if (likedProfiles[username]) {
      setHasLiked(true);
    }
  }, [username]);

  const handleLike = async () => {
    const supabase = createClient();
    const likedProfiles = JSON.parse(localStorage.getItem('liked_profiles') || '{}');

    if (hasLiked) {
      // Optimistic unlike
      setLikes((prev) => Math.max(0, prev - 1));
      setHasLiked(false);
      
      // Update local storage
      delete likedProfiles[username];
      localStorage.setItem('liked_profiles', JSON.stringify(likedProfiles));

      // Trigger RPC
      try {
        const { error } = await (supabase as any).rpc('decrement_profile_likes', { target_username: username });
        if (error) {
          console.error('RPC Error:', error);
          // Revert optimistic update on failure
          setLikes((prev) => prev + 1);
          setHasLiked(true);
          likedProfiles[username] = true;
          localStorage.setItem('liked_profiles', JSON.stringify(likedProfiles));
        }
      } catch (err) {
        console.error('Failed to record unlike', err);
      }
    } else {
      // Optimistic like
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      setShowHeartPop(true);

      // Update local storage
      likedProfiles[username] = true;
      localStorage.setItem('liked_profiles', JSON.stringify(likedProfiles));

      // Hide animation after a bit
      setTimeout(() => setShowHeartPop(false), 1000);

      // Trigger RPC
      try {
        const { error } = await (supabase as any).rpc('increment_profile_likes', { target_username: username });
        if (error) {
          console.error('RPC Error:', error);
          // Revert optimistic update on failure
          setLikes((prev) => Math.max(0, prev - 1));
          setHasLiked(false);
          delete likedProfiles[username];
          localStorage.setItem('liked_profiles', JSON.stringify(likedProfiles));
        }
      } catch (err) {
        console.error('Failed to record like', err);
      }
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <motion.button
        onClick={handleLike}
        className={`relative flex items-center justify-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl border shadow-xl transition-colors cursor-pointer ${
          hasLiked
            ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
            : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20'
        }`}
        whileHover={{ scale: hasLiked ? 1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          className={`w-5 h-5 ${hasLiked ? 'fill-current' : 'fill-none stroke-current'}`}
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <span className="text-sm font-bold tabular-nums tracking-wider">{likes}</span>

        {/* Floating Hearts Animation */}
        <AnimatePresence>
          {showHeartPop && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 1, y: 0, x: 0, scale: 0.5 }}
                  animate={{
                    opacity: 0,
                    y: -50 - Math.random() * 50,
                    x: (Math.random() - 0.5) * 60,
                    scale: 1.5,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="absolute text-rose-500 text-xl pointer-events-none"
                  style={{ left: '50%', top: '50%', x: '-50%', y: '-50%' }}
                >
                  ❤️
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
