'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Image, Video, FileText, Play, Camera, MapPin, Calendar,
  Search, ExternalLink, BookOpen
} from 'lucide-react';
import AppShell from '@/components/AppShell';
import { mediaItems, MediaItem } from '@/lib/data';

const tabs = ['All', 'Photos', 'Videos', 'Press Releases'];

function MediaCard({ item, index }: { item: MediaItem; index: number }) {
  const typeIcon = item.type === 'video' ? <Play size={14} /> :
    item.type === 'press_release' ? <FileText size={14} /> : <Camera size={14} />;
  const typeLabel = item.type === 'press_release' ? 'Press Release' :
    item.type === 'video' ? 'Video' : 'Photo Gallery';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(2,11,24,0.92)] via-[rgba(2,11,24,0.2)] to-transparent" />
        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[rgba(0,0,0,0.55)] border border-[rgba(255,255,255,0.12)] text-white">
            {typeIcon} {typeLabel}
          </span>
        </div>
        {/* Video play / count overlay */}
        {item.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-14 h-14 rounded-full bg-[rgba(0,180,216,0.85)] flex items-center justify-center shadow-lg">
              <Play size={22} className="text-white ml-1" fill="white" />
            </div>
          </div>
        )}
        {item.duration && (
          <span className="absolute bottom-3 right-3 px-1.5 py-0.5 rounded bg-[rgba(0,0,0,0.7)] text-[10px] text-white font-mono">
            {item.duration}
          </span>
        )}
        {item.image_count && (
          <span className="absolute bottom-3 right-3 px-1.5 py-0.5 rounded bg-[rgba(0,0,0,0.7)] text-[10px] text-white">
            {item.image_count} photos
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-[#CAF0F8] text-sm leading-snug mb-1.5 line-clamp-2 group-hover:text-white transition-colors">
          {item.title}
        </h3>
        <p className="text-xs text-[rgba(202,240,248,0.45)] line-clamp-2 mb-3">{item.description}</p>
        <div className="flex items-center justify-between text-[10px] text-[rgba(144,224,239,0.4)]">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1"><MapPin size={10} />{item.location.split(',')[0]}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Calendar size={10} />{new Date(item.date).getFullYear()}</span>
          </div>
          {item.photographer && <span className="text-[rgba(144,224,239,0.3)]">{item.photographer.split('/')[0]}</span>}
        </div>
      </div>
    </motion.div>
  );
}

export default function MediaHubPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQ, setSearchQ] = useState('');

  const filtered = useMemo(() => {
    return mediaItems.filter((item) => {
      const matchTab = activeTab === 'All' ||
        (activeTab === 'Photos' && item.type === 'photo') ||
        (activeTab === 'Videos' && item.type === 'video') ||
        (activeTab === 'Press Releases' && item.type === 'press_release');
      const matchSearch = !searchQ ||
        item.title.toLowerCase().includes(searchQ.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQ.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQ.toLowerCase()));
      return matchTab && matchSearch;
    });
  }, [activeTab, searchQ]);

  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center gap-2 text-xs text-[rgba(144,224,239,0.4)] mb-2">
            <Image size={12} /> Media Hub
          </div>
          <h1 className="font-space text-3xl font-bold text-gradient-white mb-2">Media Gallery</h1>
          <p className="text-sm text-[rgba(202,240,248,0.5)]">
            Photos, videos and stories from the frontlines of polar research.
          </p>
        </motion.div>

        {/* Search + Tabs row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl polar-input">
            <Search size={15} className="text-[#48CAE4] shrink-0" />
            <input
              type="text"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder="Search media..."
              className="bg-transparent outline-none text-xs text-[#CAF0F8] placeholder-[rgba(144,224,239,0.35)] w-44"
            />
          </div>
          <div className="flex items-center gap-1 bg-[rgba(6,22,40,0.5)] rounded-xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap
                  ${activeTab === tab
                    ? 'bg-[rgba(0,180,216,0.2)] text-[#48CAE4] border border-[rgba(0,180,216,0.25)]'
                    : 'text-[rgba(144,224,239,0.5)] hover:text-[#90E0EF]'
                  }`}
              >
                {tab === 'Photos' && <Camera size={12} />}
                {tab === 'Videos' && <Video size={12} />}
                {tab === 'Press Releases' && <FileText size={12} />}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((item, i) => (
              <MediaCard key={item.id} item={item} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <Image size={40} className="text-[rgba(0,180,216,0.2)] mb-3" />
            <p className="text-[rgba(202,240,248,0.5)]">No media items found</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
