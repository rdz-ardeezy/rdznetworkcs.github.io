import { useState } from 'react';
import { Send, Mail, Phone, MapPin, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { sendMessage, type ContactMessage } from '../services/api';

export default function ContactSection() {
  const [form, setForm] = useState<ContactMessage>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setStatus('idle');

    const success = await sendMessage(form);
    setSending(false);
    setStatus(success ? 'success' : 'error');

    if (success) {
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'rdznetwork@gmail.com',
      href: 'mailto:rdznetwork@gmail.com',
      color: 'text-neon-blue',
      bg: 'bg-neon-blue/10',
    },
    {
      icon: Phone,
      label: 'WhatsApp',
      value: '+62 xxx-xxxx-xxxx',
      href: '#',
      color: 'text-neon-green',
      bg: 'bg-neon-green/10',
    },
    {
      icon: MapPin,
      label: 'Lokasi',
      value: 'Indonesia',
      href: '#',
      color: 'text-neon-purple',
      bg: 'bg-neon-purple/10',
    },
    {
      icon: MessageCircle,
      label: 'Live Chat',
      value: 'Tersedia 24/7',
      href: '#',
      color: 'text-neon-pink',
      bg: 'bg-neon-pink/10',
    },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-surface/20 to-dark" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-pink/10 border border-neon-pink/20 mb-6">
            <Mail className="w-4 h-4 text-neon-pink" />
            <span className="text-sm text-neon-pink font-medium">Hubungi Kami</span>
          </div>
          <h2 className="reveal text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
            Mari <span className="gradient-text">Berdiskusi</span>
          </h2>
          <p className="reveal text-lg text-slate-400 max-w-2xl mx-auto">
            Ada pertanyaan atau ingin bekerja sama? Kirimkan pesan kepada kami dan tim kami akan segera merespon.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((info, i) => (
              <a
                key={i}
                href={info.href}
                className="reveal-left group flex items-center gap-4 glass-card rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl ${info.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  <info.icon className={`w-6 h-6 ${info.color}`} />
                </div>
                <div>
                  <div className="text-sm text-slate-400">{info.label}</div>
                  <div className="text-white font-medium">{info.value}</div>
                </div>
              </a>
            ))}

            {/* MySQL Info Box */}
            <div className="reveal-left glass-card rounded-2xl p-6 border-primary/20" style={{ transitionDelay: '400ms' }}>
              <h4 className="text-sm font-semibold text-primary-light mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Database MySQL
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Website ini terhubung ke MySQL server eksternal. Pesan yang Anda kirim akan tersimpan di database.
                Jika server offline, data akan disimpan secara lokal.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="reveal-right glass-card rounded-2xl p-6 md:p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-slate-300 mb-2 font-medium">Nama</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Nama lengkap"
                    className="w-full px-4 py-3 rounded-xl bg-dark-2 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-dark-2 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2 font-medium">Subjek</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="Tentang apa?"
                  className="w-full px-4 py-3 rounded-xl bg-dark-2 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2 font-medium">Pesan</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tulis pesan Anda..."
                  className="w-full px-4 py-3 rounded-xl bg-dark-2 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                />
              </div>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-neon-green/10 border border-neon-green/20 text-neon-green text-sm toast-enter">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  Pesan berhasil dikirim! Kami akan segera merespon.
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm toast-enter">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  Gagal mengirim pesan. Coba lagi nanti.
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-semibold text-lg shadow-xl shadow-primary/30 hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02]"
              >
                {sending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Kirim Pesan
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
