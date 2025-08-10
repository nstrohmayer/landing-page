import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-12 flex items-center justify-center rounded-full text-brand-orange bg-white/10 hover:bg-white/20 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-orange"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0, scale: 0.8, rotate: -90 }}
          animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, scale: 0.8, rotate: 90 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute"
        >
          {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
