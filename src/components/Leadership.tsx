import React from 'react';
import { motion } from 'motion/react';
import { Users } from 'lucide-react';

export default function Leadership({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="leadership" className="relative flex min-h-[50vh] flex-col items-center justify-center px-6 py-24 sm:px-12 lg:px-24">
      <div className="z-10 flex w-full max-w-5xl flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-teal-400/20 bg-teal-400/10 text-teal-400 backdrop-blur-md">
              <Users className="h-6 w-6" />
            </div>
            <h2 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">
              Leadership & Impact
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-white/5 bg-white/[0.01] p-8 backdrop-blur-xl transition-all hover:border-teal-400/30 hover:bg-white/[0.03] hover:shadow-2xl hover:shadow-teal-900/20"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold text-teal-400">
                  {item.area}
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  {item.details}
                </p>
              </div>

              {/* Decorative gradient overlay */}
              <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-teal-400/10 blur-3xl transition-all group-hover:bg-teal-400/20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
