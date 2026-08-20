import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Mail } from 'lucide-react';

export default function ClosingCTA({ email, links }: { email: string; links: { name: string; url: string }[] }) {
  return (
    <section className="portfolio-section px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="mx-auto flex max-w-[1440px] flex-col gap-7 border-y border-black/20 py-10 sm:py-14"
      >
        <span className="section-kicker">
          Open to new opportunities
        </span>

        <h2 className="max-w-5xl font-[family-name:var(--font-display)] text-[clamp(2.8rem,7vw,7rem)] font-medium leading-[0.93] text-[#151514]">
          Let's build something exceptional together
        </h2>

        <p className="max-w-2xl text-base leading-relaxed text-[#4d4c47] sm:text-lg">
          Whether it's scaling a GenAI platform, architecting a data foundation, or just talking shop, I'd love to hear from you.
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=solondas96@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-[#151514] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e34f3c]"
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
              className="group inline-flex items-center gap-2 border border-black/30 px-5 py-3 text-sm font-semibold text-[#151514] transition-colors hover:border-[#e34f3c] hover:text-[#e34f3c]"
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
