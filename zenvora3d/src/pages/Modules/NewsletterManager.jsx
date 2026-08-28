import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { Mail, Download, Trash2, Search, Check, Sparkles, Send } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const NewsletterManager = () => {
  const { db, updateSection } = useDatabase();
  const [searchQuery, setSearchQuery] = useState('');

  const defaultSubscribers = [
    { id: 'sub-1', email: 'alex.creator@mediahub.com', date: '2026-07-28', status: 'Active', source: 'Homepage Footer' },
    { id: 'sub-2', email: 'rohan.v@techstudio.com', date: '2026-07-27', status: 'Active', source: 'Services CTA' },
    { id: 'sub-3', email: 'sarah.j@vercel.com', date: '2026-07-25', status: 'Active', source: 'Newsletter Modal' },
    { id: 'sub-4', email: 'david.chen@google.com', date: '2026-07-24', status: 'Active', source: 'Homepage Footer' }
  ];

  const list = db?.newsletterSubscribers || defaultSubscribers;

  const filtered = list.filter(s => s.email.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleDelete = (id) => {
    const updated = list.filter(s => s.id !== id);
    updateSection('newsletterSubscribers', updated);
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + ["Email,Date,Status,Source", ...list.map(s => `${s.email},${s.date},${s.status},${s.source}`)].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "newsletter_subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-luxury-gold shadow-gold-glow animate-pulse" />
            <h1 className="text-2xl font-serif font-bold tracking-wide uppercase text-white">Newsletter Subscribers</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-light">
            Manage subscriber leads, email campaign audiences, and CSV exports.
          </p>
        </div>

        <Button onClick={handleExportCSV} variant="gold" className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold">
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-3 backdrop-blur-xl flex items-center justify-between">
        <div className="relative w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-200 focus:outline-none"
          />
        </div>
        <span className="text-xs font-mono text-zinc-500">Total Subscribers: {list.length}</span>
      </div>

      <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl overflow-hidden backdrop-blur-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-900/80 border-b border-zinc-800/80 text-zinc-400 uppercase tracking-wider font-mono text-[10px]">
            <tr>
              <th className="py-3 px-4">Email Address</th>
              <th className="py-3 px-4">Subscribed Date</th>
              <th className="py-3 px-4">Source</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {filtered.map(sub => (
              <tr key={sub.id} className="hover:bg-zinc-900/30">
                <td className="py-3 px-4 font-mono font-semibold text-zinc-200">{sub.email}</td>
                <td className="py-3 px-4 font-mono text-zinc-500">{sub.date}</td>
                <td className="py-3 px-4 font-mono text-zinc-400">{sub.source}</td>
                <td className="py-3 px-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
                    {sub.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button onClick={() => handleDelete(sub.id)} className="p-1.5 text-zinc-500 hover:text-rose-400">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
