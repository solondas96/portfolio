import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { TrendingUp } from 'lucide-react';

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState(() => {
    const match = value.match(/^([^0-9.]*)([0-9.]+)(.*)$/);
    if (match) return `${match[1]}0${match[3]}`;
    return '0';
  });

  useEffect(() => {
    if (!isInView) return;

    const match = value.match(/^([^0-9.]*)([0-9.]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || '';
    const target = parseFloat(match[2]);
    const suffix = match[3] || '';
    const hasDecimal = match[2].includes('.');

    const duration = 1200;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      setDisplayValue(
        `${prefix}${hasDecimal ? current.toFixed(1) : Math.round(current)}${suffix}`
      );

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(update);
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
}

export default function Achievements({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="achievements" className="portfolio-section px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="grid gap-5 border-t border-black/20 dark:border-white/20 pt-5 lg:grid-cols-[1fr_2fr]"
        >
          <p className="section-kicker">Impact Metrics</p>
          <div>
            <h2 className="section-title text-[#151514] dark:text-[#f4f0e8]">
              Numbers worth making visible.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#4d4c47] dark:text-[#b5b2a8] sm:text-lg">
              Measurable cost reductions, revenue gains, and operational efficiencies delivered across distributed production platforms.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 border-t border-black/20 dark:border-white/20 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative flex flex-col gap-4 border-b border-black/20 dark:border-white/20 py-7 sm:px-6 sm:odd:border-r sm:first:pl-0 lg:nth-[3n]:border-r-0 hover:bg-black/[0.015] dark:hover:bg-white/[0.015] transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center border border-black/25 dark:border-white/25 text-[#e34f3c]">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <span className="section-kicker">
                  Verified Result
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-5xl font-medium tracking-tight text-[#151514] dark:text-[#f4f0e8] font-mono">
                  <Counter value={achievement.metric} />
                </h3>
                <p className="text-base font-semibold text-[#e34f3c] sm:text-lg">
                  {achievement.title}
                </p>
                <p className="text-sm leading-relaxed text-[#4d4c47] dark:text-[#b5b2a8]">
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
