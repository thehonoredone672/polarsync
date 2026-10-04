'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Search, ArrowRight, Database, Image, GraduationCap,
  ChevronDown, MapPin, BarChart3, FileText, Globe, Microscope, Layers
} from 'lucide-react';
import Navbar from '@/components/Navbar';

const stats = [
  { label: 'Research Papers', value: '420+', icon: FileText },
  { label: 'Datasets', value: '180+', icon: Database },
  { label: 'Media Items', value: '2,300+', icon: Image },
  { label: 'Research Stations', value: '5', icon: MapPin },
];

const features = [
  {
    icon: Database,
    title: 'Knowledge Repository',
    desc: 'Access verified research papers, datasets and reports from India\'s polar missions and global collaborations.',
    href: '/repository',
    color: 'from-blue-600/20 to-cyan-600/10',
    borderColor: 'border-blue-500/20 hover:border-blue-400/40',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-300',
  },
  {
    icon: Image,
    title: 'Media Hub',
    desc: 'Explore breathtaking photographs, expedition videos and press releases from the frontlines of polar science.',
    href: '/media',
    color: 'from-purple-600/20 to-violet-600/10',
    borderColor: 'border-purple-500/20 hover:border-purple-400/40',
    iconBg: 'bg-purple-500/20',
    iconColor: 'text-purple-300',
  },
  {
    icon: GraduationCap,
    title: 'Education & Outreach',
    desc: 'Science stories, virtual tours, interactive quizzes and educator kits bringing polar science to everyone.',
    href: '/education',
    color: 'from-emerald-600/20 to-teal-600/10',
    borderColor: 'border-emerald-500/20 hover:border-emerald-400/40',
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-300',
  },
];

const floatingCards = [
  { title: 'Research', sub: 'Papers • Datasets • Reports', icon: Microscope, x: '5%', y: '55%', delay: 0 },
  { title: 'Media', sub: 'Photos • Videos • Press', icon: Image, x: '75%', y: '60%', delay: 0.4 },
  { title: 'Explore', sub: 'Maps • Stories • Expeditions', icon: Globe, x: '40%', y: '72%', delay: 0.2 },
];

const recentItems = [
  { label: 'Climate Change and Ice Shelf Dynamics in Antarctica', type: 'Paper', region: 'Antarctica' },
  { label: 'Antarctic Sea Ice Extent Dataset 2010–2026', type: 'Dataset', region: 'Antarctica' },
  { label: 'Himalayan Cryosphere Report 2025', type: 'Report', region: 'Himalayas' },
  { label: 'Emperor Penguins — Prydz Bay', type: 'Photo', region: 'Antarctica' },
];

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
    <div className="min-h-screen bg-polar-gradient">
      <Navbar />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Parallax BG */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1800&q=80')`,
              filter: 'brightness(0.18) saturate(0.4)',
            }}
          />
          {/* Aurora overlay */}
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 30% 0%, rgba(0,119,182,0.25) 0%, transparent 60%), radial-gradient(ellipse at 70% 10%, rgba(0,180,216,0.15) 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, rgba(0,180,216,0.08) 0%, transparent 50%)' }}
          />
        </motion.div>

        {/* Animated particles */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 rounded-full bg-cyan-300/60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `particle-drift ${8 + Math.random() * 12}s linear ${Math.random() * 8}s infinite`,
                opacity: Math.random() * 0.6 + 0.2,
              }}
            />
          ))}
        </div>

        {/* Hero content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(0,180,216,0.3)] bg-[rgba(0,180,216,0.08)] mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#00B4D8] animate-pulse" />
            <span className="text-xs font-medium text-[#90E0EF] tracking-wider">SIH 2026 — PROTOTYPE PLATFORM</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-space text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6"
          >
            <span className="text-white">One portal to </span>
            <span className="text-gradient">share and preserve</span>
            <br />
            <span className="text-white">India&apos;s polar science.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg text-[rgba(202,240,248,0.6)] max-w-2xl mx-auto mb-8"
          >
            Explore research, discover data, experience expeditions, and learn about
            India&apos;s contributions to polar and cryosphere science.
          </motion.p>

          {/* Search bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
            }}
            className="flex items-center gap-2 max-w-2xl mx-auto mb-10"
          >
            <div className="flex-1 flex items-center gap-3 px-5 py-4 rounded-2xl glass border border-[rgba(0,180,216,0.2)] focus-within:border-[rgba(0,180,216,0.45)] transition-all shadow-xl">
              <Search size={20} className="text-[#48CAE4] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search papers, datasets, media or topics..."
                className="flex-1 bg-transparent outline-none text-sm text-[#CAF0F8] placeholder-[rgba(144,224,239,0.35)]"
              />
            </div>
            <button type="submit" className="btn-primary px-5 py-4 rounded-2xl whitespace-nowrap">
              Search
            </button>
          </motion.form>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <Link href="/repository" className="btn-primary">
              Browse Repository <ArrowRight size={16} />
            </Link>
            <Link href="/explore/map" className="btn-secondary">
              <MapPin size={16} />
              Explore Polar Map
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating info cards */}
        {floatingCards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + card.delay, duration: 0.5 }}
            className="absolute z-10 hidden lg:flex flex-col gap-1 glass-card px-4 py-3 rounded-2xl cursor-pointer"
            style={{ left: card.x, top: card.y }}
            animate-y={String(i)}
            whileHover={{ scale: 1.05, y: -4 }}
          >
            <div className="flex items-center gap-2">
              <card.icon size={16} className="text-[#48CAE4]" />
              <span className="text-sm font-semibold text-[#CAF0F8]">{card.title}</span>
            </div>
            <span className="text-xs text-[rgba(144,224,239,0.55)]">{card.sub}</span>
          </motion.div>
        ))}

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium text-[rgba(144,224,239,0.4)] tracking-[0.2em]">SCROLL TO EXPLORE</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ChevronDown size={20} className="text-[rgba(0,180,216,0.5)]" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="py-12 px-4 border-y border-[rgba(0,180,216,0.08)]"
        style={{ background: 'rgba(2,11,24,0.7)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="stat-card text-center"
            >
              <s.icon size={22} className="mx-auto mb-2 text-[#48CAE4]" />
              <div className="text-2xl font-bold font-space text-gradient">{s.value}</div>
              <div className="text-xs text-[rgba(144,224,239,0.5)] mt-0.5">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-space text-3xl md:text-4xl font-bold text-gradient-white mb-3">
              Everything polar science, in one place
            </h2>
            <p className="text-[rgba(202,240,248,0.5)] max-w-xl mx-auto">
              From peer-reviewed research to expedition photography — PolarSync unifies India&apos;s polar knowledge ecosystem.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6 }}
              >
                <Link href={f.href}>
                  <div className={`glass-card rounded-2xl p-6 h-full bg-gradient-to-br ${f.color} border ${f.borderColor} transition-all duration-300`}>
                    <div className={`w-12 h-12 rounded-xl ${f.iconBg} flex items-center justify-center mb-4`}>
                      <f.icon size={22} className={f.iconColor} />
                    </div>
                    <h3 className="font-space text-lg font-semibold text-[#CAF0F8] mb-2">{f.title}</h3>
                    <p className="text-sm text-[rgba(202,240,248,0.55)] leading-relaxed">{f.desc}</p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-medium text-[#48CAE4]">
                      Explore <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT CONTENT ── */}
      <section className="py-12 px-4" style={{ background: 'rgba(2,11,24,0.5)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-space text-xl font-semibold text-[#CAF0F8]">Recently Added</h2>
            <Link href="/repository" className="text-sm text-[#48CAE4] hover:text-[#90E0EF] flex items-center gap-1 transition-colors">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {recentItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-xl px-4 py-3 flex items-center justify-between gap-3 cursor-pointer"
              >
                <div>
                  <p className="text-sm font-medium text-[#CAF0F8] line-clamp-1">{item.label}</p>
                  <p className="text-xs text-[rgba(144,224,239,0.45)] mt-0.5">{item.region}</p>
                </div>
                <span className="tag shrink-0">{item.type}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAP CTA ── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl overflow-hidden relative"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-15"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1400&q=80')` }}
            />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 p-8 md:p-12">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={18} className="text-[#48CAE4]" />
                  <span className="text-xs font-semibold text-[#48CAE4] tracking-wider uppercase">Interactive Map</span>
                </div>
                <h3 className="font-space text-2xl md:text-3xl font-bold text-white mb-3">
                  Explore India&apos;s polar research on a live map
                </h3>
                <p className="text-[rgba(202,240,248,0.55)] text-sm leading-relaxed">
                  Discover research stations, expedition routes, data collection sites and media hotspots across Antarctica, the Arctic and the Himalayas.
                </p>
              </div>
              <div className="shrink-0">
                <Link href="/explore/map" className="btn-primary text-base px-6 py-3.5 rounded-2xl">
                  Open Polar Map <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WORKFLOW ── */}
      <section className="py-16 px-4 border-t border-[rgba(0,180,216,0.08)]" style={{ background: 'rgba(2,11,24,0.6)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-space text-2xl font-bold text-[#CAF0F8] mb-2">From field to the world</h2>
            <p className="text-sm text-[rgba(144,224,239,0.5)] mb-10">A trusted, peer-reviewed workflow for polar science dissemination</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {['CONTRIBUTE', 'INGEST', 'METADATA', 'REVIEW', 'APPROVE', 'PUBLISH', 'DISCOVER'].map((step, i, arr) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="px-4 py-2 rounded-xl border border-[rgba(0,180,216,0.2)] bg-[rgba(0,180,216,0.07)] text-xs font-semibold text-[#90E0EF] tracking-wider">
                    {step}
                  </div>
                  {i < arr.length - 1 && (
                    <span className="text-[rgba(0,180,216,0.3)]">→</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-4 border-t border-[rgba(0,180,216,0.08)]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#00B4D8,#0077B6)' }}>
              <Layers size={14} color="white" />
            </div>
            <span className="font-space font-bold text-gradient">PolarSync</span>
            <span className="text-xs text-[rgba(144,224,239,0.35)] ml-2">SIH 2026 Prototype</span>
          </div>
          <p className="text-xs text-[rgba(144,224,239,0.3)] text-center">
            This is a prototype built for SIH 2026. All scientific content is representative sample data.
          </p>
          <div className="flex items-center gap-4 text-xs text-[rgba(144,224,239,0.4)]">
            <span>National Centre for Polar and Ocean Research</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
