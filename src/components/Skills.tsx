import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Cpu,
  Layers,
  Cloud,
  ShieldCheck,
  Code2,
  Search,
  X,
  ArrowDown,
  Check,
  Filter,
} from 'lucide-react';

export type SkillGroup = {
  group: string;
  description?: string;
  items: string[];
};

interface SkillsProps {
  data: SkillGroup[];
  selectedSkill?: string | null;
  onSelectSkill?: (skill: string | null) => void;
}

const DOMAIN_ICONS: Record<string, React.ElementType> = {
  'genai': Sparkles,
  'distributed': Cpu,
  'spark': Cpu,
  'palantir': Layers,
  'foundry': Layers,
  'cloud': Cloud,
  'lakehouse': Cloud,
  'governance': ShieldCheck,
  'quality': ShieldCheck,
  'programming': Code2,
  'tooling': Code2,
};

function getCategoryIcon(groupName: string): React.ElementType {
  const norm = groupName.toLowerCase();
  for (const [key, icon] of Object.entries(DOMAIN_ICONS)) {
    if (norm.includes(key)) return icon;
  }
  return Sparkles;
}

export default function Skills({ data, selectedSkill, onSelectSkill }: SkillsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('All');

  // Total items count
  const totalSkillsCount = useMemo(() => {
    return data.reduce((acc, g) => acc + g.items.length, 0);
  }, [data]);

  // Filter groups and items based on search and category tab
  const filteredData = useMemo(() => {
    return data
      .map((g) => {
        const matchesGroup =
          selectedGroup === 'All' || g.group === selectedGroup;
        if (!matchesGroup) return null;

        const query = searchQuery.toLowerCase().trim();
        if (!query) return g;

        const groupMatches = g.group.toLowerCase().includes(query);
        const filteredItems = g.items.filter((item) =>
          item.toLowerCase().includes(query)
        );

        if (groupMatches) return g;
        if (filteredItems.length > 0) {
          return { ...g, items: filteredItems };
        }
        return null;
      })
      .filter((g): g is SkillGroup => g !== null);
  }, [data, selectedGroup, searchQuery]);

  if (!data || data.length === 0) return null;

  return (
    <section id="skills" className="portfolio-section px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
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
            <p className="section-kicker">02 / Technical Capabilities</p>
            <div className="flex items-center gap-2 font-mono text-xs text-[#6c6b64] dark:text-[#a8a69e]">
              <span>6 Architectural Domains</span>
              <span>·</span>
              <span>{totalSkillsCount} Capabilities</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="section-title text-[#151514] dark:text-[#f4f0e8]">
              Technical depth, structured for impact.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#4d4c47] dark:text-[#b5b2a8] sm:text-lg">
              The distributed engines, semantic ontologies, and GenAI frameworks I deploy to
              engineer resilient enterprise platforms. Click any capability pill to cross-filter work
              history, case studies, and projects.
            </p>
          </div>
        </motion.div>

        {/* Active Cross-Filtering Banner */}
        <AnimatePresence>
          {selectedSkill && onSelectSkill && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#e34f3c]/40 bg-[#e34f3c]/10 dark:bg-[#e34f3c]/15 p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e34f3c] text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-mono text-xs font-semibold text-[#151514] dark:text-white">
                    Cross-filtering portfolio by:{' '}
                    <span className="text-[#e34f3c] dark:text-[#ff705e] underline decoration-[#e34f3c]">
                      "{selectedSkill}"
                    </span>
                  </p>
                  <p className="text-[11px] font-mono text-[#6c6b64] dark:text-[#a8a69e]">
                    Experience milestones and project cards are now highlighted to spotlight this capability.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="#experience"
                  className="inline-flex items-center gap-1 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-[#1a1a18] px-3 py-1.5 font-mono text-xs font-semibold text-[#151514] dark:text-white hover:border-[#e34f3c] hover:text-[#e34f3c] transition-colors shadow-2xs"
                >
                  <span>Jump to Experience</span>
                  <ArrowDown className="h-3 w-3" />
                </a>

                <button
                  onClick={() => onSelectSkill(null)}
                  className="inline-flex items-center gap-1 rounded-md bg-[#e34f3c] px-3 py-1.5 font-mono text-xs font-semibold text-white hover:bg-[#c93c2a] transition-colors shadow-2xs"
                >
                  <X className="h-3.5 w-3.5" />
                  <span>Clear Filter</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Bar: Live Search & Category Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-y border-black/15 dark:border-white/15 py-4">
          {/* Domain Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setSelectedGroup('All')}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-mono transition-all ${
                selectedGroup === 'All'
                  ? 'bg-[#151514] text-white dark:bg-[#f4f0e8] dark:text-[#151514] shadow-xs'
                  : 'border border-black/15 dark:border-white/15 text-[#6c6b64] dark:text-[#a8a69e] hover:border-black/40 dark:hover:border-white/40 hover:text-[#151514] dark:hover:text-[#f4f0e8]'
              }`}
            >
              <span>All Domains</span>
              <span className="opacity-60 text-[10px]">({totalSkillsCount})</span>
            </button>

            {data.map((group) => {
              const isSelected = selectedGroup === group.group;
              const Icon = getCategoryIcon(group.group);
              return (
                <button
                  key={group.group}
                  onClick={() => setSelectedGroup(group.group)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-mono transition-all ${
                    isSelected
                      ? 'bg-[#151514] text-white dark:bg-[#f4f0e8] dark:text-[#151514] shadow-xs'
                      : 'border border-black/15 dark:border-white/15 text-[#6c6b64] dark:text-[#a8a69e] hover:border-black/40 dark:hover:border-white/40 hover:text-[#151514] dark:hover:text-[#f4f0e8]'
                  }`}
                >
                  <Icon className="h-3 w-3 text-[#e34f3c] dark:text-[#ff705e]" />
                  <span className="truncate max-w-[140px] sm:max-w-none">{group.group.split('&')[0].trim()}</span>
                  <span className="opacity-60 text-[10px]">({group.items.length})</span>
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div className="relative min-w-[220px] max-w-xs">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6c6b64] dark:text-[#a8a69e]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search capability (e.g. Spark, Foundry)..."
              className="w-full rounded-lg border border-black/20 dark:border-white/20 bg-transparent py-1.5 pl-8 pr-7 text-xs font-mono text-[#151514] dark:text-[#f4f0e8] placeholder-[#8a877d] focus:border-[#e34f3c] dark:focus:border-[#ff705e] focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8a877d] hover:text-[#151514] dark:hover:text-white"
                title="Clear Search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Capabilities Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((skillGroup, index) => {
            const GroupIcon = getCategoryIcon(skillGroup.group);
            const globalIndex = data.findIndex((g) => g.group === skillGroup.group);

            return (
              <motion.div
                key={skillGroup.group}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="group flex flex-col justify-between rounded-2xl border border-black/15 dark:border-white/12 bg-white dark:bg-[#161615] p-6 sm:p-7 transition-all duration-300 hover:border-black/30 dark:hover:border-white/25 hover:shadow-lg dark:hover:shadow-[0_12px_36px_rgba(0,0,0,0.5)]"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/15 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.05] text-[#e34f3c] dark:text-[#ff705e]">
                        <GroupIcon className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-[11px] font-semibold text-[#e34f3c] dark:text-[#ff705e] uppercase tracking-wider">
                          0{globalIndex + 1} / DOMAIN
                        </span>
                        <h3 className="text-lg font-bold text-[#151514] dark:text-[#f4f0e8] leading-tight">
                          {skillGroup.group}
                        </h3>
                      </div>
                    </div>

                    <span className="rounded-full border border-black/10 dark:border-white/10 px-2 py-0.5 font-mono text-[11px] text-[#6c6b64] dark:text-[#a8a69e] shrink-0">
                      {skillGroup.items.length} skills
                    </span>
                  </div>

                  {/* Description / Domain Scope */}
                  {skillGroup.description && (
                    <p className="text-xs text-[#6c6b64] dark:text-[#a8a69e] leading-relaxed mb-4">
                      {skillGroup.description}
                    </p>
                  )}

                  <div className="h-px w-full bg-black/10 dark:bg-white/10 mb-4" />

                  {/* Skill Items Pills */}
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((item: string, i: number) => {
                      const isSelected =
                        selectedSkill?.toLowerCase() === item.toLowerCase();

                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            if (onSelectSkill) {
                              onSelectSkill(isSelected ? null : item);
                            }
                          }}
                          className={`cursor-pointer rounded-lg border px-3 py-1.5 font-mono text-xs transition-all duration-200 select-none ${
                            isSelected
                              ? 'border-[#e34f3c] bg-[#e34f3c] text-white font-semibold shadow-sm scale-105'
                              : 'border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] text-[#2c2b28] dark:text-[#d4d1c8] hover:border-black/30 dark:hover:border-white/25 hover:text-[#151514] dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                          }`}
                          title={`Click to cross-filter portfolio by "${item}"`}
                        >
                          {isSelected && <Check className="inline-block h-3 w-3 mr-1" />}
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-[#6c6b64] dark:text-[#a8a69e]">
                  <span>Click to filter portfolio</span>
                  <span className="text-[#e34f3c] dark:text-[#ff705e]">Active in projects & roles</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty state for search */}
        {filteredData.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center border rounded-2xl border-black/15 dark:border-white/15">
            <Search className="h-8 w-8 text-[#e34f3c]" />
            <p className="text-base text-[#151514] dark:text-[#f4f0e8] font-medium">
              No capabilities found matching "{searchQuery}"
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedGroup('All');
              }}
              className="font-mono text-xs text-[#e34f3c] underline"
            >
              Reset search & show all domains
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
