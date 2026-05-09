import { Wifi, Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-800/50">
      <div className="absolute inset-0 bg-gradient-to-t from-dark-2/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Wifi className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold font-display text-white">
                  RDZ<span className="text-primary-light">Network</span>
                </span>
                <div className="text-[10px] text-slate-400 -mt-1 tracking-widest uppercase">Solutions</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md mb-6">
              Solusi terbaik untuk warnet dan game center. Kami menyediakan layanan lengkap mulai dari pembangunan jaringan,
              software billing, game menu, hingga sistem diskless.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://github.com/rdznetwork" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-surface hover:bg-primary/20 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-surface hover:bg-pink-500/20 flex items-center justify-center text-slate-400 hover:text-pink-400 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-surface hover:bg-red-500/20 flex items-center justify-center text-slate-400 hover:text-red-400 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-display">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Tentang', 'Fitur', 'Projek', 'Kontak'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link === 'Home' ? 'home' : link === 'Tentang' ? 'about' : link === 'Fitur' ? 'features' : link === 'Projek' ? 'projects' : 'contact'}`}
                    className="text-slate-400 hover:text-primary-light text-sm transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-display">Produk</h4>
            <ul className="space-y-3">
              {['RDZ CafeBill', 'RDZ GameMenu V3', 'RDZ GameMenu V2', 'RDZ GameMenu Lite', 'RDZ CashNote'].map((product) => (
                <li key={product}>
                  <a href="#projects" className="text-slate-400 hover:text-primary-light text-sm transition-colors">
                    {product}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm flex items-center gap-1">
            © 2020 RDZ Network Solutions
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface hover:bg-primary/20 text-slate-400 hover:text-white text-sm transition-all"
          >
            <ArrowUp className="w-4 h-4" />
            Kembali ke atas
          </button>
        </div>
      </div>
    </footer>
  );
}
