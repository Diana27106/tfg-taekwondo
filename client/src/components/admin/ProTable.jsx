import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Edit, Trash2, Download, Filter, ChevronDown, MoreVertical } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const isActive = status === 'Activo';
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
      isActive 
        ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20' 
        : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20'
    }`}>
      <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-green-600 dark:bg-green-400' : 'bg-red-600 dark:bg-red-400'}`}></span>
      {status}
    </span>
  );
};

const ProTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = token ? { headers: { Authorization: `Token ${token}` } } : {};
        const response = await axios.get('http://localhost:8000/api/instructors/', config);
        setInstructors(response.data);
      } catch (error) {
        console.error('Error fetching instructors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  const filteredData = instructors.filter(inst => 
    inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inst.rank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
      
      {/* Table Header & Actions */}
      <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="w-full sm:w-72 relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer">
            <Search className="h-4 w-4 text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Buscar instructores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border-0 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white transition-shadow placeholder-gray-500"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors inline-flex">
            <Filter size={16} />
            <span className="hidden sm:inline">Filtrar</span>
          </button>
          <button className="flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors inline-flex shadow-sm">
            <Download size={16} />
            <span className="hidden sm:inline">Exportar Excel</span>
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
                  Instructor <ChevronDown size={14} />
                </div>
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Grado (Dan)</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  Cargando instructores...
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  No se encontraron instructores.
                </td>
              </tr>
            ) : (
              filteredData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {row.photo ? (
                        <img src={`http://localhost:8000${row.photo}`} alt={row.name} className="h-8 w-8 rounded-full object-cover" />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                          {row.name ? row.name.charAt(0).toUpperCase() : '?'}
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{row.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{row.bio ? `${row.bio.substring(0, 30)}...` : 'Sin biografía'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600 dark:text-gray-300">{row.rank}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status="Activo" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    #{row.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title="Editar">
                        <Edit size={16} />
                      </button>
                      <button className="p-1.5 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10 rounded-lg transition-colors" title="Eliminar">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-1.5 text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 rounded-lg transition-colors sm:hidden" title="Más opciones">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="p-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-900">
        <div>Mostrando <span className="font-medium text-gray-900 dark:text-white">{filteredData.length}</span> resultados</div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors" disabled>Anterior</button>
          <button className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-900 transition-colors" disabled>Siguiente</button>
        </div>
      </div>
    </div>
  );
};

export default ProTable;
