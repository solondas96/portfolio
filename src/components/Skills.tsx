import React from 'react';
import { motion } from 'motion/react';
import { Code2 } from 'lucide-react';

export default function Skills({ data }: { data: any[] }) {
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
            <h2 className="text-4xl font-bold tracking-tighter text-gray-100 sm:text-5xl">
              Technical Arsenal
            </h2>
          </div>
          <p className="max-w-2xl text-lg text-slate-300">
            The tools, languages, and frameworks I use to build reliable, high-impact data and AI platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {data.map((skillGroup, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
              className="group relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-8 backdrop-blur-xl transition-all hover:border-orange-400/40 hover:bg-slate-800/80 hover:shadow-[0_12px_40px_rgba(249,115,22,0.12)]"
            >
              <h3 className="text-2xl font-bold text-slate-100">
                {skillGroup.group}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((item: string, i: number) => (
                  <span
                    key={i}
                    className="rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-300 transition-colors hover:bg-orange-500/20"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Decorative gradient overlay */}
              <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl transition-all group-hover:bg-orange-500/20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
