import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Camera,
  Instagram,
  ArrowUpRight,
  Aperture,
  Compass,
  Eye,
  Film,
  Sparkles,
  MapPin,
} from 'lucide-react';

interface PhotoFrame {
  id: string;
  title: string;
  location: string;
  category: string;
  imageUrl: string;
  exif: {
    shutter: string;
    aperture: string;
    iso: string;
    focalLength: string;
  };
  palette: string;
}

const PHOTO_FRAMES: PhotoFrame[] = [
  {
    id: 'frame-1',
    title: 'Urban Geometry & High Shadows',
    location: 'Metropolitan Lines',
    category: 'Architecture & Form',
    imageUrl:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
    exif: {
      shutter: '1/500s',
      aperture: 'ƒ/4.0',
      iso: '100',
      focalLength: '35mm',
    },
    palette: 'Monochrome & Hard Light',
  },
  {
    id: 'frame-2',
    title: 'Dolce Far Niente',
    location: 'Coastal Horizons',
    category: 'Travel & Solitude',
    imageUrl:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    exif: {
      shutter: '1/250s',
      aperture: 'ƒ/2.8',
      iso: '200',
      focalLength: '50mm',
    },
    palette: 'Mediterranean Ochre',
  },
  {
    id: 'frame-3',
    title: 'Neon & Ambient Dusk',
    location: 'City Streetscape',
    category: 'Night & Atmosphere',
    imageUrl:
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=900&q=80',
    exif: {
      shutter: '1/60s',
      aperture: 'ƒ/1.8',
      iso: '800',
      focalLength: '35mm',
    },
    palette: 'Cinematic Blue & Vermilion',
  },
  {
    id: 'frame-4',
    title: 'The Wandering Eye',
    location: 'Mountain Passes',
    category: 'People & Transit',
    imageUrl:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80',
    exif: {
      shutter: '1/320s',
      aperture: 'ƒ/2.0',
      iso: '160',
      focalLength: '28mm',
    },
    palette: 'Warm Earth & Natural Grain',
  },
];

const GENRES = [
  { label: 'Street & Architecture', icon: Compass },
  { label: 'Travel & Landscapes', icon: MapPin },
  { label: 'Cinematic Film Tones', icon: Film },
  { label: 'Candid Human Moments', icon: Eye },
];

export default function Photography() {
  const [activeFrame, setActiveFrame] = useState<string | null>(null);
  const instagramUrl =
    'https://www.instagram.com/frame_theory.ig?cnvx=ODJlZWVraWNmNnk3';

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
            <p className="section-kicker">Side Pursuit · Photography</p>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-[#e34f3c] dark:text-[#ff705e]">
                The Frame Theory
              </span>
              <span className="font-mono text-xs text-[#6c6b64] dark:text-[#a8a69e]">
                · @frame_theory.ig
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <h2 className="section-title text-[#151514] dark:text-[#f4f0e8]">
                People, places & moments worth remembering.
              </h2>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-black/20 dark:border-white/20 px-4 py-2 font-mono text-xs font-semibold text-[#151514] dark:text-[#f4f0e8] hover:border-[#e34f3c] hover:bg-[#e34f3c] hover:text-white dark:hover:border-[#ff705e] dark:hover:bg-[#e34f3c] transition-all shadow-xs"
              >
                <Instagram className="h-4 w-4" />
                <span>Follow @frame_theory.ig</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <p className="max-w-2xl text-base leading-relaxed text-[#4d4c47] dark:text-[#b5b2a8] sm:text-lg">
              Beyond enterprise data platforms and distributed algorithms, I explore
              visual storytelling through the lens under{' '}
              <strong className="font-semibold text-[#151514] dark:text-white">
                The Frame Theory
              </strong>
              . A photographic journal of natural light, hard architectural geometry, and
              candid wanderings — driven by the Italian philosophy of{' '}
              <em className="font-serif italic text-[#151514] dark:text-white">
                dolce far niente
              </em>{' '}
              (the sweetness of doing nothing).
            </p>
          </div>
        </motion.div>

        {/* Focus Genres Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-black/15 dark:border-white/15 py-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {GENRES.map((genre) => {
              const Icon = genre.icon;
              return (
                <div
                  key={genre.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/12 bg-black/[0.02] dark:bg-white/[0.03] px-3.5 py-1 text-xs font-mono text-[#4d4c47] dark:text-[#d4d1c8]"
                >
                  <Icon className="h-3.5 w-3.5 text-[#e34f3c] dark:text-[#ff705e]" />
                  <span>{genre.label}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#6c6b64] dark:text-[#a8a69e]">
            <Camera className="h-3.5 w-3.5 text-[#e34f3c] dark:text-[#ff705e]" />
            <span>35mm & 50mm Prime · Natural Light</span>
          </div>
        </div>

        {/* Visual Frame Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PHOTO_FRAMES.map((frame, index) => (
            <motion.div
              key={frame.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onMouseEnter={() => setActiveFrame(frame.id)}
              onMouseLeave={() => setActiveFrame(null)}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/15 dark:border-white/12 bg-white dark:bg-[#151514] transition-all duration-300 hover:border-black/30 dark:hover:border-white/25 hover:shadow-xl"
            >
              {/* Photo Area with Camera Viewfinder HUD */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/5 dark:bg-black/40">
                <img
                  src={frame.imageUrl}
                  alt={frame.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 opacity-60 transition-opacity duration-300 group-hover:opacity-90" />

                {/* Top Corner Viewfinder Reticle */}
                <div className="pointer-events-none absolute inset-3 flex flex-col justify-between transition-opacity duration-300 opacity-60 group-hover:opacity-100">
                  <div className="flex items-center justify-between text-[10px] font-mono text-white/80">
                    <span className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs">
                      <Aperture className="h-2.5 w-2.5 text-[#ff705e]" />
                      {frame.exif.focalLength}
                    </span>
                    <span className="bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs">
                      [ REC ]
                    </span>
                  </div>

                  {/* Center Focus Reticle on hover */}
                  <div className="flex items-center justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded border border-white/40 text-white/60 transition-transform duration-300 group-hover:scale-110 group-hover:border-white/80">
                      <span className="text-xs">+</span>
                    </div>
                  </div>

                  {/* Bottom EXIF Readout */}
                  <div className="flex items-center justify-between font-mono text-[10px] text-white/90 bg-black/60 px-2 py-1 rounded backdrop-blur-xs border border-white/10">
                    <span>{frame.exif.shutter}</span>
                    <span>{frame.exif.aperture}</span>
                    <span>ISO {frame.exif.iso}</span>
                  </div>
                </div>
              </div>

              {/* Caption & Metadata */}
              <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs font-mono text-[#6c6b64] dark:text-[#a8a69e]">
                    <span className="uppercase tracking-wider text-[#e34f3c] dark:text-[#ff705e] font-semibold text-[11px]">
                      {frame.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {frame.location}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#151514] dark:text-[#f4f0e8] leading-snug group-hover:text-[#e34f3c] dark:group-hover:text-[#ff705e] transition-colors">
                    {frame.title}
                  </h3>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-black/10 dark:border-white/10 pt-3 text-xs font-mono">
                  <span className="text-[#6c6b64] dark:text-[#a8a69e] text-[11px]">
                    {frame.palette}
                  </span>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#e34f3c] dark:text-[#ff705e] hover:underline"
                    title="View on Instagram"
                  >
                    <span>View</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Editorial Quote & Follow Invitation Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-black/15 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.02] p-6 sm:p-8"
        >
          <div className="flex items-start gap-4 max-w-2xl">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#1a1a18] text-[#e34f3c] dark:text-[#ff705e]">
              <Film className="h-5 w-5" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-serif italic text-base sm:text-lg text-[#151514] dark:text-[#f4f0e8]">
                "Visual storytelling is the quiet counterpart to engineering architecture —
                one structures logic; the other preserves human experience."
              </p>
              <span className="font-mono text-xs text-[#6c6b64] dark:text-[#a8a69e]">
                Solon Das · The Frame Theory (@frame_theory.ig)
              </span>
            </div>
          </div>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#151514] text-white dark:bg-[#f4f0e8] dark:text-[#151514] px-5 py-3 font-mono text-xs font-semibold hover:bg-[#e34f3c] dark:hover:bg-[#e34f3c] dark:hover:text-white transition-colors shrink-0 shadow-md"
          >
            <Instagram className="h-4 w-4" />
            <span>Open @frame_theory.ig on Instagram</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
