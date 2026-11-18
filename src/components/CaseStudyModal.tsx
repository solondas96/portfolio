import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, ArrowRight, Layers, Cpu, Award } from 'lucide-react';
import { CaseStudy } from '../data/caseStudies';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

export default function CaseStudyModal({ caseStudy, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    if (!caseStudy) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [caseStudy, onClose]);

  useEffect(() => {
    if (caseStudy) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [caseStudy]);

  return (
    <AnimatePresence>
      {caseStudy && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
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
            className="relative flex max-h-[92vh] w-full max-w-4xl flex-col border border-black/20 dark:border-white/20 bg-[#f4f0e8] dark:bg-[#141413] shadow-2xl overflow-hidden my-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/15 dark:border-white/15 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="section-kicker">Architecture Case Study</span>
                <span className="text-black/30 dark:text-white/30">•</span>
                <span className="text-xs font-semibold text-[#6c6b64] dark:text-[#78766e]">
                  {caseStudy.organization} ({caseStudy.timeline})
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="flex h-8 w-8 items-center justify-center border border-black/20 dark:border-white/20 text-[#151514] dark:text-[#f4f0e8] hover:bg-[#e34f3c] hover:border-[#e34f3c] hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6 sm:p-8 flex flex-col gap-8">
              {/* Title & Headline */}
              <div>
                <span className="inline-block bg-[#e34f3c]/10 text-[#e34f3c] px-2.5 py-1 text-xs font-semibold tracking-wider uppercase mb-3">
                  {caseStudy.tag}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#151514] dark:text-[#f4f0e8]">
                  {caseStudy.title}
                </h2>
                <p className="mt-3 text-base text-[#4d4c47] dark:text-[#b5b2a8] leading-relaxed">
                  {caseStudy.subtitle}
                </p>
              </div>

              {/* Key Metrics Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-y border-black/15 dark:border-white/15 py-5">
                {caseStudy.metrics.map((m, i) => (
                  <div key={i} className="flex flex-col gap-1 sm:border-r border-black/10 dark:border-white/10 sm:last:border-none sm:px-4 sm:first:pl-0">
                    <span className="text-xs uppercase tracking-wider text-[#6c6b64] dark:text-[#78766e] font-mono">
                      {m.label}
                    </span>
                    <span className="text-2xl font-semibold text-[#e34f3c]">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Problem / Challenge */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6c6b64] dark:text-[#78766e]">
                  <Layers className="h-4 w-4 text-[#e34f3c]" />
                  <span>The Architectural Challenge</span>
                </div>
                <p className="text-base text-[#4d4c47] dark:text-[#b5b2a8] leading-relaxed bg-black/5 dark:bg-white/5 p-4 border-l-2 border-[#e34f3c]">
                  {caseStudy.challenge}
                </p>
              </div>

              {/* Pipeline & Architecture Steps */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6c6b64] dark:text-[#78766e]">
                  <Cpu className="h-4 w-4 text-[#e34f3c]" />
                  <span>{caseStudy.architecture.title}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {caseStudy.architecture.steps.map((step) => (
                    <div
                      key={step.number}
                      className="border border-black/15 dark:border-white/15 p-4 flex flex-col gap-2 bg-black/[0.02] dark:bg-white/[0.02]"
                    >
                      <span className="font-mono text-xs font-bold text-[#e34f3c]">
                        STEP {step.number}
                      </span>
                      <h4 className="text-sm font-semibold text-[#151514] dark:text-[#f4f0e8]">
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#4d4c47] dark:text-[#b5b2a8] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Measured Impact */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6c6b64] dark:text-[#78766e]">
                  <Award className="h-4 w-4 text-[#e34f3c]" />
                  <span>Verified Outcomes & Business Impact</span>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {caseStudy.impact.map((imp, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[#4d4c47] dark:text-[#b5b2a8]">
                      <CheckCircle className="h-4 w-4 text-[#e34f3c] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="border-t border-black/15 dark:border-white/15 pt-5 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-[#6c6b64] dark:text-[#78766e] mr-2">
                  TECHNOLOGIES:
                </span>
                {caseStudy.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="border border-black/20 dark:border-white/20 px-2.5 py-1 text-xs font-medium text-[#151514] dark:text-[#f4f0e8] bg-black/5 dark:bg-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-black/15 dark:border-white/15 px-6 py-4 flex justify-between items-center bg-black/[0.02] dark:bg-white/[0.02]">
              <span className="text-xs text-[#6c6b64] dark:text-[#78766e]">
                Solon Das · Portfolio Architecture Series
              </span>
              <button
                onClick={onClose}
                className="bg-[#151514] dark:bg-[#f4f0e8] px-4 py-2 text-xs font-semibold text-white dark:text-[#141413] hover:bg-[#e34f3c] dark:hover:bg-[#e34f3c] dark:hover:text-white transition-colors"
              >
                Close Case Study
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
