import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { 
  FileText, Plus, Search, Filter, Eye, EyeOff, Edit3, Trash2, 
  RotateCcw, Check, Sparkles, Globe, Layers, ArrowUpRight 
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const PagesManager = ({ setCurrentView }) => {
  const { db, updateSection } = useDatabase();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPages, setSelectedPages] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newPage, setNewPage] = useState({ title: '', slug: '', template: 'Standard' });

  const defaultPages = [
    { id: 'page-1', title: 'Homepage', slug: '/', status: 'Published', viewKey: 'homepage', lastModified: '2026-07-28', template: 'Homepage' },
    { id: 'page-2', title: 'About Us', slug: '/about', status: 'Published', viewKey: 'about', lastModified: '2026-07-27', template: 'About' },
    { id: 'page-3', title: "Founder's Journey", slug: '/journey', status: 'Published', viewKey: 'founder-journey', lastModified: '2026-07-27', template: 'Timeline' },
    { id: 'page-10', title: 'Portfolio (Our Work)', slug: '/portfolio', status: 'Published', viewKey: 'portfolio', lastModified: '2026-07-28', template: 'Portfolio' },
    { id: 'page-14', title: 'Blogs & Articles', slug: '/blog', status: 'Published', viewKey: 'blogs', lastModified: '2026-07-26', template: 'Blog' },
    { id: 'page-15', title: 'Careers & Hiring', slug: '/careers', status: 'Published', viewKey: 'careers', lastModified: '2026-07-21', template: 'Careers' },
    { id: 'page-16', title: 'Privacy Policy', slug: '/privacy-policy', status: 'Published', viewKey: 'privacy-policy', lastModified: '2026-07-15', template: 'Legal' },
    { id: 'page-17', title: 'Terms & Conditions', slug: '/terms-conditions', status: 'Published', viewKey: 'terms-conditions', lastModified: '2026-07-15', template: 'Legal' },
    { id: 'page-20', title: 'Contact Us', slug: '/contact', status: 'Published', viewKey: 'contact', lastModified: '2026-07-29', template: 'Contact' },
    { id: 'page-18', title: 'Footer Global Section', slug: '#footer', status: 'Published', viewKey: 'footer', lastModified: '2026-07-28', template: 'Footer' }
  ];

  const pagesList = db?.pagesList || defaultPages;

  const filteredPages = pagesList.filter(page => {
    const matchesFilter = 
      activeFilter === 'all' ? true :
      activeFilter === 'published' ? page.status === 'Published' :
      activeFilter === 'draft' ? page.status === 'Draft' :
      activeFilter === 'archived' ? page.status === 'Archived' : true;

    const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          page.slug.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleToggleStatus = (id) => {
    const updated = pagesList.map(p => p.id === id ? { ...p, status: p.status === 'Published' ? 'Draft' : 'Published' } : p);
    updateSection('pagesList', updated);
  };

  const handleDeletePage = (id) => {
    const updated = pagesList.map(p => p.id === id ? { ...p, status: 'Archived' } : p);
    updateSection('pagesList', updated);
  };

  const handleRestorePage = (id) => {
    const updated = pagesList.map(p => p.id === id ? { ...p, status: 'Published' } : p);
    updateSection('pagesList', updated);
  };

  const handleCreatePage = (e) => {
    e.preventDefault();
    const created = {
      id: `page-${Date.now()}`,
      title: newPage.title,
      slug: newPage.slug.startsWith('/') ? newPage.slug : `/${newPage.slug}`,
      status: 'Draft',
      viewKey: newPage.slug.replace('/', '') || 'custom',
      lastModified: new Date().toISOString().split('T')[0],
      template: newPage.template
    };
    const updated = [...pagesList, created];
    updateSection('pagesList', updated);
    setIsCreateModalOpen(false);
    setNewPage({ title: '', slug: '', template: 'Standard' });
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-luxury-gold shadow-gold-glow animate-pulse" />
            <h1 className="text-2xl font-serif font-bold tracking-wide uppercase text-white">Pages Directory</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-light">
            Master CMS Pages manager supporting Draft, Publish, Soft Delete, Restore & Preview workflows.
          </p>
        </div>

        <Button
          onClick={() => setIsCreateModalOpen(true)}
          variant="gold"
          className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold"
        >
          <Plus className="w-4 h-4" />
          Create New Page
        </Button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-3 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Pages' },
            { id: 'published', label: 'Published' },
            { id: 'draft', label: 'Drafts' },
            { id: 'archived', label: 'Archived' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search pages or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-luxury-gold/40"
          />
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl overflow-hidden backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-900/80 border-b border-zinc-800/80 text-zinc-400 uppercase tracking-wider font-mono text-[10px]">
              <tr>
                <th className="py-3 px-4">Page Title</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Template</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Modified</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredPages.map((page) => (
                <tr key={page.id} className="hover:bg-zinc-900/30 transition-colors">
                  <td className="py-3 px-4 font-semibold text-zinc-200">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-luxury-gold" />
                      <span>{page.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-zinc-400">{page.slug}</td>
                  <td className="py-3 px-4 font-mono text-zinc-500">{page.template}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleToggleStatus(page.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono border cursor-pointer ${
                        page.status === 'Published'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          : page.status === 'Draft'
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                          : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                      }`}
                    >
                      <span>{page.status}</span>
                    </button>
                  </td>
                  <td className="py-3 px-4 font-mono text-zinc-500">{page.lastModified}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setCurrentView && setCurrentView(page.viewKey)}
                        className="p-1.5 text-zinc-400 hover:text-luxury-gold hover:bg-zinc-900 rounded transition-colors cursor-pointer flex items-center gap-1 text-xs"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      {page.status === 'Archived' ? (
                        <button
                          onClick={() => handleRestorePage(page.id)}
                          className="p-1.5 text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDeletePage(page.id)}
                          className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleCreatePage} className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Create New Website Page</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1 font-mono uppercase text-[10px]">Page Title</label>
                <input
                  type="text"
                  required
                  value={newPage.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    setNewPage({ ...newPage, title, slug: `/${slug}` });
                  }}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1 font-mono uppercase text-[10px]">Page Slug</label>
                <input
                  type="text"
                  required
                  value={newPage.slug}
                  onChange={(e) => setNewPage({ ...newPage, slug: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1 font-mono uppercase text-[10px]">Page Template</label>
                <select
                  value={newPage.template}
                  onChange={(e) => setNewPage({ ...newPage, template: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none"
                >
                  <option value="Standard">Standard Page</option>
                  <option value="Landing">Landing Page</option>
                  <option value="Portfolio">Portfolio Showcase</option>
                  <option value="Services">Services Catalog</option>
                  <option value="Legal">Legal Document</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="gold" size="sm">Create Page</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
