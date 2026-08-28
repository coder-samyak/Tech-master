import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { PhoneCall, Mail, Search, Filter, Trash2, Eye, CheckCircle2, Clock, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const ContactsManager = () => {
  const { db, updateSection, refreshDatabase } = useDatabase();
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const defaultEnquiries = [
    { id: 'enq-1', name: 'Gabriella Rossi', email: 'gabriella@dolcegabbana.it', phone: '+39 02 7741', company: 'Dolce & Gabbana', subject: 'Brand Collaboration & Production', message: 'We would like to inquire about a sponsored production shoot for our tech collection.', date: '2026-07-28', status: 'New' },
    { id: 'enq-2', name: 'Vikramaditya Singh', email: 'vikram@tata.com', phone: '+91 98765 43210', company: 'Tata Motors', subject: 'Master Wheels Shoot Inquiry', message: 'Inquiring regarding upcoming EV shoot availability and studio rental in Jaipur.', date: '2026-07-27', status: 'In Progress' }
  ];

  let localEnquiries = [];
  try {
    const saved = localStorage.getItem('zenvora_db');
    if (saved) {
      const parsed = JSON.parse(saved);
      localEnquiries = [...(parsed.contactEnquiries || []), ...(parsed.enquiries || [])];
    }
  } catch (e) {}

  const rawList = [
    ...(Array.isArray(db?.contactEnquiries) ? db.contactEnquiries : []),
    ...(Array.isArray(db?.enquiries) ? db.enquiries : []),
    ...localEnquiries,
    ...defaultEnquiries
  ];

  const map = new Map();
  rawList.forEach(item => {
    if (item && item.id && !map.has(item.id)) {
      map.set(item.id, item);
    }
  });

  const list = Array.from(map.values());

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    if (refreshDatabase) await refreshDatabase();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const filtered = list.filter(e => 
    (e.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
    (e.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (e.company || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (e.category || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleStatus = (id) => {
    const updated = list.map(e => e.id === id ? { ...e, status: e.status === 'New' ? 'In Progress' : e.status === 'In Progress' ? 'Completed' : 'New' } : e);
    updateSection('contactEnquiries', updated);
    updateSection('enquiries', updated);
  };

  const handleDelete = (id) => {
    const updated = list.filter(e => e.id !== id);
    updateSection('contactEnquiries', updated);
    updateSection('enquiries', updated);
    if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-luxury-gold shadow-gold-glow animate-pulse" />
            <h1 className="text-2xl font-serif font-bold tracking-wide uppercase text-white">Contacts & Business Enquiries</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-light">
            Centralized Business Enquiries, Brand Partnerships & Contact Submissions.
          </p>
        </div>

        <Button 
          onClick={handleManualRefresh} 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2 text-xs uppercase font-mono cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-luxury-gold' : ''}`} />
          <span>Refresh Leads</span>
        </Button>
      </div>

      <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-3 backdrop-blur-xl flex items-center justify-between">
        <div className="relative w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search leads, name, company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-200 focus:outline-none"
          />
        </div>
        <span className="text-xs font-mono text-zinc-500">Total Enquiries: {list.length}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-950/60 border border-zinc-800/80 rounded-xl overflow-hidden backdrop-blur-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-900/80 border-b border-zinc-800/80 text-zinc-400 uppercase tracking-wider font-mono text-[10px]">
              <tr>
                <th className="py-3 px-4">Contact Person</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filtered.map(enq => (
                <tr 
                  key={enq.id} 
                  onClick={() => setSelectedEnquiry(enq)}
                  className={`hover:bg-zinc-900/40 cursor-pointer transition-colors ${selectedEnquiry?.id === enq.id ? 'bg-zinc-900/60 border-l-2 border-l-luxury-gold' : ''}`}
                >
                  <td className="py-3 px-4">
                    <p className="font-semibold text-zinc-200">{enq.name}</p>
                    <p className="text-[10px] font-mono text-zinc-500">{enq.email}</p>
                  </td>
                  <td className="py-3 px-4 font-mono text-zinc-300">{enq.company}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleToggleStatus(enq.id); }}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${
                        enq.status === 'New' ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' :
                        enq.status === 'In Progress' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                        'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      }`}
                    >
                      {enq.status}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDelete(enq.id); }}
                      className="p-1.5 text-zinc-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Lead Details Card */}
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-5 backdrop-blur-xl space-y-4">
          {selectedEnquiry ? (
            <>
              <div className="border-b border-zinc-800 pb-3">
                <h3 className="text-base font-serif font-bold text-white">{selectedEnquiry.name}</h3>
                <p className="text-xs text-luxury-gold font-mono">{selectedEnquiry.company}</p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Subject</span>
                  <span className="text-zinc-200 font-medium">{selectedEnquiry.subject}</span>
                </div>

                <div>
                  <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Message Content</span>
                  <p className="text-zinc-300 bg-zinc-900/80 p-3 rounded-lg border border-zinc-800/80 mt-1 font-light leading-relaxed">
                    {selectedEnquiry.message}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800">
                  <div>
                    <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Email</span>
                    <a href={`mailto:${selectedEnquiry.email}`} className="text-luxury-gold font-mono underline">{selectedEnquiry.email}</a>
                  </div>
                  <div>
                    <span className="text-zinc-500 uppercase tracking-wider block text-[10px]">Phone</span>
                    <span className="text-zinc-300 font-mono">{selectedEnquiry.phone}</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16 text-zinc-500">
              <Mail className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs">Select an enquiry to view full lead details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
