'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Globe, User, Menu, X, ChevronDown, Bell, Settings
} from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Explore', href: '/explore' },
  { label: 'Repository', href: '/repository' },
  { label: 'Media', href: '/media' },
  { label: 'Education', href: '/education' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-[rgba(0,180,216,0.12)]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#00B4D8,#0077B6)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" opacity="0.9"/>
                <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"/>
                <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
            <span className="font-space font-bold text-lg text-gradient">PolarSync</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${pathname === l.href
                    ? 'bg-[rgba(0,180,216,0.15)] text-[#48CAE4]'
                    : 'text-[rgba(202,240,248,0.65)] hover:text-[#CAF0F8] hover:bg-[rgba(0,180,216,0.07)]'
                  }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="hidden md:flex items-center gap-2">
            {/* Search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="btn-ghost p-2 rounded-lg"
            >
              <Search size={18} />
            </button>
            {/* Language */}
            <button className="btn-ghost px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1">
              <Globe size={15} />
              EN
            </button>
            {/* Notifications */}
            <button className="btn-ghost p-2 rounded-lg relative">
              <Bell size={17} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#00B4D8]" />
            </button>
            {/* Profile */}
            <Link href="/dashboard" className="flex items-center gap-2 px-3 py-1.5 rounded-xl
              bg-[rgba(0,180,216,0.1)] border border-[rgba(0,180,216,0.2)] hover:border-[rgba(0,180,216,0.35)] transition-all">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00B4D8] to-[#0077B6] flex items-center justify-center text-xs font-bold">
                A
              </div>
              <span className="text-xs font-medium text-[#90E0EF]">Alex</span>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden btn-ghost p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Search bar expansion */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-[rgba(0,180,216,0.1)] overflow-hidden"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                className="max-w-screen-xl mx-auto px-6 py-3 flex items-center gap-3"
              >
                <Search size={18} className="text-[#48CAE4] shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search papers, datasets, media or topics..."
                  className="flex-1 bg-transparent outline-none text-sm text-[#CAF0F8] placeholder-[rgba(144,224,239,0.35)]"
                />
                <Link
                  href={`/search?q=${encodeURIComponent(searchQuery)}`}
                  className="text-xs font-medium text-[#48CAE4] hover:text-[#90E0EF] transition-colors"
                >
                  Search →
                </Link>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-40 w-72 glass border-l border-[rgba(0,180,216,0.15)] flex flex-col pt-20 pb-6 px-5 md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${pathname === l.href
                      ? 'bg-[rgba(0,180,216,0.15)] text-[#48CAE4]'
                      : 'text-[rgba(202,240,248,0.7)] hover:bg-[rgba(0,180,216,0.08)] hover:text-[#CAF0F8]'
                    }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 pt-6 border-t border-[rgba(0,180,216,0.1)] flex flex-col gap-3">
              <Link href="/dashboard" onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[rgba(0,180,216,0.08)] border border-[rgba(0,180,216,0.15)]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00B4D8] to-[#0077B6] flex items-center justify-center font-bold text-sm">A</div>
                <div>
                  <p className="text-sm font-medium text-[#CAF0F8]">Alex Johnson</p>
                  <p className="text-xs text-[rgba(144,224,239,0.5)]">Contributor</p>
                </div>
              </Link>
              <Link href="/admin" onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-[rgba(202,240,248,0.6)] hover:text-[#CAF0F8] hover:bg-[rgba(0,180,216,0.08)] transition-all">
                <Settings size={16} />
                Admin Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
