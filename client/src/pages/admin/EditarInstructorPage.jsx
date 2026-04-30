import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import { ArrowLeft, Save, Upload, User, Award, FileText, ImageIcon, Loader2 } from 'lucide-react';

const EditarInstructorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    rank: '',
    bio: '',
    photo: null
  });

  useEffect(() => {
    const fetchInstructor = async () => {
      if (!id) {
        navigate('/admin/instructores');
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const config = token ? { headers: { Authorization: `Token ${token}` } } : {};
        const response = await axios.get(`http://localhost:8000/api/instructors/${id}/`, config);
        const data = response.data;
        
        setFormData({
          name: data.name,
          rank: data.rank,
          bio: data.bio,
          photo: null // We don't set the file object if not changed
        });

        if (data.photo) {
          setPreview(`http://localhost:8000${data.photo}`);
        }
      } catch (error) {
        console.error('Error fetching instructor:', error);
        alert('Error al cargar los datos del instructor.');
        navigate('/admin/instructores');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchInstructor();
  }, [id, navigate]);

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
    data.append('name', formData.name);
    data.append('rank', formData.rank);
    data.append('bio', formData.bio);
    if (formData.photo) {
      data.append('photo', formData.photo);
    }

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(token ? { Authorization: `Token ${token}` } : {})
        }
      };
      await axios.patch(`http://localhost:8000/api/instructors/${id}/`, data, config);
      navigate('/admin/instructores');
    } catch (error) {
      console.error('Error updating instructor:', error);
      alert('Hubo un error al actualizar el instructor. Verifica los campos e intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 size={40} className="text-purple-600 animate-spin" />
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
              Edit <span className="text-gradient">Unit</span> Node
            </h1>
            <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] max-w-md leading-relaxed">
              Recalibrating existing <span className="text-secondary italic">Personnel Parameters</span> for unit synchronization.
            </p>
          </div>
          
          <button 
            onClick={() => navigate('/admin/instructores')}
            className="flex items-center gap-3 px-8 py-3 bg-black/40 border border-border/30 text-gray-400 hover:text-primary hover:border-primary/50 transition-all rounded-sm text-[9px] font-black uppercase tracking-widest"
          >
            <ArrowLeft size={16} />
            Abort & Return
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Biometric Data (Photo) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="tech-card border-border/40 bg-black/20 p-8 rounded-sm">
              <label className="tech-label">
                <span className="tech-label-line" />
                Biometric.Scan
              </label>
              
              <div className="tech-upload-area aspect-square group">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover tech-upload-preview" />
                ) : (
                  <div className="flex flex-col items-center gap-4 text-gray-700">
                    <ImageIcon size={40} className="opacity-20" />
                    <span className="text-[8px] font-black uppercase tracking-[0.3em]">No_Data_Node</span>
                  </div>
                )}
                
                <label className="absolute inset-0 bg-secondary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="text-secondary" size={24} />
                    <span className="text-[8px] font-black text-secondary uppercase tracking-widest">Update_Module</span>
                  </div>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
              </div>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-[8px] font-black text-gray-600 uppercase tracking-widest">
                  <span>Standard: JPG_PNG_NODE</span>
                  <span>MAX: 2.0MB</span>
                </div>
                <div className="h-[1px] w-full bg-border/10" />
                <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest leading-relaxed">
                  Leave empty to maintain existing biometric signature.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Information Core */}
          <div className="lg:col-span-8 space-y-8">
            <div className="tech-card border-border/40 bg-black/20 p-10 rounded-sm space-y-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <User size={80} />
              </div>

              {/* Name */}
              <div className="tech-form-group">
                <label className="tech-label">
                  <span className="tech-label-line" />
                  Full_Designation
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="ENTER UNIT NAME..."
                    className="tech-input pl-14"
                  />
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
                </div>
              </div>

              {/* Rank */}
              <div className="tech-form-group">
                <label className="tech-label">
                  <span className="tech-label-line" />
                  Operational.Rank
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    name="rank"
                    value={formData.rank}
                    onChange={handleChange}
                    placeholder="EG: 4TH_DAN_NODE"
                    className="tech-input pl-14"
                  />
                  <Award className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
                </div>
              </div>

              {/* Bio */}
              <div className="tech-form-group">
                <label className="tech-label">
                  <span className="tech-label-line" />
                  Instructional.History
                </label>
                <div className="relative">
                  <textarea
                    required
                    rows="6"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="COMPILING PROFESSIONAL BACKGROUND..."
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
                  className="w-full py-5 bg-secondary text-secondary-foreground font-black text-[10px] uppercase tracking-[0.4em] shadow-xl shadow-secondary/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-4 disabled:opacity-50 border border-secondary/50"
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}
                  <span>{loading ? 'RECALIBRATING...' : 'COMMIT.CHANGES'}</span>
                </button>
              </div>

            </div>
          </div>

        </form>
      </div>
    </AdminLayout>
  );
};

export default EditarInstructorPage;
