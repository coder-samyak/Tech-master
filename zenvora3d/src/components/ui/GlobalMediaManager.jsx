import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { Button } from './Button';
import { Input } from './Input';
import { Switch } from './Switch';
import { 
  UploadCloud, Search, Image as ImageIcon, Video, Film, 
  Trash2, CheckCircle, X, Download, Copy, Play
} from 'lucide-react';

export const GlobalMediaManager = ({ onClose, onSelect, defaultTypeFilter }) => {
  const { db, updateSection, logout } = useDatabase();
  const library = db?.mediaLibrary || [];

  const [activeTab, setActiveTab] = useState('library'); // 'library' or 'upload'
  
  // Library State
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState(defaultTypeFilter || 'All');

  // Upload State
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [uploadForm, setUploadForm] = useState({
    title: '', type: 'Image', category: 'General', 
    url: '', thumbnail: '', caption: '', description: '', altText: '',
    tags: '', size: '0 MB', extension: '',
    status: 'Active', featured: false, visibility: true
  });

  const handleFileSelect = (e) => {
    if(e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const isVideo = file.type.startsWith('video');
      setUploadForm(prev => ({
        ...prev,
        title: file.name.split('.')[0],
        type: isVideo ? 'Video' : 'Image',
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        extension: file.name.split('.').pop().toUpperCase()
      }));
    }
  };

  const handleUpload = async () => {
    if(!selectedFile) return;
    setIsUploading(true);
    setUploadProgress(20);
    setUploadSuccess(false);

    try {
      const savedAuth = localStorage.getItem('zenvora_auth');
      let token = "";
      if (savedAuth) {
        try {
          const parsed = JSON.parse(savedAuth);
          token = parsed.token || "";
        } catch (e) {}
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

      setUploadProgress(50);

      const baseHost = (import.meta.env.VITE_API_URL || "https://tech-master-afhx.onrender.com").replace(/\/api\/v1\/?$/i, "");
      const uploadPath = selectedFile.type.startsWith("video/") ? "/api/upload/video" : "/api/upload/image";
      
      const response = await fetch(`${baseHost}${uploadPath}`, {
        method: "POST",
        headers: token ? { "Authorization": `Bearer ${token}` } : {},
        credentials: "include",
        body: formData
      });

      if (response.status === 401) {
        logout();
        throw new Error("Session expired. Please log in again.");
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setUploadProgress(90);

      const uploadedMedia = data.data;
      if (!uploadedMedia?.cloudinaryUrl) {
        throw new Error("Upload completed without a Cloudinary URL.");
      }

      const newMedia = {
        ...uploadForm,
        id: uploadedMedia._id || `media-${Date.now()}`,
        url: uploadedMedia.cloudinaryUrl,
        imageUrl: uploadedMedia.mediaType === "image" ? uploadedMedia.cloudinaryUrl : undefined,
        videoUrl: uploadedMedia.mediaType === "video" ? uploadedMedia.cloudinaryUrl : undefined,
        publicId: uploadedMedia.publicId,
        size: `${((uploadedMedia.fileSize || selectedFile.size) / (1024 * 1024)).toFixed(2)} MB`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const updatedLibrary = [newMedia, ...library];
      updateSection('mediaLibrary', updatedLibrary);

      setUploadProgress(100);
      setIsUploading(false);
      setUploadSuccess(true);
      setTimeout(() => {
         setActiveTab('library');
         setUploadSuccess(false);
         setSelectedFile(null);
      }, 1500);
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
      alert(err.message || "Failed to upload file to Cloudinary.");
      setIsUploading(false);
    }
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if(window.confirm("Permanently delete this media from the library?")) {
      const updated = library.filter(m => m.id !== id);
      updateSection('mediaLibrary', updated);
    }
  };

  const handleCopyUrl = (url, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    alert("URL copied to clipboard!");
  };

  const handleDownload = (url, e) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = url;
    link.download = 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLibrary = library.filter(m => {
    const matchesSearch = m.title?.toLowerCase().includes(search.toLowerCase()) || m.tags?.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'All' ? true : m.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-900 bg-zinc-950">
          <div className="flex items-center gap-6">
            <h2 className="font-serif text-lg text-luxury-gold flex items-center gap-2">
              <UploadCloud className="w-5 h-5" /> Enterprise Media Manager
            </h2>
            <div className="flex gap-2">
              <button onClick={() => setActiveTab('library')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'library' ? 'bg-luxury-gold text-black' : 'text-zinc-500 hover:text-zinc-300'}`}>Media Library</button>
              <button onClick={() => setActiveTab('upload')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'upload' ? 'bg-luxury-gold text-black' : 'text-zinc-500 hover:text-zinc-300'}`}>Upload New</button>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-zinc-500 hover:text-white rounded-full hover:bg-zinc-900 transition-colors"><X className="w-5 h-5" /></button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          
          {activeTab === 'library' && (
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between gap-4 bg-zinc-900/40 p-3 rounded-lg border border-zinc-900">
                <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-zinc-500" />
                  <input type="text" placeholder="Search by title, tags..." value={search} onChange={e=>setSearch(e.target.value)} className="bg-transparent border-none outline-none text-xs text-zinc-200 w-full" />
                </div>
                <div className="flex gap-2">
                  {['All', 'Image', 'Video', 'Short Video', 'Reel', 'Long Video'].map(t => (
                    <button key={t} onClick={() => setFilterType(t)} className={`px-3 py-1.5 rounded text-xs ${filterType === t ? 'bg-zinc-800 text-luxury-gold' : 'text-zinc-500 hover:text-zinc-300'}`}>{t}</button>
                  ))}
                </div>
              </div>

              {filteredLibrary.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-zinc-600">
                  <ImageIcon className="w-12 h-12 mb-3 opacity-20" />
                  <p className="font-mono text-sm">No media found.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredLibrary.map(media => (
                    <div key={media.id} onClick={() => onSelect(media.url, media)} className="group relative border border-zinc-800 bg-zinc-950 rounded-lg overflow-hidden cursor-pointer hover:border-luxury-gold transition-colors aspect-square flex flex-col">
                      <div className="flex-1 relative bg-zinc-900">
                        {media.type === 'Image' ? (
                          <img src={media.url} alt={media.altText} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-zinc-950 relative">
                             {media.thumbnail ? <img src={media.thumbnail} className="w-full h-full object-cover opacity-50" /> : <Play className="w-8 h-8 text-zinc-700" />}
                             <div className="absolute inset-0 flex items-center justify-center"><Play className="w-10 h-10 text-white opacity-80" /></div>
                          </div>
                        )}
                        {/* Hover Overlay Actions */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                           <button onClick={(e) => handleCopyUrl(media.url, e)} className="p-2 bg-zinc-800 rounded hover:text-luxury-gold" title="Copy URL"><Copy className="w-4 h-4" /></button>
                           <button onClick={(e) => handleDownload(media.url, e)} className="p-2 bg-zinc-800 rounded hover:text-blue-400" title="Download"><Download className="w-4 h-4" /></button>
                           <button onClick={(e) => handleDelete(media.id, e)} className="p-2 bg-zinc-800 rounded hover:text-rose-500" title="Delete"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                      <div className="p-2 border-t border-zinc-900 flex justify-between items-center">
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-[10px] text-zinc-300 font-bold truncate">{media.title}</span>
                          <span className="text-[9px] text-zinc-600 uppercase">{media.type} • {media.size}</span>
                        </div>
                        <span className="px-1.5 py-0.5 bg-zinc-900 rounded text-[8px] text-luxury-gold uppercase">{media.extension}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="flex flex-col lg:flex-row gap-6 h-full">
              {/* UPLOAD ZONE */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="relative w-full h-64 border-2 border-dashed border-zinc-800 hover:border-luxury-gold/50 rounded-xl flex flex-col items-center justify-center bg-zinc-900/20 transition-colors">
                  <input type="file" onChange={handleFileSelect} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                  <UploadCloud className="w-12 h-12 text-zinc-700 mb-4" />
                  <p className="text-zinc-300 font-medium text-sm">Drag & Drop media here</p>
                  <p className="text-zinc-600 text-xs mt-1">Supports PNG, JPG, MP4, MOV, WEBM (Max 50MB)</p>
                  {selectedFile && <div className="mt-4 px-4 py-2 bg-luxury-gold/10 border border-luxury-gold/30 rounded text-luxury-gold text-xs font-bold">{selectedFile.name}</div>}
                </div>
                
                {isUploading && (
                  <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                     <div className="bg-luxury-gold h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                )}
                {uploadSuccess && <div className="text-emerald-500 text-xs flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Upload Successful! Saved to Library.</div>}
              </div>

              {/* METADATA FORM */}
              <div className="flex-1 border border-zinc-900 rounded-xl p-5 bg-zinc-950 overflow-y-auto custom-scrollbar flex flex-col gap-4">
                <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-wider border-b border-zinc-900 pb-2">Media Metadata & Configuration</span>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Media Type</label>
                    <select value={uploadForm.type} onChange={e=>setUploadForm({...uploadForm, type: e.target.value})} className="bg-zinc-900 border border-zinc-800 rounded p-2 text-xs text-zinc-200">
                      <option value="Image">Image</option>
                      <option value="Video">Video</option>
                      <option value="Short Video">Short Video</option>
                      <option value="Reel">Reel</option>
                      <option value="Long Video">Long Video</option>
                    </select>
                  </div>
                  <Input label="Title" value={uploadForm.title} onChange={e=>setUploadForm({...uploadForm, title: e.target.value})} />
                  <Input label="Alt Text (SEO)" value={uploadForm.altText} onChange={e=>setUploadForm({...uploadForm, altText: e.target.value})} />
                  <Input label="Caption" value={uploadForm.caption} onChange={e=>setUploadForm({...uploadForm, caption: e.target.value})} />
                  <div className="col-span-2"><Input label="Description" textarea rows={2} value={uploadForm.description} onChange={e=>setUploadForm({...uploadForm, description: e.target.value})} /></div>
                  <div className="col-span-2"><Input label="Tags (comma separated)" value={uploadForm.tags} onChange={e=>setUploadForm({...uploadForm, tags: e.target.value})} /></div>
                  
                  {uploadForm.type !== 'Image' && (
                    <div className="col-span-2 flex flex-col gap-2 p-3 border border-zinc-900 rounded bg-zinc-900/30">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Video Thumbnail</span>
                      <input type="text" placeholder="Thumbnail URL (or upload via library later)" value={uploadForm.thumbnail} onChange={e=>setUploadForm({...uploadForm, thumbnail: e.target.value})} className="bg-transparent border-b border-zinc-800 outline-none text-xs text-white pb-1" />
                    </div>
                  )}

                  <Switch label="Featured Media" checked={uploadForm.featured} onChange={v=>setUploadForm({...uploadForm, featured: v})} />
                  <Switch label="Public Visibility" checked={uploadForm.visibility} onChange={v=>setUploadForm({...uploadForm, visibility: v})} />
                </div>

                <div className="mt-4 flex justify-end">
                  <Button onClick={handleUpload} disabled={!selectedFile || isUploading} className="w-full bg-gradient-to-r from-luxury-gold to-luxury-darkgold text-black font-bold">
                    {isUploading ? `Uploading ${uploadProgress}%` : 'Upload & Save to Library'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
