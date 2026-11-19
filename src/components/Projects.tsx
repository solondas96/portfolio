import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Copy,
  Check,
  ExternalLink,
  Terminal as TerminalIcon,
  LayoutGrid,
  Search,
  X,
  Code2,
  Sparkles,
  Gamepad2,
  BookOpen,
  Cpu,
  Layers,
} from 'lucide-react';
import { PROJECTS_DATA, ProjectItem } from '../data/projects';
import ProjectSandboxModal from './ProjectSandboxModal';
import ProjectTerminal from './ProjectTerminal';

const CATEGORIES = [
  'All',
  'Interactive & Games',
  'Applied AI & Research',
  'Systems & Tools',
] as const;

export default function Projects({ data }: { data?: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'terminal'>('grid');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sandboxProject, setSandboxProject] = useState<ProjectItem | null>(null);

  // Authoritative curated projects list
  const allProjects = PROJECTS_DATA;

  // Filtered list based on category & search query
  const filteredProjects = useMemo(() => {
    return allProjects.filter((p) => {
      const matchesCategory =
        selectedCategory === 'All' || p.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.tagline.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.stack.some((tech) => tech.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [allProjects, selectedCategory, searchQuery]);

  const handleCopyClone = (project: ProjectItem) => {
    if (!project.repoUrl) return;
    const cmd = `git clone ${project.repoUrl}.git`;
    navigator.clipboard.writeText(cmd);
    setCopiedId(project.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Interactive & Games':
        return <Gamepad2 className="h-4 w-4 text-[#e34f3c]" />;
      case 'Applied AI & Research':
        return <BookOpen className="h-4 w-4 text-[#cd9f28]" />;
      default:
        return <Cpu className="h-4 w-4 text-[#3a7065]" />;
    }
  };

  return (
    <section id="projects" className="portfolio-section px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="grid gap-6 border-t border-black/20 dark:border-white/20 pt-5 lg:grid-cols-[1fr_2fr]"
        >
          <div className="flex flex-col gap-2">
            <p className="section-kicker">02 / Selected Work & GitHub</p>
            <span className="font-mono text-xs text-[#6c6b64] dark:text-[#a8a69e]">
              Open-source ecosystems & applied labs
            </span>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <h2 className="section-title text-[#151514] dark:text-[#f4f0e8]">
                Projects, experiments & live sandboxes.
              </h2>

              {/* View Switcher Toggle */}
              <div className="flex items-center rounded-lg border border-black/20 dark:border-white/20 p-1 bg-black/[0.03] dark:bg-white/[0.03]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white text-[#151514] dark:bg-[#232321] dark:text-[#f4f0e8] shadow-sm'
                      : 'text-[#6c6b64] dark:text-[#a8a69e] hover:text-[#151514] dark:hover:text-[#f4f0e8]'
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  Visual Grid
                </button>
                <button
                  onClick={() => setViewMode('terminal')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded transition-all ${
                    viewMode === 'terminal'
                      ? 'bg-[#151514] text-[#e34f3c] dark:bg-[#0c0c0b] dark:text-[#ff705e] shadow-sm'
                      : 'text-[#6c6b64] dark:text-[#a8a69e] hover:text-[#151514] dark:hover:text-[#f4f0e8]'
                  }`}
                >
                  <TerminalIcon className="h-3.5 w-3.5" />
                  &gt;_ CLI Mode
                </button>
              </div>
            </div>

            <p className="max-w-2xl text-base leading-relaxed text-[#4d4c47] dark:text-[#b5b2a8] sm:text-lg">
              Explore playable browser game engines, NLP research theses, and production generative AI systems.
              Launch interactive in-app sandboxes directly or query the developer CLI below.
            </p>
          </div>
        </motion.div>

        {/* View Mode 1: Terminal Mode */}
        {viewMode === 'terminal' ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectTerminal
              onPlayProject={(p) => setSandboxProject(p)}
              onExit={() => setViewMode('grid')}
            />
          </motion.div>
        ) : (
          /* View Mode 2: Visual Grid */
          <div className="flex flex-col gap-6">
            {/* Filter Bar & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-y border-black/20 dark:border-white/20 py-4">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {CATEGORIES.map((cat) => {
                  const count =
                    cat === 'All'
                      ? allProjects.length
                      : allProjects.filter((p) => p.category === cat).length;
                  const isSelected = selectedCategory === cat;

                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-mono transition-all ${
                        isSelected
                          ? 'bg-[#151514] text-white dark:bg-[#f4f0e8] dark:text-[#151514] shadow-sm'
                          : 'border border-black/15 dark:border-white/15 text-[#6c6b64] dark:text-[#a8a69e] hover:border-black/40 dark:hover:border-white/40 hover:text-[#151514] dark:hover:text-[#f4f0e8]'
                      }`}
                    >
                      {cat !== 'All' && getCategoryIcon(cat)}
                      <span>{cat}</span>
                      <span className="opacity-60 text-[10px]">({count})</span>
                    </button>
                  );
                })}
              </div>

              {/* Search Box */}
              <div className="relative min-w-[240px] max-w-xs">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6c6b64] dark:text-[#a8a69e]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by tech or keyword..."
                  className="w-full rounded border border-black/20 dark:border-white/20 bg-transparent py-1.5 pl-8 pr-7 text-xs font-mono text-[#151514] dark:text-[#f4f0e8] placeholder-[#8a877d] focus:border-[#e34f3c] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8a877d] hover:text-[#151514] dark:hover:text-white"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Results count indicator */}
            <div className="flex items-center justify-between text-xs font-mono text-[#6c6b64] dark:text-[#a8a69e]">
              <span>
                Showing {filteredProjects.length} of {allProjects.length} projects
                {searchQuery && ` matching "${searchQuery}"`}
              </span>
              <button
                onClick={() => setViewMode('terminal')}
                className="inline-flex items-center gap-1 text-[#e34f3c] hover:underline"
              >
                <TerminalIcon className="h-3 w-3" /> Prefer command line? Open CLI
              </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 border-t border-black/20 dark:border-white/20 md:grid-cols-2">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group flex flex-col justify-between border-b border-black/20 dark:border-white/20 py-7 md:px-6 md:odd:border-r md:first:pl-0 md:nth-[2n]:pr-0 hover:bg-black/[0.015] dark:hover:bg-white/[0.015] transition-colors"
                >
                  <div className="flex flex-col gap-5">
                    {/* Top Row: Category Tag & Language Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#e34f3c] font-semibold">
                          {project.isPlayable && (
                            <span className="inline-flex h-2 w-2 rounded-full bg-[#e34f3c] animate-pulse" />
                          )}
                          {project.category}
                        </span>
                      </div>

                      {project.language && (
                        <div className="flex items-center gap-1.5 rounded-full border border-black/15 dark:border-white/15 px-2.5 py-0.5 font-mono text-[11px] text-[#6c6b64] dark:text-[#a8a69e]">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: project.languageColor || '#3178c6' }}
                          />
                          <span>{project.language}</span>
                        </div>
                      )}
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="text-xl font-medium leading-tight text-[#151514] dark:text-[#f4f0e8] group-hover:text-[#e34f3c] transition-colors">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-sm font-mono text-[#6c6b64] dark:text-[#a8a69e]">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-[#4d4c47] dark:text-[#b5b2a8]">
                      {project.description}
                    </p>

                    {/* Bullets */}
                    {project.bullets && project.bullets.length > 0 && (
                      <ul className="flex flex-col gap-2 border-t border-black/10 dark:border-white/10 pt-3">
                        {project.bullets.map((bullet, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4d4c47] dark:text-[#b5b2a8] leading-relaxed"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#e34f3c]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tech Stack Tags */}
                    {project.stack && project.stack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded border border-black/15 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.02] px-2 py-0.5 font-mono text-[11px] text-[#6c6b64] dark:text-[#a8a69e]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-black/10 dark:border-white/10 pt-4">
                    {/* Left: Playable Sandbox Button */}
                    <div>
                      {project.isPlayable ? (
                        <button
                          onClick={() => setSandboxProject(project)}
                          className="inline-flex items-center gap-2 rounded bg-[#e34f3c] px-3.5 py-1.5 font-mono text-xs font-semibold text-white shadow-sm hover:bg-[#c93c2a] transition-all transform active:scale-95"
                        >
                          <Play className="h-3.5 w-3.5 fill-white" />
                          Launch Live Sandbox
                        </button>
                      ) : project.drivePreviewUrl ? (
                        <a
                          href={project.liveUrl || project.drivePreviewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#151514] dark:text-[#f4f0e8] hover:text-[#e34f3c] transition-colors"
                        >
                          View Document / Deck
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : null}
                    </div>

                    {/* Right: Code / Clone / Live Links */}
                    <div className="flex items-center gap-3">
                      {project.repoUrl && (
                        <button
                          onClick={() => handleCopyClone(project)}
                          className="inline-flex items-center gap-1.5 font-mono text-xs text-[#6c6b64] dark:text-[#a8a69e] hover:text-[#e34f3c] transition-colors"
                          title={`Copy 'git clone ${project.repoUrl}.git'`}
                        >
                          {copiedId === project.id ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-[#3a7065]" />
                              <span className="text-[#3a7065] font-semibold">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline">Clone</span>
                            </>
                          )}
                        </button>
                      )}

                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-xs text-[#151514] dark:text-[#f4f0e8] hover:text-[#e34f3c] transition-colors"
                        >
                          <Code2 className="h-3.5 w-3.5" />
                          <span>Code</span>
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-xs text-[#151514] dark:text-[#f4f0e8] hover:text-[#e34f3c] transition-colors"
                        >
                          <span>Live</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center border-b border-black/20 dark:border-white/20">
                <Sparkles className="h-8 w-8 text-[#e34f3c]" />
                <p className="text-base text-[#151514] dark:text-[#f4f0e8] font-medium">
                  No projects found matching "{searchQuery}"
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="font-mono text-xs text-[#e34f3c] underline"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Live Sandbox Modal */}
        <ProjectSandboxModal
          project={sandboxProject}
          onClose={() => setSandboxProject(null)}
        />
      </div>
    </section>
  );
}
