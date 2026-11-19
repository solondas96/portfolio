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
  Contrast,
  Moon,
} from 'lucide-react';

interface PhotographyJournal {
  id: string;
  name: string;
  handle: string;
  role: string;
  themeBadge: string;
  url: string;
  bio: {
    line1: string;
    line2: string;
    line3: string;
  };
  specs: string[];
  pillars: {
    icon: React.ElementType;
    title: string;
    description: string;
  }[];
  accentBadgeClass: string;
  iconBgClass: string;
}

const JOURNALS: PhotographyJournal[] = [
  {
    id: 'frame-theory',
    name: 'The Frame Theory',
    handle: '@frame_theory.ig',
    role: 'Photography & Films',
    themeBadge: 'Color & Natural Light',
    url: 'https://www.instagram.com/frame_theory.ig?cnvx=ODJlZWVraWNmNnk3',
    bio: {
      line1: 'Photography • Films • Visual Stories',
      line2: 'People, places & moments worth remembering.',
      line3: 'Travel • People • Places · dolce far niente',
    },
    specs: ['35mm & 50mm Prime', 'Natural Ambient Light', 'Warm Film Grading'],
    pillars: [
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
    ],
    accentBadgeClass:
      'bg-[#e34f3c]/10 dark:bg-[#e34f3c]/20 border-[#e34f3c]/30 text-[#e34f3c] dark:text-[#ff705e]',
    iconBgClass: 'text-[#e34f3c] dark:text-[#ff705e]',
  },
  {
    id: 'afterlight',
    name: 'Afterlight',
    handle: '@afterlight.dark',
    role: 'Monochrome Visual Journal',
    themeBadge: 'Black & White · Noir',
    url: 'https://www.instagram.com/afterlight.dark?evlk=bThtN3JyaG45a3dm',
    bio: {
      line1: 'Black . White . Everything Between',
      line2: 'Light fades · Stories remain',
      line3: 'Shadows, raw contrast & moody minimalism',
    },
    specs: ['High-Contrast Monochromes', 'Deep Shadows & Rim Light', 'Negative Space'],
    pillars: [
      {
        icon: Contrast,
        title: 'High-Contrast B&W',
        description: 'Dynamic tonal depth, deep obsidian blacks, and pure crisp whites.',
      },
      {
        icon: Moon,
        title: 'Shadows & Silhouettes',
        description: 'Negative space, rim lighting, and quiet solitary figures in the dark.',
      },
      {
        icon: Aperture,
        title: 'Documentary Noir',
        description: 'Atmospheric night scenes, urban textures, and unhurried stillness.',
      },
      {
        icon: Eye,
        title: 'Intimate Textures',
        description: 'Concrete, steel, natural film grain, and raw emotional presence.',
      },
    ],
    accentBadgeClass:
      'bg-black/10 dark:bg-white/10 border-black/20 dark:border-white/20 text-[#151514] dark:text-[#f4f0e8]',
    iconBgClass: 'text-[#151514] dark:text-[#f4f0e8]',
  },
];

export default function Photography() {
  return (
    <section
      id="photography"
      className="portfolio-section px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12">
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
            <div className="flex items-center gap-2 font-mono text-xs text-[#6c6b64] dark:text-[#a8a69e]">
              <span>2 Visual Journals</span>
              <span>·</span>
              <span>Photography & Stories</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="section-title text-[#151514] dark:text-[#f4f0e8]">
              Light, shadow & stories in between.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#4d4c47] dark:text-[#b5b2a8] sm:text-lg">
              When away from distributed data platforms and code, I document visual stories through two
              distinct photographic journals: <strong className="font-semibold text-[#151514] dark:text-white">The Frame Theory</strong> (color, natural light & travel horizons) and <strong className="font-semibold text-[#151514] dark:text-white">Afterlight</strong> (high-contrast monochromes & shadow play).
            </p>
          </div>
        </motion.div>

        {/* Twin Visual Profile Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {JOURNALS.map((journal, index) => (
            <motion.div
              key={journal.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-black/15 dark:border-white/12 bg-white dark:bg-[#161615] p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:border-black/30 dark:hover:border-white/25 hover:shadow-xl"
            >
              {/* Subtle Ambient Glow */}
              <div
                className={`pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full blur-3xl opacity-40 transition-opacity group-hover:opacity-70 ${
                  journal.id === 'frame-theory'
                    ? 'bg-[#e34f3c]/20'
                    : 'bg-white/10 dark:bg-white/5'
                }`}
              />

              <div className="relative z-10 flex flex-col gap-6">
                {/* Profile Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-black/15 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.05] shadow-xs ${journal.iconBgClass}`}
                    >
                      {journal.id === 'afterlight' ? (
                        <Contrast className="h-7 w-7" />
                      ) : (
                        <Camera className="h-7 w-7" />
                      )}
                    </div>

                    <div className="flex flex-col">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-base font-bold text-[#151514] dark:text-white">
                          {journal.handle}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${journal.accentBadgeClass}`}
                        >
                          <Instagram className="h-2.5 w-2.5" />
                          {journal.themeBadge}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#6c6b64] dark:text-[#a8a69e] mt-0.5">
                        {journal.name} · {journal.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio Quotes Block */}
                <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-5 font-mono text-xs leading-relaxed text-[#4d4c47] dark:text-[#d4d1c8]">
                  <p className="font-semibold text-[#151514] dark:text-white">
                    {journal.bio.line1}
                  </p>
                  <p className="mt-1 text-[#6c6b64] dark:text-[#a8a69e]">
                    {journal.bio.line2}
                  </p>
                  <p className="mt-1 text-[#6c6b64] dark:text-[#a8a69e]">
                    {journal.bio.line3}
                  </p>
                </div>

                {/* Focus Pillars (2x2 Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {journal.pillars.map((pillar) => {
                    const Icon = pillar.icon;
                    return (
                      <div
                        key={pillar.title}
                        className="flex flex-col gap-1.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.015] dark:bg-white/[0.02] p-3.5 transition-all hover:border-black/25 dark:hover:border-white/20"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-md bg-black/5 dark:bg-white/5 ${journal.iconBgClass}`}
                          >
                            <Icon className="h-3 w-3" />
                          </div>
                          <h4 className="text-xs font-bold font-mono text-[#151514] dark:text-[#f4f0e8]">
                            {pillar.title}
                          </h4>
                        </div>
                        <p className="text-[11px] leading-relaxed text-[#6c6b64] dark:text-[#a8a69e]">
                          {pillar.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Technical Aesthetic Tags */}
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#6c6b64] dark:text-[#a8a69e] pt-1">
                  {journal.specs.map((spec, i) => (
                    <span
                      key={i}
                      className="rounded border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] px-2 py-0.5"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Instagram Action Button */}
              <div className="relative z-10 mt-6 pt-5 border-t border-black/10 dark:border-white/10">
                <a
                  href={journal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-[#151514] text-white dark:bg-[#f4f0e8] dark:text-[#151514] px-6 py-3 font-mono text-xs font-semibold hover:bg-[#e34f3c] dark:hover:bg-[#e34f3c] dark:hover:text-white transition-all transform active:scale-95 shadow-sm"
                >
                  <Instagram className="h-4 w-4" />
                  <span>Explore {journal.handle} on Instagram</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
