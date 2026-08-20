import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Mail, Phone, Check } from 'lucide-react';

export default function Hero({ data }: { data: any }) {
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+91-7008482584');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="portfolio-hero relative flex min-h-screen flex-col justify-end px-5 pb-10 pt-28 sm:px-8 lg:px-12">
      <div className="flex w-full max-w-[1440px] flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-6xl flex-col gap-5"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex w-fit items-center gap-2 border border-[#e34f3c]/40 px-3 py-1.5 text-sm font-medium text-[#a52f21]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e34f3c] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#e34f3c]"></span>
            </span>
            Available for new opportunities
          </motion.div>
          
          <h1 className="portfolio-hero-title font-[family-name:var(--font-display)] text-[#151514]">
            <span className="block">{data.name}</span>
            <span className="block text-[#e34f3c]">
              {data.title.split(' | ')[0] || data.title.split(' & ')[0]}
            </span>
            <span className="mt-4 block max-w-3xl text-lg font-medium leading-snug tracking-normal text-[#4d4c47] sm:text-xl lg:text-2xl">
              {data.title.includes(' | ') ? data.title.split(' | ')[1] : (data.title.includes(' & ') ? `& ${data.title.split(' & ')[1]}` : '')}
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl border-t border-black/20 pt-5 text-base leading-relaxed text-[#4d4c47] sm:text-lg"
        >
          {data.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap gap-3 pt-2"
        >
          <motion.a
            href="#experience"
            className="group inline-flex items-center justify-center gap-2 bg-[#151514] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e34f3c]"
          >
            <span className="relative z-10">View Experience</span>
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
          </motion.a>

          <motion.a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=solondas96@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 border border-black/30 px-5 py-3 text-sm font-semibold text-[#151514] transition-colors hover:border-[#e34f3c] hover:text-[#e34f3c]"
          >
            <span>Email</span>
            <Mail className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </motion.a>

          <motion.button
            onClick={handleCopyPhone}
            className="group inline-flex cursor-pointer items-center justify-center gap-2 border border-black/30 px-5 py-3 text-sm font-semibold text-[#151514] transition-colors hover:border-[#e34f3c] hover:text-[#e34f3c]"
          >
            <span>{copied ? 'Copied!' : '+91-7008482584'}</span>
            {copied ? (
              <Check className="h-4 w-4 text-emerald-700" />
            ) : (
              <Phone className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            )}
          </motion.button>

          {data.links?.map((link: any, index: number) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 border border-black/30 px-5 py-3 text-sm font-semibold text-[#151514] transition-colors hover:border-[#e34f3c] hover:text-[#e34f3c]"
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
