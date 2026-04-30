import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import { ArrowLeft, Save, Calendar, Clock, MapPin, Link as LinkIcon, FileText, Loader2 } from 'lucide-react';

const EditarEventoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    registration_link: '',
    location: ''
  });

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) { navigate('/admin/eventos'); return; }
      try {
        const token = localStorage.getItem('token');
        const config = token ? { headers: { Authorization: `Token ${token}` } } : {};
        const response = await axios.get(`http://localhost:8000/api/events/${id}/`, config);
        const data = response.data;
        // Format dates for input datetime-local
        setFormData({
            ...data,
            start_date: data.start_date.slice(0, 16),
            end_date: data.end_date.slice(0, 16)
        });
      } catch (err) {
        console.error(err);
        navigate('/admin/eventos');
      } finally {
        setFetchLoading(false);
      }
    };
    fetchEvent();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = token ? { headers: { Authorization: `Token ${token}` } } : {};
      await axios.patch(`http://localhost:8000/api/events/${id}/`, formData, config);
      navigate('/admin/eventos');
    } catch (error) {
      console.error(error);
      alert('Error al actualizar el evento.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <AdminLayout><div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="animate-spin text-purple-600" size={40} /></div></AdminLayout>;

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
              Edit <span className="text-gradient">Activation</span> Node
            </h1>
            <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] max-w-md leading-relaxed">
              Recalibrating existing <span className="text-secondary italic">Temporal Parameters</span> for sector synchronization.
            </p>
          </div>
          
          <button 
            onClick={() => navigate('/admin/eventos')}
            className="flex items-center gap-3 px-8 py-3 bg-black/40 border border-border/30 text-gray-400 hover:text-primary hover:border-primary/50 transition-all rounded-sm text-[9px] font-black uppercase tracking-widest"
          >
            <ArrowLeft size={16} />
            Abort & Return
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="tech-card border-border/40 bg-black/20 p-10 rounded-sm space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Calendar size={120} />
            </div>

            {/* Title */}
            <div className="tech-form-group">
              <label className="tech-label">
                <span className="tech-label-line" />
                Event.Designation
              </label>
              <div className="relative">
                <input
                  required
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="ENTER EVENT TITLE..."
                  className="tech-input pl-14"
                />
                <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="tech-form-group">
                <label className="tech-label">
                  <span className="tech-label-line" />
                  Temporal.Start
                </label>
                <div className="relative">
                  <input
                    required
                    type="datetime-local"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    className="tech-input pl-14"
                  />
                  <Clock className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
                </div>
              </div>
              <div className="tech-form-group">
                <label className="tech-label">
                  <span className="tech-label-line" />
                  Temporal.End
                </label>
                <div className="relative">
                  <input
                    required
                    type="datetime-local"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                    className="tech-input pl-14"
                  />
                  <Clock className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
                </div>
              </div>
            </div>

            {/* Location & Link */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="tech-form-group">
                <label className="tech-label">
                  <span className="tech-label-line" />
                  Sector.Locale
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="ENTER PHYSICAL COORDINATES..."
                    className="tech-input pl-14"
                  />
                  <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
                </div>
              </div>
              <div className="tech-form-group">
                <label className="tech-label">
                  <span className="tech-label-line" />
                  Digital.Portal
                </label>
                <div className="relative">
                  <input
                    type="url"
                    name="registration_link"
                    value={formData.registration_link}
                    onChange={handleChange}
                    placeholder="HTTPS://REGISTRATION_MODULE_URL..."
                    className="tech-input pl-14"
                  />
                  <LinkIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="tech-form-group">
              <label className="tech-label">
                <span className="tech-label-line" />
                Mission.Brief
              </label>
              <div className="relative">
                <textarea
                  required
                  rows="6"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="COMPILING MISSION OBJECTIVES AND PROTOCOLS..."
                  className="tech-input pl-14 pt-5 resize-none"
                />
                <FileText className="absolute left-6 top-6 text-primary/40" size={16} />
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-8 border-t border-border/10">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground font-black text-[10px] uppercase tracking-[0.4em] shadow-xl shadow-secondary/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-4 disabled:opacity-50 border border-secondary/50"
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
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditarEventoPage;
