import React from 'react';
import { motion } from 'motion/react';

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
    <section className="border-y border-black/20 py-10">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-7 px-5 sm:px-8 lg:px-12">
        <p className="section-kicker">
          Enterprise platforms delivered at
        </p>

        <div className="grid grid-cols-2 border-t border-black/20 sm:grid-cols-4">
          {companies.map((company, i) => (
            <motion.div
              key={company}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col gap-3 border-b border-black/20 py-5 text-left sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0"
            >
              <span
                className="flex h-9 w-9 items-center justify-center bg-[#e34f3c] text-sm font-bold text-white"
              >
                {getInitials(company)}
              </span>
              <span className="text-sm font-semibold tracking-tight text-[#151514]">{company}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

