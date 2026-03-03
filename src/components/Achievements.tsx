import React from 'react';
import { motion } from 'motion/react';
import { Trophy, TrendingUp } from 'lucide-react';

export default function Achievements({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="achievements" className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 sm:px-12 lg:px-24">
      <div className="z-10 flex w-full max-w-5xl flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-amber-400 backdrop-blur-md">
              <Trophy className="h-6 w-6" />
            </div>
            <h2 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">
              Key Achievements
            </h2>
          </div>
          <p className="max-w-2xl text-lg text-slate-400">
            Measurable impact and significant milestones from my career.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-white/5 bg-white/[0.01] p-8 backdrop-blur-xl transition-all hover:border-amber-400/30 hover:bg-white/[0.03] hover:shadow-2xl hover:shadow-amber-900/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/10 text-amber-400 transition-transform group-hover:scale-110">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
                  Impact
                </span>
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="text-5xl font-bold tracking-tighter text-white">
                  {achievement.metric}
                </h3>
                <p className="text-lg font-semibold text-amber-400">
                  {achievement.title}
                </p>
                <p className="text-sm leading-relaxed text-slate-400">
                  {achievement.context}
                </p>
              </div>

              {/* Decorative gradient overlay */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl transition-all group-hover:bg-amber-400/20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
