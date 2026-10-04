'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Upload, FileText, Database, BarChart3, Image, Video, Newspaper,
  CheckCircle, Clock, ChevronRight, Info, ArrowRight
} from 'lucide-react';
import AppShell from '@/components/AppShell';
import toast from 'react-hot-toast';

const contentTypes = [
  { value: 'paper', label: 'Research Paper', icon: FileText, color: 'text-blue-300', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { value: 'dataset', label: 'Dataset', icon: Database, color: 'text-green-300', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  { value: 'report', label: 'Report', icon: BarChart3, color: 'text-amber-300', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { value: 'image', label: 'Image Collection', icon: Image, color: 'text-purple-300', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { value: 'video', label: 'Video', icon: Video, color: 'text-red-300', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  { value: 'press', label: 'Press Release', icon: Newspaper, color: 'text-cyan-300', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
];

const regions = ['Antarctica', 'Arctic', 'Himalayas', 'Southern Ocean', 'Multiple Regions'];
const researchAreas = ['Climate Change', 'Glaciology', 'Atmospheric Science', 'Marine Biology', 'Oceanography', 'Geomagnetism', 'Ecology', 'Geology', 'Remote Sensing'];
const licenses = ['CC BY 4.0', 'CC BY-SA 4.0', 'CC BY-NC 4.0', 'Open Government License', 'Restricted – Contact Author'];
const accessLevels = ['Public', 'Registered Users', 'Institutional Access', 'Restricted'];

const workflowSteps = ['DRAFT', 'UNDER REVIEW', 'APPROVED', 'PUBLISHED'];

export default function ContributePage() {
  const [selectedType, setSelectedType] = useState('paper');
  const [formData, setFormData] = useState({
    title: '', description: '', region: '', researchArea: '', author: '',
    organization: '', year: '', keywords: '', license: 'CC BY 4.0', access: 'Public',
  });
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) { toast.error('Please enter a title'); return; }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1800));
    setIsSubmitting(false);
    setSubmitted(true);
    toast.success('Submission received! It will be reviewed shortly.');
  };

  if (submitted) {
    return (
      <AppShell>
        <div className="p-6 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={32} className="text-emerald-400" />
            </div>
            <h2 className="font-space text-2xl font-bold text-[#CAF0F8] mb-2">Submission Received!</h2>
            <p className="text-sm text-[rgba(202,240,248,0.55)] mb-6">
              Your content has been submitted for review. Our editorial team will assess it within 2–5 business days.
            </p>

            {/* Workflow visualization */}
            <div className="flex items-center justify-center gap-1 mb-8">
              {workflowSteps.map((step, i) => (
                <div key={step} className="flex items-center gap-1">
                  <div className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all border
                    ${i === 1
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : i === 0
                      ? 'bg-emerald-500/15 border-emerald-500/25 text-emerald-400'
                      : 'bg-[rgba(0,180,216,0.05)] border-[rgba(0,180,216,0.1)] text-[rgba(144,224,239,0.3)]'
                    }`}>
                    {i === 0 && '✓ '}{step}
                  </div>
                  {i < workflowSteps.length - 1 && <ChevronRight size={14} className="text-[rgba(0,180,216,0.2)]" />}
                </div>
              ))}
            </div>

            <div className="flex gap-3 justify-center">
              <Link href="/dashboard" className="btn-primary">View Dashboard <ArrowRight size={15} /></Link>
              <button onClick={() => setSubmitted(false)} className="btn-secondary">Submit Another</button>
            </div>
          </motion.div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center gap-2 text-xs text-[rgba(144,224,239,0.4)] mb-2">
            <Upload size={12} /> Contribute
          </div>
          <h1 className="font-space text-3xl font-bold text-gradient-white mb-2">Contribute Content</h1>
          <p className="text-sm text-[rgba(202,240,248,0.5)]">
            Share your research, datasets, media and reports with the polar science community.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-6">
          {/* ── Form ── */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Content Type */}
            <div className="glass-card rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-[#90E0EF] mb-3 uppercase tracking-wider">Content Type</h2>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {contentTypes.map((ct) => (
                  <button
                    key={ct.value}
                    type="button"
                    onClick={() => setSelectedType(ct.value)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all text-center
                      ${selectedType === ct.value
                        ? `${ct.bg} ${ct.border} ${ct.color} scale-[1.03]`
                        : 'border-[rgba(0,180,216,0.1)] text-[rgba(144,224,239,0.4)] hover:border-[rgba(0,180,216,0.2)] hover:text-[rgba(144,224,239,0.7)]'
                      }`}
                  >
                    <ct.icon size={18} />
                    <span className="text-[10px] font-semibold leading-tight">{ct.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Area */}
            <div className="glass-card rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-[#90E0EF] mb-3 uppercase tracking-wider">File Upload</h2>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault(); setDragOver(false);
                  const f = e.dataTransfer.files[0];
                  if (f) { setFile(f); toast.success(`File selected: ${f.name}`); }
                }}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
                  ${dragOver ? 'border-[#00B4D8] bg-[rgba(0,180,216,0.08)]' : 'border-[rgba(0,180,216,0.2)] hover:border-[rgba(0,180,216,0.35)]'}`}
                onClick={() => document.getElementById('file-input')?.click()}
              >
                {file ? (
                  <div>
                    <CheckCircle size={28} className="text-emerald-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-[#CAF0F8]">{file.name}</p>
                    <p className="text-xs text-[rgba(144,224,239,0.4)] mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <div>
                    <Upload size={28} className="text-[rgba(0,180,216,0.4)] mx-auto mb-2" />
                    <p className="text-sm font-medium text-[rgba(202,240,248,0.6)]">Drag & drop your file here</p>
                    <p className="text-xs text-[rgba(144,224,239,0.35)] mt-1">or click to browse · PDF, CSV, NetCDF, ZIP, JPG, MP4</p>
                  </div>
                )}
                <input id="file-input" type="file" className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) { setFile(f); toast.success(`File selected: ${f.name}`); }
                  }}
                />
              </div>
            </div>

            {/* Metadata */}
            <div className="glass-card rounded-2xl p-5 space-y-4">
              <h2 className="text-sm font-semibold text-[#90E0EF] uppercase tracking-wider">Metadata</h2>

              <div>
                <label className="block text-xs font-semibold text-[rgba(144,224,239,0.5)] uppercase tracking-wider mb-1.5">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter a descriptive title"
                  className="polar-input w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[rgba(144,224,239,0.5)] uppercase tracking-wider mb-1.5">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide a brief description of the content..."
                  className="polar-input w-full resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[rgba(144,224,239,0.5)] uppercase tracking-wider mb-1.5">Region</label>
                  <select value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="polar-input w-full">
                    <option value="" className="bg-[#061628]">Select region</option>
                    {regions.map((r) => <option key={r} value={r} className="bg-[#061628]">{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[rgba(144,224,239,0.5)] uppercase tracking-wider mb-1.5">Research Area</label>
                  <select value={formData.researchArea} onChange={(e) => setFormData({ ...formData, researchArea: e.target.value })}
                    className="polar-input w-full">
                    <option value="" className="bg-[#061628]">Select area</option>
                    {researchAreas.map((r) => <option key={r} value={r} className="bg-[#061628]">{r}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[rgba(144,224,239,0.5)] uppercase tracking-wider mb-1.5">Author(s)</label>
                  <input type="text" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Dr. Full Name" className="polar-input w-full" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[rgba(144,224,239,0.5)] uppercase tracking-wider mb-1.5">Organization</label>
                  <input type="text" value={formData.organization} onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. NCPOR" className="polar-input w-full" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[rgba(144,224,239,0.5)] uppercase tracking-wider mb-1.5">Year</label>
                  <input type="number" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2026" min="1980" max="2030" className="polar-input w-full" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[rgba(144,224,239,0.5)] uppercase tracking-wider mb-1.5">License</label>
                  <select value={formData.license} onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                    className="polar-input w-full">
                    {licenses.map((l) => <option key={l} value={l} className="bg-[#061628]">{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[rgba(144,224,239,0.5)] uppercase tracking-wider mb-1.5">Access Level</label>
                  <select value={formData.access} onChange={(e) => setFormData({ ...formData, access: e.target.value })}
                    className="polar-input w-full">
                    {accessLevels.map((a) => <option key={a} value={a} className="bg-[#061628]">{a}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[rgba(144,224,239,0.5)] uppercase tracking-wider mb-1.5">Keywords</label>
                <input type="text" value={formData.keywords} onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  placeholder="Comma-separated keywords, e.g. sea ice, Antarctica, climate" className="polar-input w-full" />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-4 text-base rounded-2xl justify-center disabled:opacity-60"
            >
              {isSubmitting ? (
                <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Submitting...</>
              ) : (
                <><Upload size={18} /> Upload & Submit</>
              )}
            </button>
          </motion.form>

          {/* ── Side Panel ── */}
          <div className="space-y-4">
            {/* Workflow */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-2xl p-5"
            >
              <h2 className="text-sm font-semibold text-[#90E0EF] mb-4 uppercase tracking-wider">Submission Workflow</h2>
              <div className="space-y-3">
                {workflowSteps.map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-all
                      ${i === 0
                        ? 'bg-[rgba(0,180,216,0.2)] border-[#00B4D8] text-[#48CAE4]'
                        : 'bg-[rgba(0,180,216,0.05)] border-[rgba(0,180,216,0.15)] text-[rgba(144,224,239,0.3)]'
                      }`}>
                      {i + 1}
                    </div>
                    <span className={`text-xs font-medium ${i === 0 ? 'text-[#90E0EF]' : 'text-[rgba(144,224,239,0.35)]'}`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Guidelines */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-5"
            >
              <h2 className="text-sm font-semibold text-[#90E0EF] mb-3 uppercase tracking-wider flex items-center gap-1">
                <Info size={13} /> Guidelines
              </h2>
              <ul className="space-y-2 text-xs text-[rgba(202,240,248,0.55)] leading-relaxed">
                <li>• All submissions undergo peer review before publication</li>
                <li>• Ensure metadata is complete and accurate</li>
                <li>• Data must be from verified Indian or collaborative polar missions</li>
                <li>• Images must be high-resolution (min 1920px wide)</li>
                <li>• Reports should be in PDF format</li>
                <li>• Datasets should include a README or data dictionary</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
