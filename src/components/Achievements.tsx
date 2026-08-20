import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp } from 'lucide-react';

export default function Achievements({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="achievements" className="portfolio-section px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid gap-5 border-t border-black/20 pt-5 lg:grid-cols-[1fr_2fr]"
        >
          <p className="section-kicker">Impact</p>
          <div>
          <h2 className="section-title">Numbers worth making visible.</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#4d4c47] sm:text-lg">
            Measurable impact and significant milestones from my career.
          </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 border-t border-black/20 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col gap-4 border-b border-black/20 py-6 sm:px-6 sm:odd:border-r sm:first:pl-0 lg:nth-[3n]:border-r-0"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center border border-black/25 text-[#e34f3c]">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <span className="section-kicker">
                  Impact
                </span>
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="text-5xl font-medium tracking-tight text-[#151514]">
                  {achievement.metric}
                </h3>
                <p className="text-base font-semibold text-[#e34f3c] sm:text-lg">
                  {achievement.title}
                </p>
                <p className="text-sm leading-relaxed text-[#4d4c47]">
                  {achievement.context}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
