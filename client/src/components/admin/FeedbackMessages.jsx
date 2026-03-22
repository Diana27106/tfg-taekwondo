import React, { useState, useEffect } from 'react';
import { AlertTriangle, WifiOff, X, CheckCircle, Info } from 'lucide-react';

const FeedbackMessages = () => {
  const [showTokenBanner, setShowTokenBanner] = useState(true);
  const [showConnectionToast, setShowConnectionToast] = useState(true);

  // Auto-hide the toast after 8 seconds for demonstration purposes
  useEffect(() => {
    if (showConnectionToast) {
      const timer = setTimeout(() => {
        setShowConnectionToast(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [showConnectionToast]);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sistema de Feedback</h2>
      
      {/* Container to demo different types of feedback */}
      <div className="flex flex-col gap-4 relative">
        
        {/* Token Expired Banner (Critical Alert) */}
        {showTokenBanner && (
          <div className="bg-red-50 dark:bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm w-full mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 cursor-pointer text-red-400 hover:text-red-500 transition-colors" onClick={() => setShowTokenBanner(false)}>
              <X size={16} />
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-300">
                  Sesión Caducada
                </h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-400/90">
                  <p>
                    Tu token de acceso ha expirado por inactividad. Por favor, vuelve a iniciar sesión para continuar administrando la plataforma.
                  </p>
                </div>
                <div className="mt-4">
                  <div className="-mx-2 -my-1.5 flex">
                    <button
                      type="button"
                      className="rounded-md bg-red-100 dark:bg-red-500/20 px-3 py-2 text-sm font-medium text-red-800 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-50 dark:focus:ring-offset-gray-900 transition-colors"
                      onClick={() => alert('Redirigiendo al login...')}
                    >
                      Iniciar Sesión
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Informational Toast */}
        <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl p-4 shadow-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-blue-500 dark:text-blue-400" aria-hidden="true" />
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                La exportación del reporte de usuarios se ha completado.
              </p>
              <p className="mt-3 text-sm md:ml-6 md:mt-0">
                <a href="#" className="whitespace-nowrap font-medium text-blue-700 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300">
                  Descargar PDF <span aria-hidden="true">&rarr;</span>
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Server Connection Error (Floating Toast simulation) */}
        {showConnectionToast && (
          <div className="fixed bottom-4 right-4 z-50 animate-bounce-short">
            <div className="bg-gray-900 dark:bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-4 max-w-sm w-full flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 bg-red-500/20 p-2 rounded-full">
                  <WifiOff className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">Error de Red</h3>
                  <p className="text-xs text-gray-400 mt-0.5">No se pudo conectar con el servidor.</p>
                </div>
              </div>
              <button 
                onClick={() => setShowConnectionToast(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Success Alert */}
        <div className="bg-green-50 dark:bg-green-500/10 p-4 rounded-xl border border-green-200 dark:border-green-500/20 flex items-center justify-between shadow-sm">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
            <p className="ml-3 text-sm font-medium text-green-800 dark:text-green-300">Configuración guardada correctamente</p>
          </div>
        </div>

      </div>

      <div className="pt-6">
        <button 
          onClick={() => {
            setShowTokenBanner(true);
            setShowConnectionToast(true);
          }}
          className="text-sm px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors border border-gray-200 dark:border-gray-700 font-medium"
        >
          Resetear Estados de Feedback
        </button>
      </div>
    </div>
  );
};

export default FeedbackMessages;
