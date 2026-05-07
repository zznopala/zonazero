import React, { useState, useEffect } from 'react';

const ScrollTop = ({ isDark }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Controlar la visibilidad según el scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button 
      className={`zz-btn-top billar-ball ${isDark ? 'white-ball' : 'eight-ball'} ${isVisible ? 'show' : ''}`}
      onClick={scrollToTop}
      aria-label="Volver arriba"
    >
      <span className="ball-content">▲</span>
    </button>
  );
};

export default ScrollTop;