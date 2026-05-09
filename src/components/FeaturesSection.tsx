import { Zap, RefreshCw, Headphones, Shield, Gauge, Cloud } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Great Performance',
    desc: 'Tidak membutuhkan komputer server yang high-spec untuk menjalankan sistemnya. Efisien dan hemat biaya.',
    accent: 'text-neon-blue',
    bg: 'bg-neon-blue/10',
    border: 'border-neon-blue/20',
  },
  {
    icon: RefreshCw,
    title: 'Auto Update Game',
    desc: 'Update game secara otomatis dengan full speed download dan sistem synchronize terbaik.',
    accent: 'text-neon-green',
    bg: 'bg-neon-green/10',
    border: 'border-neon-green/20',
  },
  {
    icon: Headphones,
    title: 'Customer Support',
    desc: 'Sistem remote dan livechat untuk membantu menyelesaikan kendala-kendala yang ada di lapangan.',
    accent: 'text-neon-purple',
    bg: 'bg-neon-purple/10',
    border: 'border-neon-purple/20',
  },
  {
    icon: Shield,
    title: 'Keamanan Terjamin',
    desc: 'Sistem keamanan berlapis untuk melindungi data dan jaringan warnet dari ancaman cyber.',
    accent: 'text-neon-pink',
    bg: 'bg-neon-pink/10',
    border: 'border-neon-pink/20',
  },
  {
    icon: Gauge,
    title: 'Monitoring Real-time',
    desc: 'Dashboard monitoring untuk memantau status server, client, dan performa jaringan secara real-time.',
    accent: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/20',
  },
  {
    icon: Cloud,
    title: 'Cloud Backup',
    desc: 'Backup data otomatis ke cloud, memastikan data anda aman dan bisa di-restore kapan saja.',
    accent: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/20',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-surface/30 to-dark" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-green/10 border border-neon-green/20 mb-6">
            <Zap className="w-4 h-4 text-neon-green" />
            <span className="text-sm text-neon-green font-medium">Fitur Unggulan</span>
          </div>
          <h2 className="reveal text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
            Kenapa <span className="gradient-text">Memilih Kami</span>?
          </h2>
          <p className="reveal text-lg text-slate-400 max-w-2xl mx-auto">
            Fitur-fitur terbaik yang kami hadirkan untuk kemudahan dan efisiensi bisnis warnet Anda.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`reveal group relative glass-card rounded-2xl p-8 hover:scale-[1.02] transition-all duration-500`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl ${feature.bg} border ${feature.border} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-7 h-7 ${feature.accent}`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3 font-display">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>

              {/* Hover line */}
              <div className={`absolute bottom-0 left-8 right-8 h-0.5 rounded-full ${feature.bg} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
