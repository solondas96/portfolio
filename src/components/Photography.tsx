import React from 'react';
import { motion } from 'motion/react';
import {
  Instagram,
  ArrowUpRight,
  Camera,
  Compass,
  MapPin,
  Film,
  Eye,
  Aperture,
} from 'lucide-react';

const FOCUS_AREAS = [
  {
    icon: Compass,
    title: 'Street & Architecture',
    description: 'Angular forms, urban silhouettes, and high-contrast natural light.',
  },
  {
    icon: MapPin,
    title: 'Travel & Solitude',
    description: 'Coastal horizons, remote mountain roads, and quiet landscapes.',
  },
  {
    icon: Film,
    title: 'Cinematic Film Tones',
    description: 'Rich contrast, warm shadows, and analog-inspired color grading.',
  },
  {
    icon: Eye,
    title: 'Candid Human Moments',
    description: 'People in transit, fleeting expressions, and unposed daily life.',
  },
];

export default function Photography() {
  const instagramUrl =
    'https://www.instagram.com/frame_theory.ig?cnvx=ODJlZWVraWNmNnk3';

  return (
    <section
      id="photography"
      className="portfolio-section px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
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
            <p className="section-kicker">03 / Creative Pursuits</p>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-[#e34f3c] dark:text-[#ff705e]">
                The Frame Theory
              </span>
              <span className="font-mono text-xs text-[#6c6b64] dark:text-[#a8a69e]">
                · Photography
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="section-title text-[#151514] dark:text-[#f4f0e8]">
              People, places & moments worth remembering.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#4d4c47] dark:text-[#b5b2a8] sm:text-lg">
              When away from distributed data platforms and code, I explore visual storytelling
              under <strong className="font-semibold text-[#151514] dark:text-white">The Frame Theory</strong>.
              A photographic journal of light, geometry, quiet streets, and cinematic film tones — guided
              by the Italian philosophy of <em className="font-serif italic text-[#151514] dark:text-white">dolce far niente</em> (the sweetness of doing nothing).
            </p>
          </div>
        </motion.div>

        {/* Profile Feature Showcase Box */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#161615] p-6 sm:p-10 lg:p-12 shadow-sm"
        >
          {/* Subtle Ambient Background Accent */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#e34f3c]/5 dark:bg-[#e34f3c]/10 blur-3xl" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_1fr] items-center">
            {/* Left Column: Instagram Identity & Bio */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-black/15 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.05] text-[#e34f3c] dark:text-[#ff705e] shadow-xs">
                  <Camera className="h-8 w-8" />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-base font-bold text-[#151514] dark:text-white">
                      @frame_theory.ig
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#e34f3c]/10 dark:bg-[#e34f3c]/20 border border-[#e34f3c]/30 text-[#e34f3c] dark:text-[#ff705e] px-2.5 py-0.5 font-mono text-[11px] font-semibold">
                      <Instagram className="h-3 w-3" />
                      Instagram
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#6c6b64] dark:text-[#a8a69e]">
                    The Frame Theory | Photography by Solon Das
                  </span>
                </div>
              </div>

              {/* Bio Quotes Block */}
              <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-5 font-mono text-xs leading-relaxed text-[#4d4c47] dark:text-[#d4d1c8]">
                <p className="font-semibold text-[#151514] dark:text-white">
                  Photography • Films • Visual Stories
                </p>
                <p className="mt-1 text-[#6c6b64] dark:text-[#a8a69e]">
                  People, places & moments worth remembering.
                </p>
                <p className="mt-1 text-[#6c6b64] dark:text-[#a8a69e]">
                  Travel • People • Places · <span className="font-serif italic text-[#151514] dark:text-white">dolce far niente</span>
                </p>
              </div>

              {/* Specs & Gear Tag */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#6c6b64] dark:text-[#a8a69e]">
                <span className="inline-flex items-center gap-1.5">
                  <Aperture className="h-3.5 w-3.5 text-[#e34f3c] dark:text-[#ff705e]" />
                  <span>35mm & 50mm Prime</span>
                </span>
                <span>·</span>
                <span>Natural Ambient Light</span>
                <span>·</span>
                <span>Cinematic Color Grading</span>
              </div>

              {/* Primary Direct Instagram Action Button */}
              <div>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-[#151514] text-white dark:bg-[#f4f0e8] dark:text-[#151514] px-6 py-3.5 font-mono text-xs font-semibold hover:bg-[#e34f3c] dark:hover:bg-[#e34f3c] dark:hover:text-white transition-all transform active:scale-95 shadow-md"
                >
                  <Instagram className="h-4 w-4" />
                  <span>Explore @frame_theory.ig on Instagram</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Focus Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {FOCUS_AREAS.map((area) => {
                const Icon = area.icon;
                return (
                  <div
                    key={area.title}
                    className="flex flex-col gap-2 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.015] dark:bg-white/[0.02] p-4 transition-all hover:border-black/25 dark:hover:border-white/20"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e34f3c]/10 text-[#e34f3c] dark:bg-[#ff705e]/15 dark:text-[#ff705e]">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <h4 className="text-xs font-bold font-mono text-[#151514] dark:text-[#f4f0e8]">
                        {area.title}
                      </h4>
                    </div>
                    <p className="text-xs leading-relaxed text-[#6c6b64] dark:text-[#a8a69e]">
                      {area.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
