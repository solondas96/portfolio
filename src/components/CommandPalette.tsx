import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  FileText,
  Moon,
  Sun,
  Mail,
  Phone,
  ArrowUpRight,
  Sparkles,
  Layers,
  Award,
  BookOpen,
  Briefcase,
  GraduationCap,
  MessageSquareQuote,
  Command as CommandIcon,
  Check,
  Code2,
  Camera,
  Instagram,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

type CommandItem = {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Navigation' | 'Actions' | 'Links';
  icon: React.ElementType;
  action: () => void;
  shortcut?: string;
};

export default function CommandPalette({ isOpen, onClose, onOpenResume }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedAction, setCopiedAction] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const navigateTo = (id: string) => {
    onClose();
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAction(label);
    setTimeout(() => {
      setCopiedAction(null);
      onClose();
    }, 1000);
  };

  const commands: CommandItem[] = [
    // Actions
    {
      id: 'resume',
      title: 'View & Download Resume CV',
      subtitle: 'Complete PDF with contact and full work history',
      category: 'Actions',
      icon: FileText,
      action: () => {
        onClose();
        onOpenResume();
      },
      shortcut: 'CV',
    },
    {
      id: 'theme',
      title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      subtitle: `Current appearance: ${theme} theme`,
      category: 'Actions',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => {
        toggleTheme();
        onClose();
      },
      shortcut: 'T',
    },
    {
      id: 'copy-email',
      title: copiedAction === 'email' ? 'Email Copied!' : 'Copy Email Address',
      subtitle: 'solondas96@gmail.com',
      category: 'Actions',
      icon: copiedAction === 'email' ? Check : Mail,
      action: () => copyToClipboard('solondas96@gmail.com', 'email'),
    },
    {
      id: 'copy-phone',
      title: copiedAction === 'phone' ? 'Phone Copied!' : 'Copy Phone Number',
      subtitle: '+91-7008482584',
      category: 'Actions',
      icon: copiedAction === 'phone' ? Check : Phone,
      action: () => copyToClipboard('+91-7008482584', 'phone'),
    },

    // Navigation
    {
      id: 'nav-case-studies',
      title: 'Jump to Architecture Spotlight',
      subtitle: 'Palantir Foundry, Insights Copilot & Spark Cost Reduction',
      category: 'Navigation',
      icon: Layers,
      action: () => navigateTo('case-studies'),
    },
    {
      id: 'nav-projects',
      title: 'Jump to Selected Work & GitHub',
      subtitle: 'Playable game engines, live sandboxes, GitHub tools & CLI',
      category: 'Navigation',
      icon: Code2,
      action: () => navigateTo('projects'),
    },
    {
      id: 'nav-experience',
      title: 'Jump to Work Experience',
      subtitle: 'Swiss Re, AB InBev, EY, Accenture',
      category: 'Navigation',
      icon: Briefcase,
      action: () => navigateTo('experience'),
    },
    {
      id: 'nav-achievements',
      title: 'Jump to Impact Metrics',
      subtitle: '51.2% cost reduction, $1.7M revenue, 90% loan turnaround',
      category: 'Navigation',
      icon: Award,
      action: () => navigateTo('achievements'),
    },
    {
      id: 'nav-writing',
      title: 'Jump to Writing & Insights',
      subtitle: 'The Datum Theory on Medium',
      category: 'Navigation',
      icon: BookOpen,
      action: () => navigateTo('writing'),
    },
    {
      id: 'nav-photography',
      title: 'Jump to The Frame Theory (Photography)',
      subtitle: '@frame_theory.ig · Side pursuit & visual stories',
      category: 'Navigation',
      icon: Camera,
      action: () => navigateTo('photography'),
    },
    {
      id: 'nav-skills',
      title: 'Jump to Technical Capabilities',
      subtitle: 'Distributed Systems, Spark, Cloud, LLMs & Ontologies',
      category: 'Navigation',
      icon: Sparkles,
      action: () => navigateTo('skills'),
    },
    {
      id: 'nav-testimonials',
      title: 'Jump to Endorsements & Testimonials',
      subtitle: '13 recommendations from Managers and Architects',
      category: 'Navigation',
      icon: MessageSquareQuote,
      action: () => navigateTo('testimonials'),
    },
    {
      id: 'nav-education',
      title: 'Jump to Education & Certifications',
      subtitle: 'M.Sc Data Science (LJMU) & Foundry Credentials',
      category: 'Navigation',
      icon: GraduationCap,
      action: () => navigateTo('education'),
    },

    // Links
    {
      id: 'link-linkedin',
      title: 'Open LinkedIn Profile',
      subtitle: 'linkedin.com/in/solondas',
      category: 'Links',
      icon: ArrowUpRight,
      action: () => {
        window.open('https://linkedin.com/in/solondas', '_blank');
        onClose();
      },
    },
    {
      id: 'link-github',
      title: 'Open GitHub Profile',
      subtitle: 'github.com/solondas96',
      category: 'Links',
      icon: ArrowUpRight,
      action: () => {
        window.open('https://github.com/solondas96', '_blank');
        onClose();
      },
    },
    {
      id: 'link-medium',
      title: 'Open Medium Blog (The Datum Theory)',
      subtitle: 'medium.com/@solondas96',
      category: 'Links',
      icon: ArrowUpRight,
      action: () => {
        window.open('https://medium.com/@solondas96', '_blank');
        onClose();
      },
    },
    {
      id: 'link-instagram',
      title: 'Open The Frame Theory (Photography Instagram)',
      subtitle: 'instagram.com/frame_theory.ig',
      category: 'Links',
      icon: Instagram,
      action: () => {
        window.open('https://www.instagram.com/frame_theory.ig?cnvx=ODJlZWVraWNmNnk3', '_blank');
        onClose();
      },
    },
  ];

  const filtered = commands.filter((c) => {
    const q = query.toLowerCase();
    return (
      c.title.toLowerCase().includes(q) ||
      (c.subtitle && c.subtitle.toLowerCase().includes(q)) ||
      c.category.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;
    setTimeout(() => inputRef.current?.focus(), 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-start justify-center p-4 pt-16 sm:pt-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex w-full max-w-2xl flex-col border border-black/20 dark:border-white/20 bg-[#f4f0e8] dark:bg-[#141413] shadow-2xl overflow-hidden"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 border-b border-black/15 dark:border-white/15 px-4 py-3.5">
              <Search className="h-5 w-5 text-[#6c6b64] dark:text-[#78766e]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search sections (e.g. 'Resume', 'Spark', 'Swiss Re')..."
                className="w-full bg-transparent text-sm font-medium text-[#151514] dark:text-[#f4f0e8] placeholder:text-[#6c6b64] dark:placeholder:text-[#78766e] focus:outline-none"
              />
              <span className="hidden sm:inline-flex items-center gap-1 border border-black/20 dark:border-white/20 px-1.5 py-0.5 text-[10px] font-mono text-[#6c6b64] dark:text-[#78766e]">
                ESC
              </span>
            </div>

            {/* Commands List */}
            <div className="max-h-96 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-sm text-[#6c6b64] dark:text-[#78766e]">
                  No matching commands found.
                </div>
              ) : (
                filtered.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex w-full items-center justify-between px-3 py-2.5 text-left transition-colors ${
                        isSelected
                          ? 'bg-[#151514] text-white dark:bg-[#f4f0e8] dark:text-[#141413]'
                          : 'text-[#151514] dark:text-[#f4f0e8] hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`flex h-7 w-7 shrink-0 items-center justify-center border ${
                            isSelected
                              ? 'border-transparent bg-[#e34f3c] text-white'
                              : 'border-black/20 dark:border-white/20 text-[#e34f3c]'
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-semibold">{item.title}</p>
                          {item.subtitle && (
                            <p
                              className={`text-[11px] truncate ${
                                isSelected
                                  ? 'text-white/70 dark:text-black/70'
                                  : 'text-[#6c6b64] dark:text-[#78766e]'
                              }`}
                            >
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <span
                          className={`text-[10px] uppercase font-mono px-1.5 py-0.5 border ${
                            isSelected
                              ? 'border-white/20 text-white/80 dark:border-black/20 dark:text-black/80'
                              : 'border-black/15 text-[#6c6b64] dark:border-white/15 dark:text-[#78766e]'
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Helper */}
            <div className="flex items-center justify-between border-t border-black/10 dark:border-white/10 px-4 py-2.5 bg-black/[0.02] dark:bg-white/[0.02] text-[11px] text-[#6c6b64] dark:text-[#78766e] font-mono">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
              <div className="flex items-center gap-1">
                <CommandIcon className="h-3 w-3" />
                <span>Solon Das · Portfolio Command Bar</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
