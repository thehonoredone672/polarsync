'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  BookOpen, Globe2, HelpCircle, Package, Clock, Users,
  ArrowRight, GraduationCap, Star
} from 'lucide-react';
import AppShell from '@/components/AppShell';
import { educationItems, EducationItem } from '@/lib/data';

const typeConfig: Record<string, { icon: React.ElementType; label: string; color: string; bg: string; border: string; cta: string }> = {
  story: {
    icon: BookOpen, label: 'Science Story', color: 'text-pink-300',
    bg: 'bg-pink-500/10', border: 'border-pink-500/20 hover:border-pink-400/40',
    cta: 'Read Story',
  },
  tour: {
    icon: Globe2, label: 'Virtual Tour', color: 'text-teal-300',
    bg: 'bg-teal-500/10', border: 'border-teal-500/20 hover:border-teal-400/40',
    cta: 'Take Tour →',
  },
  quiz: {
    icon: HelpCircle, label: 'Quiz', color: 'text-amber-300',
    bg: 'bg-amber-500/10', border: 'border-amber-500/20 hover:border-amber-400/40',
    cta: 'Start Quiz →',
  },
  kit: {
    icon: Package, label: 'Educator Kit', color: 'text-violet-300',
    bg: 'bg-violet-500/10', border: 'border-violet-500/20 hover:border-violet-400/40',
    cta: 'Download →',
  },
};

function EducationCard({ item, index }: { item: EducationItem; index: number }) {
  const cfg = typeConfig[item.type];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -5 }}
      className={`glass-card rounded-2xl overflow-hidden group border ${cfg.border} transition-all duration-300`}
    >
      <div className="relative h-44 overflow-hidden">
        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(2,11,24,0.92)] via-[rgba(2,11,24,0.2)] to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${cfg.bg} border ${cfg.border} ${cfg.color}`}>
            <cfg.icon size={12} /> {cfg.label}
          </span>
        </div>
        {item.level && (
          <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-[rgba(0,0,0,0.6)] text-[10px] text-white border border-[rgba(255,255,255,0.1)]">
            {item.level}
          </span>
        )}
        {item.questions && (
          <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-[rgba(0,0,0,0.6)] text-[10px] text-white">
            {item.questions} questions
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-[#CAF0F8] text-sm leading-snug mb-1.5 line-clamp-2 group-hover:text-white transition-colors">
          {item.title}
        </h3>
        <p className="text-xs text-[rgba(202,240,248,0.45)] line-clamp-2 mb-3 leading-relaxed">{item.description}</p>
        <div className="flex items-center justify-between">
          {item.duration && (
            <div className="flex items-center gap-1 text-[10px] text-[rgba(144,224,239,0.4)]">
              <Clock size={10} /> {item.duration}
            </div>
          )}
          <button className={`text-xs font-semibold ${cfg.color} hover:opacity-80 transition-opacity`}>
            {cfg.cta}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function EducationPage() {
  const storyItems = educationItems.filter((i) => i.type === 'story');
  const tourItems = educationItems.filter((i) => i.type === 'tour');
  const quizItems = educationItems.filter((i) => i.type === 'quiz');
  const kitItems = educationItems.filter((i) => i.type === 'kit');

  const sections = [
    { label: 'Science Stories', icon: BookOpen, items: storyItems, desc: 'Deep-dive narratives on Indian polar science' },
    { label: 'Virtual Tours', icon: Globe2, items: tourItems, desc: 'Explore research stations from your screen' },
    { label: 'Quizzes', icon: HelpCircle, items: quizItems, desc: 'Test your polar knowledge' },
    { label: 'Educator Kits', icon: Package, items: kitItems, desc: 'For teachers & school programs' },
  ];

  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[rgba(144,224,239,0.4)] mb-2">
            <GraduationCap size={12} /> Education & Outreach
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-space text-3xl font-bold text-gradient-white mb-2">Learn & Engage</h1>
              <p className="text-sm text-[rgba(202,240,248,0.5)]">
                Interactive lessons, datasets and resources to bring polar science closer to everyone.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[rgba(0,180,216,0.07)] border border-[rgba(0,180,216,0.15)]">
                <Users size={14} className="text-[#48CAE4]" />
                <span className="text-xs font-medium text-[#90E0EF]">12,400+ learners</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[rgba(0,180,216,0.07)] border border-[rgba(0,180,216,0.15)]">
                <Star size={14} className="text-amber-400" />
                <span className="text-xs font-medium text-[#90E0EF]">4.8 / 5 rating</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* All sections */}
        <div className="space-y-12">
          {sections.map((section, si) => (
            <div key={section.label}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-between mb-4"
              >
                <div className="flex items-center gap-2">
                  <section.icon size={18} className="text-[#48CAE4]" />
                  <div>
                    <h2 className="font-space text-lg font-semibold text-[#CAF0F8]">{section.label}</h2>
                    <p className="text-xs text-[rgba(144,224,239,0.4)]">{section.desc}</p>
                  </div>
                </div>
                <button className="text-xs text-[#48CAE4] hover:text-[#90E0EF] flex items-center gap-1 transition-colors">
                  Explore All <ArrowRight size={12} />
                </button>
              </motion.div>
              {section.items.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {section.items.map((item, i) => (
                    <EducationCard key={item.id} item={item} index={i + si * 4} />
                  ))}
                  {/* Coming soon card */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-light rounded-2xl border border-[rgba(0,180,216,0.1)] flex flex-col items-center justify-center p-6 text-center min-h-[200px]"
                  >
                    <section.icon size={24} className="text-[rgba(0,180,216,0.3)] mb-2" />
                    <p className="text-xs font-medium text-[rgba(144,224,239,0.4)]">More coming soon</p>
                    <p className="text-[10px] text-[rgba(144,224,239,0.25)] mt-1">Contribute your content</p>
                  </motion.div>
                </div>
              ) : (
                <div className="glass-light rounded-2xl border border-[rgba(0,180,216,0.1)] flex items-center justify-center p-10 text-center">
                  <p className="text-xs text-[rgba(144,224,239,0.4)]">Coming soon</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
