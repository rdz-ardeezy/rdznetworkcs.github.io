import { ChevronDown, Zap, Shield, Headphones } from 'lucide-react';
import { useEffect, useState } from 'react';


const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 10 + 10,
  delay: Math.random() * 5,
}));

export default function HeroSection() {
  const [typed, setTyped] = useState('');
  const fullText = 'Network Solutions';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTyped(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center hero-gradient grid-bg overflow-hidden">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-primary/30"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-slide-up">
          <Zap className="w-4 h-4 text-primary-light" />
          <span className="text-sm text-primary-light font-medium">Professional IT Solutions</span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <span className="text-white">RDZ </span>
          <span className="gradient-text">{typed}</span>
          <span className="inline-block w-1 h-12 md:h-16 bg-primary-light ml-1 animate-pulse" />
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Kami hadir untuk membuat semua pekerjaan pemilik{' '}
          <span className="text-neon-blue font-semibold">warnet</span> atau{' '}
          <span className="text-neon-purple font-semibold">game center</span>{' '}
          menjadi lebih mudah dan efisien.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <a
            href="#projects"
            className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-semibold text-lg shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
          >
            Lihat Projek
            <ChevronDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-primary/30 text-primary-light font-semibold text-lg hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 hover:scale-105"
          >
            Hubungi Kami
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
          {[
            { icon: Zap, label: 'Great Performance', value: '100%' },
            { icon: Shield, label: 'Auto Update', value: '24/7' },
            { icon: Headphones, label: 'Support', value: 'Live' },
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-2xl p-4 md:p-6 text-center hover:scale-105 transition-transform cursor-default">
              <stat.icon className="w-6 h-6 text-primary-light mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-slate-500 tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 text-slate-500" />
      </div>
    </section>
  );
}
