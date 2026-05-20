'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import type { AnimatedTextBlockContent } from '@/types';

interface AnimatedTextBlockProps {
  content: AnimatedTextBlockContent;
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

export function AnimatedTextBlock({ content }: AnimatedTextBlockProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[content.textAlign || 'center'];

  const sizeClass = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-3xl md:text-4xl',
  }[content.fontSize || 'md'];

  const weightClass = {
    normal: 'font-normal',
    medium: 'font-medium',
    bold: 'font-bold',
  }[content.fontWeight || 'normal'];

  const combinedClasses = `${alignClass} ${sizeClass} ${weightClass} font-mono w-full`;

  // 1. Glitch
  if (content.textAnimation === 'glitch') {
    return (
      <div 
        className={`${combinedClasses} glitch-text`}
        data-text={content.text}
        style={{ 
          '--glitch-color-1': content.glitchColor1 || '#ff0000',
          '--glitch-color-2': content.glitchColor2 || '#00ffff',
          fontFamily: content.fontFamily 
        } as React.CSSProperties}
      >
        {content.text}
      </div>
    );
  }

  // 2. Hacker Decode
  if (content.textAnimation === 'hackerDecode') {
    return <HackerText content={content} className={combinedClasses} />;
  }

  // 3. Typewriter
  if (content.textAnimation === 'typewriter') {
    return <TypewriterText content={content} className={combinedClasses} />;
  }

  // 4. Wave
  if (content.textAnimation === 'wave') {
    return <WaveText content={content} className={combinedClasses} />;
  }

  return (
    <div className={combinedClasses} style={{ fontFamily: content.fontFamily }}>
      {content.text}
    </div>
  );
}

// ─── Subcomponents for animations ─────────────────────────────────

function HackerText({ content, className }: { content: AnimatedTextBlockContent, className: string }) {
  const [text, setText] = useState(content.text);
  const intervalRef = useRef<number | null>(null);

  const startAnimation = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setText((prev) =>
        prev
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return content.text[index];
            }
            return LETTERS[Math.floor(Math.random() * LETTERS.length)];
          })
          .join("")
      );

      if (iteration >= content.text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      
      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    startAnimation();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [content.text]);

  return (
    <div 
      className={className} 
      style={{ fontFamily: content.fontFamily }}
      onMouseEnter={startAnimation}
    >
      {text}
    </div>
  );
}

function TypewriterText({ content, className }: { content: AnimatedTextBlockContent, className: string }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    const interval = setInterval(() => {
      index++;
      setDisplayedText(content.text.substring(0, index));
      if (index >= content.text.length) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [content.text]);

  return (
    <div className={className} style={{ fontFamily: content.fontFamily }}>
      <span>{displayedText}</span>
      <span className="inline-block w-2.5 h-full bg-current ml-1 typewriter-cursor align-middle">&nbsp;</span>
    </div>
  );
}

function WaveText({ content, className }: { content: AnimatedTextBlockContent, className: string }) {
  const words = content.text.split(' ');

  const container: import('framer-motion').Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child: import('framer-motion').Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={className}
      style={{ 
        fontFamily: content.fontFamily, 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: content.textAlign === 'left' ? 'flex-start' : content.textAlign === 'right' ? 'flex-end' : 'center', 
        gap: '0.25em' 
      }}
      variants={container}
      initial="hidden"
      animate="visible"
      key={content.text}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} style={{ display: 'inline-block' }}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
