import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap } from 'lucide-react';

export default function Education({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="education" className="relative flex min-h-[50vh] flex-col items-center justify-center px-6 py-24 sm:px-12 lg:px-24">
      <div className="z-10 flex w-full max-w-5xl flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-400/20 bg-purple-400/10 text-purple-400 backdrop-blur-md">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h2 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">
              Education
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-white/5 bg-white/[0.01] p-8 backdrop-blur-xl transition-all hover:border-purple-400/30 hover:bg-white/[0.03] hover:shadow-2xl hover:shadow-purple-900/20"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-white">
                  {edu.degree}
                </h3>
                <p className="text-lg font-medium text-purple-400">
                  {edu.institution}
                </p>
                <p className="text-sm font-mono text-slate-500">
                  {edu.dates}
                </p>
              </div>

              {/* Decorative gradient overlay */}
              <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-purple-400/10 blur-3xl transition-all group-hover:bg-purple-400/20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
