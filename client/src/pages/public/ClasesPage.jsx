import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

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
    ];

    // Estado para el carrusel de tipos de clase en móvil
    const [currentClassIndex, setCurrentClassIndex] = useState(0);
    const classCarouselTimer = useRef(null);

    // Estado para sedes expandibles
    const [expandedLocations, setExpandedLocations] = useState({});

    const toggleLocation = (id) => {
        setExpandedLocations(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const nextClass = () => {
        setCurrentClassIndex((prev) => (prev + 1) % classTypes.length);
    };

    const prevClass = () => {
        setCurrentClassIndex((prev) => (prev - 1 + classTypes.length) % classTypes.length);
    };

    const resetClassTimer = () => {
        if (classCarouselTimer.current) clearInterval(classCarouselTimer.current);
        classCarouselTimer.current = setInterval(nextClass, 5000);
    };

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

        // Timer para el carrusel de clases
        classCarouselTimer.current = setInterval(nextClass, 5000);
        return () => {
            if (classCarouselTimer.current) clearInterval(classCarouselTimer.current);
        };
    }, []);

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

            {/* 1. SECCIÓN DE TARJETAS DE CLASES (Carrusel en Móvil, Grid en Desktop) */}
            <div className="max-w-6xl mx-auto mb-24 px-4">
                {/* Carrusel para Móvil */}
                <div className="md:hidden relative overflow-hidden">
                    <div 
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${currentClassIndex * 100}%)` }}
                    >
                        {classTypes.map((item, index) => (
                            <div key={index} className="min-w-full px-2">
                                <div className="bg-white rounded-2xl p-8 shadow-xl flex flex-col items-center text-center border border-gray-50 h-full">
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
                            </div>
                        ))}
                    </div>

                    {/* Controles Carrusel Móvil */}
                    <div className="flex justify-center items-center gap-6 mt-8">
                        <button 
                            onClick={() => { prevClass(); resetClassTimer(); }}
                            className="p-3 bg-white shadow-lg rounded-full text-slate-700 hover:bg-slate-50 transition-colors border border-gray-100"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <div className="flex gap-2">
                            {classTypes.map((_, idx) => (
                                <div 
                                    key={idx} 
                                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentClassIndex ? 'w-6 bg-yellow-500' : 'w-2 bg-slate-300'}`}
                                />
                            ))}
                        </div>
                        <button 
                            onClick={() => { nextClass(); resetClassTimer(); }}
                            className="p-3 bg-white shadow-lg rounded-full text-slate-700 hover:bg-slate-50 transition-colors border border-gray-100"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Grid para Desktop */}
                <div className="hidden md:grid grid-cols-3 gap-8">
                    {classTypes.map((item, index) => (
                        <div key={index} className="bg-white rounded-xl p-8 shadow-lg flex flex-col items-center text-center transition-transform hover:-translate-y-2 border border-gray-50">
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
            </div>

            {/* 2. CABECERA DE SEDES */}
            <div className="max-w-6xl mx-auto text-center mb-12 px-6">
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter" style={{ fontFamily: 'Orbitron, sans-serif' }}>Nuestras Sedes</h1>
                <p className="text-gray-500 font-medium italic">Encuentra tu centro más cercano y únete a la comunidad.</p>
            </div>

            {/* 3. GRID DE SEDES (Lógica de filtrado por locación) */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 mb-20">
                {locations.map((location) => {
                    // Filtramos los grupos que pertenecen a esta sede específica
                    const locationGroups = groups.filter(group =>
                        group.locations && group.locations.includes(location.id)
                    );

                    return (
                        <div key={location.id} className="flex flex-col bg-white shadow-xl rounded-xl md:rounded-sm overflow-hidden border border-gray-100 md:border-0 md:border-t-4 md:border-black transition-all hover:shadow-2xl h-fit">
                            {/* Cabecera Negra (Toggle solo en móvil) */}
                            <div 
                                onClick={() => toggleLocation(location.id)}
                                className="bg-black text-white py-6 md:py-5 px-8 md:px-6 flex justify-between md:justify-center items-center cursor-pointer md:cursor-default group"
                            >
                                <h2 className="text-2xl font-bold tracking-wider uppercase">{location.name}</h2>
                                <div className={`md:hidden transform transition-transform duration-300 ${expandedLocations[location.id] ? 'rotate-180' : ''}`}>
                                    <ChevronDown size={28} className="text-[#FFCC47]" />
                                </div>
                            </div>

                            {/* Contenido Colapsable (Siempre visible en desktop) */}
                            <div className={`transition-all duration-500 ease-in-out overflow-hidden md:max-h-none md:opacity-100 ${expandedLocations[location.id] ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                {/* Sub-encabezado Amarillo */}
                                <div className="bg-[#FFCC47] grid grid-cols-2 py-4 md:py-3 px-6 md:px-4 shadow-inner">
                                    <span className="text-center font-extrabold text-black uppercase text-xs tracking-widest">Rango de Edad</span>
                                    <span className="text-center font-extrabold text-black uppercase text-xs tracking-widest">Horarios Disponibles</span>
                                </div>

                                {/* Listado de Clases de la Sede */}
                                <div className="flex-grow">
                                    {locationGroups.length > 0 ? (
                                        locationGroups.map((group, idx) => (
                                            <div key={group.id} className={`grid grid-cols-2 py-5 md:py-4 px-6 md:px-4 border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                                                <div className="text-center text-gray-700 font-medium flex flex-col justify-center">
                                                    <span className="text-sm md:text-base">{group.age_range}</span>
                                                </div>
                                                <div className="text-center text-gray-700 font-medium flex items-center justify-center">
                                                    <span className="text-sm md:text-base italic font-semibold text-gray-900">{group.schedule}</span>
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
                                    className="bg-black hover:bg-gray-800 text-[#FFCC47] transition-all py-5 md:py-4 text-center font-bold text-sm tracking-[0.2em] flex items-center justify-center gap-3 group border-t border-gray-800"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:animate-bounce">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                                    </svg>
                                    CÓMO LLEGAR (MAPS)
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ClasesPage;