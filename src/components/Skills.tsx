import React from 'react';
import { motion } from 'motion/react';
import { Braces, Cpu, Database, Sparkles, Wrench, X } from 'lucide-react';

type SkillGroup = {
  group: string;
  items: string[];
};

interface SkillsProps {
  data: SkillGroup[];
  selectedSkill?: string | null;
  onSelectSkill?: (skill: string | null) => void;
}

const getGroupIcon = (groupName: string) => {
  const normalized = groupName.toLowerCase();
  if (normalized.includes('platform') || normalized.includes('data')) return Database;
  if (normalized.includes('ai')) return Sparkles;
  if (normalized.includes('programming') || normalized.includes('code')) return Braces;
  if (normalized.includes('governance') || normalized.includes('model')) return Cpu;
  return Wrench;
};

export default function Skills({ data, selectedSkill, onSelectSkill }: SkillsProps) {
  if (!data || data.length === 0) return null;

  return (
    <section id="skills" className="portfolio-section px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="grid gap-5 border-t border-black/20 dark:border-white/20 pt-5 lg:grid-cols-[1fr_2fr]"
        >
          <div className="flex flex-col gap-2">
            <p className="section-kicker">Capabilities</p>
            {selectedSkill && (
              <span className="font-mono text-xs text-[#e34f3c]">
                Filtered by: {selectedSkill}
              </span>
            )}
          </div>
          <div>
            <h2 className="section-title text-[#151514] dark:text-[#f4f0e8]">
              Technical depth, put to work.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#4d4c47] dark:text-[#b5b2a8] sm:text-lg">
              The distributed systems, languages, and AI frameworks I use to build resilient, high-throughput enterprise platforms. Click any capability to cross-filter work history.
            </p>
          </div>
        </motion.div>

        {/* Active Skill Filter Banner */}
        {selectedSkill && onSelectSkill && (
          <div className="flex items-center justify-between border border-[#e34f3c] bg-[#e34f3c]/10 px-4 py-2 text-xs">
            <span className="font-medium text-[#151514] dark:text-[#f4f0e8]">
              Cross-filtering portfolio by: <strong className="text-[#e34f3c]">{selectedSkill}</strong>
            </span>
            <button
              onClick={() => onSelectSkill(null)}
              className="inline-flex items-center gap-1 font-bold text-[#e34f3c] hover:underline"
            >
              <span>Clear Filter</span>
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 border-t border-black/20 dark:border-white/20 md:grid-cols-2 xl:grid-cols-4">
          {data.map((skillGroup, index) => {
            const GroupIcon = getGroupIcon(skillGroup.group);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group flex min-h-64 flex-col border-b border-black/20 dark:border-white/20 py-6 md:px-6 md:odd:border-r md:first:pl-0 xl:border-r xl:last:border-r-0"
              >
                <div className="mb-5 flex items-start gap-3">
                  <div className="border border-black/25 dark:border-white/25 p-2 text-[#e34f3c]">
                    <GroupIcon className="h-4 w-4" />
                  </div>
                  <h3 className="text-xl font-semibold leading-tight text-[#151514] dark:text-[#f4f0e8]">
                    {skillGroup.group}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item: string, i: number) => {
                    const isSelected = selectedSkill?.toLowerCase() === item.toLowerCase();
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          if (onSelectSkill) {
                            onSelectSkill(isSelected ? null : item);
                          }
                        }}
                        className={`cursor-pointer border px-2 py-1 text-xs font-medium tracking-wide transition-all ${
                          isSelected
                            ? 'border-[#e34f3c] bg-[#e34f3c] text-white shadow-sm'
                            : 'border-black/20 dark:border-white/20 text-[#4d4c47] dark:text-[#b5b2a8] hover:border-[#e34f3c] hover:text-[#e34f3c]'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-auto pt-6">
                  <div className="h-px w-full bg-black/15 dark:bg-white/15" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
