import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export default function Experience({ data }: { data: any[] }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="portfolio-section px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid gap-5 border-t border-black/20 pt-5 lg:grid-cols-[1fr_2fr]"
        >
          <p className="section-kicker">01 / Experience</p>
          <div>
            <h2 className="section-title">Work that made complex systems move faster.</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#4d4c47] sm:text-lg">
            A timeline of my professional journey, highlighting the systems, leadership, and business impact behind each chapter.
          </p>
          </div>
        </motion.div>

        <div className="border-t border-black/20">
          {data.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group border-b border-black/20 transition-colors duration-300 ${
                expandedIndex === index
                  ? 'bg-[#e9e4da]'
                  : 'hover:bg-[#ede9df]'
              }`}
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="grid w-full grid-cols-[1fr_auto] gap-5 px-0 py-6 text-left sm:py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]"
              >
                <div className="col-span-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 lg:col-span-1 lg:block">
                  <p className="whitespace-nowrap text-sm font-medium text-[#6c6b64]">{job.dates}</p>
                  <p className="text-sm text-[#6c6b64] lg:mt-1">{job.location}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-medium leading-tight text-[#151514] sm:text-2xl">{job.role}</h3>
                  <p className="text-sm font-medium text-[#e34f3c]">{job.company}</p>
                </div>
                <div className={`self-end flex h-9 w-9 items-center justify-center border border-black/25 transition-transform duration-300 ${expandedIndex === index ? 'rotate-180 bg-[#151514] text-white' : 'text-[#151514]'}`}>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>

              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 lg:pl-[50%]">
                      <ul className="flex flex-col gap-3 border-t border-black/15 pt-5">
                        {job.bullets.map((bullet: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-[#4d4c47]">
                            <span className="mt-2 flex h-1.5 w-1.5 shrink-0 bg-[#e34f3c]" />
                            <span className="leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
