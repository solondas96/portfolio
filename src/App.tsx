import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AnimatedBackground from './components/AnimatedBackground';
import SplashScreen from './components/SplashScreen';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Leadership from './components/Leadership';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Testimonials from './components/Testimonials';
import resumeData from './data/resume.json';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  // Determine which sections to show based on data
  const availableSections = [
    { id: 'hero', label: 'Hero', show: true },
    { id: 'experience', label: 'Experience', show: !!resumeData.experience?.length },
    { id: 'leadership', label: 'Leadership', show: !!(resumeData as any).leadership?.length },
    { id: 'achievements', label: 'Achievements', show: !!resumeData.achievements?.length },
    { id: 'projects', label: 'Projects & Research', show: !!((resumeData as any).projects?.length || (resumeData as any)['Projects & Research']?.length) },
    { id: 'skills', label: 'Skills', show: !!resumeData.skills?.length },
    { id: 'education', label: 'Education', show: !!resumeData.education?.length },
    { id: 'certifications', label: 'Certifications', show: !!resumeData.certifications?.length },
    { id: 'testimonials', label: 'Testimonials', show: !!(resumeData as any).testimonials?.length },
  ].filter(s => s.show);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of availableSections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [availableSections]);

  return (
    <div className="relative min-h-screen bg-slate-950 font-sans text-slate-50 selection:bg-sky-500/30">
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <AnimatedBackground />

      {/* Scroll Spy Navigation */}
      <nav className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 lg:flex">
        {availableSections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group relative flex h-3 w-3 items-center justify-center"
            aria-label={`Scroll to ${section.label}`}
          >
            <span
              className={`absolute h-full w-full rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? 'scale-100 bg-sky-400'
                  : 'scale-50 bg-slate-600 group-hover:scale-75 group-hover:bg-slate-400'
              }`}
            />
            {activeSection === section.id && (
              <span className="absolute h-full w-full animate-ping rounded-full bg-sky-400 opacity-50" />
            )}
            
            {/* Tooltip */}
            <span className="absolute right-8 rounded-md bg-slate-800 px-2 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
              {section.label}
            </span>
          </a>
        ))}
      </nav>

      <main className="relative z-10">
        <div id="hero">
          <Hero data={resumeData.basics} />
        </div>
        {!!resumeData.experience?.length && (
          <div id="experience">
            <Experience data={resumeData.experience} />
          </div>
        )}
        {!!(resumeData as any).leadership?.length && (
          <div id="leadership">
            <Leadership data={(resumeData as any).leadership} />
          </div>
        )}
        {!!resumeData.achievements?.length && (
          <div id="achievements">
            <Achievements data={resumeData.achievements} />
          </div>
        )}
        {!!((resumeData as any).projects?.length || (resumeData as any)['Projects & Research']?.length) && (
          <div id="projects">
            <Projects data={(resumeData as any)['Projects & Research'] || (resumeData as any).projects} />
          </div>
        )}
        {!!resumeData.skills?.length && (
          <div id="skills">
            <Skills data={resumeData.skills} />
          </div>
        )}
        {!!resumeData.education?.length && (
          <div id="education">
            <Education data={resumeData.education} />
          </div>
        )}
        {!!resumeData.certifications?.length && (
          <div id="certifications">
            <Certifications data={resumeData.certifications} />
          </div>
        )}
        {!!(resumeData as any).testimonials?.length && (
          <div id="testimonials">
            <Testimonials data={(resumeData as any).testimonials} />
          </div>
        )}
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-slate-950/50 py-12 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-6 sm:flex-row sm:px-12 lg:px-24">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} {resumeData.basics.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {resumeData.basics.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-400 transition-colors hover:text-sky-400"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
