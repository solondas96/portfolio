import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Cpu, Sparkles, TrendingDown } from 'lucide-react';
import { CASE_STUDIES, CaseStudy } from '../data/caseStudies';
import CaseStudyModal from './CaseStudyModal';

const getTagIcon = (tag: string) => {
  if (tag.includes('Multimodal')) return Sparkles;
  if (tag.includes('FinOps') || tag.includes('Cost')) return TrendingDown;
  return Cpu;
};

export default function CaseStudies() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  return (
    <>
      <section id="case-studies" className="portfolio-section px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="grid gap-5 border-t border-black/20 dark:border-white/20 pt-5 lg:grid-cols-[1fr_2fr]"
          >
            <p className="section-kicker">Architecture Spotlight</p>
            <div>
              <h2 className="section-title text-[#151514] dark:text-[#f4f0e8]">
                Systems designed for scale, precision, and business impact.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#4d4c47] dark:text-[#b5b2a8] sm:text-lg">
                Interactive architecture deep-dives highlighting the engineering decisions, pipelines, and verified outcomes behind my marquee platform builds.
              </p>
            </div>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 border-t border-black/20 dark:border-white/20 lg:grid-cols-3">
            {CASE_STUDIES.map((study, index) => {
              const Icon = getTagIcon(study.tag);
              return (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex flex-col justify-between border-b border-black/20 dark:border-white/20 py-8 lg:border-r lg:last:border-r-0 lg:px-8 lg:first:pl-0 lg:last:pr-0 transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center border border-black/20 dark:border-white/20 text-[#e34f3c]">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#e34f3c]">
                          {study.organization}
                        </span>
                      </div>
                      <span className="text-xs text-[#6c6b64] dark:text-[#78766e] font-mono">
                        {study.timeline}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-medium leading-snug text-[#151514] dark:text-[#f4f0e8] group-hover:text-[#e34f3c] transition-colors">
                        {study.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#4d4c47] dark:text-[#b5b2a8]">
                        {study.subtitle}
                      </p>
                    </div>

                    {/* Metric Highlights */}
                    <div className="grid grid-cols-2 gap-3 border-y border-black/10 dark:border-white/10 py-3 my-2">
                      {study.metrics.slice(0, 2).map((m, mi) => (
                        <div key={mi} className="flex flex-col">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#6c6b64] dark:text-[#78766e]">
                            {m.label}
                          </span>
                          <span className="text-base font-bold text-[#e34f3c]">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {study.techStack.slice(0, 4).map((tech, ti) => (
                        <span
                          key={ti}
                          className="border border-black/15 dark:border-white/15 px-2 py-0.5 text-[11px] font-mono text-[#4d4c47] dark:text-[#a8a69d]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-black/10 dark:border-white/10">
                    <button
                      onClick={() => setSelectedCaseStudy(study)}
                      className="inline-flex w-full items-center justify-between bg-[#151514] dark:bg-[#f4f0e8] px-4 py-2.5 text-xs font-semibold text-white dark:text-[#141413] hover:bg-[#e34f3c] dark:hover:bg-[#e34f3c] dark:hover:text-white transition-colors"
                    >
                      <span>Explore Architecture</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </>
  );
}
