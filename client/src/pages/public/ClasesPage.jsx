import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClasesPage = () => {
    const [locations, setLocations] = useState([]);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    const classTypes = [
        {
            title: "Infantil",
            description: "Clases dinámicas que potencian la coordinación, el respeto, la confianza y la disciplina, todo ello con un enfoque divertido.",
            price: "35 €",
            image: "../../../src/assets/img/small/clases/claseInfantil.jpg"
        },
        {
            title: "Adultos",
            description: "Clases dinámicas que potencian la coordinación, el respeto, la confianza y la disciplina, todo ello con un enfoque divertido.",
            price: "35 €",
            image: "../../../src/assets/img/small/clases/claseAdultos.jpg"
        },
        {
            title: "Competición",
            description: "Clases dinámicas que potencian la coordinación, el respeto, la confianza y la disciplina, todo ello con un enfoque divertido.",
            price: "35 €",
            image: "../../../src/assets/img/small/clases/claseCompeticion.jpg"
        }
    ]; // Corregido el cierre del array

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
    }, []); // Array de dependencias vacío para que solo se ejecute al montar

    if (loading) return <div className="text-center py-20 font-bold">Cargando...</div>;

    return (
        <div className="mb-10">
            {/* CABECERA (Header) */}
            <div className="relative w-full h-56 md:h-80 bg-gray-700 flex items-center justify-center overflow-hidden shadow-2xl mb-10">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-overlay"
                    style={{ backgroundImage: "url('../../../src/assets/img/large/heroClases.jpg')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-700/40"></div>
                <style>{"@import url('https://fonts.googleapis.com/css2?family=Anta&display=swap');"}</style>
                <h1
                    className="relative z-10 text-white text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-lg uppercase text-center mt-8 md:mt-12"
                    style={{ fontFamily: "'Anta', sans-serif" }}
                >
                    Clases y sedes
                </h1>
            </div>

            {/* 1. SECCIÓN DE TARJETAS DE CLASES (Fuera del bucle de sedes) */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                {classTypes.map((item, index) => (
                    <div key={index} className="bg-white rounded-xl p-8 shadow-lg flex flex-col items-center text-center transition-transform hover:-translate-y-2">
                        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-100 mb-6 shadow-inner">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 tracking-tight uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                            {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                            {item.description}
                        </p>
                        <div className="text-3xl font-black text-gray-800 mt-auto">
                            {item.price}
                        </div>
                    </div>
                ))}
            </div>

            {/* 2. CABECERA DE SEDES */}
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h1 className="text-5xl font-black text-gray-900 mb-2 uppercase tracking-tighter" style={{ fontFamily: 'Orbitron, sans-serif' }}>Nuestras Sedes</h1>
                <p className="text-gray-500 font-medium italic">Encuentra tu centro más cercano y únete a la comunidad.</p>
            </div>

            {/* 3. GRID DE SEDES (Lógica de filtrado por locación) */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                {locations.map((location) => {
                    // Filtramos los grupos que pertenecen a esta sede específica
                    const locationGroups = groups.filter(group =>
                        group.locations && group.locations.includes(location.id)
                    );

                    return (
                        <div key={location.id} className="flex flex-col bg-white shadow-xl rounded-sm overflow-hidden border-t-4 border-black transition-all hover:shadow-2xl">
                            {/* Cabecera Negra */}
                            <div className="bg-black text-white py-5 px-6 flex justify-center items-center">
                                <h2 className="text-2xl font-bold tracking-wider uppercase">{location.name}</h2>
                            </div>

                            {/* Sub-encabezado Amarillo */}
                            <div className="bg-[#FFCC47] grid grid-cols-2 py-3 px-4 shadow-inner">
                                <span className="text-center font-extrabold text-black uppercase text-xs tracking-widest">Rango de Edad</span>
                                <span className="text-center font-extrabold text-black uppercase text-xs tracking-widest">Horarios Disponibles</span>
                            </div>

                            {/* Listado de Clases de la Sede */}
                            <div className="flex-grow">
                                {locationGroups.length > 0 ? (
                                    locationGroups.map((group, idx) => (
                                        <div key={group.id} className={`grid grid-cols-2 py-4 px-4 border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                                            <div className="text-center text-gray-700 font-medium flex flex-col justify-center">
                                                <span className="text-sm">{group.age_range}</span>
                                            </div>
                                            <div className="text-center text-gray-700 font-medium flex items-center justify-center">
                                                <span className="text-sm italic font-semibold text-gray-900">{group.schedule}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-10 text-center text-gray-400 italic">Próximamente nuevos grupos</div>
                                )}
                            </div>

                            {/* Botón Google Maps */}
                            <a
                                href={location.google_maps_url || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-black hover:bg-gray-800 text-[#FFCC47] transition-all py-4 text-center font-bold text-sm tracking-[0.2em] flex items-center justify-center gap-3 group"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:animate-bounce">
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
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