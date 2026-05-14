import { API_BASE_URL, BASE_URL } from '../../config';
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Settings, Lock, Save, User, Key, CheckCircle, AlertCircle } from 'lucide-react';

/**
 * Página de Configuración de Usuario.
 * Permite actualizar el perfil del administrador y cambiar la contraseña.
 * 
 * @component
 */
const SettingsPage = () => {
    const [profile, setProfile] = useState({
        username: '',
        first_name: '',
        last_name: ''
    });
    const [password, setPassword] = useState({
        old_password: '',
        new_password: '',
        confirm_password: ''
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/profile/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setProfile(data);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveProfile = async () => {
        setMessage({ text: '', type: '' });
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/profile/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({
                    first_name: profile.first_name,
                    last_name: profile.last_name
                })
            });
            if (response.ok) {
                setMessage({ text: 'Perfil actualizado correctamente', type: 'success' });
            } else {
                setMessage({ text: 'Error al actualizar el perfil', type: 'error' });
            }
        } catch (error) {
            setMessage({ text: 'Error de conexión', type: 'error' });
        }
    };

    const handleChangePassword = async () => {
        setMessage({ text: '', type: '' });
        if (password.new_password !== password.confirm_password) {
            setMessage({ text: 'Las contraseñas no coinciden', type: 'error' });
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/change-password/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({
                    old_password: password.old_password,
                    new_password: password.new_password
                })
            });
            const data = await response.json();
            if (response.ok) {
                setMessage({ text: 'Contraseña actualizada correctamente', type: 'success' });
                setPassword({ old_password: '', new_password: '', confirm_password: '' });
            } else {
                setMessage({ text: data.error || 'Error al cambiar la contraseña', type: 'error' });
            }
        } catch (error) {
            setMessage({ text: 'Error de conexión', type: 'error' });
        }
    };

    if (loading) return (
        <AdminLayout>
            <div className="flex items-center justify-center h-[60vh]">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-primary font-black animate-pulse tracking-widest text-[10px] uppercase">CARGANDO_SISTEMA...</p>
                </div>
            </div>
        </AdminLayout>
    );

    return (
        <AdminLayout>
            <div className="space-y-16 animate-fade-in pb-20">
                {/* HUD Page Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-border/20 pb-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
                            <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase">Configuración.Del.Sistema</span>
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-foreground uppercase leading-none">
                            Ajustes <span className="text-gradient">Globales</span>
                        </h1>
                        <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] max-w-md leading-relaxed">
                            Gestionando los parámetros operativos centrales y preferencias del sistema de <span className="text-primary italic">Taekwondo Sierra Nevada</span>.
                        </p>
                    </div>
                </div>

                {message.text && (
                    <div className={`p-6 border ${message.type === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.1)]' : 'bg-destructive/10 border-destructive/50 text-destructive shadow-[0_0_15px_rgba(239,68,68,0.1)]'} flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all animate-in fade-in slide-in-from-top-4`}>
                        {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                        {message.text}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Parámetros de Identidad */}
                    <div className="tech-card border-border/40 bg-black/20 p-10 rounded-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                            <User size={120} />
                        </div>
                        <div className="mb-10 flex items-center gap-4 border-l-4 border-primary pl-6">
                            <div>
                                <h3 className="text-xl font-black text-foreground uppercase tracking-tight">Parámetros de <span className="text-primary italic">Identidad</span></h3>
                                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mt-1">Profile.Protocol_Active</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2">
                                    <div className="w-1 h-1 bg-primary rounded-full shadow-[0_0_5px_hsl(var(--primary))]" />
                                    Etiqueta.Usuario
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full bg-black/40 border border-border/30 rounded-sm px-6 py-5 text-[11px] font-black text-gray-500 uppercase tracking-widest outline-none cursor-not-allowed border-dashed"
                                        value={profile.username}
                                        readOnly
                                    />
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                       <span className="text-[8px] font-black text-primary/60 uppercase tracking-widest">UNIDAD_FIJA</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">Nombre</label>
                                    <input
                                        type="text"
                                        className="w-full bg-black/40 border border-border/30 focus:border-primary/50 focus:bg-primary/5 rounded-sm px-6 py-5 text-[11px] font-black text-foreground uppercase tracking-widest outline-none transition-all"
                                        value={profile.first_name}
                                        onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                                        placeholder="NOMBRE"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">Apellidos</label>
                                    <input
                                        type="text"
                                        className="w-full bg-black/40 border border-border/30 focus:border-primary/50 focus:bg-primary/5 rounded-sm px-6 py-5 text-[11px] font-black text-foreground uppercase tracking-widest outline-none transition-all"
                                        value={profile.last_name}
                                        onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                                        placeholder="APELLIDOS"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleSaveProfile}
                                className="w-full mt-6 flex items-center justify-center gap-4 px-8 py-5 bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-[0.4em] shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all border border-primary/50"
                            >
                                <Save size={18} />
                                Actualizar Perfil
                            </button>
                        </div>
                    </div>

                    {/* Cambio de Contraseña */}
                    <div className="tech-card border-border/40 bg-black/20 p-10 rounded-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                            <Lock size={120} />
                        </div>
                        <div className="mb-10 flex items-center gap-4 border-l-4 border-secondary pl-6">
                            <div>
                                <h3 className="text-xl font-black text-foreground uppercase tracking-tight">Cifrado de <span className="text-secondary italic">Acceso</span></h3>
                                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mt-1">Security.Encryption_Active</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">Contraseña Actual</label>
                                <input
                                    type="password"
                                    className="w-full bg-black/40 border border-border/30 focus:border-secondary/50 focus:bg-secondary/5 rounded-sm px-6 py-5 text-[11px] font-black text-foreground uppercase tracking-widest outline-none transition-all"
                                    value={password.old_password}
                                    onChange={(e) => setPassword({ ...password, old_password: e.target.value })}
                                    placeholder="••••••••"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">Nueva Contraseña</label>
                                <input
                                    type="password"
                                    className="w-full bg-black/40 border border-border/30 focus:border-secondary/50 focus:bg-secondary/5 rounded-sm px-6 py-5 text-[11px] font-black text-foreground uppercase tracking-widest outline-none transition-all"
                                    value={password.new_password}
                                    onChange={(e) => setPassword({ ...password, new_password: e.target.value })}
                                    placeholder="••••••••"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">Confirmar Nueva Contraseña</label>
                                <input
                                    type="password"
                                    className="w-full bg-black/40 border border-border/30 focus:border-secondary/50 focus:bg-secondary/5 rounded-sm px-6 py-5 text-[11px] font-black text-foreground uppercase tracking-widest outline-none transition-all"
                                    value={password.confirm_password}
                                    onChange={(e) => setPassword({ ...password, confirm_password: e.target.value })}
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                onClick={handleChangePassword}
                                className="w-full mt-6 flex items-center justify-center gap-4 px-8 py-5 bg-secondary text-secondary-foreground font-black text-[10px] uppercase tracking-[0.4em] shadow-xl shadow-secondary/20 hover:scale-[1.01] active:scale-[0.99] transition-all border border-secondary/50"
                            >
                                <Lock size={18} />
                                Cambiar Contraseña
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default SettingsPage;
