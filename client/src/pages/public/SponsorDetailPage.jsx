import React from 'react';
import { useParams } from 'react-router-dom';

/**
 * Página de Detalle de Patrocinador.
 * Muestra información extendida sobre un colaborador o patrocinador del club.
 * 
 * @component
 */
const SponsorDetailPage = () => {
  const { id } = useParams();
  
  return (
    <div>
      <h1>sponsor details {id}</h1>
    </div>
  );
};

export default SponsorDetailPage;
