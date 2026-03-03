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
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400 backdrop-blur-md">
              <Code2 className="h-6 w-6" />
            </div>
            <h2 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">
              Technical Arsenal
            </h2>
          </div>
          <p className="max-w-2xl text-lg text-slate-400">
            The tools, languages, and frameworks I use to build digital products.
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
              className="group relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-white/5 bg-white/[0.01] p-8 backdrop-blur-xl transition-all hover:border-emerald-400/30 hover:bg-white/[0.03] hover:shadow-2xl hover:shadow-emerald-900/20"
            >
              <h3 className="text-2xl font-bold text-white">
                {skillGroup.group}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((item: string, i: number) => (
                  <span
                    key={i}
                    className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-400/20"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Decorative gradient overlay */}
              <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl transition-all group-hover:bg-emerald-400/20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
