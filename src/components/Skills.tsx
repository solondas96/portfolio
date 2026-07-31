import React from 'react';
import { motion } from 'motion/react';
import { Braces, Code2, Cpu, Database, Sparkles, Wrench } from 'lucide-react';

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
    <section id="skills" className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 sm:px-12 lg:px-24">
      <div className="z-10 flex w-full max-w-5xl flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10 text-orange-400 backdrop-blur-md">
              <Code2 className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-gray-100 sm:text-4xl lg:text-5xl">
              Technical Arsenal
            </h2>
          </div>
          <p className="max-w-2xl text-base text-slate-300 sm:text-lg">
            The tools, languages, and frameworks I use to build reliable, high-impact data and AI platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {data.map((skillGroup, index) => {
            const GroupIcon = getGroupIcon(skillGroup.group);
            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.22 } }}
              className="group relative flex min-h-[320px] flex-col overflow-hidden rounded-3xl border border-white/12 bg-slate-900/85 p-6 backdrop-blur-xl transition-all hover:border-orange-400/45 hover:bg-slate-800/85 hover:shadow-[0_16px_56px_rgba(249,115,22,0.16)]"
            >
              <div className="mb-5 flex items-start gap-3">
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl border border-orange-400/35 bg-orange-500/10 p-2.5 text-orange-300 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                    <GroupIcon className="h-4 w-4" />
                  </div>
                  <h3 className="text-xl font-semibold leading-tight text-slate-100">
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
                    className="rounded-full border border-orange-400/25 bg-orange-500/10 px-3 py-1.5 text-xs font-medium tracking-wide text-orange-200 transition-colors hover:border-orange-300/45 hover:bg-orange-500/20"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>

              <div className="mt-auto pt-6">
                <div className="h-[1px] w-full bg-gradient-to-r from-orange-300/35 via-cyan-300/25 to-transparent" />
              </div>

              {/* Decorative gradient overlay */}
              <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-orange-500/12 blur-3xl transition-all group-hover:bg-orange-500/24" />
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
