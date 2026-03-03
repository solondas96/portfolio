import React from 'react';
import { motion } from 'motion/react';
import { Award } from 'lucide-react';

export default function Certifications({ data }: { data: string[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="certifications" className="relative flex min-h-[50vh] flex-col items-center justify-center px-6 py-24 sm:px-12 lg:px-24">
      <div className="z-10 flex w-full max-w-5xl flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-400/10 text-rose-400 backdrop-blur-md">
              <Award className="h-6 w-6" />
            </div>
            <h2 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">
              Certifications
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.01] p-6 backdrop-blur-xl transition-all hover:border-rose-400/30 hover:bg-white/[0.03]"
            >
              <div className="flex h-2 w-2 shrink-0 rounded-full bg-rose-400" />
              <span className="text-lg font-medium text-slate-200">{cert}</span>
              
              {/* Decorative gradient overlay */}
              <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-rose-400/10 blur-2xl transition-all group-hover:bg-rose-400/20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
