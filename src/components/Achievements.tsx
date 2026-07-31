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
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10 text-orange-400 backdrop-blur-md">
              <Trophy className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-gray-100 sm:text-4xl lg:text-5xl">
              Key Achievements
            </h2>
          </div>
          <p className="max-w-2xl text-base text-slate-300 sm:text-lg">
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
              whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-white/12 bg-slate-900/80 p-8 backdrop-blur-xl transition-all hover:border-orange-400/40 hover:bg-slate-800/80 hover:shadow-[0_12px_40px_rgba(249,115,22,0.12)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 transition-transform group-hover:scale-110">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  Impact
                </span>
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="text-5xl font-bold tracking-tighter text-slate-100">
                  {achievement.metric}
                </h3>
                <p className="text-base font-semibold text-cyan-300 sm:text-lg">
                  {achievement.title}
                </p>
                <p className="text-sm leading-relaxed text-slate-300">
                  {achievement.context}
                </p>
              </div>

              {/* Decorative gradient overlay */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl transition-all group-hover:bg-orange-500/20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
