import React from 'react';
import { useParams } from 'react-router-dom';

const SponsorDetailPage = () => {
  const { id } = useParams();
  
  return (
    <div>
      <h1>sponsor details {id}</h1>
    </div>
  );
};

export default SponsorDetailPage;
