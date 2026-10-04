'use client';
import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Download, Share2, Eye, FileText, Calendar, User,
  MapPin, Tag, BookOpen, Database, BarChart3, ChevronRight, ExternalLink, Quote
} from 'lucide-react';
import AppShell from '@/components/AppShell';
import { repositoryItems, contentTypeColors } from '@/lib/data';

const typeIcon: Record<string, React.ReactNode> = {
  paper: <FileText size={14} />,
  dataset: <Database size={14} />,
  report: <BarChart3 size={14} />,
};
const typeLabel: Record<string, string> = {
  paper: 'Research Paper', dataset: 'Dataset', report: 'Report',
};

export default function ContentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const item = repositoryItems.find((r) => r.id === id);
  if (!item) return notFound();

  const related = repositoryItems.filter((r) => r.id !== id && (r.region === item.region || r.tags.some((t) => item.tags.includes(t)))).slice(0, 3);

  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[rgba(144,224,239,0.4)] mb-4">
          <Link href="/repository" className="hover:text-[#90E0EF] flex items-center gap-1 transition-colors">
            <ArrowLeft size={12} /> Back to Repository
          </Link>
          <ChevronRight size={10} />
          <span className="text-[rgba(144,224,239,0.6)]">{item.title.slice(0, 40)}...</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          {/* ── Main Column ── */}
          <div className="space-y-5">
            {/* Hero card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              {/* Hero image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(2,11,24,0.95)] via-[rgba(2,11,24,0.4)] to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border mb-3 ${contentTypeColors[item.content_type] || ''}`}>
                    {typeIcon[item.content_type]} {typeLabel[item.content_type]}
                  </span>
                  <h1 className="font-space text-xl md:text-2xl font-bold text-white leading-tight">
                    {item.title}
                  </h1>
                </div>
              </div>

              <div className="p-6">
                {/* Meta row */}
                <div className="flex flex-wrap gap-4 mb-5 pb-5 border-b border-[rgba(0,180,216,0.1)]">
                  <div className="flex items-center gap-2 text-sm">
                    <User size={14} className="text-[#48CAE4]" />
                    <div>
                      <div className="text-[10px] text-[rgba(144,224,239,0.4)] uppercase font-semibold tracking-wider">Author</div>
                      <div className="text-[#CAF0F8] text-xs font-medium">{item.author}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={14} className="text-[#48CAE4]" />
                    <div>
                      <div className="text-[10px] text-[rgba(144,224,239,0.4)] uppercase font-semibold tracking-wider">Published</div>
                      <div className="text-[#CAF0F8] text-xs font-medium">{item.year}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={14} className="text-[#48CAE4]" />
                    <div>
                      <div className="text-[10px] text-[rgba(144,224,239,0.4)] uppercase font-semibold tracking-wider">Region</div>
                      <div className="text-[#CAF0F8] text-xs font-medium">{item.region}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen size={14} className="text-[#48CAE4]" />
                    <div>
                      <div className="text-[10px] text-[rgba(144,224,239,0.4)] uppercase font-semibold tracking-wider">Organization</div>
                      <div className="text-[#CAF0F8] text-xs font-medium">{item.organization}</div>
                    </div>
                  </div>
                  {item.views && (
                    <div className="flex items-center gap-2 text-sm">
                      <Eye size={14} className="text-[#48CAE4]" />
                      <div>
                        <div className="text-[10px] text-[rgba(144,224,239,0.4)] uppercase font-semibold tracking-wider">Views</div>
                        <div className="text-[#CAF0F8] text-xs font-medium">{item.views.toLocaleString()}</div>
                      </div>
                    </div>
                  )}
                  {item.citations && (
                    <div className="flex items-center gap-2 text-sm">
                      <Quote size={14} className="text-[#48CAE4]" />
                      <div>
                        <div className="text-[10px] text-[rgba(144,224,239,0.4)] uppercase font-semibold tracking-wider">Citations</div>
                        <div className="text-[#CAF0F8] text-xs font-medium">{item.citations}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Abstract */}
                <div className="mb-5">
                  <h2 className="text-sm font-semibold text-[#90E0EF] mb-2 uppercase tracking-wider">Abstract / Summary</h2>
                  <p className="text-sm text-[rgba(202,240,248,0.65)] leading-relaxed">
                    {item.abstract || item.description}
                  </p>
                </div>

                {/* Keywords */}
                {item.keywords && (
                  <div className="mb-4">
                    <h2 className="text-sm font-semibold text-[#90E0EF] mb-2 uppercase tracking-wider flex items-center gap-1">
                      <Tag size={12} /> Keywords
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {item.keywords.map((kw) => (
                        <span key={kw} className="tag">{kw}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Topics */}
                <div>
                  <h2 className="text-sm font-semibold text-[#90E0EF] mb-2 uppercase tracking-wider">Topics</h2>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Related Content */}
            {related.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-2xl p-5"
              >
                <h2 className="font-space text-base font-semibold text-[#CAF0F8] mb-4">Related Content</h2>
                <div className="space-y-3">
                  {related.map((r) => (
                    <Link key={r.id} href={`/repository/${r.id}`}>
                      <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-[rgba(0,180,216,0.07)] transition-all group">
                        <img src={r.thumbnail} alt={r.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#CAF0F8] line-clamp-1 group-hover:text-white">{r.title}</p>
                          <p className="text-xs text-[rgba(144,224,239,0.4)]">{r.region} · {r.year}</p>
                        </div>
                        <ChevronRight size={14} className="text-[rgba(0,180,216,0.4)] group-hover:text-[#48CAE4] shrink-0" />
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* ── Sidebar Column ── */}
          <div className="space-y-4">
            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-2xl p-5"
            >
              <h2 className="text-sm font-semibold text-[#90E0EF] mb-4 uppercase tracking-wider">Access</h2>
              <div className="flex flex-col gap-2.5">
                <a
                  href={item.file_url || '#'}
                  className="btn-primary w-full justify-center"
                  onClick={(e) => e.preventDefault()}
                >
                  <Download size={16} />
                  Download {item.file_format || 'File'}
                </a>
                <button className="btn-secondary w-full justify-center">
                  <ExternalLink size={15} />
                  View Full Record
                </button>
                <button className="btn-ghost w-full justify-center text-[rgba(144,224,239,0.6)]">
                  <Share2 size={15} />
                  Share
                </button>
              </div>
            </motion.div>

            {/* Metadata */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-5"
            >
              <h2 className="text-sm font-semibold text-[#90E0EF] mb-4 uppercase tracking-wider">Metadata</h2>
              <div className="space-y-3">
                {[
                  { label: 'Content Type', value: typeLabel[item.content_type] },
                  { label: 'Region', value: item.region },
                  { label: 'Year', value: String(item.year) },
                  { label: 'Status', value: item.status.replace('_', ' ').toUpperCase() },
                  item.file_size ? { label: 'File Size', value: item.file_size } : null,
                  item.file_format ? { label: 'Format', value: item.file_format } : null,
                  item.doi ? { label: 'DOI', value: item.doi } : null,
                ].filter(Boolean).map((meta) => (
                  <div key={meta!.label} className="flex justify-between items-start gap-2">
                    <span className="text-[10px] font-semibold text-[rgba(144,224,239,0.4)] uppercase tracking-wider shrink-0">{meta!.label}</span>
                    <span className="text-xs text-[rgba(202,240,248,0.7)] text-right">{meta!.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quality indicators */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-5"
            >
              <h2 className="text-sm font-semibold text-[#90E0EF] mb-4 uppercase tracking-wider">Quality Indicators</h2>
              <div className="space-y-2.5">
                {[
                  { label: 'Metadata Completeness', pct: 92 },
                  { label: 'Scientific Relevance', pct: 88 },
                  { label: 'Content Quality', pct: 95 },
                ].map((q) => (
                  <div key={q.label}>
                    <div className="flex justify-between text-[10px] text-[rgba(144,224,239,0.5)] mb-1">
                      <span>{q.label}</span><span>{q.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[rgba(0,180,216,0.1)] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${q.pct}%` }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg,#0077B6,#00B4D8)' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
