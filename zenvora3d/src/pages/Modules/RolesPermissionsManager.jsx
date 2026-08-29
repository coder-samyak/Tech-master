import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { ShieldCheck, Users, Lock, Check, Plus, Edit3, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const RolesPermissionsManager = () => {
  const { db, updateSection } = useDatabase();

  const defaultRoles = [
    { id: 'role-1', name: 'Super Administrator', description: 'Full access to all CMS modules, user management, and system settings.', membersCount: 2, permissions: ['read', 'write', 'delete', 'publish', 'settings'] },
    { id: 'role-2', name: 'Content Editor', description: 'Can edit, create, and publish content across pages, blogs, and media library.', membersCount: 5, permissions: ['read', 'write', 'publish'] },
    { id: 'role-3', name: 'SEO Specialist', description: 'Access to SEO Manager, meta tags, sitemap, and analytics.', membersCount: 2, permissions: ['read', 'write_seo'] }
  ];

  const roles = db?.userRoles || defaultRoles;

  const modulesList = [
    'Homepage', 'About', 'Founder Journey', 'Services', 
    'Portfolio', 'Blogs', 'Media Library', 'SEO Manager', 'Settings'
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-luxury-gold shadow-gold-glow animate-pulse" />
            <h1 className="text-2xl font-serif font-bold tracking-wide uppercase text-white">Roles & Access Control</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-light">
            Manage administrative user roles, module permissions, and enterprise access levels.
          </p>
        </div>

        <Button variant="gold" className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold">
          <Plus className="w-4 h-4" /> Create Custom Role
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map(role => (
          <div key={role.id} className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-5 backdrop-blur-xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-serif font-bold text-white">{role.name}</h3>
                <span className="text-[10px] font-mono text-luxury-gold">{role.membersCount} Active Members</span>
              </div>
              <ShieldCheck className="w-4 h-4 text-luxury-gold" />
            </div>

            <p className="text-xs text-zinc-400 font-light leading-relaxed">{role.description}</p>

            <div className="pt-3 border-t border-zinc-900 flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Permissions: {role.permissions.length}</span>
              <button className="text-xs text-luxury-gold hover:underline cursor-pointer">Configure Access</button>
            </div>
          </div>
        ))}
      </div>

      {/* Permission Matrix Table */}
      <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
        <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Module Permission Matrix</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-900/80 border-b border-zinc-800/80 text-zinc-400 uppercase tracking-wider font-mono text-[10px]">
              <tr>
                <th className="py-3 px-4">CMS Module</th>
                <th className="py-3 px-4 text-center">Super Admin</th>
                <th className="py-3 px-4 text-center">Content Editor</th>
                <th className="py-3 px-4 text-center">SEO Specialist</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-mono text-[11px]">
              {modulesList.map((mod, idx) => (
                <tr key={idx} className="hover:bg-zinc-900/30">
                  <td className="py-3 px-4 font-semibold text-zinc-200">{mod}</td>
                  <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                  <td className="py-3 px-4 text-center"><Check className="w-4 h-4 text-emerald-400 mx-auto" /></td>
                  <td className="py-3 px-4 text-center">
                    {mod === 'SEO Manager' || mod === 'Homepage' ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <span className="text-zinc-600">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
