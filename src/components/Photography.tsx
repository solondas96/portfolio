import React from 'react';
import { motion } from 'motion/react';
import {
  Instagram,
  ArrowUpRight,
  Eye,
  Heart,
  Play,
  Film,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { MOST_VIEWED_POSTS, InstagramPost } from '../data/photography';

export default function Photography() {
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
            <p className="section-kicker">Side Pursuit · Visual Stories</p>
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
                Most viewed frames & visual stories.
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
              Top-performing visual stories, viral reels, and street frames from{' '}
              <strong className="font-semibold text-[#151514] dark:text-white">
                The Frame Theory
              </strong>
              . Exploring cinematic film tones, architectural geometry, and human moments
              around the world — guided by{' '}
              <em className="font-serif italic text-[#151514] dark:text-white">
                dolce far niente
              </em>
              .
            </p>
          </div>
        </motion.div>

        {/* Most Viewed Posts Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MOST_VIEWED_POSTS.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/15 dark:border-white/12 bg-white dark:bg-[#161615] transition-all duration-300 hover:border-black/30 dark:hover:border-white/25 hover:shadow-xl"
            >
              {/* Media Card Preview */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/10 dark:bg-black/40">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 opacity-70 transition-opacity duration-300 group-hover:opacity-90" />

                {/* Top Badges Bar: View Count & Reel Indicator */}
                <div className="absolute inset-x-3 top-3 flex items-center justify-between text-xs font-mono">
                  {/* Views Badge */}
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/70 border border-white/20 px-2.5 py-1 text-white font-semibold shadow-sm backdrop-blur-md text-[11px]">
                    <Eye className="h-3 w-3 text-[#ff705e]" />
                    <span>{post.views}</span>
                  </span>

                  {/* Reel / Photo Pill */}
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/20 border border-white/30 px-2 py-0.5 text-[10px] text-white font-semibold uppercase tracking-wider backdrop-blur-md">
                    {post.type === 'reel' ? (
                      <>
                        <Play className="h-2.5 w-2.5 fill-white" />
                        <span>Reel</span>
                      </>
                    ) : (
                      <span>Photo</span>
                    )}
                  </span>
                </div>

                {/* Hover Play Button Overlay (for Reels) */}
                {post.type === 'reel' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={post.postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#151514] shadow-xl hover:scale-110 hover:bg-white transition-transform"
                      title="Watch Reel on Instagram"
                    >
                      <Play className="h-6 w-6 fill-current ml-0.5" />
                    </a>
                  </div>
                )}

                {/* Bottom Overlay: Location & Engagement */}
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between font-mono text-[11px] text-white/90">
                  {post.location && (
                    <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs border border-white/10">
                      <MapPin className="h-3 w-3 text-[#ff705e]" />
                      <span>{post.location}</span>
                    </span>
                  )}
                  {post.likes && (
                    <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs border border-white/10">
                      <Heart className="h-3 w-3 text-[#ff705e] fill-[#ff705e]" />
                      <span>{post.likes}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer / Caption */}
              <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-bold text-[#151514] dark:text-[#f4f0e8] leading-snug group-hover:text-[#e34f3c] dark:group-hover:text-[#ff705e] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#6c6b64] dark:text-[#a8a69e] line-clamp-2 leading-relaxed">
                    {post.caption}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-black/10 dark:border-white/10 pt-3 text-xs font-mono">
                  <span className="font-semibold text-[#e34f3c] dark:text-[#ff705e]">
                    {post.views}
                  </span>

                  <a
                    href={post.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#151514] dark:text-[#f4f0e8] hover:text-[#e34f3c] dark:hover:text-[#ff705e] transition-colors font-medium"
                  >
                    <span>{post.type === 'reel' ? 'Watch Reel' : 'View Post'}</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Editorial Invitation Banner */}
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
