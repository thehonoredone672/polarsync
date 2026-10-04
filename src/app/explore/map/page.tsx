'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Filter, Search, Radio, Globe2 } from 'lucide-react';
import AppShell from '@/components/AppShell';
import { polarLocations, PolarLocation } from '@/lib/data';

// Dynamically import the map component to avoid SSR issues
const PolarMapInner = dynamic(() => import('@/components/PolarMapInner'), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center glass-card rounded-2xl">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-[#00B4D8] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-[rgba(144,224,239,0.6)]">Loading Polar Map...</p>
      </div>
    </div>
  ),
});

const categories = [
  { key: 'all', label: 'All', color: '#90E0EF' },
  { key: 'station', label: 'Research Station', color: '#EF4444' },
  { key: 'expedition', label: 'Expedition', color: '#10B981' },
  { key: 'dataset', label: 'Dataset', color: '#3B82F6' },
  { key: 'media', label: 'Media', color: '#8B5CF6' },
  { key: 'event', label: 'Event', color: '#F59E0B' },
];

const categoryEmoji: Record<string, string> = {
  station: '🔴', expedition: '🟢', dataset: '🔵', media: '🟣', event: '🟠',
};

export default function PolarMapPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState<PolarLocation | null>(null);
  const [searchQ, setSearchQ] = useState('');

  const filtered = polarLocations.filter((loc) => {
    const matchCat = activeCategory === 'all' || loc.category === activeCategory;
    const matchSearch = !searchQ || loc.name.toLowerCase().includes(searchQ.toLowerCase()) || loc.region.toLowerCase().includes(searchQ.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <AppShell>
      <div className="flex flex-col h-[calc(100vh-64px)] p-4 gap-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs text-[rgba(144,224,239,0.4)] mb-1">
              <Globe2 size={12} /> Explore · Polar Map
            </div>
            <h1 className="font-space text-2xl font-bold text-gradient-white">Interactive Polar Map</h1>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl polar-input max-w-xs">
              <Search size={14} className="text-[#48CAE4] shrink-0" />
              <input
                type="text"
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder="Search locations..."
                className="bg-transparent outline-none text-xs text-[#CAF0F8] placeholder-[rgba(144,224,239,0.35)] w-40"
              />
            </div>
          </div>
        </motion.div>

        {/* Filter pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                activeCategory === cat.key
                  ? 'border-[rgba(0,180,216,0.4)] bg-[rgba(0,180,216,0.15)] text-[#48CAE4]'
                  : 'border-[rgba(0,180,216,0.1)] bg-[rgba(6,22,40,0.5)] text-[rgba(144,224,239,0.5)] hover:border-[rgba(0,180,216,0.25)] hover:text-[#90E0EF]'
              }`}
            >
              {cat.key !== 'all' && <span className="text-[10px]">{categoryEmoji[cat.key]}</span>}
              {cat.label}
            </button>
          ))}
          <span className="ml-auto text-xs text-[rgba(144,224,239,0.35)] shrink-0">{filtered.length} locations</span>
        </div>

        {/* Map + side panel */}
        <div className="flex-1 flex gap-4 min-h-0">
          {/* Map */}
          <div className="flex-1 rounded-2xl overflow-hidden border border-[rgba(0,180,216,0.15)] min-h-[400px]">
            <PolarMapInner
              locations={filtered}
              selectedLocation={selectedLocation}
              onLocationSelect={setSelectedLocation}
            />
          </div>

          {/* Location detail panel */}
          {selectedLocation && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-72 glass-card rounded-2xl overflow-hidden flex flex-col shrink-0"
            >
              <div className="relative h-36">
                <img
                  src={selectedLocation.image || 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80'}
                  alt={selectedLocation.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(2,11,24,0.9)] to-transparent" />
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[rgba(0,0,0,0.5)] flex items-center justify-center text-[rgba(202,240,248,0.7)] hover:text-white text-xs"
                >
                  ✕
                </button>
                <div className="absolute bottom-0 left-0 p-3">
                  <span className="text-[10px] font-semibold text-[rgba(0,180,216,0.9)] uppercase tracking-wider">
                    {categoryEmoji[selectedLocation.category]} {selectedLocation.category}
                  </span>
                </div>
              </div>
              <div className="p-4 flex-1 overflow-y-auto">
                <h3 className="font-space font-bold text-[#CAF0F8] text-base mb-0.5">{selectedLocation.name}</h3>
                <p className="text-xs text-[rgba(0,180,216,0.7)] mb-3 flex items-center gap-1">
                  <MapPin size={10} /> {selectedLocation.region}
                  {selectedLocation.established && <span className="ml-2 opacity-60">Est. {selectedLocation.established}</span>}
                </p>
                <p className="text-xs text-[rgba(202,240,248,0.55)] leading-relaxed mb-3">{selectedLocation.description}</p>
                {selectedLocation.research_areas && (
                  <div className="mb-3">
                    <p className="text-[10px] font-semibold text-[rgba(144,224,239,0.4)] uppercase tracking-wider mb-1.5">Research Areas</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedLocation.research_areas.map((area) => (
                        <span key={area} className="tag text-[10px]">{area}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="text-[10px] text-[rgba(144,224,239,0.35)] mb-4">
                  📍 {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                </div>
                <button className="btn-primary w-full justify-center text-xs py-2.5">
                  View Details
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
