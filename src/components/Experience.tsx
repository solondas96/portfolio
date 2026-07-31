import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Briefcase } from 'lucide-react';

export default function Experience({ data }: { data: any[] }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 sm:px-12 lg:px-24">
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
              <Briefcase className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-gray-100 sm:text-4xl lg:text-5xl">
              Experience
            </h2>
          </div>
          <p className="max-w-2xl text-base text-slate-300 sm:text-lg">
            A timeline of my professional journey, highlighting the systems, leadership, and business impact behind each chapter.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {data.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
              className={`group relative overflow-hidden rounded-3xl border transition-all duration-300 ${
                expandedIndex === index
                  ? 'border-orange-400/40 bg-slate-900/90 shadow-[0_12px_34px_rgba(249,115,22,0.12)]'
                  : 'border-white/12 bg-slate-900/70 hover:border-slate-700 hover:bg-slate-800/80'
              } backdrop-blur-xl`}
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-6 sm:p-8 text-left"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-semibold text-slate-100 sm:text-2xl">
                      {job.role}
                    </h3>
                    <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400">
                      {job.dates}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="font-medium text-slate-200">{job.company}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-slate-700/80 bg-slate-800/70 transition-transform duration-300 ${expandedIndex === index ? 'rotate-180 bg-slate-700/80' : ''}`}>
                  <ChevronDown className="h-5 w-5 text-slate-400" />
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
                    <div className="px-6 pb-8 pt-0 sm:px-8">
                      <div className="mb-6 h-[1px] w-full bg-gradient-to-r from-slate-300/70 to-transparent" />
                      <ul className="flex flex-col gap-4">
                        {job.bullets.map((bullet: string, i: number) => (
                          <li key={i} className="flex items-start gap-4 text-slate-300">
                            <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                            <span className="leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
