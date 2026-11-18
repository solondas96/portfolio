import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import SplashScreen from './components/SplashScreen';
import TopNav from './components/TopNav';
import TrustStrip from './components/TrustStrip';
import Hero from './components/Hero';
import Experience from './components/Experience';
import CaseStudies from './components/CaseStudies';
import Achievements from './components/Achievements';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Writing from './components/Writing';
import Leadership from './components/Leadership';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Testimonials from './components/Testimonials';
import ClosingCTA from './components/ClosingCTA';
import ResumeModal from './components/ResumeModal';
import CommandPalette from './components/CommandPalette';
import resumeData from './data/resume.json';
import { ThemeProvider } from './context/ThemeContext';

function PortfolioContent() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Keyboard shortcut for Command Palette: ⌘K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Determine which sections to show based on data
  const availableSections = [
    { id: 'hero', label: 'Hero', show: true },
    { id: 'experience', label: 'Experience', show: !!resumeData.experience?.length },
    { id: 'case-studies', label: 'Case Studies', show: true },
    { id: 'leadership', label: 'Leadership', show: !!(resumeData as any).leadership?.length },
    { id: 'achievements', label: 'Impact', show: !!resumeData.achievements?.length },
    { id: 'projects', label: 'Projects', show: !!((resumeData as any).projects?.length || (resumeData as any)['Projects & Research']?.length) },
    { id: 'skills', label: 'Capabilities', show: !!resumeData.skills?.length },
    { id: 'writing', label: 'Writing', show: true },
    { id: 'testimonials', label: 'Testimonials', show: !!(resumeData as any).testimonials?.length },
    { id: 'education', label: 'Education', show: !!resumeData.education?.length },
    { id: 'certifications', label: 'Certifications', show: !!resumeData.certifications?.length },
  ].filter((s) => s.show);

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [availableSections]);

  return (
    <div className="portfolio-shell min-h-screen">
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <TopNav
        sections={availableSections}
        activeSection={activeSection}
        name={resumeData.basics.name}
        email={resumeData.basics.email}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      <main>
        <div id="hero">
          <Hero
            data={resumeData.basics}
            onOpenResume={() => setIsResumeOpen(true)}
          />
        </div>

        <TrustStrip companies={resumeData.experience?.map((job: any) => job.company) || []} />

        {!!resumeData.experience?.length && (
          <div id="experience">
            <Experience
              data={resumeData.experience}
              selectedSkill={selectedSkill}
            />
          </div>
        )}

        {/* Phase 2: Architecture Deep-Dives */}
        <div id="case-studies">
          <CaseStudies />
        </div>

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
            <Skills
              data={resumeData.skills}
              selectedSkill={selectedSkill}
              onSelectSkill={(skill) => setSelectedSkill(skill)}
            />
          </div>
        )}

        {/* Phase 2: The Datum Theory / Publications */}
        <div id="writing">
          <Writing />
        </div>

        {!!(resumeData as any).testimonials?.length && (
          <div id="testimonials">
            <Testimonials data={(resumeData as any).testimonials} />
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

        <ClosingCTA email={resumeData.basics.email} links={resumeData.basics.links} />
      </main>

      <footer className="portfolio-footer py-8">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-5 px-5 sm:flex-row sm:px-8 lg:px-12">
          <p className="text-sm">
            © {new Date().getFullYear()} {resumeData.basics.name}. All rights reserved.
          </p>
          <div className="flex gap-5">
            {resumeData.basics.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
}
