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
  ChevronRight,
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
  accentColor: string;
  badge?: string;
}

const COMPANY_META: Record<string, CompanyMetadata> = {
  'Swiss Re': {
    tags: ['Palantir Foundry', 'PySpark', 'Multimodal VLMs', 'Ontology Modeling', 'ACDC Optimization'],
    keyStats: ['51.2% Spark Cost Reduction', '~90M Documents Unified', 'AM-UDM Platform Architecture'],
    accentColor: '#3a7065',
    badge: 'Current Leadership Role',
  },
  'AB InBev': {
    tags: ['Azure Databricks', 'Insights Copilot', 'NL2SQL', 'Data Quality Framework', 'FMCG Lakehouse'],
    keyStats: ['+$1.7M Sales Uplift', '5+ Global Business Verticals', 'Enterprise-Scale GenAI'],
    accentColor: '#cd9f28',
  },
  'EY': {
    tags: ['Apache Spark', 'Apache Kafka', 'Azure Event Hub', 'Cosmos DB', 'Data Observability'],
    keyStats: ['Real-Time Event Streaming', 'Fault-Tolerant Replay Pipelines'],
    accentColor: '#ffe600',
  },
  'Accenture': {
    tags: ['PySpark', 'Python', 'ETL Pipelines', 'Pharmaceutical Data', 'Process Automation'],
    keyStats: ['98% Scheduling Reduction', 'Automated Release Tooling'],
    accentColor: '#A100FF',
  },
};

// Highlights key metrics, quantities, and keywords in bullet descriptions
function formatBulletWithHighlights(text: string, selectedSkill?: string | null) {
  // Regex to spotlight metrics, percentages, dollar amounts, and volumes
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
          className="rounded bg-[#e34f3c]/15 px-1 py-0.5 font-semibold text-[#e34f3c] underline decoration-[#e34f3c]/40"
        >
          {part}
        </span>
      );
    }

    if (highlightRegex.test(part)) {
      return (
        <span
          key={i}
          className="font-semibold text-[#151514] dark:text-[#f4f0e8] underline decoration-[#e34f3c]/30 decoration-1 underline-offset-2"
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
            <span className="font-mono text-xs text-[#6c6b64] dark:text-[#a8a69e]">
              Leadership, Architecture & Delivery
            </span>
            {selectedSkill && (
              <div className="mt-1 inline-flex items-center gap-1.5 font-mono text-xs text-[#e34f3c]">
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
                className="inline-flex items-center gap-1.5 rounded border border-black/20 dark:border-white/20 px-3 py-1.5 font-mono text-xs text-[#6c6b64] dark:text-[#a8a69e] hover:border-[#e34f3c] hover:text-[#e34f3c] transition-colors"
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

            <p className="max-w-2xl text-base leading-relaxed text-[#4d4c47] dark:text-[#b5b2a8] sm:text-lg">
              A chronological track of enterprise impact: from Palantir Foundry multi-tenant architectures and
              production LLM copilot deployments to multi-cloud Spark cost optimizations.
            </p>
          </div>
        </motion.div>

        {/* Timeline Stream */}
        <div className="relative flex flex-col gap-8">
          {/* Vertical Track Spine (Desktop & Tablet) */}
          <div className="hidden sm:block absolute left-[27px] top-6 bottom-6 w-px bg-gradient-to-b from-[#e34f3c] via-black/20 dark:via-white/20 to-transparent" />

          {data.map((job, index) => {
            const isExpanded = expandedIndices.includes(index);
            const meta = COMPANY_META[job.company] || {
              tags: ['Data Engineering', 'Distributed Systems'],
              keyStats: [],
              accentColor: '#e34f3c',
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
                className={`relative flex flex-col sm:flex-row items-start gap-4 sm:gap-7 transition-all duration-300`}
              >
                {/* Timeline Node Column */}
                <div className="hidden sm:flex flex-col items-center pt-6 shrink-0 z-10">
                  <div
                    className={`relative flex h-14 w-14 items-center justify-center rounded-xl border transition-all duration-300 ${
                      isCurrent
                        ? 'border-[#e34f3c] bg-white dark:bg-[#1a1a18] shadow-md shadow-[#e34f3c]/10'
                        : isExpanded
                        ? 'border-black/40 dark:border-white/40 bg-white dark:bg-[#1a1a18]'
                        : 'border-black/20 dark:border-white/20 bg-[#f4f0e8] dark:bg-[#121211]'
                    }`}
                  >
                    <CompanyLogo company={job.company} className="h-6 max-w-[42px]" />
                    {isCurrent && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e34f3c] opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#e34f3c]" />
                      </span>
                    )}
                  </div>
                  <span className="mt-2 font-mono text-[10px] text-[#8a877d] uppercase tracking-wider">
                    0{index + 1}
                  </span>
                </div>

                {/* Main Experience Card */}
                <div
                  className={`group relative flex-1 rounded-xl border transition-all duration-300 overflow-hidden w-full ${
                    isExpanded
                      ? 'border-black/30 dark:border-white/30 bg-white/90 dark:bg-[#151514]/90 shadow-lg'
                      : 'border-black/15 dark:border-white/15 bg-white/50 dark:bg-[#151514]/40 hover:border-black/30 dark:hover:border-white/30 hover:bg-white/80 dark:hover:bg-[#151514]/70'
                  } ${hasSkillMatch ? 'ring-2 ring-[#e34f3c]/50' : ''}`}
                >
                  {/* Card Header (Clickable Accordion Trigger) */}
                  <div
                    onClick={() => toggleIndex(index)}
                    className="cursor-pointer p-5 sm:p-7 flex flex-col gap-4 select-none"
                  >
                    {/* Top Row: Meta Badge & Dates */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Mobile Logo Fallback */}
                        <div className="sm:hidden flex items-center pr-2 border-r border-black/15 dark:border-white/15">
                          <CompanyLogo company={job.company} className="h-5 max-w-[80px]" />
                        </div>

                        {meta.badge && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3a7065]/10 dark:bg-[#3a7065]/20 border border-[#3a7065]/30 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#3a7065] dark:text-[#52a393]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#3a7065] animate-pulse" />
                            {meta.badge}
                          </span>
                        )}

                        {hasSkillMatch && (
                          <span className="inline-flex items-center gap-1 bg-[#e34f3c] text-white text-[10px] font-mono uppercase px-2 py-0.5 rounded-full">
                            <Check className="h-3 w-3" />
                            Skill Match
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 font-mono text-xs text-[#6c6b64] dark:text-[#a8a69e]">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-[#e34f3c]" />
                          <span className="font-medium text-[#151514] dark:text-[#f4f0e8]">{job.dates}</span>
                        </span>
                        <span className="hidden md:inline">·</span>
                        <span className="hidden md:flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{job.location}</span>
                        </span>
                      </div>
                    </div>

                    {/* Mid Row: Role Title & Toggle Action */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-xl sm:text-2xl lg:text-2xl font-semibold text-[#151514] dark:text-[#f4f0e8] leading-tight tracking-tight group-hover:text-[#e34f3c] transition-colors">
                          {job.role}
                        </h3>
                      </div>

                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-black/20 dark:border-white/20 transition-all duration-300 ${
                          isExpanded
                            ? 'bg-[#151514] text-white dark:bg-[#f4f0e8] dark:text-[#151514] rotate-180'
                            : 'text-[#6c6b64] dark:text-[#a8a69e] group-hover:border-[#e34f3c] group-hover:text-[#e34f3c]'
                        }`}
                        title={isExpanded ? 'Collapse' : 'Expand'}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Key Stat Badges Row */}
                    {meta.keyStats && meta.keyStats.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {meta.keyStats.map((stat, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 rounded-md border border-black/10 dark:border-white/10 bg-black/[0.025] dark:bg-white/[0.03] px-2.5 py-1 text-xs font-mono font-medium text-[#151514] dark:text-[#f4f0e8]"
                          >
                            <TrendingUp className="h-3 w-3 text-[#e34f3c]" />
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
                              className={`rounded px-2 py-0.5 font-mono text-[11px] transition-colors ${
                                isTagMatch
                                  ? 'bg-[#e34f3c] text-white font-semibold'
                                  : 'border border-black/10 dark:border-white/10 text-[#6c6b64] dark:text-[#a8a69e]'
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
                        className="overflow-hidden border-t border-black/10 dark:border-white/10 bg-black/[0.015] dark:bg-white/[0.01]"
                      >
                        <div className="p-5 sm:p-7 flex flex-col gap-4">
                          <div className="flex items-center justify-between pb-1">
                            <span className="font-mono text-xs uppercase tracking-wider text-[#e34f3c] font-semibold">
                              Key Deliverables & Architectural Scope ({job.bullets.length})
                            </span>
                            <span className="font-mono text-xs text-[#8a877d]">
                              Role Details
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
                                  className={`relative flex items-start gap-3.5 rounded-lg border p-3.5 sm:p-4 text-sm sm:text-[15px] leading-relaxed transition-colors ${
                                    isBulletMatch
                                      ? 'border-[#e34f3c] bg-[#e34f3c]/5 shadow-sm text-[#151514] dark:text-[#f4f0e8]'
                                      : 'border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/30 text-[#4d4c47] dark:text-[#b5b2a8] hover:border-black/25 dark:hover:border-white/25'
                                  }`}
                                >
                                  <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#e34f3c]/15 text-[#e34f3c]">
                                    <CheckCircle2 className="h-3 w-3" />
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
