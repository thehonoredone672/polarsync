'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Upload, Eye, FileText, Database, BarChart3, CheckCircle,
  Clock, X, AlertTriangle, TrendingUp, Plus, ArrowRight
} from 'lucide-react';
import AppShell from '@/components/AppShell';
import { userSubmissions } from '@/lib/data';

const stats = [
  { label: 'Total Submissions', value: 12, icon: FileText, color: 'text-[#48CAE4]', bg: 'bg-[rgba(0,180,216,0.1)]' },
  { label: 'Under Review', value: 3, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { label: 'Published', value: 7, icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { label: 'Drafts', value: 2, icon: AlertTriangle, color: 'text-[rgba(144,224,239,0.5)]', bg: 'bg-[rgba(0,180,216,0.05)]' },
];

const statusBadge = (status: string) => {
  switch (status) {
    case 'published': return <span className="badge-published"><CheckCircle size={10} /> Published</span>;
    case 'under_review': return <span className="badge-review"><Clock size={10} /> Under Review</span>;
    case 'draft': return <span className="badge-draft">Draft</span>;
    case 'rejected': return <span className="badge-rejected"><X size={10} /> Rejected</span>;
    default: return null;
  }
};

const typeIcon: Record<string, React.ReactNode> = {
  paper: <FileText size={14} className="text-blue-400" />,
  dataset: <Database size={14} className="text-green-400" />,
  report: <BarChart3 size={14} className="text-amber-400" />,
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All'
    ? userSubmissions
    : userSubmissions.filter((s) => s.status.replace('_', ' ').toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-[rgba(144,224,239,0.4)] mb-1">Welcome back</p>
              <h1 className="font-space text-3xl font-bold text-gradient-white">Alex Johnson</h1>
              <p className="text-sm text-[rgba(202,240,248,0.45)] mt-1">Contributor · National Centre for Polar and Ocean Research</p>
            </div>
            <Link href="/contribute" className="btn-primary self-start sm:self-center">
              <Plus size={16} /> Upload New Content
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="stat-card"
            >
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon size={20} className={s.color} />
              </div>
              <div className="text-3xl font-bold font-space text-[#CAF0F8] mb-0.5">{s.value}</div>
              <div className="text-xs text-[rgba(144,224,239,0.45)]">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Activity + Contributions */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-5">
          {/* Submissions Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card rounded-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-[rgba(0,180,216,0.1)] flex items-center justify-between">
              <h2 className="font-space font-semibold text-[#CAF0F8]">Recent Contributions</h2>
              <div className="flex items-center gap-1 bg-[rgba(6,22,40,0.5)] rounded-lg p-0.5">
                {['All', 'Published', 'Review', 'Draft'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all
                      ${activeTab === tab ? 'bg-[rgba(0,180,216,0.2)] text-[#48CAE4]' : 'text-[rgba(144,224,239,0.4)] hover:text-[#90E0EF]'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="polar-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Region</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="flex items-center gap-2">
                          <img src={item.thumbnail} alt="" className="w-8 h-8 rounded-lg object-cover shrink-0" />
                          <span className="text-xs font-medium text-[#CAF0F8] line-clamp-1 max-w-[180px]">{item.title}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5">
                          {typeIcon[item.content_type]}
                          <span className="text-xs capitalize">{item.content_type}</span>
                        </div>
                      </td>
                      <td><span className="text-xs">{item.region}</span></td>
                      <td>{statusBadge(item.status)}</td>
                      <td><span className="text-xs">{item.year}</span></td>
                      <td>
                        <Link href={`/repository/${item.id}`} className="btn-ghost text-xs py-1 px-2">
                          <Eye size={12} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Side panel */}
          <div className="space-y-4">
            {/* Activity feed */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-5"
            >
              <h2 className="font-space font-semibold text-[#CAF0F8] mb-4 flex items-center gap-2">
                <TrendingUp size={15} className="text-[#48CAE4]" /> Recent Activity
              </h2>
              <div className="space-y-3">
                {[
                  { text: 'Your paper was approved for publication', time: '2h ago', color: 'bg-emerald-400' },
                  { text: 'New review comment on Ice Core Analysis', time: '1d ago', color: 'bg-amber-400' },
                  { text: 'Dataset download — 12 new downloads', time: '2d ago', color: 'bg-blue-400' },
                  { text: 'Submission received: Draft paper', time: '4d ago', color: 'bg-[rgba(0,180,216,0.6)]' },
                ].map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${a.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[rgba(202,240,248,0.7)] leading-snug">{a.text}</p>
                      <p className="text-[10px] text-[rgba(144,224,239,0.35)] mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-2xl p-5"
            >
              <h2 className="font-space font-semibold text-[#CAF0F8] mb-4">Quick Actions</h2>
              <div className="space-y-2">
                {[
                  { label: 'Upload New Content', href: '/contribute', icon: Upload },
                  { label: 'Browse Repository', href: '/repository', icon: Database },
                  { label: 'Admin Review Panel', href: '/admin', icon: CheckCircle },
                ].map((action) => (
                  <Link key={action.href} href={action.href}>
                    <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[rgba(0,180,216,0.07)] transition-all group">
                      <action.icon size={15} className="text-[rgba(0,180,216,0.6)] group-hover:text-[#48CAE4]" />
                      <span className="text-xs text-[rgba(202,240,248,0.6)] group-hover:text-[#CAF0F8] transition-colors">{action.label}</span>
                      <ArrowRight size={12} className="ml-auto text-[rgba(0,180,216,0.3)] group-hover:text-[#48CAE4]" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
