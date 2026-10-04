'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Home, Compass, Map, Search, Database, Image, GraduationCap,
  Settings, User, ChevronRight, Upload, LayoutDashboard, Shield
} from 'lucide-react';

const sidebarItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Compass, label: 'Explore', href: '/explore' },
  { icon: Map, label: 'Polar Map', href: '/explore/map' },
  { icon: Search, label: 'Search', href: '/search' },
  { icon: Database, label: 'Repository', href: '/repository' },
  { icon: Image, label: 'Media Hub', href: '/media' },
  { icon: GraduationCap, label: 'Education', href: '/education' },
];

const bottomItems = [
  { icon: LayoutDashboard, label: 'My Dashboard', href: '/dashboard' },
  { icon: Upload, label: 'Upload', href: '/contribute' },
  { icon: Shield, label: 'Admin', href: '/admin' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

interface SidebarProps {
  collapsed?: boolean;
}

export default function Sidebar({ collapsed = false }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`flex flex-col h-full py-4 transition-all duration-300 ${collapsed ? 'w-[60px]' : 'w-[220px]'}`}
    >
      {/* Main Nav */}
      <div className="flex-1 flex flex-col gap-0.5 px-2">
        {sidebarItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: collapsed ? 0 : 3 }}
                className={`sidebar-item ${active ? 'active' : ''} ${collapsed ? 'justify-center px-0' : ''}`}
              >
                <item.icon size={18} className={active ? 'text-[#48CAE4]' : 'text-[rgba(144,224,239,0.5)]'} />
                {!collapsed && (
                  <span className="flex-1">{item.label}</span>
                )}
                {!collapsed && active && (
                  <ChevronRight size={14} className="text-[#48CAE4] opacity-60" />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* Divider */}
      <div className="mx-3 my-3 polar-divider" />

      {/* Bottom Nav */}
      <div className="flex flex-col gap-0.5 px-2">
        {bottomItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: collapsed ? 0 : 3 }}
                className={`sidebar-item ${active ? 'active' : ''} ${collapsed ? 'justify-center px-0' : ''}`}
              >
                <item.icon size={18} className={active ? 'text-[#48CAE4]' : 'text-[rgba(144,224,239,0.5)]'} />
                {!collapsed && <span className="flex-1">{item.label}</span>}
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* User Profile at bottom */}
      {!collapsed && (
        <div className="px-3 pt-3">
          <Link href="/dashboard">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[rgba(0,180,216,0.07)] border border-[rgba(0,180,216,0.12)] hover:border-[rgba(0,180,216,0.25)] transition-all cursor-pointer">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00B4D8] to-[#0077B6] flex items-center justify-center text-xs font-bold shrink-0">
                A
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#CAF0F8] truncate">Alex Johnson</p>
                <p className="text-[10px] text-[rgba(144,224,239,0.5)]">Contributor</p>
              </div>
            </div>
          </Link>
        </div>
      )}
    </aside>
  );
}
