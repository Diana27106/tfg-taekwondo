import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

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
                <div className="flex items-center gap-4">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Logo.svg" 
                        alt="Google" 
                        className="w-10 h-10"
                    />
                    <div>
                        <h3 className="text-xl font-semibold">Exelente en Google</h3>
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