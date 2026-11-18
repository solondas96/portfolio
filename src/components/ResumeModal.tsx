import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import resumePdf from '../data/resume.pdf';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex h-[90vh] w-full max-w-5xl flex-col border border-black/20 dark:border-white/20 bg-[#f4f0e8] dark:bg-[#141413] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/15 dark:border-white/15 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center bg-[#e34f3c] text-white">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight text-[#151514] dark:text-[#f4f0e8]">
                    Solon Das — Curriculum Vitae
                  </h3>
                  <p className="text-xs text-[#6c6b64] dark:text-[#78766e]">
                    Senior AI Data Engineer · GenAI Platforms · Distributed Systems
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={resumePdf}
                  download="Solon_Das_Resume.pdf"
                  className="inline-flex items-center gap-1.5 bg-[#151514] dark:bg-[#f4f0e8] px-3 py-1.5 text-xs font-semibold text-white dark:text-[#141413] hover:bg-[#e34f3c] dark:hover:bg-[#e34f3c] dark:hover:text-white transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download PDF</span>
                </a>
                <a
                  href={resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 border border-black/20 dark:border-white/20 px-3 py-1.5 text-xs font-semibold text-[#151514] dark:text-[#f4f0e8] hover:border-[#e34f3c] hover:text-[#e34f3c] transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Open Tab</span>
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="flex h-8 w-8 items-center justify-center border border-black/20 dark:border-white/20 text-[#151514] dark:text-[#f4f0e8] hover:bg-[#e34f3c] hover:border-[#e34f3c] hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Quick Summary Pill Bar */}
            <div className="flex flex-wrap items-center gap-3 border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-5 py-2.5 text-xs text-[#4d4c47] dark:text-[#a8a69d]">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                AVP @ Swiss Re (Palantir Foundry)
              </span>
              <span className="text-black/30 dark:text-white/30">•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                Ex-AB InBev GenAI Platforms
              </span>
              <span className="text-black/30 dark:text-white/30">•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                7+ Years Big Data & GenAI Architecture
              </span>
            </div>

            {/* PDF Viewer Frame */}
            <div className="relative flex-1 bg-neutral-900 overflow-hidden">
              <iframe
                src={`${resumePdf}#view=FitH`}
                title="Solon Das Resume"
                className="h-full w-full border-none"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
