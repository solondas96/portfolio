import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function Leadership({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="leadership" className="portfolio-section px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid gap-5 border-t border-black/20 pt-5 lg:grid-cols-[1fr_2fr]"
        >
          <p className="section-kicker">Leadership</p>
          <div>
            <h2 className="section-title">Direction is part of the deliverable.</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#4d4c47] sm:text-lg">
              I build clarity across product, platforms, and the people who operate them.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 border-t border-black/20 md:grid-cols-3">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex min-h-56 flex-col gap-8 border-b border-black/20 py-6 md:px-6 md:border-r md:first:pl-0 md:last:border-r-0"
            >
              <div className="flex items-start justify-between gap-5">
                <span className="section-kicker">0{index + 1}</span>
                <ArrowUpRight className="h-5 w-5 text-[#e34f3c] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-medium text-[#151514]">
                  {item.area}
                </h3>
                <p className="text-sm leading-relaxed text-[#4d4c47]">
                  {item.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
