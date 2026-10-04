'use client';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';
import { Menu } from 'lucide-react';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-polar-gradient flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-16">
        {/* Desktop Sidebar */}
        <div className={`hidden md:flex flex-col fixed left-0 top-16 bottom-0 z-30 glass border-r border-[rgba(0,180,216,0.1)] transition-all duration-300 ${sidebarCollapsed ? 'w-[64px]' : 'w-[220px]'}`}>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="flex items-center justify-end px-3 pt-3 pb-1 text-[rgba(144,224,239,0.4)] hover:text-[#48CAE4] transition-colors"
          >
            <Menu size={16} />
          </button>
          <Sidebar collapsed={sidebarCollapsed} />
        </div>

        {/* Main Content */}
        <main className={`flex-1 min-h-full transition-all duration-300 ${sidebarCollapsed ? 'md:ml-[64px]' : 'md:ml-[220px]'}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
