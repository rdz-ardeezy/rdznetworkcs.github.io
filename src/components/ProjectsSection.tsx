import { useState, useEffect } from 'react';
import { ExternalLink, Download, FolderOpen, Search, Filter } from 'lucide-react';
import { fetchProjects, type Project } from '../services/api';

const categories = ['Semua', 'Billing', 'Game Menu', 'Keuangan', 'Jaringan'];

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    const data = await fetchProjects();
    setProjects(data);
    setLoading(false);
  }

  const filtered = projects.filter((p) => {
    const matchCategory = activeCategory === 'Semua' || p.category === activeCategory;
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-purple/10 border border-neon-purple/20 mb-6">
            <FolderOpen className="w-4 h-4 text-neon-purple" />
            <span className="text-sm text-neon-purple font-medium">Portfolio</span>
          </div>
          <h2 className="reveal text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
            Projek <span className="gradient-text">Kami</span>
          </h2>
          <p className="reveal text-lg text-slate-400 max-w-2xl mx-auto">
            Berbagai produk dan layanan yang telah kami kembangkan untuk memenuhi kebutuhan warnet dan game center.
          </p>
        </div>

        {/* Filters */}
        <div className="reveal flex flex-col md:flex-row items-center gap-4 mb-10">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Cari projek..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-surface border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            <Filter className="w-4 h-4 text-slate-500 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-surface text-slate-400 hover:text-white hover:bg-surface-2'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        )}

        {/* Projects Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((project, i) => (
              <div
                key={project.id}
                className="reveal group glass-card rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-500"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Image */}
                <div className="relative h-48 md:h-52 overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/80 backdrop-blur-sm text-white">
                      {project.category}
                    </span>
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary transition-colors"
                        title="Demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {project.download_url && (
                      <a
                        href={project.download_url}
                        className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-neon-green hover:text-dark transition-colors"
                        title="Download"
                      >
                        <Download className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 font-display group-hover:text-primary-light transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <FolderOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">Tidak ada projek ditemukan</p>
            <p className="text-slate-500 text-sm mt-1">Coba ubah filter atau kata kunci pencarian</p>
          </div>
        )}
      </div>
    </section>
  );
}
