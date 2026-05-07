import React, { useEffect, useRef } from 'react';

const PromoBanner = ({ promos }) => {
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  const iniciarAutoplay = () => {
    stopAutoplay();
    intervalRef.current = setInterval(() => {
      if (containerRef.current) {
        const container = containerRef.current;
        const scrollStep = container.clientWidth * 0.8;
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (container.scrollLeft >= maxScroll - 5) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: scrollStep, behavior: 'smooth' });
        }
      }
    }, 4000);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (promos && promos.length > 0) {
      iniciarAutoplay();
    }
    return () => stopAutoplay();
  }, [promos]);

  const handlePromoClick = (e) => {
    e.currentTarget.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest'
    });
    iniciarAutoplay(); // Reinicia el tiempo tras interactuar
  };

  if (!promos || promos.length === 0) return null;

  return (
    <div 
      id="banner-promos" 
      className="zz-banner-container" 
      ref={containerRef}
      onMouseEnter={stopAutoplay}
      onMouseLeave={iniciarAutoplay}
    >
      {promos.map((p, index) => (
        <div 
          key={index} 
          className="promo-card" 
          onClick={handlePromoClick}
        >
          <img 
            src={p.imagen} 
            className="promo-img" 
            alt={p.titulo}
            onError={(e) => { e.target.src = 'https://placehold.co/200x150?text=ZONAZERO' }} 
          />
          <div className="promo-info">
            <span className="promo-tag">{p.etiqueta || 'HOY'}</span>
            <div className="promo-titulo">{p.titulo}</div>
            <div className="promo-precio" style={{ color: '#0ff', fontWeight: 'bold' }}>
              {p.subtitulo || ''}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromoBanner;