import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X, Search, FileText } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

type NavSection = { id: string; label: string };

export default function TopNav({
  sections,
  activeSection,
  name,
  email,
  onOpenResume,
  onOpenCommandPalette,
}: {
  sections: NavSection[];
  activeSection: string;
  name: string;
  email: string;
  onOpenResume?: () => void;
  onOpenCommandPalette?: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [drawerOpen]);

  const firstName = name.split(' ')[0];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#e34f3c] z-[60] origin-left pointer-events-none transition-transform duration-75"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="portfolio-nav fixed inset-x-0 top-0 z-50 flex justify-center px-5"
      >
        <div
          className={`flex w-full max-w-[1440px] items-center justify-between gap-3 border-b py-4 transition-all duration-300 ${
            scrolled
              ? 'border-black/20 dark:border-white/20 bg-[#f4f0e8]/95 dark:bg-[#0e0e0d]/95 backdrop-blur-md'
              : 'border-black/15 dark:border-white/15 bg-[#f4f0e8]/85 dark:bg-[#0e0e0d]/85 backdrop-blur-sm'
          }`}
        >
          <a href="#hero" className="flex items-center gap-2 text-sm font-bold tracking-tight text-[#151514] dark:text-[#f4f0e8]">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#e34f3c] text-xs font-bold text-white">
              {firstName.charAt(0)}
            </span>
            <span>{name}</span>
          </a>

          <div className="flex items-center gap-2">
            {/* Command Palette Trigger */}
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                aria-label="Open command palette"
                title="Open Command Palette (⌘K)"
                className="hidden sm:inline-flex items-center gap-2 border border-black/20 dark:border-white/20 px-2.5 py-1.5 text-xs text-[#6c6b64] dark:text-[#78766e] hover:border-[#e34f3c] hover:text-[#e34f3c] transition-colors"
              >
                <Search className="h-3.5 w-3.5" />
                <span className="font-mono text-[10px]">⌘K</span>
              </button>
            )}

            {/* Resume CV Button */}
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="hidden md:inline-flex items-center gap-1.5 border border-black/20 dark:border-white/20 px-3 py-1.5 text-xs font-semibold text-[#151514] dark:text-[#f4f0e8] hover:border-[#e34f3c] hover:text-[#e34f3c] transition-colors"
              >
                <FileText className="h-3.5 w-3.5 text-[#e34f3c]" />
                <span>CV</span>
              </button>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Email */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=solondas96@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden bg-[#151514] dark:bg-[#f4f0e8] px-4 py-2 text-xs font-semibold text-white dark:text-[#141413] transition-colors hover:bg-[#e34f3c] dark:hover:bg-[#e34f3c] dark:hover:text-white sm:inline-flex"
            >
              Email me
            </a>

            {/* Menu Trigger */}
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              className="flex h-8 w-8 items-center justify-center border border-black/20 dark:border-white/20 text-[#151514] dark:text-[#f4f0e8] transition-colors hover:bg-[#e34f3c] hover:border-[#e34f3c] hover:text-white"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[85vw] max-w-xs flex-col border-l border-black/15 dark:border-white/15 bg-[#f4f0e8] dark:bg-[#141413] p-6 shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6c6b64] dark:text-[#78766e]">
                  Navigate
                </span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close navigation menu"
                  className="flex h-8 w-8 items-center justify-center border border-black/20 dark:border-white/20 text-[#151514] dark:text-[#f4f0e8] transition-colors hover:bg-[#e34f3c] hover:border-[#e34f3c] hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Quick Actions in Drawer */}
              <div className="flex flex-col gap-2 mb-4 pb-4 border-b border-black/10 dark:border-white/10">
                {onOpenCommandPalette && (
                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      onOpenCommandPalette();
                    }}
                    className="flex w-full items-center justify-between border border-black/20 dark:border-white/20 px-3 py-2 text-xs font-semibold text-[#151514] dark:text-[#f4f0e8] hover:border-[#e34f3c]"
                  >
                    <span className="flex items-center gap-2">
                      <Search className="h-3.5 w-3.5 text-[#e34f3c]" />
                      <span>Command Bar</span>
                    </span>
                    <span className="font-mono text-[10px]">⌘K</span>
                  </button>
                )}

                {onOpenResume && (
                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      onOpenResume();
                    }}
                    className="flex w-full items-center justify-between border border-black/20 dark:border-white/20 px-3 py-2 text-xs font-semibold text-[#151514] dark:text-[#f4f0e8] hover:border-[#e34f3c]"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="h-3.5 w-3.5 text-[#e34f3c]" />
                      <span>Resume / CV (PDF)</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#e34f3c]">VIEW</span>
                  </button>
                )}
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-1 overflow-y-auto max-h-[45vh]">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={() => setDrawerOpen(false)}
                    className={`border-b border-black/10 dark:border-white/10 px-0 py-2.5 text-sm font-medium transition-colors ${
                      activeSection === section.id
                        ? 'text-[#e34f3c]'
                        : 'text-[#151514] dark:text-[#f4f0e8] hover:text-[#e34f3c]'
                    }`}
                  >
                    {section.label}
                  </a>
                ))}
              </nav>

              {/* Theme Toggle */}
              <div className="mt-4 mb-4">
                <ThemeToggle showLabel />
              </div>

              {/* Email Button */}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=solondas96@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setDrawerOpen(false)}
                className="mt-auto bg-[#151514] dark:bg-[#f4f0e8] px-4 py-3 text-center text-sm font-semibold text-white dark:text-[#141413] transition-colors hover:bg-[#e34f3c] dark:hover:bg-[#e34f3c] dark:hover:text-white"
              >
                Email me
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
