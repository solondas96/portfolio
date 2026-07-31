import React from 'react';
import { motion } from 'motion/react';

// Distinct accent per card since we use stylized monograms, not official brand logos.
const ACCENTS = [
  'from-orange-400 to-red-500',
  'from-cyan-400 to-sky-500',
  'from-fuchsia-400 to-purple-500',
  'from-emerald-400 to-teal-500',
];

const getInitials = (name: string) => {
  const words = name.split(' ').filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  // Keep existing all-caps abbreviations (e.g. "AB" in "AB InBev") as-is.
  if (words[0] === words[0].toUpperCase() && words[0].length <= 3) return words[0];
  return (words[0][0] + words[1][0]).toUpperCase();
};

export default function TrustStrip({ companies }: { companies: string[] }) {
  if (!companies || companies.length === 0) return null;

  return (
    <section className="relative border-y border-white/8 bg-slate-950/40 py-14">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 sm:px-12 lg:px-24">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Enterprise platforms delivered at
        </p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {companies.map((company, i) => (
            <motion.div
              key={company}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-6 text-center backdrop-blur-md transition-colors hover:border-white/20"
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold text-white ${ACCENTS[i % ACCENTS.length]}`}
              >
                {getInitials(company)}
              </span>
              <span className="text-sm font-semibold tracking-tight text-slate-200">{company}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

