'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search, Filter, FileText, Database, BarChart3, Download,
  Eye, Calendar, User, Tag, ChevronRight, X, BookOpen
} from 'lucide-react';
import AppShell from '@/components/AppShell';
import { repositoryItems, ContentItem, contentTypeColors, regionColors } from '@/lib/data';

const tabs = ['All', 'Papers', 'Datasets', 'Reports'];
const regions = ['All Regions', 'Antarctica', 'Arctic', 'Himalayas', 'Southern Ocean'];
const years = ['All Years', '2026', '2025', '2024', '2023'];

const typeIcon: Record<string, React.ReactNode> = {
  paper: <FileText size={14} />, dataset: <Database size={14} />, report: <BarChart3 size={14} />,
};
const typeLabel: Record<string, string> = {
  paper: 'Research Paper', dataset: 'Dataset', report: 'Report',
};

function RepositoryCard({ item, index }: { item: ContentItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -3 }}
      className="glass-card rounded-2xl overflow-hidden group"
    >
      {/* Thumbnail */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(2,11,24,0.9)] via-[rgba(2,11,24,0.3)] to-transparent" />
        {/* Type badge on image */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${contentTypeColors[item.content_type] || ''}`}>
            {typeIcon[item.content_type]} {typeLabel[item.content_type] || item.content_type}
          </span>
        </div>
        {item.file_format && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-[rgba(0,0,0,0.6)] text-[10px] font-semibold text-[rgba(202,240,248,0.7)] border border-[rgba(255,255,255,0.08)]">
            {item.file_format}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-[#CAF0F8] text-sm leading-snug mb-2 line-clamp-2 group-hover:text-white transition-colors">
          {item.title}
        </h3>
        <p className="text-xs text-[rgba(202,240,248,0.45)] line-clamp-2 mb-3 leading-relaxed">
          {item.description}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className={`tag text-[10px] ${regionColors[item.region] || ''}`}>{item.region}</span>
          {item.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="tag text-[10px]">{tag}</span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="text-[10px] text-[rgba(144,224,239,0.4)] flex items-center gap-2">
            <span className="flex items-center gap-1"><User size={10} />{item.author.split(' ').slice(-1)[0]}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Calendar size={10} />{item.year}</span>
            {item.views && <><span>·</span><span className="flex items-center gap-1"><Eye size={10} />{item.views.toLocaleString()}</span></>}
          </div>
          <Link
            href={`/repository/${item.id}`}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#48CAE4] hover:text-[#90E0EF] transition-colors"
          >
            View <ChevronRight size={12} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function RepositoryPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQ, setSearchQ] = useState('');
  const [region, setRegion] = useState('All Regions');
  const [year, setYear] = useState('All Years');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return repositoryItems.filter((item) => {
      const matchTab = activeTab === 'All' ||
        (activeTab === 'Papers' && item.content_type === 'paper') ||
        (activeTab === 'Datasets' && item.content_type === 'dataset') ||
        (activeTab === 'Reports' && item.content_type === 'report');
      const matchSearch = !searchQ ||
        item.title.toLowerCase().includes(searchQ.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQ.toLowerCase())) ||
        item.region.toLowerCase().includes(searchQ.toLowerCase());
      const matchRegion = region === 'All Regions' || item.region === region;
      const matchYear = year === 'All Years' || item.year === Number(year);
      return matchTab && matchSearch && matchRegion && matchYear;
    });
  }, [activeTab, searchQ, region, year]);

  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center gap-2 text-xs text-[rgba(144,224,239,0.4)] mb-2">
            <BookOpen size={12} />
            <span>Knowledge Repository</span>
          </div>
          <h1 className="font-space text-3xl font-bold text-gradient-white mb-2">Knowledge Repository</h1>
          <p className="text-sm text-[rgba(202,240,248,0.5)]">
            Access verified research, datasets and reports from India&apos;s polar missions and global collaborations.
          </p>
        </motion.div>

        {/* Search + Filter row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="flex-1 flex items-center gap-2 polar-input px-4 py-2.5">
            <Search size={16} className="text-[#48CAE4] shrink-0" />
            <input
              type="text"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder="Search repository..."
              className="flex-1 bg-transparent outline-none text-sm text-[#CAF0F8] placeholder-[rgba(144,224,239,0.35)]"
            />
            {searchQ && (
              <button onClick={() => setSearchQ('')}>
                <X size={14} className="text-[rgba(144,224,239,0.4)] hover:text-[#90E0EF]" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary shrink-0 ${showFilters ? 'border-[rgba(0,180,216,0.4)] bg-[rgba(0,180,216,0.15)]' : ''}`}
          >
            <Filter size={15} />
            Filters
            {(region !== 'All Regions' || year !== 'All Years') && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8]" />
            )}
          </button>
          <Link href="/contribute" className="btn-primary shrink-0">
            + Upload
          </Link>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-light rounded-xl p-4 mb-5 grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            <div>
              <label className="block text-[10px] font-semibold text-[rgba(144,224,239,0.5)] uppercase tracking-wider mb-1.5">Region</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full polar-input text-xs py-2"
              >
                {regions.map((r) => <option key={r} value={r} className="bg-[#061628]">{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-[rgba(144,224,239,0.5)] uppercase tracking-wider mb-1.5">Year</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full polar-input text-xs py-2"
              >
                {years.map((y) => <option key={y} value={y} className="bg-[#061628]">{y}</option>)}
              </select>
            </div>
            <div className="col-span-2 flex items-end">
              <button
                onClick={() => { setRegion('All Regions'); setYear('All Years'); }}
                className="text-xs text-[rgba(144,224,239,0.5)] hover:text-[#90E0EF] transition-colors"
              >
                Clear filters
              </button>
            </div>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-5 bg-[rgba(6,22,40,0.5)] rounded-xl p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                ${activeTab === tab
                  ? 'bg-[rgba(0,180,216,0.2)] text-[#48CAE4] border border-[rgba(0,180,216,0.25)]'
                  : 'text-[rgba(144,224,239,0.5)] hover:text-[#90E0EF]'
                }`}
            >
              {tab}
              {tab !== 'All' && (
                <span className="ml-1.5 text-[10px] opacity-60">
                  {repositoryItems.filter(i =>
                    (tab === 'Papers' && i.content_type === 'paper') ||
                    (tab === 'Datasets' && i.content_type === 'dataset') ||
                    (tab === 'Reports' && i.content_type === 'report')
                  ).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="text-xs text-[rgba(144,224,239,0.4)] mb-4">
          {filtered.length} item{filtered.length !== 1 ? 's' : ''} found
          {searchQ && <span> for &quot;{searchQ}&quot;</span>}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((item, i) => (
              <RepositoryCard key={item.id} item={item} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search size={40} className="text-[rgba(0,180,216,0.2)] mb-3" />
            <p className="text-[rgba(202,240,248,0.5)] font-medium">No items found</p>
            <p className="text-xs text-[rgba(144,224,239,0.3)] mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
