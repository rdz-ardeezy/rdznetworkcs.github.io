import { useState, useEffect } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';
import { checkApiAvailability } from './services/api';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import DatabasePanel from './components/DatabasePanel';

function App() {
  const scrollRef = useScrollReveal();
  const [apiConnected, setApiConnected] = useState(false);
  const [dbPanelOpen, setDbPanelOpen] = useState(false);

  useEffect(() => {
    checkApiAvailability().then(setApiConnected);
  }, []);

  // Re-run scroll reveal when content loads
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const timer = setTimeout(() => {
      const el = scrollRef.current;
      if (el) {
        const elements = el.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        elements.forEach((element) => observer.observe(element));
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [scrollRef]);

  return (
    <div ref={scrollRef} className="min-h-screen bg-dark text-slate-200">
      <Navbar apiConnected={apiConnected} />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />

      {/* Floating DB Button */}
      <button
        onClick={() => setDbPanelOpen(true)}
        className="fixed bottom-6 right-6 z-50 group flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-medium shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
        <span className="hidden sm:inline text-sm">Setup MySQL</span>
        <span className={`w-2 h-2 rounded-full ${apiConnected ? 'bg-neon-green' : 'bg-amber-400'} animate-pulse`} />
      </button>

      <DatabasePanel
        isOpen={dbPanelOpen}
        onClose={() => setDbPanelOpen(false)}
        apiConnected={apiConnected}
      />
    </div>
  );
}

export default App;
