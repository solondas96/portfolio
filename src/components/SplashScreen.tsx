import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1500; // 1.5s
    const interval = 30;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min((currentStep / steps) * 100, 100));
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col items-center gap-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
        >
          <span className="bg-gradient-to-br from-white to-white/50 bg-clip-text text-4xl font-bold tracking-tighter text-transparent">
            SD
          </span>
          <motion.div
            className="absolute inset-0 rounded-2xl border border-sky-400/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        <div className="flex w-48 flex-col gap-2">
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-sky-400"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
          <div className="flex justify-between text-xs font-mono text-slate-500">
            <span>LOADING</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
