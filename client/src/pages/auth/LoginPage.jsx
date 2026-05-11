import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import Assets
import logo from '../../assets/img/logos/logoFBlanco.png';
import heroImage from '../../assets/img/large/heroLogin.jpg';

/**
 * Página de Inicio de Sesión (Login).
 * Autentica a los instructores y administradores para acceder al panel de control.
 * 
 * @component
 */
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:8000/api/login/', { username, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', username);
        localStorage.setItem('login_timestamp', Date.now().toString());
        navigate('/admin');
      }
    } catch (err) {
      setError('Credenciales inválidas.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0f0e17] relative">
      {/* Imagen de fondo solo para MÓVIL */}
      <div className="md:hidden absolute inset-0 z-0">
        <img src={heroImage} alt="Background" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0e17] via-transparent to-[#0f0e17]"></div>
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col md:flex-row bg-[#1e1b2e]/40 md:bg-[#1e1b2e]/60 backdrop-blur-xl md:backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        {/* Columna Izquierda: Imagen/Hero */}
        <div className="hidden md:block md:w-3/5 relative h-screen">
          <img 
            src={heroImage} 
            alt="Taekwondo Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0f0e17] via-[#0f0e17]/40 to-transparent" />
          
          {/* Overlay de Texto e Iconos */}
          <div className="absolute top-10 left-10 flex items-center gap-4 group">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center overflow-hidden border border-white/20 group-hover:border-purple-500/50 transition-all duration-500">
               <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <h1 className="text-white text-sm font-black tracking-[0.2em] uppercase">Taekwondo</h1>
              <p className="text-purple-400/80 text-[11px] font-medium tracking-widest uppercase">Sierra Nevada</p>
            </div>
          </div>

          <div className="absolute bottom-12 left-12 flex flex-col gap-2">
             <span className="text-white/10 text-8xl font-black select-none pointer-events-none uppercase tracking-tighter">Focus</span>
             <span className="text-purple-500/20 text-7xl font-black select-none pointer-events-none [writing-mode:vertical-rl] mt-4">태권도</span>
          </div>
        </div>

        {/* Columna Derecha: Formulario */}
        <div className="w-full md:w-2/5 p-8 md:p-16 flex flex-col justify-center relative bg-[#161426]/80 md:bg-[#161426]/80 backdrop-blur-sm min-h-screen overflow-y-auto custom-scrollbar">
          
          {/* Hero Header visible solo en MÓVIL */}
          <div className="md:hidden relative h-60 -mx-8 -mt-8 mb-10 overflow-hidden rounded-b-[3rem] shadow-2xl animate-in fade-in slide-in-from-top duration-1000">
            <img 
              src={heroImage} 
              alt="Taekwondo Hero" 
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161426] via-[#161426]/40 to-transparent" />
            
            {/* Logo y Título sobre la imagen */}
            <div className="absolute bottom-8 left-8 flex items-center gap-4">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center overflow-hidden border border-white/20">
                 <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <h1 className="text-white text-sm font-black tracking-[0.2em] uppercase">Taekwondo</h1>
                <p className="text-purple-400 font-medium tracking-widest uppercase text-[11px]">Sierra Nevada</p>
              </div>
            </div>

            {/* Decoración coreana pequeña */}
            <div className="absolute top-6 right-8">
              <span className="text-purple-500/40 text-4xl font-black select-none pointer-events-none">태권도</span>
            </div>
          </div>

          <div className="mb-10 animate-in fade-in slide-in-from-left duration-700 delay-200">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-2 tracking-tight">
              Bienvenido
            </h2>
            <p className="text-gray-400 text-sm">Gestiona tu escuela con eficiencia.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
            {error && (
              <div className="animate-shake">
                <p className="text-red-400 text-xs font-medium bg-red-400/10 border border-red-400/20 py-3 px-4 rounded-xl text-center">
                  {error}
                </p>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="group">
                <label className="text-xs text-gray-500 font-semibold mb-2 block ml-1 uppercase tracking-wider group-focus-within:text-purple-400 transition-colors">Usuario</label>
                <input
                  type="text"
                  placeholder="Introduce tu usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all duration-300"
                />
              </div>
              <div className="group">
                <label className="text-xs text-gray-500 font-semibold mb-2 block ml-1 uppercase tracking-wider group-focus-within:text-purple-400 transition-colors">Contraseña</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">¿Olvidaste tu contraseña?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 rounded-xl shadow-[0_10px_20px_-10px_rgba(124,58,237,0.5)] hover:shadow-[0_15px_25px_-10px_rgba(124,58,237,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-4"
            >
              Entrar al Panel
            </button>

            {/* Separador */}
            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-bold">
                <span className="bg-[#161426] px-4 text-gray-600">O accede con</span>
              </div>
            </div>

            {/* Botón Google */}
            <button
              type="button"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 flex items-center justify-center gap-3 text-white text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              Cuenta de Google
            </button>
          </form>

          <p className="mt-12 text-center text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Taekwondo Sierra Nevada. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;