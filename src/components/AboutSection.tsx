import { Server, Wifi, MonitorSmartphone, Network, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Server,
    title: 'Diskless System',
    desc: 'Pembangunan warnet bermode diskless yang hemat dan efisien tanpa perlu hard disk di client.',
    color: 'from-primary to-primary-dark',
    glow: 'shadow-primary/20',
  },
  {
    icon: Network,
    title: 'Jaringan & Maintenance',
    desc: 'Instalasi dan maintenance jaringan warnet, game center, serta infrastruktur IT lainnya.',
    color: 'from-accent to-accent-dark',
    glow: 'shadow-accent/20',
  },
  {
    icon: Wifi,
    title: 'Hotspot / WiFi',
    desc: 'Pembangunan jaringan wifi hotspot untuk kebutuhan publik maupun privat dengan performa stabil.',
    color: 'from-neon-purple to-primary',
    glow: 'shadow-neon-purple/20',
  },
  {
    icon: MonitorSmartphone,
    title: 'Software Solutions',
    desc: 'Pengembangan aplikasi billing, game menu, dan sistem manajemen warnet custom.',
    color: 'from-neon-pink to-neon-purple',
    glow: 'shadow-neon-pink/20',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* BG */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <span className="text-sm text-accent font-medium">Tentang Kami</span>
          </div>
          <h2 className="reveal text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
            Solusi <span className="gradient-text">Terbaik</span> untuk
            <br />Warnet & Game Center
          </h2>
          <p className="reveal text-lg text-slate-400 max-w-2xl mx-auto">
            Melayani jasa pengadaan, pembangunan, dan maintenance jaringan warnet terkhususnya bermode diskless dengan performa terbaik.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className={`reveal group glass-card rounded-2xl p-6 md:p-8 hover:scale-[1.03] transition-all duration-500 cursor-default shadow-lg ${service.glow}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-display">
                {service.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                {service.desc}
              </p>
              <div className="flex items-center gap-2 text-primary-light text-sm font-medium group-hover:gap-3 transition-all">
                <span>Selengkapnya</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
