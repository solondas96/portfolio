import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquareQuote, ChevronDown, Sparkles } from 'lucide-react';

interface Testimonial {
  name: string;
  title: string;
  date: string;
  text: string;
  category?: 'leadership' | 'architecture' | 'product';
}

const CATEGORIES = [
  { id: 'all', label: 'All Reviews' },
  { id: 'leadership', label: 'Leadership & Mentorship' },
  { id: 'architecture', label: 'Architecture & AI' },
  { id: 'product', label: 'Product & Business' },
];

export default function Testimonials({ data }: { data: Testimonial[] }) {
  const [activeTab, setActiveTab] = useState('all');
  const [expanded, setExpanded] = useState(false);

  // Classify testimonials by persona if not explicit
  const categorizedData = useMemo(() => {
    return data.map((t) => {
      const lower = `${t.title} ${t.text}`.toLowerCase();
      let category: 'leadership' | 'architecture' | 'product' = 'architecture';
      if (lower.includes('mentor') || lower.includes('guidance') || lower.includes('leadership role') || lower.includes('engineering manager')) {
        category = 'leadership';
      } else if (lower.includes('product manager') || lower.includes('product owner') || lower.includes('product @') || lower.includes('revenue') || lower.includes('sales')) {
        category = 'product';
      }
      return { ...t, category };
    });
  }, [data]);

  const filteredData = useMemo(() => {
    if (activeTab === 'all') return categorizedData;
    return categorizedData.filter((t) => t.category === activeTab);
  }, [categorizedData, activeTab]);

  const displayedData = expanded ? filteredData : filteredData.slice(0, 4);

  if (!data || data.length === 0) return null;

  return (
    <section id="testimonials" className="portfolio-section px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
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
            <p className="section-kicker">Endorsements</p>
            <span className="font-mono text-xs text-[#6c6b64] dark:text-[#78766e]">
              13 Recommendations from Leaders
            </span>
          </div>
          <div>
            <h2 className="section-title text-[#151514] dark:text-[#f4f0e8]">
              Trusted in the work.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#4d4c47] dark:text-[#b5b2a8] sm:text-lg">
              What engineering managers, principal architects, and product partners have to say about working alongside me on enterprise AI and data platforms.
            </p>
          </div>
        </motion.div>

        {/* Persona Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-black/15 dark:border-white/15 pb-4">
          {CATEGORIES.map((cat) => {
            const count =
              cat.id === 'all'
                ? categorizedData.length
                : categorizedData.filter((d) => d.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveTab(cat.id);
                  setExpanded(false);
                }}
                className={`inline-flex items-center gap-2 border px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === cat.id
                    ? 'border-[#e34f3c] bg-[#e34f3c] text-white'
                    : 'border-black/20 dark:border-white/20 text-[#151514] dark:text-[#f4f0e8] hover:border-[#e34f3c]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`font-mono text-[10px] ${
                    activeTab === cat.id ? 'text-white/80' : 'text-[#6c6b64] dark:text-[#78766e]'
                  }`}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 border-t border-black/20 dark:border-white/20 md:grid-cols-2">
          {displayedData.map((testimonial, index) => (
            <motion.div
              key={`${activeTab}-${index}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
              className="group flex min-h-80 flex-col justify-between gap-6 border-b border-black/20 dark:border-white/20 py-7 md:px-7 md:odd:border-r md:first:pl-0 hover:bg-black/[0.015] dark:hover:bg-white/[0.015] transition-colors"
            >
              <div>
                <MessageSquareQuote className="mb-5 h-7 w-7 text-[#e34f3c]" />
                <p className="text-base leading-relaxed text-[#4d4c47] dark:text-[#b5b2a8] whitespace-pre-line">
                  "{testimonial.text}"
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-1 border-t border-black/15 dark:border-white/15 pt-5">
                <h4 className="font-bold text-[#151514] dark:text-[#f4f0e8] flex items-center justify-between">
                  <span>{testimonial.name}</span>
                  <span className="font-mono text-[10px] uppercase text-[#e34f3c] tracking-wider">
                    Verified
                  </span>
                </h4>
                <p
                  className="text-xs font-medium text-[#e34f3c] line-clamp-2"
                  title={testimonial.title}
                >
                  {testimonial.title}
                </p>
                <p className="mt-1 font-mono text-xs text-[#6c6b64] dark:text-[#78766e]">
                  {testimonial.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expand / Collapse Button */}
        {filteredData.length > 4 && (
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className="group inline-flex items-center gap-2 border border-black/30 dark:border-white/30 px-6 py-3 text-xs font-semibold text-[#151514] dark:text-[#f4f0e8] hover:bg-[#e34f3c] hover:border-[#e34f3c] hover:text-white transition-all"
            >
              <span>
                {expanded
                  ? 'Show fewer recommendations'
                  : `Show all ${filteredData.length} recommendations in this category`}
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
