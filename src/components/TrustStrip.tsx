import React from 'react';
import { motion } from 'motion/react';
import CompanyLogo from './CompanyLogo';

const ROLE_SUBTITLES: Record<string, string> = {
  'Swiss Re': 'AVP · Palantir Foundry',
  'AB InBev': 'Senior Data Engineer · GenAI',
  'EY': 'Senior Consultant · Big Data',
  'Accenture': 'Data Engineer · PySpark',
};

export default function TrustStrip({ companies }: { companies: string[] }) {
  if (!companies || companies.length === 0) return null;

  return (
    <section className="border-y border-black/20 dark:border-white/20 py-10 bg-black/[0.015] dark:bg-white/[0.01]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-7 px-5 sm:px-8 lg:px-12">
        <p className="section-kicker">
          Enterprise platforms delivered at
        </p>

        <div className="grid grid-cols-2 border-t border-black/20 dark:border-white/20 sm:grid-cols-4">
          {companies.map((company, i) => (
            <motion.div
              key={company}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col justify-between gap-5 border-b border-black/20 dark:border-white/20 py-6 text-left sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
            >
              {/* Actual Official Logo */}
              <div className="flex h-10 items-center">
                <CompanyLogo company={company} className="h-8 max-w-[140px]" />
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold tracking-tight text-[#151514] dark:text-[#f4f0e8]">
                  {company}
                </span>
                <span className="text-xs font-mono text-[#6c6b64] dark:text-[#78766e]">
                  {ROLE_SUBTITLES[company] || 'Data Platform Engineering'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
