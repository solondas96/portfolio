import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`group relative flex items-center justify-center border transition-colors ${
        showLabel
          ? 'w-full justify-between px-3 py-2 text-sm font-medium border-black/20 dark:border-white/20 hover:border-[#e34f3c]'
          : 'h-8 w-8 border-black/20 dark:border-white/20 text-[#151514] dark:text-[#f4f0e8] hover:bg-[#e34f3c] hover:border-[#e34f3c] hover:text-white'
      } ${className}`}
    >
      {showLabel ? (
        <>
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#6c6b64] dark:text-[#78766e]">
            Appearance
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold capitalize text-[#151514] dark:text-[#f4f0e8]">
              {theme} mode
            </span>
            <div className="flex h-7 w-7 items-center justify-center border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 text-[#151514] dark:text-[#f4f0e8] group-hover:bg-[#e34f3c] group-hover:text-white transition-colors">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </>
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={theme}
            initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </motion.div>
        </AnimatePresence>
      )}
    </button>
  );
}
