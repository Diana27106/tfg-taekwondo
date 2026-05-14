import { BASE_URL } from '../../config';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, Edit, Trash2, Download, Filter, ChevronDown, MoreVertical, Plus, Loader2 } from 'lucide-react';

/**
 * Tabla Pro (ProTable).
 * Componente genérico para visualización de datos en el área de administración.
 * Soporta filtrado automático, búsqueda, paginación, edición y borrado.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.apiUrl - Endpoint de la API para obtener los datos.
 * @param {string} [props.entityName='Elemento'] - Nombre de la entidad.
 * @param {string} props.routePath - Ruta base para navegación (crear/editar).
 * @param {Array} [props.columns=[]] - Configuración de las columnas a mostrar.
 * @param {string} [props.searchPlaceholder='Buscar...'] - Placeholder del input de búsqueda.
 * @param {string} [props.searchField='name'] - Campo por el cual filtrar inicialmente.
 * @param {Array} [props.filterConfigs=[]] - Configuración de los filtros disponibles [{ label, field, optionsApi }].
 */
const ProTable = ({ 
  apiUrl, 
  entityName = 'Elemento', 
  routePath, 
  columns = [], 
  searchPlaceholder = 'Buscar...',
  searchField = 'name',
  filterConfigs = [] // New prop: [{ label, field, optionsApi }]
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState({});
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar este ${entityName.toLowerCase()}?`)) {
      try {
        const token = localStorage.getItem('token');
        const config = token ? { headers: { Authorization: `Token ${token}` } } : {};
        await axios.delete(`${BASE_URL}${apiUrl}${id}/`, config);
        setData(data.filter(item => item.id !== id));
      } catch (error) {
        console.error(`Error deleting ${entityName}:`, error);
        alert(`Hubo un error al eliminar el ${entityName.toLowerCase()}.`);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`${routePath}/editar${routePath.split('/').pop()}?id=${id}`);
  };

  const handleCreate = () => {
    navigate(`${routePath}/crear${routePath.split('/').pop()}`);
  };

  const handleFilterChange = (field, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [field]: value === 'ALL' ? undefined : value
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = token ? { headers: { Authorization: `Token ${token}` } } : {};
        const response = await axios.get(`${BASE_URL}${apiUrl}`, config);
        setData(response.data);
      } catch (error) {
        console.error(`Error fetching ${entityName}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, entityName]);

  // Fetch filter options from API if provided
  useEffect(() => {
    const fetchOptions = async () => {
      const optionsMap = {};
      const token = localStorage.getItem('token');
      const config = token ? { headers: { Authorization: `Token ${token}` } } : {};

      for (const config_item of filterConfigs) {
        if (config_item.optionsApi) {
          try {
            const response = await axios.get(`${BASE_URL}${config_item.optionsApi}`, config);
            // Assuming the API returns a list of objects or strings
            // If objects, we might need a specific field, but let's assume it's a list for now
            // or extract unique values from the main data if no API
            optionsMap[config_item.field] = response.data;
          } catch (error) {
            console.error(`Error fetching filter options for ${config_item.field}:`, error);
          }
        } else if (data.length > 0) {
          // Extract unique values from current data if no specific API
          const uniqueValues = [...new Set(data.map(item => item[config_item.field]).filter(Boolean))];
          optionsMap[config_item.field] = uniqueValues;
        }
      }
      setFilterOptions(optionsMap);
    };

    if (data.length > 0 || filterConfigs.some(c => c.optionsApi)) {
      fetchOptions();
    }
  }, [filterConfigs, data]);

  const filteredData = data.filter(item => {
    // Search filter: Search across ALL fields of the object
    const searchMatch = !searchTerm || Object.values(item).some(val => 
      val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Active filters matching
    const filtersMatch = Object.entries(activeFilters).every(([field, value]) => {
      if (!value) return true;
      return item[field] === value;
    });

    return searchMatch && filtersMatch;
  });

  return (
    <div className="bg-card/40 backdrop-blur-2xl rounded-sm shadow-2xl shadow-primary/5 border border-border/30 overflow-hidden transition-all duration-500 animate-fade-in relative">
      
      {/* Table HUD Header */}
      <div className="p-8 border-b border-border/30 flex flex-col lg:flex-row gap-8 items-center justify-between bg-gradient-to-b from-primary/[0.02] to-transparent">
        <div className="w-full lg:w-96 relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="h-4 w-4 text-gray-500 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            placeholder={searchPlaceholder.toUpperCase()}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-10 py-3 bg-black/20 border border-border/50 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] focus:border-primary/50 focus:ring-0 outline-none text-foreground transition-all placeholder-gray-600"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          )}
          <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary group-focus-within:w-full transition-all duration-500 shadow-[0_0_10px_hsl(var(--primary))]" />
        </div>
        
        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-none">
            <button 
              onClick={() => setIsFilterVisible(!isFilterVisible)}
              className={`w-full flex items-center justify-center gap-3 px-8 py-3 bg-black/20 border rounded-sm text-[10px] font-black uppercase tracking-widest transition-all duration-300 group ${isFilterVisible ? 'text-primary border-primary/50' : 'text-gray-400 border-border/30 hover:text-primary hover:border-primary/50'}`}
            >
              <Filter size={16} className={`${isFilterVisible ? 'rotate-180' : 'group-hover:rotate-180'} transition-transform duration-500`} />
              <span>Filter</span>
            </button>

            {/* Filter Dropdown */}
            {isFilterVisible && filterConfigs.length > 0 && (
              <div className="absolute top-full right-0 mt-4 w-72 bg-black/90 backdrop-blur-2xl border border-primary/30 rounded-sm shadow-2xl z-50 p-6 space-y-6 animate-in slide-in-from-top-2 duration-300">
                <div className="flex items-center justify-between border-b border-border/20 pb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Filter Protocol</span>
                  <button onClick={() => { setActiveFilters({}); setIsFilterVisible(false); }} className="text-[8px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Reset</button>
                </div>
                
                {filterConfigs.map(config => (
                  <div key={config.field} className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block">{config.label}</label>
                    <select 
                      onChange={(e) => handleFilterChange(config.field, e.target.value)}
                      value={activeFilters[config.field] || 'ALL'}
                      className="w-full bg-black/40 border border-border/50 rounded-sm px-4 py-3 text-[10px] font-black uppercase tracking-widest text-foreground focus:border-primary/50 outline-none transition-all"
                    >
                      <option value="ALL">ALL {config.label.toUpperCase()}</option>
                      {filterOptions[config.field]?.map((opt, i) => (
                        <option key={i} value={typeof opt === 'object' ? opt.id : opt}>
                          {typeof opt === 'object' ? opt.name || opt.title || opt.address : opt}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                <button 
                  onClick={() => setIsFilterVisible(false)}
                  className="w-full py-3 bg-primary/10 border border-primary/30 text-primary text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Apply Protocol
                </button>
              </div>
            )}
          </div>

          <button onClick={handleCreate} className="flex-1 lg:flex-none items-center justify-center gap-3 px-10 py-3 bg-primary text-primary-foreground rounded-sm text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] border border-primary/50 hover:brightness-110">
            <Plus size={18} />
            <span>Init {entityName}</span>
          </button>
        </div>
      </div>

      {/* Futuristic Table HUD - Desktop */}
      <div className="hidden lg:block overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary/[0.02] border-b border-border/30">
              {columns.map((col, idx) => (
                <th key={idx} className={`px-10 py-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] ${col.className || ''}`}>
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary/30 rounded-full" />
                    {col.header}
                  </div>
                </th>
              ))}
              <th className="px-10 py-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] text-right">Operation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-10 py-24 text-center">
                  <div className="flex flex-col items-center gap-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary blur-2xl opacity-20 animate-pulse"></div>
                      <Loader2 className="h-12 w-12 text-primary animate-spin relative" />
                    </div>
                    <span className="font-black uppercase tracking-[0.4em] text-[10px] text-primary animate-pulse">Syncing...</span>
                  </div>
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-10 py-24 text-center text-[10px] font-black uppercase tracking-widest text-gray-500">
                  <div className="flex items-center justify-center gap-4">
                    <span className="h-[1px] w-8 bg-border/30" />
                    Null records in current directory
                    <span className="h-[1px] w-8 bg-border/30" />
                  </div>
                </td>
              </tr>
            ) : (
              filteredData.map((row) => (
                <tr key={row.id} className="relative transition-all duration-300 group/row border-transparent hover:bg-primary/[0.03]">
                  {/* Scan Line Effect */}
                  <td className="absolute inset-0 pointer-events-none opacity-0 group-hover/row:opacity-100 overflow-hidden">
                    <div className="scan-line" />
                  </td>

                  {columns.map((col, idx) => (
                    <td key={idx} className={`px-10 py-6 whitespace-nowrap text-[11px] font-black text-foreground ${col.className || ''}`}>
                      <div className="relative z-10 transition-transform duration-300 group-hover/row:translate-x-1">
                        {col.render ? col.render(row) : <span className="font-mono tracking-tighter opacity-80">{row[col.key]}</span>}
                      </div>
                    </td>
                  ))}
                  <td className="px-10 py-6 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end gap-2 opacity-30 group-hover/row:opacity-100 transition-all duration-500 relative z-10">
                      <button onClick={() => handleEdit(row.id)} className="p-2 text-primary hover:bg-primary/10 border border-transparent hover:border-primary/30 rounded-sm transition-all" title="Modify">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(row.id)} className="p-2 text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/30 rounded-sm transition-all" title="Purge">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE VIEW - Card Layout */}
      <div className="lg:hidden p-6 space-y-4">
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary animate-pulse">Syncing Hub...</span>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="py-20 text-center text-[10px] font-black uppercase tracking-widest text-gray-500 italic">
            Zero matches found in logs
          </div>
        ) : (
          filteredData.map((row) => (
            <div key={row.id} className="bg-black/20 border border-border/30 rounded-xl p-6 space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              {columns.map((col, idx) => (
                <div key={idx} className="flex justify-between items-start gap-4">
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2 shrink-0">
                    <span className="w-1 h-1 bg-primary/40 rounded-full" />
                    {col.header}
                  </span>
                  <div className="text-[11px] font-black text-foreground text-right truncate">
                    {col.render ? col.render(row) : <span className="opacity-80">{row[col.key]}</span>}
                  </div>
                </div>
              ))}
              <div className="pt-4 mt-4 border-t border-border/20 flex justify-end gap-4">
                <button 
                  onClick={() => handleEdit(row.id)} 
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg"
                >
                  <Edit size={14} /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(row.id)} 
                  className="flex items-center gap-2 px-6 py-2.5 bg-destructive/10 border border-destructive/20 text-destructive text-[10px] font-black uppercase tracking-widest rounded-lg"
                >
                  <Trash2 size={14} /> Purge
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* HUD Pagination Footer */}
      <div className="px-10 py-8 border-t border-border/30 flex flex-col lg:flex-row items-center justify-between gap-8 bg-primary/[0.01]">
        <div className="flex items-center gap-4 text-[9px] font-black text-gray-500 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
          Displaying <span className="text-foreground">{filteredData.length}</span> active data nodes
        </div>
        <div className="flex gap-4">
          <button className="px-8 py-3 bg-black/20 border border-border/30 text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-primary hover:border-primary/50 disabled:opacity-20 disabled:cursor-not-allowed transition-all rounded-sm" disabled>Prev</button>
          <button className="px-8 py-3 bg-black/20 border border-border/30 text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-primary hover:border-primary/50 disabled:opacity-20 disabled:cursor-not-allowed transition-all rounded-sm" disabled>Next</button>
        </div>
      </div>
    </div>
  );
};

export default ProTable;
