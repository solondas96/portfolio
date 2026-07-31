import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';

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
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <div
          className={`flex w-full max-w-md items-center justify-between gap-3 rounded-full border px-3 py-2 backdrop-blur-xl transition-all duration-300 sm:max-w-lg sm:px-4 ${
            scrolled
              ? 'border-white/12 bg-slate-950/80 shadow-[0_8px_30px_rgba(2,6,23,0.45)]'
              : 'border-white/5 bg-slate-950/40'
          }`}
        >
          <a href="#hero" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-slate-100">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-xs font-bold text-white">
              {firstName.charAt(0)}
            </span>
            <span className="hidden sm:inline">{firstName} Das</span>
          </a>

          <div className="flex items-center gap-2">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=solondas96@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-orange-600 px-4 py-1.5 text-xs font-semibold text-white transition-all hover:bg-orange-500 hover:scale-105 active:scale-95 sm:inline-flex"
            >
              Email me
            </a>
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-colors hover:bg-white/10"
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
              className="fixed inset-0 z-[60] bg-slate-950/70 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[85vw] max-w-xs flex-col border-l border-white/10 bg-slate-950/95 p-6 backdrop-blur-xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Navigate</span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close navigation menu"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-colors hover:bg-white/10"
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
                    className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      activeSection === section.id
                        ? 'bg-orange-500/15 text-orange-300'
                        : 'text-slate-300 hover:bg-white/5 hover:text-slate-100'
                    }`}
                  >
                    {section.label}
                  </a>
                ))}
              </nav>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=solondas96@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setDrawerOpen(false)}
                className="mt-auto rounded-full bg-orange-600 px-4 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-orange-500"
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
