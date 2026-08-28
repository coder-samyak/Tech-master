import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { 
  Globe, Move, Eye, EyeOff, Plus, Trash2, Edit3, Save, 
  ExternalLink, Layers, Check, ArrowDown, ArrowUp, Link as LinkIcon 
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const NavigationManager = () => {
  const { db, updateSection } = useDatabase();
  const [activeTab, setActiveTab] = useState('navbar');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const defaultNavbarLinks = [
    { id: 'nav-1', label: 'Home', url: '/', target: '_self', order: 1, visible: true, external: false },
    { id: 'nav-2', label: 'About', url: '/about', target: '_self', order: 2, visible: true, external: false },
    { id: 'nav-3', label: 'Journey', url: '/journey', target: '_self', order: 3, visible: true, external: false },
    { id: 'nav-6', label: 'Our Work', url: '/portfolio', target: '_self', order: 4, visible: true, external: false },
    { id: 'nav-7', label: 'Contact', url: '/contact', target: '_self', order: 5, visible: true, external: false }
  ];

  const defaultFooterLinks = [
    { id: 'foot-1', label: 'Home', url: '/', category: 'Quick Links', order: 1, visible: true },
    { id: 'foot-2', label: 'About Us', url: '/about', category: 'Quick Links', order: 2, visible: true },
    { id: 'foot-4', label: 'Our Work', url: '/portfolio', category: 'Quick Links', order: 3, visible: true },
    { id: 'foot-5', label: 'Privacy Policy', url: '/privacy-policy', category: 'Legal', order: 4, visible: true },
    { id: 'foot-6', label: 'Terms & Conditions', url: '/terms-conditions', category: 'Legal', order: 5, visible: true }
  ];

  const navbarLinks = db?.navigationNavbar || defaultNavbarLinks;
  const footerLinks = db?.navigationFooter || defaultFooterLinks;

  const currentList = activeTab === 'navbar' ? navbarLinks : footerLinks;

  const handleToggleVisibility = (id) => {
    const key = activeTab === 'navbar' ? 'navigationNavbar' : 'navigationFooter';
    const updated = currentList.map(item => item.id === id ? { ...item, visible: !item.visible } : item);
    updateSection(key, updated);
  };

  const handleDeleteItem = (id) => {
    const key = activeTab === 'navbar' ? 'navigationNavbar' : 'navigationFooter';
    const updated = currentList.filter(item => item.id !== id);
    updateSection(key, updated);
  };

  const handleSaveItem = (e) => {
    e.preventDefault();
    const key = activeTab === 'navbar' ? 'navigationNavbar' : 'navigationFooter';
    let updated;
    if (editingItem.id) {
      updated = currentList.map(item => item.id === editingItem.id ? editingItem : item);
    } else {
      const newItem = { ...editingItem, id: `nav-${Date.now()}`, order: currentList.length + 1, visible: true };
      updated = [...currentList, newItem];
    }
    updateSection(key, updated);
    setIsEditing(false);
    setEditingItem(null);
  };

  const handleMoveOrder = (index, direction) => {
    const key = activeTab === 'navbar' ? 'navigationNavbar' : 'navigationFooter';
    const copy = [...currentList];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= copy.length) return;
    
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;

    // reassign order numbers
    const reordered = copy.map((item, idx) => ({ ...item, order: idx + 1 }));
    updateSection(key, reordered);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-luxury-gold shadow-gold-glow animate-pulse" />
            <h1 className="text-2xl font-serif font-bold tracking-wide uppercase text-white">Navigation Manager</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-light">
            Manage Navbar links, Footer navigation columns, ordering, external links, and visibility toggles.
          </p>
        </div>

        <Button
          onClick={() => {
            setEditingItem({ label: '', url: '/', target: '_self', external: false, category: 'Quick Links' });
            setIsEditing(true);
          }}
          variant="gold"
          className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold"
        >
          <Plus className="w-4 h-4" />
          Add Navigation Link
        </Button>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-3">
        {[
          { id: 'navbar', label: 'Navbar Links', count: navbarLinks.length },
          { id: 'footer', label: 'Footer Links', count: footerLinks.length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/30'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
            }`}
          >
            <span>{tab.label}</span>
            <span className="px-2 py-0.5 rounded-full bg-zinc-900 text-[10px] font-mono text-zinc-400 border border-zinc-800">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Table & Reorder List */}
      <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl overflow-hidden backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-900/80 border-b border-zinc-800/80 text-zinc-400 uppercase tracking-wider font-mono text-[10px]">
              <tr>
                <th className="py-3 px-4 w-12 text-center">Order</th>
                <th className="py-3 px-4">Link Label</th>
                <th className="py-3 px-4">Target URL</th>
                {activeTab === 'footer' && <th className="py-3 px-4">Column Category</th>}
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {currentList.map((item, idx) => (
                <tr key={item.id} className="hover:bg-zinc-900/30 transition-colors">
                  <td className="py-3 px-4 text-center font-mono text-zinc-500">
                    <div className="flex items-center justify-center gap-1">
                      <button 
                        disabled={idx === 0}
                        onClick={() => handleMoveOrder(idx, -1)}
                        className="text-zinc-600 hover:text-luxury-gold disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <span>{item.order}</span>
                      <button 
                        disabled={idx === currentList.length - 1}
                        onClick={() => handleMoveOrder(idx, 1)}
                        className="text-zinc-600 hover:text-luxury-gold disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-zinc-200">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-3.5 h-3.5 text-luxury-gold/70" />
                      <span>{item.label}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-zinc-400">{item.url}</td>
                  {activeTab === 'footer' && (
                    <td className="py-3 px-4 font-mono text-zinc-500">{item.category || 'General'}</td>
                  )}
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleToggleVisibility(item.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono border cursor-pointer ${
                        item.visible
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                      }`}
                    >
                      {item.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{item.visible ? 'Visible' : 'Hidden'}</span>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingItem(item);
                          setIsEditing(true);
                        }}
                        className="p-1.5 text-zinc-400 hover:text-luxury-gold hover:bg-zinc-900 rounded transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Create Modal */}
      {isEditing && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleSaveItem} className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">
              {editingItem.id ? 'Edit Navigation Link' : 'Add Navigation Link'}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1 font-mono uppercase text-[10px]">Link Label</label>
                <input
                  type="text"
                  required
                  value={editingItem.label}
                  onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })}
                  placeholder="e.g. Services"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:border-luxury-gold/40"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1 font-mono uppercase text-[10px]">URL Path / External Link</label>
                <input
                  type="text"
                  required
                  value={editingItem.url}
                  onChange={(e) => setEditingItem({ ...editingItem, url: e.target.value })}
                  placeholder="/services or https://..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 font-mono focus:outline-none focus:border-luxury-gold/40"
                />
              </div>

              {activeTab === 'footer' && (
                <div>
                  <label className="text-zinc-400 block mb-1 font-mono uppercase text-[10px]">Footer Column</label>
                  <select
                    value={editingItem.category || 'Quick Links'}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:border-luxury-gold/40"
                  >
                    <option value="Quick Links">Quick Links</option>
                    <option value="Legal">Legal</option>
                    <option value="Social">Social</option>
                  </select>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button type="submit" variant="gold" size="sm">Save Link</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
