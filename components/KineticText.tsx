import React from 'react';
import { motion, Variants } from 'framer-motion';
import { AnimationTheme } from '../types';

interface KineticTextProps {
  text: string;
  theme: AnimationTheme;
  className?: string;
  delay?: number;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
  }),
};

const driftVariants: Variants = {
  hidden: { opacity: 0, y: 20, x: -10, rotate: -2 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    rotate: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 15, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
};

const shimmerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
};

const typewriterVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.01 },
  },
};

const getChildVariant = (theme: AnimationTheme): Variants => {
  switch (theme) {
    case AnimationTheme.DRIFT:
      return driftVariants;
    case AnimationTheme.FADE_UP:
      return fadeUpVariants;
    case AnimationTheme.SHIMMER:
      return shimmerVariants; // We add a secondary animation in the component for actual shimmer
    case AnimationTheme.TYPEWRITER:
      return typewriterVariants;
    default:
      return fadeUpVariants;
  }
};

const KineticText: React.FC<KineticTextProps> = ({ text, theme, className = "", delay = 0 }) => {
  // Split text into words, then characters to allow wrapping
  const words = text.split(" ");
  const childVariant = getChildVariant(theme);

  return (
    <motion.div
      className={`flex flex-wrap gap-x-[0.3em] gap-y-[0.1em] ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      custom={delay}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="whitespace-nowrap inline-block">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              variants={childVariant}
              className={`inline-block ${theme === AnimationTheme.SHIMMER ? 'animate-pulse-slow' : ''}`}
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
};

export default KineticText;