import React from 'react';
import { 
  UserPlus, 
  Settings, 
  FileText, 
  Trash2, 
  Bell, 
  Calendar, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

/**
 * Lista de Acciones Recientes.
 * Muestra un historial de los últimos eventos ocurridos en el sistema de administración.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Array} props.logs - Lista de logs de actividad.
 */
const RecentActions = ({ logs = [] }) => {
  // Map actions if logs are provided, otherwise use fallback
  const displayActions = logs.length > 0 ? logs.slice(0, 5) : [
    {
      id: 1,
      user: 'SIN.DATOS',
      action: 'ESPERANDO...',
      target: '---',
      time: '00:00:00',
      icon: UserPlus,
      color: 'text-gray-500'
    }
  ];

  const getActionIcon = (actionStr) => {
    const action = actionStr.toLowerCase();
    if (action.includes('añadido')) return UserPlus;
    if (action.includes('cambiado')) return Settings;
    if (action.includes('eliminado')) return Trash2;
    return FileText;
  };

  const getActionColor = (actionStr) => {
    const action = actionStr.toLowerCase();
    if (action.includes('añadido')) return 'text-primary';
    if (action.includes('cambiado')) return 'text-secondary';
    if (action.includes('eliminado')) return 'text-destructive';
    return 'text-gray-400';
  };

  return (
    <div className="bg-card/40 backdrop-blur-2xl rounded-sm p-8 border border-border/30 h-full animate-fade-in">
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-border/20">
        <div className="space-y-1">
          <h3 className="text-xs font-black text-foreground uppercase tracking-[0.3em]">Logs.Operativos</h3>
          <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Flujo de acciones en tiempo real</p>
        </div>
        <div className="h-2 w-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
      </div>

      <div className="space-y-8">
        {displayActions.map((action) => {
          const Icon = action.icon || getActionIcon(action.action);
          const colorClass = action.color || getActionColor(action.action);
          
          return (
            <div key={action.id} className="flex items-center gap-5 group transition-all">
              <div className={`mt-0.5 h-1 w-1 shrink-0 rounded-full bg-border group-hover:bg-primary transition-colors`} />
              
              <div className="flex-1 min-w-0 font-mono">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 truncate">
                    <span className={`text-[10px] font-black uppercase tracking-wider ${colorClass}`}>{action.user}</span>
                    <span className="text-[10px] text-gray-600">{">>"}</span>
                    <span className="text-[10px] font-black text-foreground uppercase tracking-wider truncate">{action.action}</span>
                  </div>
                  <span className="text-[9px] font-black text-gray-600 tabular-nums shrink-0">
                    [{action.time}]
                  </span>
                </div>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest truncate max-w-[140px] italic">
                    OBJETIVO: {action.target}
                  </span>
                  <Icon size={12} className={`${colorClass} opacity-40 group-hover:opacity-100 transition-opacity`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-12 py-3 bg-black/20 border border-border/30 text-[9px] font-black text-gray-500 hover:text-primary hover:border-primary/50 transition-all duration-300 uppercase tracking-[0.3em] rounded-sm">
        Volcar Historial Completo
      </button>
    </div>
  );
};

export default RecentActions;
