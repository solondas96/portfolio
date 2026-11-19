import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, BookOpen, ChevronDown, Sparkles } from 'lucide-react';
import { ARTICLES, Article } from '../data/articles';

const CATEGORIES = [
  'All',
  'Agentic AI & LLMs',
  'Spark & Big Data',
  'Architecture & Systems',
] as const;

export default function Writing() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAll, setShowAll] = useState<boolean>(false);

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      if (selectedCategory === 'All') return true;
      if (selectedCategory === 'Agentic AI & LLMs') {
        return (
          article.tag.includes('AI') ||
          article.tag.includes('Agentic') ||
          article.tag.includes('VLMs')
        );
      }
      if (selectedCategory === 'Spark & Big Data') {
        return (
          article.tag.includes('Spark') ||
          article.tag.includes('Distributed') ||
          article.tag.includes('ETL')
        );
      }
      if (selectedCategory === 'Architecture & Systems') {
        return (
          article.tag.includes('Palantir') ||
          article.tag.includes('System') ||
          article.tag.includes('Architecture')
        );
      }
      return true;
    });
  }, [selectedCategory]);

  const visibleArticles = showAll ? filteredArticles : filteredArticles.slice(0, 5);

  return (
    <section id="writing" className="portfolio-section px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="grid gap-6 border-t border-black/20 dark:border-white/20 pt-5 lg:grid-cols-[1fr_2fr]"
        >
          <div className="flex flex-col gap-2">
            <p className="section-kicker">Publications & Insights</p>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#e34f3c] font-semibold">
                Towards Data Engineering
              </span>
              <span className="text-xs font-mono text-[#6c6b64] dark:text-[#78766e]">
                · Medium (@solondas96)
              </span>
            </div>
          </div>

          <div>
            <h2 className="section-title text-[#151514] dark:text-[#f4f0e8]">
              Deconstructing architectures in public.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#4d4c47] dark:text-[#b5b2a8] sm:text-lg">
              Published technical deep-dives on AI Operating Systems, production Agentic workflows, Palantir Foundry, Multimodal VLMs, and distributed Apache Spark optimization.
            </p>
          </div>
        </motion.div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-black/20 dark:border-white/20 py-4">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowAll(false);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-mono transition-all ${
                    isSelected
                      ? 'bg-[#151514] text-white dark:bg-[#f4f0e8] dark:text-[#151514] shadow-sm'
                      : 'border border-black/15 dark:border-white/15 text-[#6c6b64] dark:text-[#a8a69e] hover:border-black/40 dark:hover:border-white/40 hover:text-[#151514] dark:hover:text-[#f4f0e8]'
                  }`}
                >
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>

          <span className="font-mono text-xs text-[#6c6b64] dark:text-[#a8a69e]">
            Showing {visibleArticles.length} of {filteredArticles.length} articles
          </span>
        </div>

        {/* Articles List */}
        <div className="border-t border-black/20 dark:border-white/20">
          <AnimatePresence mode="wait">
            {visibleArticles.map((article: Article, index: number) => (
              <motion.a
                key={article.url}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group grid grid-cols-1 gap-4 border-b border-black/20 dark:border-white/20 py-7 md:grid-cols-[140px_1fr_130px] md:items-baseline md:gap-8 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors px-2"
              >
                {/* Index & Category Tag */}
                <div className="flex flex-wrap items-center gap-2 md:flex-col md:items-start md:gap-1.5">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#6c6b64] dark:text-[#a8a69e]">
                    <span className="font-semibold text-[#e34f3c]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>·</span>
                    <span>{article.date}</span>
                  </div>
                  <span className="rounded border border-black/15 dark:border-white/15 px-2 py-0.5 font-mono text-[11px] text-[#6c6b64] dark:text-[#a8a69e] bg-black/[0.02] dark:bg-white/[0.02]">
                    {article.tag}
                  </span>
                </div>

                {/* Article Content */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-medium text-[#151514] dark:text-[#f4f0e8] group-hover:text-[#e34f3c] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#4d4c47] dark:text-[#b5b2a8] max-w-3xl">
                    {article.summary}
                  </p>
                </div>

                {/* Read Time & Action */}
                <div className="flex items-center justify-between gap-3 md:justify-end">
                  <span className="font-mono text-xs text-[#6c6b64] dark:text-[#a8a69e] whitespace-nowrap">
                    {article.readTime}
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center border border-black/20 dark:border-white/20 text-[#151514] dark:text-[#f4f0e8] group-hover:bg-[#e34f3c] group-hover:border-[#e34f3c] group-hover:text-white transition-colors">
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>

        {/* Show More / Show Less Toggle Button */}
        {filteredArticles.length > 5 && (
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 rounded border border-black/25 dark:border-white/25 px-5 py-2.5 font-mono text-xs font-semibold text-[#151514] dark:text-[#f4f0e8] hover:border-[#e34f3c] hover:text-[#e34f3c] transition-colors"
            >
              <span>{showAll ? 'Show Fewer Publications' : `View All ${filteredArticles.length} Publications`}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  showAll ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        )}

        {/* View Medium Profile CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-black/20 dark:border-white/20 pt-6">
          <p className="text-sm text-[#4d4c47] dark:text-[#b5b2a8]">
            All articles originally published under <span className="font-semibold text-[#151514] dark:text-[#f4f0e8]">Towards Data Engineering</span>.
          </p>
          <a
            href="https://medium.com/@solondas96"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border border-black/30 dark:border-white/30 px-4 py-2 font-mono text-xs font-semibold text-[#151514] dark:text-[#f4f0e8] hover:border-[#e34f3c] hover:text-[#e34f3c] transition-colors"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Follow on Medium (@solondas96)</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
