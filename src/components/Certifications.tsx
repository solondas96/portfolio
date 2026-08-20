import React from 'react';
import { motion } from 'motion/react';

export default function Certifications({ data }: { data: string[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="certifications" className="portfolio-section px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid gap-5 border-t border-black/20 pt-5 lg:grid-cols-[1fr_2fr]"
        >
          <p className="section-kicker">Credentials</p>
          <div>
            <h2 className="section-title">Learning, put into practice.</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#4d4c47] sm:text-lg">
              Certifications that complement hands-on work with data platforms and intelligent systems.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 border-t border-black/20 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group flex min-h-28 items-center gap-4 border-b border-black/20 py-5 sm:px-6 sm:odd:border-r sm:first:pl-0 lg:nth-[3n]:border-r-0"
            >
              <div className="h-2 w-2 shrink-0 bg-[#e34f3c]" />
              <span className="text-base font-medium text-[#151514] sm:text-lg">{cert}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
