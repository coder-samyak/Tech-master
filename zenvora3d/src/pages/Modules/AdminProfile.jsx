import React, { useState, useEffect } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  User, Mail, Phone, MapPin, Shield, LogOut, CheckCircle, Save, Upload
} from 'lucide-react';

export const AdminProfile = () => {
  const { auth, db, updateProfile, logout } = useDatabase();
  const user = auth.user || {};
  const adminProfile = db?.adminProfile || {};
  const currentProfile = { ...user, ...adminProfile };

  const [formData, setFormData] = useState({
    name: currentProfile.name || 'Super Admin',
    email: currentProfile.email || 'techmasteradmin@gmail.com',
    phone: currentProfile.phone || '',
    role: currentProfile.role || 'Super Admin',
    address: currentProfile.address || '',
    imageUrl: currentProfile.imageUrl || currentProfile.avatar || ''
  });

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setFormData({
      name: currentProfile.name || currentProfile.fullName || 'Super Admin',
      email: currentProfile.email || 'techmasteradmin@gmail.com',
      phone: currentProfile.phone || '',
      role: currentProfile.role || 'Super Admin',
      address: currentProfile.address || '',
      imageUrl: currentProfile.imageUrl || currentProfile.avatar || ''
    });
  }, [auth.user, db?.adminProfile]);

  const handleAvatarFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData(prev => ({ ...prev, imageUrl: event.target.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    updateProfile(formData);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left">
      
      {/* HEADER SECTION */}
      <div className="border-b border-zinc-900 pb-5">
        <h1 className="font-serif text-2xl font-medium tracking-wide text-zinc-150 flex items-center gap-2">
          <User className="w-6 h-6 text-luxury-gold" />
          My Profile & Administrative Account
        </h1>
        <p className="text-xs text-zinc-500 mt-1">
          Update administrative credentials, profile avatar, role title, and contact details in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: Avatar & Profile Metadata Card */}
        <div className="flex flex-col gap-5 md:col-span-1">
          <Card className="border border-zinc-800/60 p-5 bg-zinc-950/20 text-center flex flex-col items-center">
            <div className="relative group">
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-luxury-gold/40 bg-zinc-900 shadow-xl">
                <img 
                  src={formData.imageUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"} 
                  alt={formData.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <label 
                htmlFor="avatar-file-upload" 
                className="absolute bottom-0 right-0 p-2 bg-luxury-gold text-black rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200"
                title="Upload New Avatar Image"
              >
                <Upload className="w-3.5 h-3.5" />
              </label>
              <input 
                id="avatar-file-upload" 
                type="file" 
                accept="image/*" 
                onChange={handleAvatarFileChange} 
                className="hidden" 
              />
            </div>
            
            <h3 className="font-serif text-base font-bold text-zinc-100 mt-4 truncate max-w-full">
              {formData.name || 'Super Admin'}
            </h3>

            <p className="text-xs text-zinc-400 font-mono mt-0.5 truncate max-w-full">
              {formData.email || 'techmasteradmin@gmail.com'}
            </p>
            
            <div className="flex items-center gap-1.5 mt-2">
              <Shield className="w-3.5 h-3.5 text-luxury-gold" />
              <Badge variant="gold" className="text-[9px] uppercase font-mono tracking-wider py-0.5">
                {formData.role || 'Super Admin'}
              </Badge>
            </div>

            <p className="text-[10px] text-zinc-500 font-mono mt-3 uppercase tracking-wider">
              Status: <span className="text-emerald-400 font-bold">Active</span>
            </p>

            <Button 
              onClick={logout} 
              variant="ghost" 
              className="w-full mt-6 flex items-center justify-center gap-2 border border-zinc-900/60 hover:bg-rose-950/25 hover:text-rose-400 text-zinc-400 text-xs font-semibold py-2 transition-all"
            >
              <LogOut className="w-4 h-4" /> <span>Log Out of Session</span>
            </Button>
          </Card>
        </div>

        {/* Right Column: Edit Profile Form */}
        <div className="flex flex-col gap-5 md:col-span-2">
          <Card className="border border-zinc-800/60 p-5 bg-zinc-950/20 text-left" title="Edit Profile Details">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  label="Full Name *" 
                  placeholder="Super Admin"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input 
                  label="Email Address *" 
                  type="email"
                  placeholder="techmasteradmin@gmail.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  label="Contact Phone" 
                  placeholder="+91 99999 00000"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
                <Input 
                  label="Access Role Title" 
                  placeholder="Super Admin"
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                />
              </div>

              <Input 
                label="Profile Avatar URL (or upload image above)" 
                placeholder="https://images.unsplash.com/photo-..."
                value={formData.imageUrl}
                onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
              />

              <Input 
                label="Headquarters / Address" 
                textarea 
                rows={3} 
                placeholder="Enter address details..."
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
              />

              <div className="flex justify-end gap-2 border-t border-zinc-900 pt-4 mt-2">
                <Button type="submit" variant="primary" className="text-white font-semibold text-xs py-2.5 px-6 flex items-center gap-1.5" disabled={success}>
                  {success ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-400" /> <span>Profile Saved Successfully!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> <span>Save Profile Changes</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>

      </div>

    </div>
  );
};
