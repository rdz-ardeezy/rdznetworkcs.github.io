import { useState, useEffect } from 'react';
import { Menu, X, Wifi, Database } from 'lucide-react';

interface NavbarProps {
  apiConnected: boolean;
}

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'Tentang' },
  { href: '#features', label: 'Fitur' },
  { href: '#projects', label: 'Projek' },
  { href: '#contact', label: 'Kontak' },
];

export default function Navbar({ apiConnected }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark/90 backdrop-blur-xl shadow-lg shadow-primary/5 border-b border-primary/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <Wifi className="w-5 h-5 text-white" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-50 blur-lg transition-opacity" />
            </div>
            <div>
              <span className="text-lg font-bold font-display text-white tracking-tight">
                RDZ<span className="text-primary-light">Network</span>
              </span>
              <div className="text-[10px] text-slate-400 -mt-1 tracking-widest uppercase">
                Solutions
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-white bg-primary/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
                {activeSection === link.href.replace('#', '') && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                )}
              </a>
            ))}

            {/* DB Status */}
            <div
              className={`ml-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                apiConnected
                  ? 'bg-neon-green/10 text-neon-green border border-neon-green/20'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}
            >
              <Database className="w-3 h-3" />
              <span className={`w-1.5 h-1.5 rounded-full ${apiConnected ? 'bg-neon-green animate-pulse' : 'bg-amber-400'}`} />
              {apiConnected ? 'DB Online' : 'Offline Mode'}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pb-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-white bg-primary/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className={`flex items-center gap-2 px-4 py-2 text-xs ${apiConnected ? 'text-neon-green' : 'text-amber-400'}`}>
              <Database className="w-3 h-3" />
              {apiConnected ? 'Database Connected' : 'Offline Mode (Local Data)'}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
