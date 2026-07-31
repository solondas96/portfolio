import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Mail } from 'lucide-react';

export default function ClosingCTA({ email, links }: { email: string; links: { name: string; url: string }[] }) {
  return (
    <section className="relative px-6 py-24 sm:px-12 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 overflow-hidden rounded-[2.5rem] border border-white/12 bg-slate-900/80 px-8 py-16 text-center backdrop-blur-xl sm:px-16"
      >
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-0 h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" />

        <span className="relative z-10 inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-orange-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-orange-300">
          Open to new opportunities
        </span>

        <h2 className="relative z-10 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl lg:text-5xl">
          Let's build something exceptional together
        </h2>

        <p className="relative z-10 max-w-xl text-base text-slate-300 sm:text-lg">
          Whether it's scaling a GenAI platform, architecting a data foundation, or just talking shop — I'd love to hear from you.
        </p>

        <div className="relative z-10 mt-2 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=solondas96@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-orange-600 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-orange-500 hover:scale-105 active:scale-95"
          >
            <Mail className="h-4 w-4" />
            Email Me
          </a>
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-800/70 px-7 py-3.5 text-sm font-semibold text-slate-100 backdrop-blur-md transition-all hover:bg-slate-700/80 hover:scale-105 active:scale-95"
            >
              {link.name}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
