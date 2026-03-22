import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Opcional: Si usas Lucide React para iconos (muy común en proyectos modernos)
// import { MapPin, Info, Users, Clock } from 'lucide-react';

const ClasesPage = () => {
    const [locations, setLocations] = useState([]);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [locationsRes, groupsRes] = await Promise.all([
                    axios.get('http://localhost:8000/api/locations/'),
                    axios.get('http://localhost:8000/api/groups/')
                ]);
                setLocations(locationsRes.data);
                setGroups(groupsRes.data);
            } catch (err) {
                console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="text-center py-20">Cargando sedes...</div>;

    return (
        <div className="min-h-screen bg-[#F3F4F6] py-16 px-4">
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h1 className="text-5xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Nuestras Sedes</h1>
                <p className="text-gray-500 font-medium">Encuentra tu centro más cercano y únete a la comunidad.</p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                {locations.map((location) => {
                    const locationGroups = groups.filter(group => 
                        group.locations && group.locations.includes(location.id)
                    );

                    return (
                        <div key={location.id} className="flex flex-col bg-white shadow-xl rounded-sm overflow-hidden border-t-4 border-black">
                            {/* Cabecera Negra */}
                            <div className="bg-black text-white py-5 px-6 flex justify-center items-center">
                                <h2 className="text-2xl font-bold tracking-wider uppercase">{location.name}</h2>
                            </div>

                            {/* Sub-encabezado Amarillo */}
                            <div className="bg-[#FFCC47] grid grid-cols-2 py-3 px-4 shadow-inner">
                                <span className="text-center font-extrabold text-black uppercase text-xs tracking-widest">Rango de Edad</span>
                                <span className="text-center font-extrabold text-black uppercase text-xs tracking-widest">Horarios Disponibles</span>
                            </div>

                            {/* Listado de Clases */}
                            <div className="flex-grow">
                                {locationGroups.length > 0 ? (
                                    locationGroups.map((group, idx) => (
                                        <div key={group.id} className={`grid grid-cols-2 py-4 px-4 border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                                            <div className="text-center text-gray-700 font-medium flex flex-col justify-center">
                                                <span className="text-sm">{group.age_range}</span>
                                            </div>
                                            <div className="text-center text-gray-700 font-medium flex items-center justify-center">
                                                <span className="text-sm italic">{group.schedule}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-10 text-center text-gray-400 italic">Próximamente nuevos grupos</div>
                                )}
                            </div>

                            {/* BOTÓN GOOGLE MAPS (En vez de Apuntante) */}
                            <a 
                                href={location.google_maps_url || "#"} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-black hover:bg-gray-800 text-[#FFCC47] transition-all py-4 text-center font-bold text-sm tracking-[0.2em] flex items-center justify-center gap-3 group"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:animate-bounce">
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                                </svg>
                                CÓMO LLEGAR (MAPS)
                            </a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ClasesPage;