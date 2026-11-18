import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

type NavSection = { id: string; label: string };

export default function TopNav({
  sections,
  activeSection,
  name,
  email,
}: {
  sections: NavSection[];
  activeSection: string;
  name: string;
  email: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [drawerOpen]);

  const firstName = name.split(' ')[0];

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="portfolio-nav fixed inset-x-0 top-0 z-50 flex justify-center px-5"
      >
        <div
          className={`flex w-full max-w-[1440px] items-center justify-between gap-3 border-b py-4 transition-all duration-300 ${
            scrolled
              ? 'border-black/20 bg-[#f4f0e8]/95'
              : 'border-black/15 bg-[#f4f0e8]/85'
          }`}
        >
          <a href="#hero" className="flex items-center gap-2 text-sm font-bold tracking-tight text-[#151514]">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#e34f3c] text-xs font-bold text-white">
              {firstName.charAt(0)}
            </span>
            <span>{name}</span>
          </a>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=solondas96@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden bg-[#151514] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#e34f3c] sm:inline-flex"
            >
              Email me
            </a>
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              className="flex h-8 w-8 items-center justify-center border border-black/20 text-[#151514] transition-colors hover:bg-[#e34f3c] hover:text-white"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-[60] bg-black/35"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[85vw] max-w-xs flex-col border-l border-black/15 bg-[#f4f0e8] p-6"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6c6b64]">Navigate</span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close navigation menu"
                  className="flex h-8 w-8 items-center justify-center border border-black/20 text-[#151514] transition-colors hover:bg-[#e34f3c] hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={() => setDrawerOpen(false)}
                    className={`border-b border-black/10 px-0 py-3 text-sm font-medium transition-colors ${
                      activeSection === section.id
                      ? 'text-[#e34f3c]'
                      : 'text-[#151514] hover:text-[#e34f3c]'
                    }`}
                  >
                    {section.label}
                  </a>
                ))}
              </nav>

              <div className="mt-6 mb-4">
                <ThemeToggle showLabel />
              </div>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=solondas96@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setDrawerOpen(false)}
                className="mt-auto bg-[#151514] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#e34f3c]"
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
