'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Clock, CheckCircle, X, Eye, ChevronRight, FileText, Database, Image as ImageIcon,
  AlertTriangle, User, Calendar, MapPin, Tag, ArrowLeft, BarChart3
} from 'lucide-react';
import AppShell from '@/components/AppShell';
import { pendingSubmissions, Submission } from '@/lib/data';
import toast from 'react-hot-toast';

const tabs = [
  { key: 'pending', label: 'Pending Review', icon: Clock, color: 'text-amber-400' },
  { key: 'approved', label: 'Approved', icon: CheckCircle, color: 'text-emerald-400' },
  { key: 'rejected', label: 'Rejected', icon: X, color: 'text-red-400' },
  { key: 'published', label: 'Published', icon: Eye, color: 'text-[#48CAE4]' },
];

const typeIcon: Record<string, React.ReactNode> = {
  'Research Paper': <FileText size={14} />, Dataset: <Database size={14} />,
  Report: <BarChart3 size={14} />, 'Image Collection': <ImageIcon size={14} />,
};

const qualityChecks = [
  { label: 'Metadata Completeness', pct: 88 },
  { label: 'Content Category Accuracy', pct: 95 },
  { label: 'Scientific Relevance', pct: 82 },
  { label: 'Format Compliance', pct: 100 },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('pending');
  const [reviewing, setReviewing] = useState<Submission | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>(pendingSubmissions);
  const [approvedList, setApprovedList] = useState<Submission[]>([]);
  const [rejectedList, setRejectedList] = useState<Submission[]>([]);

  const pending = submissions.filter((s) => s.status === 'pending');

  const handleApprove = (sub: Submission) => {
    setSubmissions((prev) => prev.filter((s) => s.id !== sub.id));
    setApprovedList((prev) => [...prev, { ...sub, status: 'approved' as const }]);
    setReviewing(null);
    toast.success(`"${sub.title.slice(0, 40)}..." approved & queued for publication`);
  };

  const handleReject = (sub: Submission) => {
    setSubmissions((prev) => prev.filter((s) => s.id !== sub.id));
    setRejectedList((prev) => [...prev, { ...sub, status: 'rejected' as const }]);
    setReviewing(null);
    toast.error(`Submission rejected`);
  };

  const tabCounts: Record<string, number> = {
    pending: pending.length,
    approved: approvedList.length,
    rejected: rejectedList.length,
    published: 7,
  };

  const activeItems = activeTab === 'pending' ? pending
    : activeTab === 'approved' ? approvedList
    : activeTab === 'rejected' ? rejectedList
    : [];

  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center gap-2 text-xs text-[rgba(144,224,239,0.4)] mb-2">
            <Shield size={12} /> Admin · Review Dashboard
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-space text-3xl font-bold text-gradient-white">Review Dashboard</h1>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Clock size={14} className="text-amber-400" />
              <span className="text-xs font-medium text-amber-300">{pending.length} pending review</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-5">
          {/* ── Left: Queue ── */}
          <div>
            {/* Tabs */}
            <div className="flex items-center gap-1 bg-[rgba(6,22,40,0.5)] rounded-xl p-1 mb-4 w-fit">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap
                    ${activeTab === tab.key
                      ? 'bg-[rgba(0,180,216,0.15)] text-[#48CAE4] border border-[rgba(0,180,216,0.25)]'
                      : 'text-[rgba(144,224,239,0.5)] hover:text-[#90E0EF]'
                    }`}
                >
                  <tab.icon size={12} className={activeTab === tab.key ? 'text-[#48CAE4]' : tab.color} />
                  {tab.label}
                  <span className={`text-[10px] opacity-70 ml-0.5`}>{tabCounts[tab.key]}</span>
                </button>
              ))}
            </div>

            {/* Items */}
            <div className="space-y-3">
              {activeTab === 'published' ? (
                <div className="glass-card rounded-xl p-5 text-center text-sm text-[rgba(144,224,239,0.4)]">
                  7 items published in the live repository.{' '}
                  <a href="/repository" className="text-[#48CAE4] hover:underline">View Repository →</a>
                </div>
              ) : activeItems.length === 0 ? (
                <div className="glass-card rounded-xl p-8 text-center">
                  <CheckCircle size={32} className="mx-auto mb-2 text-[rgba(0,180,216,0.2)]" />
                  <p className="text-sm text-[rgba(144,224,239,0.4)]">
                    {activeTab === 'pending' ? 'All submissions reviewed!' : `No ${activeTab} submissions`}
                  </p>
                </div>
              ) : (
                activeItems.map((sub, i) => (
                  <motion.div
                    key={sub.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className={`glass-card rounded-xl p-4 cursor-pointer border transition-all
                      ${reviewing?.id === sub.id
                        ? 'border-[rgba(0,180,216,0.4)] bg-[rgba(0,180,216,0.05)]'
                        : 'border-transparent hover:border-[rgba(0,180,216,0.2)]'
                      }`}
                    onClick={() => setReviewing(reviewing?.id === sub.id ? null : sub)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[rgba(0,180,216,0.1)] border border-[rgba(0,180,216,0.2)] text-[#90E0EF]">
                            {typeIcon[sub.content_type] || <FileText size={10} />}
                            {sub.content_type}
                          </span>
                          {activeTab === 'pending' && (
                            <span className="badge-review text-[10px]"><Clock size={8} /> Pending</span>
                          )}
                          {activeTab === 'approved' && (
                            <span className="badge-approved text-[10px]"><CheckCircle size={8} /> Approved</span>
                          )}
                          {activeTab === 'rejected' && (
                            <span className="badge-rejected text-[10px]"><X size={8} /> Rejected</span>
                          )}
                        </div>
                        <h3 className="text-sm font-medium text-[#CAF0F8] line-clamp-1 mb-1">{sub.title}</h3>
                        <div className="flex items-center gap-3 text-[10px] text-[rgba(144,224,239,0.4)]">
                          <span className="flex items-center gap-1"><User size={9} /> {sub.submitted_by}</span>
                          <span className="flex items-center gap-1"><MapPin size={9} /> {sub.region}</span>
                          <span className="flex items-center gap-1"><Calendar size={9} /> {new Date(sub.submitted_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {activeTab === 'pending' && (
                          <>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleApprove(sub); }}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 hover:bg-emerald-500/25 transition-all"
                            >
                              Approve
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleReject(sub); }}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/15 border border-red-500/25 text-red-300 hover:bg-red-500/25 transition-all"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        <ChevronRight size={14} className={`text-[rgba(0,180,216,0.3)] transition-transform ${reviewing?.id === sub.id ? 'rotate-90' : ''}`} />
                      </div>
                    </div>
                    {sub.notes && (
                      <p className="mt-2 text-xs text-[rgba(202,240,248,0.4)] border-t border-[rgba(0,180,216,0.08)] pt-2">{sub.notes}</p>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* ── Right: Review Panel ── */}
          <AnimatePresence>
            {reviewing ? (
              <motion.div
                key={reviewing.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                {/* Content Preview */}
                <div className="glass-card rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-space font-semibold text-[#CAF0F8]">Content Review</h2>
                    <button onClick={() => setReviewing(null)} className="text-[rgba(144,224,239,0.4)] hover:text-[#90E0EF] transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                  <h3 className="text-sm font-semibold text-[#CAF0F8] mb-3">{reviewing.title}</h3>
                  <div className="space-y-2 mb-4">
                    {[
                      { icon: Tag, label: 'Type', value: reviewing.content_type },
                      { icon: User, label: 'Submitted by', value: `${reviewing.submitted_by} · ${reviewing.organization}` },
                      { icon: Calendar, label: 'Submitted', value: new Date(reviewing.submitted_at).toLocaleDateString() },
                      { icon: MapPin, label: 'Region', value: reviewing.region },
                    ].map((m) => (
                      <div key={m.label} className="flex items-start gap-2 text-xs">
                        <m.icon size={12} className="text-[#48CAE4] mt-0.5 shrink-0" />
                        <span className="text-[rgba(144,224,239,0.4)] shrink-0">{m.label}:</span>
                        <span className="text-[rgba(202,240,248,0.7)]">{m.value}</span>
                      </div>
                    ))}
                  </div>
                  {reviewing.notes && (
                    <div className="text-xs text-[rgba(202,240,248,0.5)] border-t border-[rgba(0,180,216,0.1)] pt-3">
                      <span className="font-semibold text-[rgba(144,224,239,0.5)]">Note: </span>
                      {reviewing.notes}
                    </div>
                  )}
                </div>

                {/* Quality Check */}
                <div className="glass-card rounded-2xl p-5">
                  <h2 className="font-space font-semibold text-[#CAF0F8] mb-4 flex items-center gap-2">
                    <AlertTriangle size={14} className="text-amber-400" /> Quality Check
                  </h2>
                  <div className="space-y-3">
                    {qualityChecks.map((q) => (
                      <div key={q.label}>
                        <div className="flex justify-between text-xs text-[rgba(144,224,239,0.5)] mb-1">
                          <span>{q.label}</span>
                          <span className={q.pct >= 90 ? 'text-emerald-400' : q.pct >= 75 ? 'text-amber-400' : 'text-red-400'}>{q.pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[rgba(0,180,216,0.08)] overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${q.pct}%` }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="h-full rounded-full"
                            style={{ background: q.pct >= 90 ? 'linear-gradient(90deg,#059669,#10B981)' : q.pct >= 75 ? 'linear-gradient(90deg,#D97706,#F59E0B)' : 'linear-gradient(90deg,#DC2626,#EF4444)' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                {activeTab === 'pending' && (
                  <div className="glass-card rounded-2xl p-5 space-y-2.5">
                    <h2 className="font-space font-semibold text-[#CAF0F8] mb-3">Review Decision</h2>
                    <button
                      onClick={() => handleApprove(reviewing)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 hover:bg-emerald-500/25 transition-all"
                    >
                      <CheckCircle size={16} /> Approve & Publish
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-300 hover:bg-amber-500/20 transition-all">
                      <AlertTriangle size={16} /> Request Changes
                    </button>
                    <button
                      onClick={() => handleReject(reviewing)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-red-500/10 border border-red-500/20 text-red-300 hover:bg-red-500/20 transition-all"
                    >
                      <X size={16} /> Reject Submission
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-light rounded-2xl border border-[rgba(0,180,216,0.1)] flex flex-col items-center justify-center p-10 text-center"
              >
                <Shield size={32} className="text-[rgba(0,180,216,0.2)] mb-3" />
                <p className="text-sm font-medium text-[rgba(144,224,239,0.4)]">Select a submission to review</p>
                <p className="text-xs text-[rgba(144,224,239,0.25)] mt-1">Click any item from the queue</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AppShell>
  );
}
