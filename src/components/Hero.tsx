import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ExternalLink, Mail, Phone, Check } from 'lucide-react';

export default function Hero({ data }: { data: any }) {
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+91-7008482584');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-12 sm:px-12 lg:px-24">
      <div className="z-10 flex w-full max-w-5xl flex-col items-start gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-1.5 text-sm font-medium text-sky-400 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
            </span>
            Available for new opportunities
          </div>
          
          <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl lg:text-6xl">
            {data.name}
            <br />
            <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
              {data.title.split(' | ')[0] || data.title.split(' & ')[0]}
            </span>
            <br />
            <span className="text-slate-500">
              {data.title.includes(' | ') ? data.title.split(' | ')[1] : (data.title.includes(' & ') ? `& ${data.title.split(' & ')[1]}` : '')}
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl text-lg font-medium leading-relaxed text-slate-400 sm:text-xl"
        >
          {data.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap gap-4 pt-4"
        >
          <a
            href="#experience"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-semibold text-slate-950 transition-all hover:bg-slate-200 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">View Experience</span>
            <ArrowDown className="relative z-10 h-4 w-4 transition-transform group-hover:translate-y-1" />
          </a>

          <a
            href="mailto:solondas96@gmail.com"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Email</span>
            <Mail className="relative z-10 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>

          <button
            onClick={handleCopyPhone}
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="relative z-10">{copied ? 'Copied!' : '+91-7008482584'}</span>
            {copied ? (
              <Check className="relative z-10 h-4 w-4 text-emerald-400" />
            ) : (
              <Phone className="relative z-10 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            )}
          </button>

          {data.links?.map((link: any, index: number) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">{link.name}</span>
              <ExternalLink className="relative z-10 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
        <div className="h-12 w-[1px] bg-gradient-to-b from-slate-500 to-transparent" />
      </motion.div>
    </section>
  );
}
