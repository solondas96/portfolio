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
      <div className="z-10 flex w-full max-w-6xl flex-col items-center gap-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-400/40 bg-orange-500/15 px-4 py-1.5 text-sm font-medium text-orange-300 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
            </span>
            Available for new opportunities
          </motion.div>
          
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
            <span className="block text-slate-100">{data.name}</span>
            <span className="mt-2 block bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              {data.title.split(' | ')[0] || data.title.split(' & ')[0]}
            </span>
            <span className="mt-3 block text-lg font-medium tracking-normal text-slate-300 sm:text-xl lg:text-2xl">
              {data.title.includes(' | ') ? data.title.split(' | ')[1] : (data.title.includes(' & ') ? `& ${data.title.split(' & ')[1]}` : '')}
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.2 } }}
          className="max-w-3xl rounded-3xl border border-slate-800/80 bg-slate-900/75 p-6 text-lg font-medium leading-relaxed text-slate-200 shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-xl sm:text-xl"
        >
          {data.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap justify-center gap-4 pt-4"
        >
          <motion.a
            href="#experience"
            whileHover={{ y: -3, scale: 1.03, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-orange-600 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-orange-500 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">View Experience</span>
            <ArrowDown className="relative z-10 h-4 w-4 transition-transform group-hover:translate-y-1" />
          </motion.a>

          <motion.a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=solondas96@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3, scale: 1.03, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-slate-700/80 bg-slate-800/70 px-6 py-4 text-sm font-semibold text-slate-100 backdrop-blur-md transition-all hover:bg-slate-700/80 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Email</span>
            <Mail className="relative z-10 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </motion.a>

          <motion.button
            onClick={handleCopyPhone}
            whileHover={{ y: -3, scale: 1.03, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-slate-700/80 bg-slate-800/70 px-6 py-4 text-sm font-semibold text-slate-100 backdrop-blur-md transition-all hover:bg-slate-700/80 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="relative z-10">{copied ? 'Copied!' : '+91-7008482584'}</span>
            {copied ? (
              <Check className="relative z-10 h-4 w-4 text-emerald-400" />
            ) : (
              <Phone className="relative z-10 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            )}
          </motion.button>

          {data.links?.map((link: any, index: number) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.03, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-slate-700/80 bg-slate-800/70 px-6 py-4 text-sm font-semibold text-slate-100 backdrop-blur-md transition-all hover:bg-slate-700/80 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">{link.name}</span>
              <ExternalLink className="relative z-10 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </motion.a>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
