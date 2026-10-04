'use client';
import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search, X, FileText, Database, BarChart3, Image, Sparkles,
  ChevronRight, Filter, Clock
} from 'lucide-react';
import AppShell from '@/components/AppShell';
import { repositoryItems, mediaItems, contentTypeColors, regionColors } from '@/lib/data';

interface SearchResult {
  id: string; title: string; description: string;
  type: string; region: string; tags: string[];
  thumbnail: string; year?: number; href: string;
  score: number;
}

function aiSummary(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('ice') || q.includes('glacier')) return `Research on ${query} covers changes in sea-ice extent, ice shelves, glacial dynamics and climate interactions across Antarctica, the Arctic and the Himalayas. India's polar missions have contributed significant observational and satellite-derived datasets in this domain.`;
  if (q.includes('penguin') || q.includes('wildlife')) return `Polar wildlife research documents the impact of climate change on species like Emperor and Adélie penguins, as well as krill populations and phytoplankton distributions across the Southern Ocean. Indian expeditions have conducted multi-year biodiversity surveys near Bharati Station.`;
  if (q.includes('arctic') || q.includes('svalbard')) return `Arctic science contributions from India's Himadri Station at Ny-Ålesund, Svalbard cover glaciology, atmospheric chemistry, methane flux measurements and polar ecology. The station has been active since 2008 in collaboration with Norwegian polar institutes.`;
  if (q.includes('himalaya') || q.includes('cryosphere')) return `Himalayan cryosphere research examines glacier mass balance, snow cover dynamics, permafrost changes and their impact on South Asian river systems. India maintains long-term monitoring programs at benchmark glaciers across the Himalayan range.`;
  return `Search results for "${query}" include peer-reviewed research papers, scientific datasets, expedition reports and media from India's polar science programs spanning Antarctica, the Arctic and the Himalayan cryosphere. Results are ranked by relevance to your query.`;
}

function computeResults(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  repositoryItems.forEach((item) => {
    const score =
      (item.title.toLowerCase().includes(q) ? 3 : 0) +
      (item.description.toLowerCase().includes(q) ? 2 : 0) +
      (item.tags.some((t) => t.toLowerCase().includes(q)) ? 2 : 0) +
      (item.region.toLowerCase().includes(q) ? 1 : 0) +
      (item.author.toLowerCase().includes(q) ? 1 : 0);
    if (score > 0) {
      results.push({
        id: item.id, title: item.title, description: item.description,
        type: item.content_type, region: item.region, tags: item.tags,
        thumbnail: item.thumbnail, year: item.year,
        href: `/repository/${item.id}`, score,
      });
    }
  });

  mediaItems.forEach((item) => {
    const score =
      (item.title.toLowerCase().includes(q) ? 3 : 0) +
      (item.description.toLowerCase().includes(q) ? 2 : 0) +
      (item.tags.some((t) => t.toLowerCase().includes(q)) ? 2 : 0) +
      (item.location.toLowerCase().includes(q) ? 1 : 0);
    if (score > 0) {
      results.push({
        id: item.id, title: item.title, description: item.description,
        type: item.type, region: item.location, tags: item.tags,
        thumbnail: item.thumbnail, year: Number(item.date.slice(0, 4)),
        href: `/media`, score,
      });
    }
  });

  return results.sort((a, b) => b.score - a.score);
}

const typeIcon: Record<string, React.ReactNode> = {
  paper: <FileText size={13} />, dataset: <Database size={13} />, report: <BarChart3 size={13} />,
  photo: <Image size={13} />, video: <Image size={13} />, press_release: <FileText size={13} />,
};
const typeLabel: Record<string, string> = {
  paper: 'Paper', dataset: 'Dataset', report: 'Report',
  photo: 'Photo', video: 'Video', press_release: 'Press Release',
};

const popularQueries = ['Antarctic ice shelf', 'Glacier retreat', 'Penguin population', 'Arctic methane', 'Polar expedition India', 'Sea ice dataset'];

function SearchContent() {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');
  const [submitted, setSubmitted] = useState(params.get('q') || '');
  const [isLoading, setIsLoading] = useState(false);

  const results = useMemo(() => computeResults(submitted), [submitted]);

  const handleSearch = (q: string) => {
    setQuery(q);
    setIsLoading(true);
    setTimeout(() => {
      setSubmitted(q);
      setIsLoading(false);
    }, 600);
  };

  useEffect(() => {
    if (params.get('q')) setSubmitted(params.get('q')!);
  }, [params]);

  const grouped = useMemo(() => {
    const out: Record<string, SearchResult[]> = {};
    results.forEach((r) => {
      const key = ['paper', 'dataset', 'report'].includes(r.type) ? 'Repository' : 'Media';
      if (!out[key]) out[key] = [];
      out[key].push(r);
    });
    return out;
  }, [results]);

  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-[rgba(144,224,239,0.4)] mb-2">
            <Search size={12} /> Search
          </div>
          <h1 className="font-space text-3xl font-bold text-gradient-white mb-4">Search PolarSync</h1>

          {/* Search bar */}
          <form onSubmit={(e) => { e.preventDefault(); handleSearch(query); }}
            className="flex items-center gap-3 max-w-2xl">
            <div className="flex-1 flex items-center gap-3 px-4 py-3.5 rounded-2xl glass border border-[rgba(0,180,216,0.2)] focus-within:border-[rgba(0,180,216,0.45)] transition-all">
              <Search size={18} className="text-[#48CAE4] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search papers, datasets, media or topics..."
                className="flex-1 bg-transparent outline-none text-sm text-[#CAF0F8] placeholder-[rgba(144,224,239,0.35)]"
              />
              {query && (
                <button type="button" onClick={() => { setQuery(''); setSubmitted(''); }}>
                  <X size={16} className="text-[rgba(144,224,239,0.4)] hover:text-[#90E0EF]" />
                </button>
              )}
            </div>
            <button type="submit" className="btn-primary px-5 py-3.5 rounded-2xl">Search</button>
          </form>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center gap-3 py-6">
            <div className="w-5 h-5 border-2 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-[rgba(144,224,239,0.6)]">Searching polar knowledge base...</span>
          </div>
        )}

        {/* No query — popular searches */}
        {!submitted && !isLoading && (
          <div>
            <p className="text-xs font-semibold text-[rgba(144,224,239,0.4)] uppercase tracking-wider mb-3 flex items-center gap-1">
              <Clock size={11} /> Popular Searches
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {popularQueries.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSearch(q)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium glass border border-[rgba(0,180,216,0.15)] text-[rgba(202,240,248,0.6)] hover:border-[rgba(0,180,216,0.3)] hover:text-[#CAF0F8] transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {submitted && !isLoading && (
          <div>
            {/* AI Summary */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-5 mb-6 border border-[rgba(0,180,216,0.15)]"
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-[#48CAE4]" />
                <span className="text-xs font-semibold text-[#48CAE4] uppercase tracking-wider">AI Overview</span>
                <span className="text-[10px] text-[rgba(144,224,239,0.3)] ml-1">(Phase 2: semantic search)</span>
              </div>
              <p className="text-sm text-[rgba(202,240,248,0.7)] leading-relaxed">
                {aiSummary(submitted)}
              </p>
            </motion.div>

            {/* Count */}
            <div className="text-xs text-[rgba(144,224,239,0.4)] mb-4">
              {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{submitted}&quot;
            </div>

            {/* Grouped results */}
            {results.length > 0 ? (
              <div className="space-y-6">
                {Object.entries(grouped).map(([group, items], gi) => (
                  <motion.div
                    key={group}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: gi * 0.1 }}
                  >
                    <h2 className="text-sm font-semibold text-[#90E0EF] mb-3 flex items-center gap-2">
                      {group === 'Repository' ? <Database size={14} /> : <Image size={14} />}
                      {group}
                      <span className="text-[10px] text-[rgba(144,224,239,0.4)] font-normal">{items.length} results</span>
                    </h2>
                    <div className="space-y-2.5">
                      {items.slice(0, 5).map((r, i) => (
                        <motion.div
                          key={r.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <Link href={r.href}>
                            <div className="glass-card rounded-xl p-4 flex items-center gap-4 group">
                              <img src={r.thumbnail} alt={r.title} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${contentTypeColors[r.type] || 'border-[rgba(0,180,216,0.2)] text-[#90E0EF]'}`}>
                                    {typeIcon[r.type]} {typeLabel[r.type] || r.type}
                                  </span>
                                  <span className="text-[10px] text-[rgba(144,224,239,0.35)]">{r.region}</span>
                                </div>
                                <h3 className="text-sm font-medium text-[#CAF0F8] line-clamp-1 group-hover:text-white transition-colors">
                                  {r.title}
                                </h3>
                                <p className="text-xs text-[rgba(202,240,248,0.4)] line-clamp-1 mt-0.5">{r.description}</p>
                              </div>
                              <ChevronRight size={16} className="text-[rgba(0,180,216,0.3)] group-hover:text-[#48CAE4] shrink-0 transition-colors" />
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Search size={40} className="text-[rgba(0,180,216,0.2)] mb-3" />
                <p className="text-[rgba(202,240,248,0.5)] font-medium">No results found</p>
                <p className="text-xs text-[rgba(144,224,239,0.3)] mt-1">Try different keywords or browse the repository</p>
                <Link href="/repository" className="btn-secondary mt-4 text-xs">Browse Repository</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-polar-gradient flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
    </div>}>
      <SearchContent />
    </Suspense>
  );
}
