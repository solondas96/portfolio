import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  Check,
  Calendar,
  MapPin,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import CompanyLogo from './CompanyLogo';

interface ExperienceProps {
  data: any[];
  selectedSkill?: string | null;
}

interface CompanyMetadata {
  tags: string[];
  keyStats: string[];
  badge?: string;
  statBadgeClass: string;
  tagClass: string;
  headerAccentClass: string;
}

const COMPANY_META: Record<string, CompanyMetadata> = {
  'Swiss Re': {
    tags: ['Palantir Foundry', 'PySpark', 'Multimodal VLMs', 'Ontology Modeling', 'ACDC Optimization'],
    keyStats: ['51.2% Spark Cost Reduction', '~90M Documents Unified', 'AM-UDM Platform Architecture'],
    badge: 'Current Leadership Role',
    statBadgeClass:
      'border-teal-500/20 bg-teal-500/5 text-teal-800 dark:border-teal-400/30 dark:bg-teal-950/50 dark:text-teal-300',
    tagClass:
      'border-teal-500/20 text-teal-700 dark:border-teal-400/25 dark:text-teal-300',
    headerAccentClass: 'hover:border-teal-500/50 dark:hover:border-teal-400/50',
  },
  'AB InBev': {
    tags: ['Azure Databricks', 'Insights Copilot', 'NL2SQL', 'Data Quality Framework', 'FMCG Lakehouse'],
    keyStats: ['+$1.7M Sales Uplift', '5+ Global Business Verticals', 'Enterprise-Scale GenAI'],
    statBadgeClass:
      'border-amber-500/20 bg-amber-500/5 text-amber-900 dark:border-amber-400/30 dark:bg-amber-950/50 dark:text-amber-300',
    tagClass:
      'border-amber-500/20 text-amber-800 dark:border-amber-400/25 dark:text-amber-300',
    headerAccentClass: 'hover:border-amber-500/50 dark:hover:border-amber-400/50',
  },
  'EY': {
    tags: ['Apache Spark', 'Apache Kafka', 'Azure Event Hub', 'Cosmos DB', 'Data Observability'],
    keyStats: ['Real-Time Event Streaming', 'Fault-Tolerant Replay Pipelines'],
    statBadgeClass:
      'border-yellow-600/20 bg-yellow-500/5 text-yellow-900 dark:border-yellow-300/30 dark:bg-yellow-950/50 dark:text-yellow-200',
    tagClass:
      'border-yellow-600/20 text-yellow-800 dark:border-yellow-300/25 dark:text-yellow-200',
    headerAccentClass: 'hover:border-yellow-400/50 dark:hover:border-yellow-300/50',
  },
  'Accenture': {
    tags: ['PySpark', 'Python', 'ETL Pipelines', 'Pharmaceutical Data', 'Process Automation'],
    keyStats: ['98% Scheduling Reduction', 'Automated Release Tooling'],
    statBadgeClass:
      'border-purple-500/20 bg-purple-500/5 text-purple-900 dark:border-purple-400/30 dark:bg-purple-950/50 dark:text-purple-300',
    tagClass:
      'border-purple-500/20 text-purple-800 dark:border-purple-400/25 dark:text-purple-300',
    headerAccentClass: 'hover:border-purple-500/50 dark:hover:border-purple-400/50',
  },
};

// Highlights key metrics, quantities, and keywords with high-contrast formatting in both modes
function formatBulletWithHighlights(text: string, selectedSkill?: string | null) {
  const highlightRegex =
    /(\b\d+(\.\d+)?%|\$\d+(\.\d+)?[KM]?|~\d+M documents|~59TB|AM-UDM|Insights Copilot|NL2SQL|ACDC Spark|5\+ global business verticals|98%|42\.8%|51\.2%)/gi;

  const parts = text.split(highlightRegex);

  return parts.map((part, i) => {
    if (!part) return null;

    const isSkillMatch =
      selectedSkill && part.toLowerCase().includes(selectedSkill.toLowerCase());

    if (isSkillMatch) {
      return (
        <span
          key={i}
          className="rounded bg-[#e34f3c]/20 dark:bg-[#e34f3c]/30 px-1 py-0.5 font-bold text-[#e34f3c] dark:text-[#ff705e] underline decoration-[#e34f3c]"
        >
          {part}
        </span>
      );
    }

    if (highlightRegex.test(part)) {
      return (
        <span
          key={i}
          className="font-bold text-[#151514] dark:text-white bg-black/[0.04] dark:bg-white/[0.08] px-1 py-0.5 rounded text-[#e34f3c] dark:text-[#ff705e]"
        >
          {part}
        </span>
      );
    }

    return <span key={i}>{part}</span>;
  });
}

export default function Experience({ data, selectedSkill }: ExperienceProps) {
  // Track open state for each role by index (default: first role open)
  const [expandedIndices, setExpandedIndices] = useState<number[]>([0]);

  // If a skill is selected, auto-expand the roles that match
  useEffect(() => {
    if (!selectedSkill) return;
    const query = selectedSkill.toLowerCase();
    const matchingIndices = data
      .map((job, idx) => {
        const matches =
          job.role.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.bullets.some((b: string) => b.toLowerCase().includes(query));
        return matches ? idx : -1;
      })
      .filter((idx) => idx !== -1);

    if (matchingIndices.length > 0) {
      setExpandedIndices(matchingIndices);
    }
  }, [selectedSkill, data]);

  const toggleIndex = (index: number) => {
    setExpandedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const isAllExpanded = expandedIndices.length === data.length;

  const handleToggleAll = () => {
    if (isAllExpanded) {
      setExpandedIndices([]);
    } else {
      setExpandedIndices(data.map((_, i) => i));
    }
  };

  return (
    <section id="experience" className="portfolio-section px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="grid gap-6 border-t border-black/20 dark:border-white/20 pt-5 lg:grid-cols-[1fr_2fr]"
        >
          <div className="flex flex-col gap-2">
            <p className="section-kicker">01 / Career Timeline</p>
            <span className="font-mono text-xs text-[#6c6b64] dark:text-[#d4d1c8]">
              Leadership, Architecture & Delivery
            </span>
            {selectedSkill && (
              <div className="mt-1 inline-flex items-center gap-1.5 font-mono text-xs text-[#e34f3c] dark:text-[#ff705e]">
                <Sparkles className="h-3 w-3" />
                <span>Filtered: "{selectedSkill}"</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <h2 className="section-title text-[#151514] dark:text-[#f4f0e8]">
                Work that made complex systems move faster.
              </h2>

              {/* Expand / Collapse All Toggle */}
              <button
                onClick={handleToggleAll}
                className="inline-flex items-center gap-1.5 rounded-lg border border-black/20 dark:border-white/20 px-3.5 py-1.5 font-mono text-xs font-medium text-[#4d4c47] dark:text-[#d4d1c8] hover:border-[#e34f3c] hover:text-[#e34f3c] dark:hover:border-[#ff705e] dark:hover:text-[#ff705e] transition-colors"
                title={isAllExpanded ? 'Collapse All Chapters' : 'Expand All Chapters'}
              >
                {isAllExpanded ? (
                  <>
                    <Minimize2 className="h-3.5 w-3.5" />
                    <span>Collapse All</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="h-3.5 w-3.5" />
                    <span>Expand All</span>
                  </>
                )}
              </button>
            </div>

            <p className="max-w-2xl text-base leading-relaxed text-[#4d4c47] dark:text-[#d4d1c8] sm:text-lg">
              A chronological track of enterprise impact: from Palantir Foundry multi-tenant architectures and
              production LLM copilot deployments to multi-cloud Spark cost optimizations.
            </p>
          </div>
        </motion.div>

        {/* Timeline Stream */}
        <div className="relative flex flex-col gap-8">
          {/* Vertical Track Spine (Desktop & Tablet) */}
          <div className="hidden sm:block absolute left-[23px] top-8 bottom-8 w-px bg-gradient-to-b from-[#e34f3c] via-black/20 dark:via-white/20 to-transparent" />

          {data.map((job, index) => {
            const isExpanded = expandedIndices.includes(index);
            const meta = COMPANY_META[job.company] || {
              tags: ['Data Engineering', 'Distributed Systems'],
              keyStats: [],
              statBadgeClass: 'border-black/10 bg-black/5 dark:border-white/20 dark:bg-white/10 dark:text-white',
              tagClass: 'border-black/10 text-[#6c6b64] dark:border-white/15 dark:text-[#d4d1c8]',
              headerAccentClass: '',
            };
            const isCurrent = job.dates.toLowerCase().includes('present');

            const hasSkillMatch =
              selectedSkill &&
              (job.role.toLowerCase().includes(selectedSkill.toLowerCase()) ||
                job.company.toLowerCase().includes(selectedSkill.toLowerCase()) ||
                job.bullets.some((b: string) => b.toLowerCase().includes(selectedSkill.toLowerCase())));

            return (
              <motion.div
                key={job.company + index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-7 transition-all duration-300"
              >
                {/* Timeline Milestone Axis (Desktop) */}
                <div className="hidden sm:flex flex-col items-center pt-7 shrink-0 z-10">
                  <div
                    className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isCurrent
                        ? 'border-[#e34f3c] bg-white dark:bg-[#1a1a18] shadow-lg shadow-[#e34f3c]/25 text-[#e34f3c] dark:text-[#ff705e]'
                        : isExpanded
                        ? 'border-black/60 dark:border-white/60 bg-white dark:bg-[#20201d] text-[#151514] dark:text-white'
                        : 'border-black/20 dark:border-white/20 bg-[#f4f0e8] dark:bg-[#161614] text-[#6c6b64] dark:text-[#a8a69e]'
                    }`}
                  >
                    <span className="font-mono text-xs font-bold">0{index + 1}</span>
                    {isCurrent && (
                      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e34f3c] opacity-75" />
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#e34f3c]" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Main Experience Card */}
                <div
                  className={`group relative flex-1 rounded-2xl border transition-all duration-300 overflow-hidden w-full ${
                    isExpanded
                      ? 'border-black/30 dark:border-white/25 bg-white dark:bg-[#181816] shadow-xl dark:shadow-[0_12px_40px_rgba(0,0,0,0.7)]'
                      : 'border-black/15 dark:border-white/12 bg-white/70 dark:bg-[#141413] hover:border-black/30 dark:hover:border-white/25 hover:bg-white dark:hover:bg-[#181816]'
                  } ${meta.headerAccentClass} ${hasSkillMatch ? 'ring-2 ring-[#e34f3c]' : ''}`}
                >
                  {/* Card Header (Clickable Accordion Trigger) */}
                  <div
                    onClick={() => toggleIndex(index)}
                    className="cursor-pointer p-5 sm:p-7 flex flex-col gap-4 select-none"
                  >
                    {/* Top Row: Official Logo, Badge & Dates */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-3">
                        {/* Prominent Official Logo */}
                        <div className="flex h-8 items-center" aria-label={job.company} title={job.company}>
                          <CompanyLogo company={job.company} className="h-7 max-w-[140px]" />
                        </div>

                        {meta.badge && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/10 dark:bg-teal-950/60 border border-teal-500/30 dark:border-teal-400/40 px-3 py-1 font-mono text-xs font-semibold text-teal-800 dark:text-teal-300">
                            <span className="h-2 w-2 rounded-full bg-teal-600 dark:bg-teal-400 animate-pulse" />
                            {meta.badge}
                          </span>
                        )}

                        {hasSkillMatch && (
                          <span className="inline-flex items-center gap-1 bg-[#e34f3c] text-white text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full font-semibold shadow-sm">
                            <Check className="h-3 w-3" />
                            Skill Match
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 font-mono text-xs text-[#6c6b64] dark:text-[#d4d1c8]">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-[#e34f3c] dark:text-[#ff705e]" />
                          <span className="font-semibold text-[#151514] dark:text-white">{job.dates}</span>
                        </span>
                        <span className="hidden md:inline">·</span>
                        <span className="hidden md:flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{job.location}</span>
                        </span>
                      </div>
                    </div>

                    {/* Mid Row: Role Title & Toggle Action */}
                    <div className="flex items-start justify-between gap-4 pt-1">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-xl sm:text-2xl lg:text-2xl font-bold text-[#151514] dark:text-white leading-tight tracking-tight group-hover:text-[#e34f3c] dark:group-hover:text-[#ff705e] transition-colors">
                          {job.role}
                        </h3>
                      </div>

                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                          isExpanded
                            ? 'border-[#151514] bg-[#151514] text-white dark:border-white dark:bg-white dark:text-[#151514] rotate-180 shadow-md'
                            : 'border-black/20 dark:border-white/20 text-[#6c6b64] dark:text-[#d4d1c8] hover:border-[#e34f3c] hover:text-[#e34f3c] dark:hover:border-[#ff705e] dark:hover:text-[#ff705e]'
                        }`}
                        title={isExpanded ? 'Collapse' : 'Expand'}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Key Stat Badges Row with Vivid Themed Contrast */}
                    {meta.keyStats && meta.keyStats.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {meta.keyStats.map((stat, i) => (
                          <span
                            key={i}
                            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 font-mono text-xs font-semibold shadow-xs ${meta.statBadgeClass}`}
                          >
                            <TrendingUp className="h-3.5 w-3.5 shrink-0 text-[#e34f3c] dark:text-[#ff705e]" />
                            <span>{stat}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack Pills */}
                    {meta.tags && meta.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {meta.tags.map((tag) => {
                          const isTagMatch =
                            selectedSkill && tag.toLowerCase().includes(selectedSkill.toLowerCase());
                          return (
                            <span
                              key={tag}
                              className={`rounded-md px-2.5 py-0.5 font-mono text-xs transition-colors ${
                                isTagMatch
                                  ? 'bg-[#e34f3c] text-white font-bold shadow-xs'
                                  : `border bg-black/[0.02] dark:bg-white/[0.04] ${meta.tagClass}`
                              }`}
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Expanded Body: Detailed Engineering Deliverables */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden border-t border-black/10 dark:border-white/10 bg-[#f9f8f5] dark:bg-[#0f0f0e]"
                      >
                        <div className="p-5 sm:p-7 flex flex-col gap-4">
                          <div className="flex items-center justify-between pb-1">
                            <span className="font-mono text-xs uppercase tracking-wider text-[#e34f3c] dark:text-[#ff705e] font-bold">
                              Key Deliverables & Architectural Scope ({job.bullets.length})
                            </span>
                            <span className="font-mono text-xs text-[#6c6b64] dark:text-[#d4d1c8]">
                              Engineering Contributions
                            </span>
                          </div>

                          <div className="grid grid-cols-1 gap-3.5">
                            {job.bullets.map((bullet: string, i: number) => {
                              const isBulletMatch =
                                selectedSkill &&
                                bullet.toLowerCase().includes(selectedSkill.toLowerCase());

                              return (
                                <div
                                  key={i}
                                  className={`relative flex items-start gap-4 rounded-xl border p-4 sm:p-5 text-sm sm:text-[15px] leading-relaxed transition-all ${
                                    isBulletMatch
                                      ? 'border-[#e34f3c] bg-[#e34f3c]/10 dark:bg-[#e34f3c]/20 shadow-sm text-[#151514] dark:text-white'
                                      : 'border-black/10 dark:border-white/10 bg-white dark:bg-[#1a1a18] text-[#2c2b28] dark:text-[#f4f0e8] hover:border-black/25 dark:hover:border-white/25 hover:shadow-xs'
                                  }`}
                                >
                                  <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#e34f3c]/15 text-[#e34f3c] dark:bg-[#ff705e]/20 dark:text-[#ff705e]">
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                  </div>

                                  <div className="flex-1">
                                    {formatBulletWithHighlights(bullet, selectedSkill)}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
