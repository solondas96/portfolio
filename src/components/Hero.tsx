import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Mail, Phone, Check, FileText, Clock } from 'lucide-react';
import DataFlowCanvas from './DataFlowCanvas';

export default function Hero({ data, onOpenResume }: { data: any; onOpenResume?: () => void }) {
  const [copied, setCopied] = useState(false);
  const [localTime, setLocalTime] = useState('');

  // Live Bengaluru Time (IST - UTC+5:30)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setLocalTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+91-7008482584');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="portfolio-hero relative flex min-h-screen flex-col justify-end px-5 pb-10 pt-28 sm:px-8 lg:px-12 overflow-hidden">
      {/* Background Interactive Data Flow Canvas */}
      <DataFlowCanvas />

      <div className="relative z-10 flex w-full max-w-[1440px] flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-6xl flex-col gap-5"
        >
          {/* Status and Location Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex w-fit items-center gap-2 border border-[#e34f3c]/40 px-3 py-1.5 text-xs font-mono font-medium text-[#a52f21] dark:text-[#ff705e]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e34f3c] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#e34f3c]"></span>
              </span>
              <span>Available for Leadership Opportunities</span>
            </motion.div>

            {localTime && (
              <div className="hidden sm:inline-flex items-center gap-2 border border-black/15 dark:border-white/15 px-3 py-1.5 text-xs font-mono text-[#6c6b64] dark:text-[#78766e]">
                <Clock className="h-3 w-3 text-[#e34f3c]" />
                <span>Bengaluru · {localTime} IST [UTC+5:30]</span>
              </div>
            )}
          </div>

          <h1 className="portfolio-hero-title font-[family-name:var(--font-display)] text-[#151514] dark:text-[#f4f0e8]">
            <span className="block">{data.name}</span>
            <span className="block text-[#e34f3c]">
              {data.title.includes(' | ') ? data.title.split(' | ')[0] : data.title}
            </span>
            <span className="mt-4 block max-w-3xl text-lg font-medium leading-snug tracking-normal text-[#4d4c47] dark:text-[#b5b2a8] sm:text-xl lg:text-2xl">
              {data.title.includes(' | ') ? data.title.split(' | ')[1] : ''}
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl border-t border-black/20 dark:border-white/20 pt-5 text-base leading-relaxed text-[#4d4c47] dark:text-[#b5b2a8] sm:text-lg"
        >
          {data.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-3 pt-2"
        >
          {/* Primary View Experience */}
          <motion.a
            href="#experience"
            className="group inline-flex items-center justify-center gap-2 bg-[#151514] dark:bg-[#f4f0e8] px-5 py-3 text-sm font-semibold text-white dark:text-[#141413] transition-colors hover:bg-[#e34f3c] dark:hover:bg-[#e34f3c] dark:hover:text-white"
          >
            <span>View Experience</span>
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
          </motion.a>

          {/* Quick Resume View */}
          {onOpenResume && (
            <motion.button
              onClick={onOpenResume}
              className="group inline-flex items-center justify-center gap-2 bg-[#e34f3c] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#151514] dark:hover:bg-white dark:hover:text-[#141413]"
            >
              <FileText className="h-4 w-4" />
              <span>Resume / CV</span>
            </motion.button>
          )}

          {/* Email */}
          <motion.a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=solondas96@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 border border-black/30 dark:border-white/30 px-5 py-3 text-sm font-semibold text-[#151514] dark:text-[#f4f0e8] transition-colors hover:border-[#e34f3c] hover:text-[#e34f3c]"
          >
            <span>Email</span>
            <Mail className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </motion.a>

          {/* Phone */}
          <motion.button
            onClick={handleCopyPhone}
            className="group inline-flex cursor-pointer items-center justify-center gap-2 border border-black/30 dark:border-white/30 px-5 py-3 text-sm font-semibold text-[#151514] dark:text-[#f4f0e8] transition-colors hover:border-[#e34f3c] hover:text-[#e34f3c]"
          >
            <span>{copied ? 'Copied!' : '+91-7008482584'}</span>
            {copied ? (
              <Check className="h-4 w-4 text-emerald-700" />
            ) : (
              <Phone className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            )}
          </motion.button>

          {/* External Links */}
          {data.links?.map((link: any, index: number) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 border border-black/30 dark:border-white/30 px-5 py-3 text-sm font-semibold text-[#151514] dark:text-[#f4f0e8] transition-colors hover:border-[#e34f3c] hover:text-[#e34f3c]"
            >
              <span>{link.name}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
