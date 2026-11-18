import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import SplashScreen from './components/SplashScreen';
import TopNav from './components/TopNav';
import TrustStrip from './components/TrustStrip';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Leadership from './components/Leadership';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Testimonials from './components/Testimonials';
import ClosingCTA from './components/ClosingCTA';
import resumeData from './data/resume.json';
import { ThemeProvider } from './context/ThemeContext';

function PortfolioContent() {
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
    <div className="portfolio-shell min-h-screen">
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <TopNav
        sections={availableSections}
        activeSection={activeSection}
        name={resumeData.basics.name}
        email={resumeData.basics.email}
      />

      <main>
        <div id="hero">
          <Hero data={resumeData.basics} />
        </div>

        <TrustStrip companies={resumeData.experience?.map((job: any) => job.company) || []} />

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
