import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar as CalendarIcon, ExternalLink, X, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const SponsorsPage = () => {
  const [lang, setLang] = useState('es');
  const [sponsors, setSponsors] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const translations = {
    es: {
      headerTitle: "Patrocinadores",
      upcomingTitle: "Próximas Actividades",
      featuredTitle: "Eventos Destacados",
      moreComing: "Próximamente más novedades",
      networkTitle: "Red de Colaboradores",
      benefitsTitle: "Beneficios de ser patrocinador",
      benefitsSubtitle: "Impulsa tu marca apoyando el deporte local.",
      howToTitle: "Cómo convertirse en patrocinador",
      howToSubtitle: "Sigue estos pasos para unirte a nuestro equipo.",
      benefit1: "Visibilidad de Marca:",
      benefit1Desc: "Presencia en el equipamiento oficial y eventos.",
      benefit2: "Impacto Social:",
      benefit2Desc: "Vinculación con valores de disciplina y salud.",
      benefit3: "Red de Contactos:",
      benefit3Desc: "Acceso directo a nuestra comunidad de familias y deportistas.",
      step1: "Contacto inicial:",
      step1Desc: "Escríbenos para conocer los diferentes planes.",
      step2: "Selección de plan:",
      step2Desc: "Elige el nivel de patrocinio que mejor se adapte.",
      step3: "Formalización:",
      step3Desc: "Firma del acuerdo y entrega de materiales gráficos.",
      joinTitle: "Únete al Equipo",
      benefits: "Beneficios",
      howTo: "Cómo Colaborar",
      mapsBtn: "CÓMO LLEGAR (MAPS)",
      officialReg: "Inscripción Oficial",
      regUnavailable: "Registro no disponible",
      eventDetails: "Detalles del Evento",
      when: "Cuándo",
      where: "Dónde",
      loading: "Cargando...",
      days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
    },
    en: {
      headerTitle: "Sponsors",
      upcomingTitle: "Upcoming Activities",
      featuredTitle: "Featured Events",
      moreComing: "More news coming soon",
      networkTitle: "Partner Network",
      benefitsTitle: "Benefits of being a sponsor",
      benefitsSubtitle: "Boost your brand by supporting local sports.",
      howToTitle: "How to become a sponsor",
      howToSubtitle: "Follow these steps to join our team.",
      benefit1: "Brand Visibility:",
      benefit1Desc: "Presence on official equipment and events.",
      benefit2: "Social Impact:",
      benefit2Desc: "Connection with values of discipline and health.",
      benefit3: "Contact Network:",
      benefit3Desc: "Direct access to our community of families and athletes.",
      step1: "Initial contact:",
      step1Desc: "Write to us to learn about the different plans.",
      step2: "Plan selection:",
      step2Desc: "Choose the sponsorship level that fits best.",
      step3: "Formalization:",
      step3Desc: "Signing of the agreement and delivery of graphic materials.",
      joinTitle: "Join the Team",
      benefits: "Benefits",
      howTo: "How to Collaborate",
      mapsBtn: "HOW TO GET THERE (MAPS)",
      officialReg: "Official Registration",
      regUnavailable: "Registration unavailable",
      eventDetails: "Event Details",
      when: "When",
      where: "Where",
      loading: "Loading...",
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  };

  const t = translations[lang];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [sponsorRes, eventRes] = await Promise.all([
          axios.get('http://localhost:8000/api/sponsors/'),
          axios.get('http://localhost:8000/api/events/')
        ]);
        setSponsors(sponsorRes.data.filter(s => s.is_active));
        setEvents(eventRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error al conectar con el servidor.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const currentMonthName = currentDate.toLocaleString(lang === 'es' ? 'es-ES' : 'en-US', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const paddingArray = Array.from({ length: startingDay }, (_, i) => i);

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const getEventForDay = (day) => {
    return events.find(event => {
      const eventDate = new Date(event.start_date);
      return eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear();
    });
  };

  if (loading) return <div className="flex justify-center items-center h-screen">{t.loading}</div>;

  return (
    <div className="min-h-screen font-sans relative overflow-hidden bg-gray-50/30">

      {/* CABECERA (Header) */}
      <div className="relative w-full h-64 md:h-80 bg-gray-700 flex items-center justify-center overflow-hidden shadow-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-overlay"
          style={{ backgroundImage: "url('../../../src/assets/img/large/heroSponsors.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-700/40"></div>
        
        {/* Selector de Idioma Flotante */}
        <div className="absolute top-6 right-6 z-50 flex gap-2">
          <button 
            onClick={() => setLang('es')}
            className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest transition-all ${lang === 'es' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
          >
            ES
          </button>
          <button 
            onClick={() => setLang('en')}
            className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest transition-all ${lang === 'en' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
          >
            EN
          </button>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Anta&family=Inter:wght@400;600;800&display=swap');
          .glass-panel { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(20px); border: 1px solid rgba(251, 191, 36, 0.3); }
          .day-tile { transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
          .day-tile:hover { transform: translateY(-4px) scale(1.05); z-index: 20; }
          @keyframes infinite-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .carousel-track { display: flex; width: max-content; animation: infinite-scroll 40s linear infinite; }
          .carousel-container:hover .carousel-track { animation-play-state: paused; }
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.05); border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(217, 119, 6, 0.2); border-radius: 10px; }
        `}</style>
        <h1
          className="relative z-10 text-white text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-lg uppercase text-center mt-8 md:mt-12"
          style={{ fontFamily: "'Anta', sans-serif" }}
        >
          {t.headerTitle}
        </h1>
      </div>

      <div className="relative z-10 p-4 md:p-8 max-w-6xl mx-auto">

        {/* SECCIÓN SUPERIOR: CALENDARIO Y EVENTOS */}
        <div className="glass-panel rounded-[2.5rem] shadow-[0_30px_70px_rgba(217,119,6,0.1)] overflow-hidden flex flex-col lg:flex-row mb-24 transition-all duration-700 hover:shadow-[0_30px_80px_rgba(217,119,6,0.15)]">

          {/* Calendario */}
          <div className="w-full lg:w-[45%] p-10 bg-white/20">
            <div className="flex items-center justify-between mb-10">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-[0.3em] mb-2">{t.upcomingTitle}</span>
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none capitalize">
                  {currentMonthName} <span className="text-amber-400/40">{currentYear}</span>
                </h2>
              </div>
              <div className="flex gap-3">
                <button onClick={prevMonth} className="p-3 bg-white hover:bg-amber-50 text-amber-600 rounded-2xl shadow-sm border border-amber-100 transition-all active:scale-90 cursor-pointer"><ChevronLeft size={20} /></button>
                <button onClick={nextMonth} className="p-3 bg-white hover:bg-amber-50 text-amber-600 rounded-2xl shadow-sm border border-amber-100 transition-all active:scale-90 cursor-pointer"><ChevronRight size={20} /></button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-3 mb-6">
              {t.days.map(d => (
                <div key={d} className="text-[10px] font-black text-center text-amber-400/60 uppercase tracking-widest">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-3">
              {paddingArray.map(i => <div key={`pad-${i}`} className="aspect-square bg-gray-50/10 rounded-2xl"></div>)}
              {daysArray.map(day => {
                const event = getEventForDay(day);
                const isToday = new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear();
                return (
                  <div
                    key={day}
                    onClick={() => event && setSelectedEvent(event)}
                    className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center day-tile relative ${event ? 'bg-amber-400 border-amber-500 cursor-pointer shadow-[0_4px_15px_rgba(251,191,36,0.3)] text-white' : 'bg-white border-gray-100 text-gray-300'} ${isToday ? 'ring-4 ring-amber-200 bg-white border-amber-500 text-amber-600 font-black scale-105 z-10' : ''}`}
                  >
                    <span className="text-base font-black">{day}</span>
                    {event && <div className="absolute bottom-2 w-1.5 h-1.5 bg-white rounded-full shadow-sm"></div>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Próximos Eventos */}
          <div className="w-full lg:w-[55%] p-12 bg-gradient-to-br from-white/30 to-amber-50/10 flex flex-col border-t lg:border-t-0 lg:border-l border-amber-100/50">
            <div className="flex items-center gap-5 mb-10">
              <div className="p-4 bg-amber-500 rounded-3xl shadow-xl shadow-amber-500/30"><CalendarIcon size={28} className="text-white" /></div>
              <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tight">{t.featuredTitle}</h3>
            </div>
            <div className="flex-1 space-y-5 overflow-y-auto max-h-[400px] pr-3 custom-scrollbar">
              {events.slice(0, 8).map((event) => (
                <div key={event.id} className="flex items-center gap-6 p-5 rounded-[1.8rem] bg-white/60 border border-transparent hover:border-amber-300 hover:bg-white hover:shadow-2xl transition-all duration-500 cursor-pointer group" onClick={() => setSelectedEvent(event)}>
                  <div className="flex flex-col items-center justify-center min-w-[64px] h-[64px] rounded-2xl bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500 shadow-sm">
                    <span className="text-xl font-black leading-none">{new Date(event.start_date).getDate()}</span>
                    <span className="text-[11px] font-extrabold uppercase tracking-tighter">{new Date(event.start_date).toLocaleString(lang === 'es' ? 'es-ES' : 'en-US', { month: 'short' })}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-gray-800 text-base uppercase tracking-tight truncate group-hover:text-amber-700 transition-colors">{event.title}</h4>
                    <p className="text-xs text-gray-400 font-bold truncate flex items-center gap-2 mt-1.5"><MapPin size={14} className="text-amber-400/50" /> {event.location || 'Granada'}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500"><ChevronRight size={20} /></div>
                </div>
              ))}
              {events.length === 0 && (
                <div className="text-center py-16 px-8 bg-amber-50/20 rounded-[2.5rem] border-2 border-dashed border-amber-200">
                  <p className="text-amber-600/40 italic font-bold text-lg tracking-tight uppercase">{t.moreComing}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECCIÓN DE PATROCINADORES - CARRUSEL INFINITO */}
        <div className="text-center py-10 mb-20">
          <div className="mb-12">
            <span className="text-amber-600 font-black uppercase tracking-[0.4em] text-xs block mb-3">{t.networkTitle}</span>
            <h2 className="text-5xl font-black text-gray-900 tracking-tighter uppercase inline-block relative">
              {t.headerTitle}
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-amber-400/20 -z-10 skew-x-[-15deg]"></span>
            </h2>
          </div>

          <div className="carousel-container relative overflow-hidden py-10">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
            <div className="carousel-track flex items-center gap-12 px-12">
              {[...sponsors, ...sponsors, ...sponsors].map((sponsor, idx) => (
                <a key={`${sponsor.id}-${idx}`} href={sponsor.website} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center shrink-0">
                  <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-white p-1 border-4 border-amber-100/50 shadow-xl transition-all duration-700 group-hover:scale-110 group-hover:border-amber-500 relative overflow-hidden">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                      {sponsor.logo ? <img src={sponsor.logo} alt={sponsor.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" /> : <div className="text-center p-4"><p className="text-[10px] text-white font-black leading-tight uppercase mb-1">{sponsor.name}</p></div>}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE EVENTO */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4 animate-in fade-in duration-500">
          <div className="bg-white rounded-[3rem] shadow-2xl max-w-lg w-full p-12 relative animate-in zoom-in-95 duration-300 border border-amber-100">
            <button onClick={() => setSelectedEvent(null)} className="absolute top-10 right-10 text-gray-300 hover:text-amber-600 hover:bg-amber-50 p-2.5 rounded-full transition-all cursor-pointer"><X size={28} /></button>
            <div className="mb-10">
              <span className="inline-block px-5 py-2 bg-amber-50 text-amber-600 text-[11px] font-black rounded-full uppercase tracking-widest mb-5">{t.eventDetails}</span>
              <h3 className="text-4xl font-black text-gray-900 leading-none uppercase tracking-tighter">{selectedEvent.title}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
              <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                <div className="flex items-center gap-3 text-amber-600 mb-2.5"><CalendarIcon size={20} /><span className="text-[10px] font-black uppercase tracking-widest">{t.when}</span></div>
                <p className="text-gray-800 font-black capitalize text-sm">{new Date(selectedEvent.start_date).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                <div className="flex items-center gap-3 text-amber-500 mb-2.5"><MapPin size={20} /><span className="text-[10px] font-black uppercase tracking-widest">{t.where}</span></div>
                <p className="text-gray-800 font-black text-sm">{selectedEvent.location || 'Granada'}</p>
              </div>
            </div>
            <div className="bg-amber-50/30 p-8 rounded-[2.5rem] mb-12 text-gray-700 leading-relaxed font-semibold text-sm border border-amber-100/50 shadow-inner">{selectedEvent.description}</div>
            {selectedEvent.registration_link ? <a href={selectedEvent.registration_link} target="_blank" rel="noreferrer" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-black py-7 px-4 rounded-[1.5rem] flex items-center justify-center gap-3 transition-all uppercase tracking-[0.2em] text-xs">{t.officialReg} <ExternalLink size={20} /></a> : <div className="py-6 text-center bg-gray-100 rounded-[1.5rem] text-gray-400 text-[10px] font-black uppercase tracking-widest italic">{t.regUnavailable}</div>}
          </div>
        </div>
      )}

      {/* SECCIÓN 2: BENEFICIOS Y CÓMO SER PATROCINADOR */}
      <section className="w-full mt-12 mb-32">
        <div className="hidden md:flex bg-white p-16 flex-row-reverse items-stretch gap-10 font-sans">
          <div className="w-1/2 relative min-h-[400px] flex-shrink-0">
            <div className="absolute top-[-80px] bottom-[-80px] left-0 right-0"><img src="../../../src/assets/img/medium/sponsors.jpg" alt="Sponsors" className="shadow-2xl object-cover w-full h-full" /></div>
          </div>
          <div className="w-1/2 text-gray-800 flex flex-col justify-center">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>{t.benefitsTitle}</h2>
              <p className="text-gray-600 mb-4 italic">{t.benefitsSubtitle}</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2"><span className="text-red-600 font-bold">•</span><span><strong>{t.benefit1}</strong> {t.benefit1Desc}</span></li>
                <li className="flex items-start gap-2"><span className="text-red-600 font-bold">•</span><span><strong>{t.benefit2}</strong> {t.benefit2Desc}</span></li>
                <li className="flex items-start gap-2"><span className="text-red-600 font-bold">•</span><span><strong>{t.benefit3}</strong> {t.benefit3Desc}</span></li>
              </ul>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>{t.howToTitle}</h2>
              <p className="text-gray-600 mb-4 italic">{t.howToSubtitle}</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2"><span className="text-red-600 font-bold">•</span><span><strong>{t.step1}</strong> {t.step1Desc}</span></li>
                <li className="flex items-start gap-2"><span className="text-red-600 font-bold">•</span><span><strong>{t.step2}</strong> {t.step2Desc}</span></li>
                <li className="flex items-start gap-2"><span className="text-red-600 font-bold">•</span><span><strong>{t.step3}</strong> {t.step3Desc}</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* MÓVIL */}
        <div className="md:hidden max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-[2.5rem] shadow-[0_20px_80px_rgba(0,0,0,0.06)] border border-gray-50 overflow-hidden flex flex-col items-stretch">
            <div className="bg-slate-50 p-10 flex flex-col items-center justify-center text-center relative">
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-amber-500 to-amber-300"></div>
              <h2 className="text-3xl font-bold text-slate-800 mb-8 tracking-tight" style={{ fontFamily: 'Orbitron, sans-serif' }}>{t.joinTitle}</h2>
              <div className="w-full max-w-[320px] aspect-square rounded-3xl overflow-hidden shadow-2xl border-[10px] border-white group"><img src="../../../src/assets/img/medium/sponsors.jpg" alt="Sponsors" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" /></div>
            </div>
            <div className="p-10 flex flex-col justify-center bg-white text-gray-800">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-amber-600 uppercase tracking-widest mb-4">{t.benefits}</h3>
                  <ul className="space-y-3 text-sm leading-relaxed text-justify">
                    <li className="flex items-start gap-2"><span className="text-amber-500 font-bold">•</span><span><strong>{t.benefit1}</strong> {t.benefit1Desc}</span></li>
                    <li className="flex items-start gap-2"><span className="text-amber-500 font-bold">•</span><span><strong>{t.benefit2}</strong> {t.benefit2Desc}</span></li>
                    <li className="flex items-start gap-2"><span className="text-amber-500 font-bold">•</span><span><strong>{t.benefit3}</strong> {t.benefit3Desc}</span></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-amber-600 uppercase tracking-widest mb-4">{t.howTo}</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex items-center gap-4"><span className="text-amber-600 font-black text-xl">01</span><p className="text-xs font-bold uppercase tracking-tight">{t.step1}</p></div>
                    <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex items-center gap-4"><span className="text-amber-600 font-black text-xl">02</span><p className="text-xs font-bold uppercase tracking-tight">{t.step2}</p></div>
                    <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex items-center gap-4"><span className="text-amber-600 font-black text-xl">03</span><p className="text-xs font-bold uppercase tracking-tight">{t.step3}</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SponsorsPage;