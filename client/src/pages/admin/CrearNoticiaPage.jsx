import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import { ArrowLeft, Save, Upload, Newspaper, FileText, ImageIcon, Loader2 } from 'lucide-react';

const CrearNoticiaPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState({ img1: null, img2: null });
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    img1: null,
    img2: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }));
      setPreviews(prev => ({ ...prev, [field]: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    if (formData.img1) data.append('img1', formData.img1);
    if (formData.img2) data.append('img2', formData.img2);

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(token ? { Authorization: `Token ${token}` } : {})
        }
      };
      await axios.post('http://localhost:8000/api/news/', data, config);
      navigate('/admin/noticias');
    } catch (error) {
      console.error(error);
      alert('Error al crear la noticia.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-16 animate-fade-in pb-20 mt-8">
        
        {/* HUD Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 border-b border-border/20 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
              <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase">Intelligence.Transmission</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-foreground uppercase leading-none">
              New <span className="text-gradient">Data</span> Dispatch
            </h1>
            <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] max-w-md leading-relaxed">
              Broadcasting authorized <span className="text-primary italic">Sector Intelligence</span> and organizational updates.
            </p>
          </div>
          
          <button 
            onClick={() => navigate('/admin/noticias')}
            className="flex items-center gap-3 px-8 py-3 bg-black/40 border border-border/30 text-gray-400 hover:text-primary hover:border-primary/50 transition-all rounded-sm text-[9px] font-black uppercase tracking-widest"
          >
            <ArrowLeft size={16} />
            Abort & Return
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Visual Assets */}
          <div className="lg:col-span-4 space-y-8">
            <div className="tech-card border-border/40 bg-black/20 p-8 rounded-sm space-y-8">
              <div>
                <label className="tech-label">
                  <span className="tech-label-line" />
                  Primary.Visual
                </label>
                <div className="tech-upload-area aspect-video group mt-4">
                  {previews.img1 ? (
                    <img src={previews.img1} alt="Preview" className="w-full h-full object-cover tech-upload-preview" />
                  ) : (
                    <div className="flex flex-col items-center gap-4 text-gray-700">
                      <ImageIcon size={32} className="opacity-20" />
                      <span className="text-[8px] font-black uppercase tracking-[0.3em]">Visual_Null</span>
                    </div>
                  )}
                  <label className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="text-primary" size={20} />
                      <span className="text-[8px] font-black text-primary uppercase tracking-widest">Load_Module</span>
                    </div>
                    <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'img1')} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="tech-label">
                  <span className="tech-label-line" />
                  Secondary.Layer
                </label>
                <div className="tech-upload-area aspect-video group mt-4">
                  {previews.img2 ? (
                    <img src={previews.img2} alt="Preview" className="w-full h-full object-cover tech-upload-preview" />
                  ) : (
                    <div className="flex flex-col items-center gap-4 text-gray-700">
                      <ImageIcon size={32} className="opacity-20" />
                      <span className="text-[8px] font-black uppercase tracking-[0.3em]">Aux_Visual_Null</span>
                    </div>
                  )}
                  <label className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="text-primary" size={20} />
                      <span className="text-[8px] font-black text-primary uppercase tracking-widest">Load_Module</span>
                    </div>
                    <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'img2')} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-border/10">
                <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest leading-relaxed">
                  Supported formats: JPEG_PNG. Optimization protocol highly recommended for faster transmission.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Information Core */}
          <div className="lg:col-span-8 space-y-8">
            <div className="tech-card border-border/40 bg-black/20 p-10 rounded-sm space-y-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Newspaper size={80} />
              </div>

              {/* Title */}
              <div className="tech-form-group">
                <label className="tech-label">
                  <span className="tech-label-line" />
                  Data.Headline
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="ENTER ARTICLE HEADLINE..."
                    className="tech-input pl-14"
                  />
                  <Newspaper className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
                </div>
              </div>

              {/* Content */}
              <div className="tech-form-group">
                <label className="tech-label">
                  <span className="tech-label-line" />
                  Information.Matrix
                </label>
                <div className="relative">
                  <textarea
                    required
                    rows="12"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="INITIATING ARTICLE COMPOSITION..."
                    className="tech-input pl-14 pt-6 resize-none"
                  />
                  <FileText className="absolute left-6 top-6 text-primary/40" size={16} />
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8 border-t border-border/10">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-[0.4em] shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-4 disabled:opacity-50 border border-primary/50"
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}
                  <span>{loading ? 'TRANSMITTING...' : 'INITIATE.BROADCAST'}</span>
                </button>
              </div>

            </div>
          </div>

        </form>
      </div>
    </AdminLayout>
  );
};

export default CrearNoticiaPage;
