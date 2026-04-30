import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import GroupManager from '../../components/admin/GroupManager';
import { ArrowLeft, Save, Upload, MapPin, Home, Globe, ImageIcon, Loader2 } from 'lucide-react';

const CrearSedePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    google_maps_url: '',
    photo: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'photo') {
        if (formData[key]) data.append(key, formData[key]);
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(token ? { Authorization: `Token ${token}` } : {})
        }
      };
      const response = await axios.post('http://localhost:8000/api/locations/', data, config);
      const newId = response.data.id;
      // Navigate to edit page to allow adding groups
      navigate(`/admin/sedes/editar?id=${newId}`);
    } catch (error) {
      console.error('Error creating location:', error);
      alert('Hubo un error al crear la sede.');
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
              <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase">Location.Establishment</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-foreground uppercase leading-none">
              New <span className="text-gradient">Facility</span> Node
            </h1>
            <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] max-w-md leading-relaxed">
              Establishing new <span className="text-primary italic">Training Grounds</span> within the Sierra Nevada territorial network.
            </p>
          </div>
          
          <button 
            onClick={() => navigate('/admin/sedes')}
            className="flex items-center gap-3 px-8 py-3 bg-black/40 border border-border/30 text-gray-400 hover:text-primary hover:border-primary/50 transition-all rounded-sm text-[9px] font-black uppercase tracking-widest"
          >
            <ArrowLeft size={16} />
            Abort & Return
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Visual Signature (Photo) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="tech-card border-border/40 bg-black/20 p-8 rounded-sm">
              <label className="tech-label">
                <span className="tech-label-line" />
                Structure.Optics
              </label>
              
              <div className="tech-upload-area aspect-video group">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover tech-upload-preview" />
                ) : (
                  <div className="flex flex-col items-center gap-4 text-gray-700">
                    <ImageIcon size={40} className="opacity-20" />
                    <span className="text-[8px] font-black uppercase tracking-[0.3em]">Facility_Visual_Null</span>
                  </div>
                )}
                
                <label className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="text-primary" size={24} />
                    <span className="text-[8px] font-black text-primary uppercase tracking-widest">Register_Optics</span>
                  </div>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
              </div>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-[8px] font-black text-gray-600 uppercase tracking-widest">
                  <span>Standard: FACILITY_DUMP</span>
                  <span>MAX: 2.0MB</span>
                </div>
                <div className="h-[1px] w-full bg-border/10" />
                <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest leading-relaxed">
                  High-fidelity capture recommended for public directory indexing.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Information Core */}
          <div className="lg:col-span-8 space-y-8">
            <div className="tech-card border-border/40 bg-black/20 p-10 rounded-sm space-y-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Home size={80} />
              </div>

              {/* Name */}
              <div className="tech-form-group">
                <label className="tech-label">
                  <span className="tech-label-line" />
                  Facility.Label
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="ENTER FACILITY NAME..."
                    className="tech-input pl-14"
                  />
                  <Home className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
                </div>
              </div>

              {/* City & Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="tech-form-group">
                  <label className="tech-label">
                    <span className="tech-label-line" />
                    Civic.Zone
                  </label>
                  <div className="relative">
                    <input
                      required
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="EG: GRANADA_CORE"
                      className="tech-input pl-14"
                    />
                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
                  </div>
                </div>
                <div className="tech-form-group">
                  <label className="tech-label">
                    <span className="tech-label-line" />
                    Sector.Vector
                  </label>
                  <div className="relative">
                    <input
                      required
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="ENTER PHYSICAL COORDINATES..."
                      className="tech-input pl-14"
                    />
                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
                  </div>
                </div>
              </div>

              {/* Google Maps URL */}
              <div className="tech-form-group">
                <label className="tech-label">
                  <span className="tech-label-line" />
                  Digital.Waypoint
                </label>
                <div className="relative">
                  <input
                    type="url"
                    name="google_maps_url"
                    value={formData.google_maps_url}
                    onChange={handleChange}
                    placeholder="HTTPS://GEOLOCATION_MODULE_URL..."
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
                  className="w-full py-5 bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-[0.4em] shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-4 disabled:opacity-50 border border-primary/50"
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}
                  <span>{loading ? 'INITIALIZING...' : 'COMMIT.FACILITY'}</span>
                </button>
              </div>

            </div>
          </div>

        </form>

        {/* Group Management Placeholder */}
        <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="tech-card border-border/40 bg-black/20 p-10 rounded-sm text-center">
            <div className="flex flex-col items-center gap-4 py-8">
              <span className="h-px w-12 bg-gray-700" />
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                Group management will be <span className="text-primary italic">Unlocked</span> after initial facility registration.
              </p>
              <span className="h-px w-12 bg-gray-700" />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CrearSedePage;
