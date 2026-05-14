import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Widget de reseñas de Google (Featurable).
 * Muestra un carrusel de reseñas obtenidas externamente.
 * 
 * @component
 */
const FeaturableWidget = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Configuración de visualización (según la imagen: 3 cards a la vez)
    const cardsToShow = 3;

    useEffect(() => {
        const fetchWidgetData = async () => {
            try {
                // Usamos el ID del JSON proporcionado
                const response = await axios.get('https://featurable.com/api/v2/widgets/ee82d61d-a438-45fe-bb4b-926d3d7be2d7');
                if (response.data.success) {
                    setData(response.data.widget);
                }
            } catch (error) {
                console.error("Error fetching Featurable widget data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWidgetData();
    }, []);

    if (loading || !data) return <div className="p-10 text-center">Cargando reseñas...</div>;

    const { reviews, config, gbpLocationSummary } = data;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1 >= reviews.length - (cardsToShow - 1) ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? reviews.length - cardsToShow : prev - 1));
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 font-sans text-gray-800">
            {/* --- SUMMARY BAR (Header estilo Google) --- */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4 group/google relative">
                    <div className="relative cursor-default">
                        <svg className="w-10 h-10 transition-transform duration-300 group-hover/google:scale-110" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>

                        {/* Hover Tooltip */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1.5 px-3 rounded opacity-0 group-hover/google:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                            Taekwondo Sierra Nevada
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Excelente en Google</h3>
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} fill="currentColor" size={20} />
                            ))}
                        </div>
                    </div>
                </div>

                {config.summary_review_button && (
                    <a
                        href={gbpLocationSummary.writeAReviewUri}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3 bg-[#e6a23c] hover:bg-[#cf8a2e] text-white font-bold rounded-lg transition-colors shadow-sm"
                    >
                        Califícanos en Google
                    </a>
                )}
            </div>

            {/* --- REVIEWS CAROUSEL --- */}
            <div className="relative group">
                {/* Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md transition-all"
                >
                    <ChevronLeft size={24} />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow-md transition-all"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Viewport */}
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}
                    >
                        {reviews.map((review) => (
                            <div key={review.id} className="min-w-[100%] md:min-w-[33.333%] px-3">
                                <div className="bg-white h-full rounded-xl shadow-md border border-gray-50 p-6 flex flex-col">
                                    {/* Author Info */}
                                    <div className="mb-2">
                                        <h4 className="font-bold text-lg text-gray-900">
                                            {review.author.name}
                                        </h4>
                                        <div className="flex text-yellow-400 my-1">
                                            {[...Array(review.rating.value)].map((_, i) => (
                                                <Star key={i} fill="currentColor" size={18} />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Review Text */}
                                    <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                                        {review.originalText.length > config.max_characters
                                            ? `${review.originalText.substring(0, config.max_characters)}...`
                                            : review.originalText}
                                    </p>

                                    <button className="mt-4 text-blue-700 font-bold text-xs text-left hover:underline">
                                        Leer más
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturableWidget;