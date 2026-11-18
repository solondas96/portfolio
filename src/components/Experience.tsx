import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check } from 'lucide-react';

interface ExperienceProps {
  data: any[];
  selectedSkill?: string | null;
}

export default function Experience({ data, selectedSkill }: ExperienceProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  // If a skill is selected, auto-expand the first role that matches
  useEffect(() => {
    if (!selectedSkill) return;
    const query = selectedSkill.toLowerCase();
    const matchIdx = data.findIndex(
      (job) =>
        job.role.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.bullets.some((b: string) => b.toLowerCase().includes(query))
    );
    if (matchIdx !== -1) {
      setExpandedIndex(matchIdx);
    }
  }, [selectedSkill, data]);

  return (
    <section id="experience" className="portfolio-section px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="grid gap-5 border-t border-black/20 dark:border-white/20 pt-5 lg:grid-cols-[1fr_2fr]"
        >
          <div className="flex flex-col gap-1">
            <p className="section-kicker">01 / Experience</p>
            {selectedSkill && (
              <span className="font-mono text-xs text-[#e34f3c]">
                Filtered: "{selectedSkill}"
              </span>
            )}
          </div>
          <div>
            <h2 className="section-title text-[#151514] dark:text-[#f4f0e8]">
              Work that made complex systems move faster.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#4d4c47] dark:text-[#b5b2a8] sm:text-lg">
              A timeline of my professional journey, highlighting the distributed platforms, leadership, and business impact behind each chapter.
            </p>
          </div>
        </motion.div>

        <div className="border-t border-black/20 dark:border-white/20">
          {data.map((job, index) => {
            const hasSkillMatch =
              selectedSkill &&
              (job.role.toLowerCase().includes(selectedSkill.toLowerCase()) ||
                job.company.toLowerCase().includes(selectedSkill.toLowerCase()) ||
                job.bullets.some((b: string) => b.toLowerCase().includes(selectedSkill.toLowerCase())));

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group border-b border-black/20 dark:border-white/20 transition-all duration-300 ${
                  expandedIndex === index
                    ? 'bg-[#e9e4da] dark:bg-[#1f1f1d]'
                    : 'hover:bg-[#ede9df] dark:hover:bg-[#181817]'
                } ${hasSkillMatch ? 'border-l-4 border-l-[#e34f3c] pl-3' : ''}`}
              >
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="grid w-full grid-cols-[1fr_auto] gap-5 px-0 py-6 text-left sm:py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]"
                >
                  <div className="col-span-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 lg:col-span-1 lg:block">
                    <p className="whitespace-nowrap text-sm font-mono font-medium text-[#6c6b64] dark:text-[#78766e]">
                      {job.dates}
                    </p>
                    <p className="text-sm text-[#6c6b64] dark:text-[#78766e] lg:mt-1">{job.location}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-medium leading-tight text-[#151514] dark:text-[#f4f0e8] sm:text-2xl">
                        {job.role}
                      </h3>
                      {hasSkillMatch && (
                        <span className="inline-flex items-center gap-1 bg-[#e34f3c] text-white text-[10px] font-mono uppercase px-1.5 py-0.5">
                          <Check className="h-3 w-3" />
                          Match
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-[#e34f3c]">{job.company}</p>
                  </div>
                  <div
                    className={`self-end flex h-9 w-9 items-center justify-center border border-black/25 dark:border-white/25 transition-transform duration-300 ${
                      expandedIndex === index
                        ? 'rotate-180 bg-[#151514] text-white dark:bg-[#f4f0e8] dark:text-[#141413]'
                        : 'text-[#151514] dark:text-[#f4f0e8]'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 lg:pl-[50%]">
                        <ul className="flex flex-col gap-3.5 border-t border-black/15 dark:border-white/15 pt-5">
                          {job.bullets.map((bullet: string, i: number) => {
                            const isBulletMatch =
                              selectedSkill &&
                              bullet.toLowerCase().includes(selectedSkill.toLowerCase());

                            return (
                              <li
                                key={i}
                                className={`flex items-start gap-3 text-sm sm:text-base leading-relaxed ${
                                  isBulletMatch
                                    ? 'text-[#151514] dark:text-[#f4f0e8] font-medium bg-[#e34f3c]/10 p-2 -ml-2 border-l-2 border-[#e34f3c]'
                                    : 'text-[#4d4c47] dark:text-[#b5b2a8]'
                                }`}
                              >
                                <span className="mt-2 flex h-1.5 w-1.5 shrink-0 bg-[#e34f3c]" />
                                <span>{bullet}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
