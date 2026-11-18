import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { ARTICLES } from '../data/articles';

export default function Writing() {
  return (
    <section id="writing" className="portfolio-section px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="grid gap-5 border-t border-black/20 dark:border-white/20 pt-5 lg:grid-cols-[1fr_2fr]"
        >
          <div className="flex flex-col gap-2">
            <p className="section-kicker">Publications & Insights</p>
            <span className="text-xs font-mono text-[#6c6b64] dark:text-[#78766e]">
              The Datum Theory · Medium
            </span>
          </div>
          <div>
            <h2 className="section-title text-[#151514] dark:text-[#f4f0e8]">
              Deconstructing architectures in public.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#4d4c47] dark:text-[#b5b2a8] sm:text-lg">
              Practical engineering breakdowns on Catalyst query optimization, multimodal data pipelines, LLM context budgets, and distributed event-driven systems.
            </p>
          </div>
        </motion.div>

        {/* Articles List */}
        <div className="border-t border-black/20 dark:border-white/20">
          {ARTICLES.map((article, index) => (
            <motion.a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group grid grid-cols-1 gap-4 border-b border-black/20 dark:border-white/20 py-7 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-8 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors px-2"
            >
              <div className="flex items-center gap-3 md:w-36">
                <span className="font-mono text-xs font-semibold text-[#e34f3c]">
                  0{index + 1}
                </span>
                <span className="border border-black/15 dark:border-white/15 px-2 py-0.5 font-mono text-[11px] text-[#6c6b64] dark:text-[#78766e]">
                  {article.tag}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-medium text-[#151514] dark:text-[#f4f0e8] group-hover:text-[#e34f3c] transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#4d4c47] dark:text-[#b5b2a8] max-w-3xl">
                  {article.summary}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 md:justify-end">
                <span className="font-mono text-xs text-[#6c6b64] dark:text-[#78766e] whitespace-nowrap">
                  {article.readTime}
                </span>
                <div className="flex h-8 w-8 items-center justify-center border border-black/20 dark:border-white/20 text-[#151514] dark:text-[#f4f0e8] group-hover:bg-[#e34f3c] group-hover:border-[#e34f3c] group-hover:text-white transition-colors">
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* View Medium Profile CTA */}
        <div className="flex items-center justify-between border-b border-black/20 dark:border-white/20 pb-6 pt-2">
          <p className="text-sm text-[#4d4c47] dark:text-[#b5b2a8]">
            Explore all deep-dives and research notes on Medium.
          </p>
          <a
            href="https://medium.com/@solondas96"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border border-black/30 dark:border-white/30 px-4 py-2 text-xs font-semibold text-[#151514] dark:text-[#f4f0e8] hover:border-[#e34f3c] hover:text-[#e34f3c] transition-colors"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Read on Medium (@solondas96)</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
