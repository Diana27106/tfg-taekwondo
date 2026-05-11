import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Users, Clock, User, Loader2, X, Check, Search } from 'lucide-react';

/**
 * Gestor de Grupos por Sede.
 * Permite vincular, desvincular y crear grupos asociados a una sede específica.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {number|string} props.locationId - ID de la sede a la que pertenecen los grupos.
 * @param {function} props.onGroupsChange - Función de callback cuando los grupos cambian.
 */
const GroupManager = ({ locationId, onGroupsChange }) => {
  const [groups, setGroups] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [allAvailableGroups, setAllAvailableGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // New Group Form State
  const [newGroup, setNewGroup] = useState({
    age_range: '',
    schedule: '',
    instructor: ''
  });

  useEffect(() => {
    if (locationId) {
      fetchGroups();
    }
    fetchInstructors();
  }, [locationId]);

  const fetchGroups = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/locations/${locationId}/`);
      setGroups(response.data.groups || []);
    } catch (error) {
      console.error('Error fetching location groups:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInstructors = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/instructors/');
      setInstructors(response.data);
    } catch (error) {
      console.error('Error fetching instructors:', error);
    }
  };

  const fetchAllGroups = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/groups/');
      // Filter out groups already in this location
      const filtered = response.data.filter(g => !groups.some(existing => existing.id === g.id));
      setAllAvailableGroups(filtered);
    } catch (error) {
      console.error('Error fetching all groups:', error);
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Token ${token}` } };
      
      // 1. Create the group
      const groupData = {
        ...newGroup,
        locations: [locationId]
      };
      
      await axios.post('http://localhost:8000/api/groups/', groupData, config);
      
      await fetchGroups();
      setShowAddModal(false);
      setNewGroup({ age_range: '', schedule: '', instructor: '' });
      if (onGroupsChange) onGroupsChange();
    } catch (error) {
      console.error('Error creating group:', error);
      alert('Error al crear el grupo.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleLinkGroup = async (groupId) => {
    setActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Token ${token}` } };
      
      // Get current group data
      const groupRes = await axios.get(`http://localhost:8000/api/groups/${groupId}/`);
      const currentLocations = groupRes.data.locations || [];
      
      // Add this location if not already there
      if (!currentLocations.includes(parseInt(locationId))) {
        await axios.patch(`http://localhost:8000/api/groups/${groupId}/`, {
          locations: [...currentLocations, parseInt(locationId)]
        }, config);
      }
      
      await fetchGroups();
      setShowLinkModal(false);
      if (onGroupsChange) onGroupsChange();
    } catch (error) {
      console.error('Error linking group:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUnlinkGroup = async (groupId) => {
    if (!window.confirm('¿Estás seguro de desvincular este grupo de esta sede?')) return;
    
    setActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Token ${token}` } };
      
      const groupRes = await axios.get(`http://localhost:8000/api/groups/${groupId}/`);
      const updatedLocations = groupRes.data.locations.filter(id => id !== parseInt(locationId));
      
      await axios.patch(`http://localhost:8000/api/groups/${groupId}/`, {
        locations: updatedLocations
      }, config);
      
      await fetchGroups();
      if (onGroupsChange) onGroupsChange();
    } catch (error) {
      console.error('Error unlinking group:', error);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading && locationId) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border/20 pb-4">
        <div className="flex items-center gap-3">
          <Users className="text-primary" size={20} />
          <h3 className="text-sm font-black uppercase tracking-widest">Training.Groups</h3>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => { fetchAllGroups(); setShowLinkModal(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-black/40 border border-border/30 text-[9px] font-black uppercase tracking-widest hover:border-primary/50 transition-all"
          >
            <Search size={14} />
            Link Existing
          </button>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all"
          >
            <Plus size={14} />
            New Group
          </button>
        </div>
      </div>

      {groups.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-border/30 bg-black/5 rounded-sm">
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">No groups assigned to this facility node.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map((group) => (
            <div key={group.id} className="tech-card border-border/30 bg-black/40 p-4 rounded-sm flex justify-between items-center group">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-tight text-foreground">{group.age_range}</span>
                  <span className="h-px w-4 bg-primary/30" />
                  <span className="text-[10px] font-black uppercase tracking-tight text-primary">{group.instructor_name}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock size={12} />
                  <span className="text-[9px] font-black uppercase tracking-[0.1em]">{group.schedule}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleUnlinkGroup(group.id)}
                className="p-2 text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Create New Group */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/60 animate-in fade-in zoom-in duration-200">
          <div className="tech-card w-full max-w-md bg-black border-primary/30 p-8 space-y-8 shadow-[0_0_50px_rgba(var(--primary-rgb),0.1)]">
            <div className="flex justify-between items-center border-b border-border/20 pb-4">
              <h2 className="text-xl font-black uppercase tracking-tighter">New <span className="text-primary">Group</span> Instance</h2>
              <button onClick={() => setShowAddModal(false)}><X size={20} className="text-gray-500 hover:text-white" /></button>
            </div>

            <form onSubmit={handleCreateGroup} className="space-y-6">
              <div className="tech-form-group">
                <label className="tech-label"><span className="tech-label-line" />Age.Sector</label>
                <input
                  required
                  type="text"
                  placeholder="E.G. 6-12 AÑOS"
                  className="tech-input"
                  value={newGroup.age_range}
                  onChange={(e) => setNewGroup({...newGroup, age_range: e.target.value})}
                />
              </div>

              <div className="tech-form-group">
                <label className="tech-label"><span className="tech-label-line" />Schedule.Vector</label>
                <input
                  required
                  type="text"
                  placeholder="E.G. L-X 17:00"
                  className="tech-input"
                  value={newGroup.schedule}
                  onChange={(e) => setNewGroup({...newGroup, schedule: e.target.value})}
                />
              </div>

              <div className="tech-form-group">
                <label className="tech-label"><span className="tech-label-line" />Instructor.Node</label>
                <select
                  required
                  className="tech-input appearance-none"
                  value={newGroup.instructor}
                  onChange={(e) => setNewGroup({...newGroup, instructor: e.target.value})}
                >
                  <option value="">SELECT INSTRUCTOR...</option>
                  {instructors.map(i => (
                    <option key={i.id} value={i.id}>{i.name} ({i.rank})</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={actionLoading}
                className="w-full py-4 bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3"
              >
                {actionLoading ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} />}
                Create & Link Group
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Link Existing Group */}
      {showLinkModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/60 animate-in fade-in zoom-in duration-200">
          <div className="tech-card w-full max-w-md bg-black border-border/30 p-8 space-y-8 shadow-2xl">
            <div className="flex justify-between items-center border-b border-border/20 pb-4">
              <h2 className="text-xl font-black uppercase tracking-tighter text-gradient">Search.Database</h2>
              <button onClick={() => setShowLinkModal(false)}><X size={20} className="text-gray-500 hover:text-white" /></button>
            </div>

            <div className="max-h-[400px] overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {allAvailableGroups.length === 0 ? (
                <p className="text-center text-[10px] font-black text-gray-600 uppercase py-10">No available groups to link.</p>
              ) : (
                allAvailableGroups.map(group => (
                  <div key={group.id} className="tech-card border-border/20 bg-white/5 p-4 rounded-sm flex justify-between items-center group">
                    <div className="space-y-1">
                      <div className="text-[10px] font-black uppercase tracking-tight">{group.age_range}</div>
                      <div className="text-[9px] font-black text-primary uppercase">{group.instructor_name}</div>
                      <div className="text-[8px] font-black text-gray-500 uppercase">{group.schedule}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleLinkGroup(group.id)}
                      disabled={actionLoading}
                      className="px-4 py-2 bg-primary/10 border border-primary/30 text-primary text-[8px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all disabled:opacity-50"
                    >
                      Link Node
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupManager;
