import React, { useState, useEffect } from 'react';
import { AlertTriangle, WifiOff, X, CheckCircle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeedbackMessages = () => {
  const navigate = useNavigate();
  const [showTokenBanner, setShowTokenBanner] = useState(false);
  const [showConnectionToast, setShowConnectionToast] = useState(false);
  const [tokenStatus, setTokenStatus] = useState('Valid');

  useEffect(() => {
    // Verificar si el token existe
    const token = localStorage.getItem('token');
    if (!token) {
      setTokenStatus('Expired');
      setShowTokenBanner(true);
    } else {
      setTokenStatus('Active');
      setShowTokenBanner(false);
    }

    // Simular detección de red
    const handleOnline = () => setShowConnectionToast(false);
    const handleOffline = () => setShowConnectionToast(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleDownloadPDF = () => {
    // Simulación de generación de PDF
    const content = `REPORTE DE SISTEMA - TAEKWONDO SIERRA NEVADA\nFecha: ${new Date().toLocaleDateString()}\nEstado: Operacional\nUnidades Activas: Ver Dashboard`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Reporte_Sistema_SierraNevada.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert('Iniciando descarga de reporte estructurado...');
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex items-center gap-4">
        <h2 className="text-xs font-black text-foreground uppercase tracking-[0.4em]">Protocolo.Feedback</h2>
        <div className="h-px flex-1 bg-border/20" />
      </div>
      
      <div className="flex flex-col gap-8 relative">
        
        {/* Token Expired Unit (CRITICAL) */}
        {showTokenBanner && (
          <div className="relative group overflow-hidden border border-destructive/50 bg-destructive/5 p-6 rounded-sm">
            <div className="absolute top-0 right-0 p-4 cursor-pointer text-destructive/50 hover:text-destructive transition-colors" onClick={() => setShowTokenBanner(false)}>
              <X size={14} />
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 border border-destructive/50 text-destructive animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                <AlertTriangle size={18} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-destructive uppercase tracking-widest">Estado: Sesión_Expirada</span>
                  <span className="text-[10px] text-destructive/30">|</span>
                  <span className="text-[10px] font-black text-destructive uppercase tracking-widest">Error_Code: 401</span>
                </div>
                <p className="text-[11px] font-black text-destructive/80 uppercase tracking-wider leading-relaxed">
                  Token de acceso invalidado por inactividad prolongada o ausencia de credenciales. Se requiere reingreso para permisos de escritura.
                </p>
                <div className="pt-4">
                  <button
                    className="px-6 py-2 border border-destructive text-destructive hover:bg-destructive hover:text-white transition-all text-[9px] font-black uppercase tracking-widest rounded-sm"
                    onClick={() => navigate('/login')}
                  >
                    Iniciar Protocolo de Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Information Data Node */}
        <div className="tech-card border-secondary/50 bg-secondary/5 p-6 rounded-sm">
          <div className="flex items-center gap-4">
            <div className="p-2 border border-secondary/50 text-secondary">
              <Info size={18} />
            </div>
            <div className="flex-1 lg:flex lg:items-center lg:justify-between gap-6">
              <div className="space-y-1">
                <span className="text-[9px] font-black text-secondary uppercase tracking-widest">Proceso: Exportación_Completa</span>
                <p className="text-[11px] font-black text-secondary/80 uppercase tracking-wider">
                  El volcado de datos organizativos solicitado ha sido compilado con éxito.
                </p>
              </div>
              <button 
                onClick={handleDownloadPDF}
                className="mt-4 lg:mt-0 px-6 py-2 border border-secondary text-secondary hover:bg-secondary hover:text-black transition-all text-[9px] font-black uppercase tracking-widest rounded-sm"
              >
                Recuperar Archivo {">>" }
              </button>
            </div>
          </div>
        </div>

        {/* Network Status Unit (Floating Simulation) */}
        {showConnectionToast && (
          <div className="fixed bottom-10 right-10 z-50 animate-fade-in">
            <div className="bg-black border-2 border-destructive shadow-[0_0_30px_rgba(239,68,68,0.2)] p-6 max-w-sm w-full space-y-4">
              <div className="flex items-center justify-between border-b border-destructive/30 pb-3">
                <span className="text-[10px] font-black text-destructive uppercase tracking-widest animate-pulse">Fallo de Red</span>
                <button onClick={() => setShowConnectionToast(false)} className="text-destructive/50 hover:text-destructive">
                  <X size={14} />
                </button>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 border border-destructive/50 text-destructive bg-destructive/10">
                  <WifiOff size={20} />
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-black text-destructive uppercase tracking-wider">Conexión Perdida</p>
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Puerta de enlace inalcanzable.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Protocol Unit */}
        <div className="tech-card border-primary/50 bg-primary/5 p-6 rounded-sm">
          <div className="flex items-center gap-4">
            <div className="p-2 border border-primary/50 text-primary">
              <CheckCircle size={18} />
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-black text-primary uppercase tracking-widest">Resultado: Éxito</span>
              <p className="text-[11px] font-black text-primary/80 uppercase tracking-wider">Configuraciones sincronizadas con éxito con el repositorio central.</p>
            </div>
          </div>
        </div>

      </div>

      <div className="pt-10 flex justify-center">
        <button 
          onClick={() => {
            setShowTokenBanner(!localStorage.getItem('token'));
            setShowConnectionToast(false);
          }}
          className="px-8 py-3 bg-black/40 border border-border/50 text-[9px] font-black text-gray-500 hover:text-foreground hover:border-primary/50 transition-all uppercase tracking-[0.3em] rounded-sm"
        >
          Resetear Feedback Técnico
        </button>
      </div>
    </div>
  );
};

export default FeedbackMessages;
