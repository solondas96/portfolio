import React from 'react';
import { motion } from 'motion/react';
import { Braces, Cpu, Database, Sparkles, Wrench } from 'lucide-react';

type SkillGroup = {
  group: string;
  items: string[];
};

const getGroupIcon = (groupName: string) => {
  const normalized = groupName.toLowerCase();
  if (normalized.includes('platform') || normalized.includes('data')) return Database;
  if (normalized.includes('ai')) return Sparkles;
  if (normalized.includes('programming') || normalized.includes('code')) return Braces;
  if (normalized.includes('governance') || normalized.includes('model')) return Cpu;
  return Wrench;
};

export default function Skills({ data }: { data: SkillGroup[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="skills" className="portfolio-section px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid gap-5 border-t border-black/20 pt-5 lg:grid-cols-[1fr_2fr]"
        >
          <p className="section-kicker">Capabilities</p>
          <div>
          <h2 className="section-title">Technical depth, put to work.</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#4d4c47] sm:text-lg">
            The tools, languages, and frameworks I use to build reliable, high-impact data and AI platforms.
          </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 border-t border-black/20 md:grid-cols-2 xl:grid-cols-4">
          {data.map((skillGroup, index) => {
            const GroupIcon = getGroupIcon(skillGroup.group);
            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex min-h-64 flex-col border-b border-black/20 py-6 md:px-6 md:odd:border-r md:first:pl-0 xl:border-r xl:last:border-r-0"
            >
              <div className="mb-5 flex items-start gap-3">
                <div className="flex items-start gap-3">
                  <div className="border border-black/25 p-2 text-[#e34f3c]">
                    <GroupIcon className="h-4 w-4" />
                  </div>
                  <h3 className="text-xl font-semibold leading-tight text-[#151514]">
                    {skillGroup.group}
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {skillGroup.items.map((item: string, i: number) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: i * 0.03 }}
                    className="border border-black/20 px-2 py-1 text-xs font-medium tracking-wide text-[#4d4c47] transition-colors hover:border-[#e34f3c] hover:text-[#e34f3c]"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>

              <div className="mt-auto pt-6">
                <div className="h-px w-full bg-black/20" />
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
