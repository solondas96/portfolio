import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  RotateCw,
  ExternalLink,
  Monitor,
  Smartphone,
  Lock,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { ProjectItem } from '../data/projects';

interface ProjectSandboxModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectSandboxModal({ project, onClose }: ProjectSandboxModalProps) {
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      setIsLoading(true);
      setIframeKey((k) => k + 1);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) return null;

  const targetUrl = project.liveUrl || project.drivePreviewUrl || project.repoUrl;

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-black/25 dark:border-white/20 bg-[#f4f0e8] dark:bg-[#151514] shadow-2xl"
        >
          {/* Top Window Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/15 dark:border-white/15 px-4 py-3 bg-[#e9e4da] dark:bg-[#1a1a18]">
            {/* Left: Window Dots & Title */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onClose}
                  className="h-3 w-3 rounded-full bg-[#e34f3c] hover:opacity-80 transition-opacity"
                  title="Close"
                />
                <button
                  onClick={handleRefresh}
                  className="h-3 w-3 rounded-full bg-[#cd9f28] hover:opacity-80 transition-opacity"
                  title="Reload"
                />
                <button
                  onClick={() => setViewport(viewport === 'desktop' ? 'mobile' : 'desktop')}
                  className="h-3 w-3 rounded-full bg-[#3a7065] hover:opacity-80 transition-opacity"
                  title="Toggle Viewport"
                />
              </div>

              <div className="h-4 w-px bg-black/20 dark:bg-white/20" />

              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[#e34f3c] font-semibold">
                  LIVE SANDBOX
                </span>
                <span className="text-sm font-semibold text-[#151514] dark:text-[#f4f0e8] truncate max-w-[180px] sm:max-w-xs">
                  {project.title}
                </span>
              </div>
            </div>

            {/* Middle: Simulated Browser Address Bar */}
            <div className="order-last sm:order-none flex w-full sm:w-auto sm:flex-1 max-w-md items-center gap-2 rounded border border-black/15 dark:border-white/15 bg-white/70 dark:bg-black/40 px-3 py-1 font-mono text-xs text-[#6c6b64] dark:text-[#a8a69e]">
              <Lock className="h-3 w-3 text-[#3a7065] shrink-0" />
              <span className="truncate">{targetUrl}</span>
            </div>

            {/* Right: Viewport Switcher & Actions */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center rounded border border-black/20 dark:border-white/20 p-0.5 bg-black/5 dark:bg-white/5">
                <button
                  onClick={() => setViewport('desktop')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                    viewport === 'desktop'
                      ? 'bg-white text-[#151514] dark:bg-[#252523] dark:text-[#f4f0e8] shadow-sm'
                      : 'text-[#6c6b64] dark:text-[#a8a69e] hover:text-[#151514] dark:hover:text-[#f4f0e8]'
                  }`}
                  title="Desktop View"
                >
                  <Monitor className="h-3.5 w-3.5" />
                  <span className="hidden md:inline">Desktop</span>
                </button>
                <button
                  onClick={() => setViewport('mobile')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                    viewport === 'mobile'
                      ? 'bg-white text-[#151514] dark:bg-[#252523] dark:text-[#f4f0e8] shadow-sm'
                      : 'text-[#6c6b64] dark:text-[#a8a69e] hover:text-[#151514] dark:hover:text-[#f4f0e8]'
                  }`}
                  title="Mobile View (380px)"
                >
                  <Smartphone className="h-3.5 w-3.5" />
                  <span className="hidden md:inline">Mobile</span>
                </button>
              </div>

              <button
                onClick={handleRefresh}
                className="flex h-8 w-8 items-center justify-center rounded border border-black/20 dark:border-white/20 text-[#6c6b64] dark:text-[#a8a69e] hover:text-[#151514] dark:hover:text-[#f4f0e8] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                title="Reload Sandbox"
              >
                <RotateCw className="h-3.5 w-3.5" />
              </button>

              {targetUrl && (
                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded border border-black/20 dark:border-white/20 text-[#6c6b64] dark:text-[#a8a69e] hover:text-[#e34f3c] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  title="Open in new window"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}

              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded border border-black/20 dark:border-white/20 text-[#151514] dark:text-[#f4f0e8] hover:bg-[#e34f3c] hover:text-white transition-colors"
                title="Close (Esc)"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Sandbox Body / Iframe Area */}
          <div className="relative flex flex-1 items-center justify-center overflow-auto bg-[#ded9cf] dark:bg-[#0c0c0b] p-2 sm:p-4">
            {isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#f4f0e8]/80 dark:bg-[#151514]/80 backdrop-blur-sm">
                <Loader2 className="h-7 w-7 animate-spin text-[#e34f3c]" />
                <p className="font-mono text-xs text-[#6c6b64] dark:text-[#a8a69e]">
                  Launching live interactive sandbox for {project.title}...
                </p>
              </div>
            )}

            <div
              className={`relative h-full transition-all duration-300 ${
                viewport === 'mobile'
                  ? 'w-[380px] max-w-full rounded-2xl border-4 border-black/40 dark:border-white/20 shadow-2xl overflow-hidden'
                  : 'w-full rounded-lg border border-black/10 dark:border-white/10 shadow-inner'
              }`}
            >
              {targetUrl ? (
                <iframe
                  key={iframeKey}
                  src={targetUrl}
                  title={project.title}
                  onLoad={() => setIsLoading(false)}
                  className="h-full w-full bg-white"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                  allow="clipboard-write; fullscreen; gamepad"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                  <Sparkles className="h-10 w-10 text-[#e34f3c]" />
                  <p className="text-base text-[#4d4c47] dark:text-[#b5b2a8]">
                    Live web view not directly embeddable for this repository.
                  </p>
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#151514] text-white dark:bg-[#f4f0e8] dark:text-[#151514] px-4 py-2 font-mono text-xs uppercase tracking-wider"
                    >
                      View Repository on GitHub
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/15 dark:border-white/15 px-4 py-2.5 bg-[#e9e4da] dark:bg-[#1a1a18] text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[#6c6b64] dark:text-[#a8a69e]">Stack:</span>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-2 py-0.5 font-mono text-[11px] text-[#4d4c47] dark:text-[#b5b2a8]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {project.repoUrl && (
                <span className="font-mono text-[#6c6b64] dark:text-[#a8a69e]">
                  git clone {project.repoUrl}.git
                </span>
              )}
              <span className="font-mono text-[#6c6b64] dark:text-[#a8a69e]">
                Press <kbd className="px-1 py-0.5 rounded border border-black/20 dark:border-white/20 bg-white dark:bg-black font-semibold">ESC</kbd> to exit
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
