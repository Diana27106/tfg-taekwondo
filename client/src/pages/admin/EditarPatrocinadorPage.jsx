import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import { ArrowLeft, Save, Upload, Award, Globe, ImageIcon, Loader2 } from 'lucide-react';

/**
 * Página de Edición de Patrocinadores.
 * Permite modificar los datos y el logo de un patrocinador.
 * 
 * @component
 */
const EditarPatrocinadorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    is_active: true,
    logo: null
  });

  useEffect(() => {
    const fetchSponsor = async () => {
      if (!id) { navigate('/admin/patrocinadores'); return; }
      try {
        const token = localStorage.getItem('token');
        const config = token ? { headers: { Authorization: `Token ${token}` } } : {};
        const response = await axios.get(`http://localhost:8000/api/sponsors/${id}/`, config);
        const { name, website, is_active, logo } = response.data;
        setFormData({ name, website, is_active, logo: null });
        if (logo) setPreview(`http://localhost:8000${logo}`);
      } catch (err) {
        console.error(err);
        navigate('/admin/patrocinadores');
      } finally {
        setFetchLoading(false);
      }
    };
    fetchSponsor();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, logo: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('website', formData.website || '');
    data.append('is_active', formData.is_active);
    if (formData.logo) data.append('logo', formData.logo);

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(token ? { Authorization: `Token ${token}` } : {})
        }
      };
      await axios.patch(`http://localhost:8000/api/sponsors/${id}/`, data, config);
      navigate('/admin/patrocinadores');
    } catch (error) {
      console.error(error);
      alert('Error al actualizar el patrocinador.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="animate-spin text-primary" size={40} />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-16 animate-fade-in pb-20 mt-8">
        
        {/* HUD Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 border-b border-border/20 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-secondary shadow-[0_0_8px_hsl(var(--secondary))]" />
              <span className="text-[10px] font-black tracking-[0.5em] text-secondary uppercase">Modification.Protocol</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-foreground uppercase leading-none">
              Edit <span className="text-gradient">Sponsor</span> Node
            </h1>
            <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] max-w-md leading-relaxed">
              Recalibrating existing <span className="text-secondary italic">Corporate Links</span> for synchronized alliance metrics.
            </p>
          </div>
          
          <button 
            onClick={() => navigate('/admin/patrocinadores')}
            className="flex items-center gap-3 px-8 py-3 bg-black/40 border border-border/30 text-gray-400 hover:text-primary hover:border-primary/50 transition-all rounded-sm text-[9px] font-black uppercase tracking-widest"
          >
            <ArrowLeft size={16} />
            Abort & Return
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Visual Assets & Status */}
          <div className="lg:col-span-4 space-y-8">
            <div className="tech-card border-border/40 bg-black/20 p-8 rounded-sm space-y-8 text-center">
              <div>
                <label className="tech-label text-center block w-full">
                  Corporate.Sigil
                  <span className="tech-label-line !left-1/2 !-translate-x-1/2" />
                </label>
                <div className="tech-upload-area w-40 h-40 mx-auto group mt-6 rounded-full border-2 border-secondary/30">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-contain p-4 tech-upload-preview" />
                  ) : (
                    <div className="flex flex-col items-center gap-4 text-gray-700">
                      <Award size={32} className="opacity-20" />
                      <span className="text-[8px] font-black uppercase tracking-[0.3em]">No_Sigil</span>
                    </div>
                  )}
                  <label className="absolute inset-0 bg-secondary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20 backdrop-blur-sm rounded-full">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="text-secondary" size={20} />
                      <span className="text-[8px] font-black text-secondary uppercase tracking-widest">Update_Asset</span>
                    </div>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="pt-8 border-t border-border/10">
                <label className="tech-label block w-full text-center">
                  Visibility.State
                  <span className="tech-label-line !left-1/2 !-translate-x-1/2" />
                </label>
                <div className="flex items-center justify-center gap-6 mt-6">
                  <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${!formData.is_active ? 'text-red-500' : 'text-gray-600'}`}>Hidden</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} className="sr-only peer" />
                    <div className="w-14 h-7 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary border border-white/5"></div>
                  </label>
                  <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${formData.is_active ? 'text-secondary' : 'text-gray-600'}`}>Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Corporate Core */}
          <div className="lg:col-span-8 space-y-8">
            <div className="tech-card border-border/40 bg-black/20 p-10 rounded-sm space-y-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Globe size={80} />
              </div>

              {/* Company Name */}
              <div className="tech-form-group">
                <label className="tech-label">
                  <span className="tech-label-line" />
                  Entity.Designation
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="ENTER CORPORATE NAME..."
                    className="tech-input pl-14"
                  />
                  <Award className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
                </div>
              </div>

              {/* Website */}
              <div className="tech-form-group">
                <label className="tech-label">
                  <span className="tech-label-line" />
                  Digital.Presence
                </label>
                <div className="relative">
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="HTTPS://WWW.CORPORATE_DOMAIN.COM"
                    className="tech-input pl-14"
                  />
                  <Globe className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8 border-t border-border/10">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-secondary text-secondary-foreground font-black text-[10px] uppercase tracking-[0.4em] shadow-xl shadow-secondary/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-4 disabled:opacity-50 border border-secondary/50"
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}
                  <span>{loading ? 'RECALIBRATING...' : 'COMMIT.PARAMETERS'}</span>
                </button>
              </div>

            </div>
          </div>

        </form>
      </div>
    </AdminLayout>
  );
};

export default EditarPatrocinadorPage;
