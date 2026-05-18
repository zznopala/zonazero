import React, { useState, useEffect } from 'react';

const AnnouncementModal = ({ aviso }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Verificar si ya se mostró en esta sesión
    const hasSeen = sessionStorage.getItem('announcementSeen');
    if (aviso && aviso.activo === 'SI' && !hasSeen) {
      setIsOpen(true);
    }
  }, [aviso]);

  const closeOverlay = () => {
    setIsOpen(false);
    sessionStorage.setItem('announcementSeen', 'true');
  };

  if (!isOpen || !aviso) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-hero">
        <button className="close-x" onClick={closeOverlay}>✕</button>
        
        {/* Imagen Hero */}
        <div className="hero-image-container">
          <img src={aviso.imagen_url} alt="Aviso Especial" className="hero-img" />
          <div className="hero-overlay-gradient"></div>
        </div>

        {/* Contenido del Mensaje */}
        <div className="modal-body">
          <h2 className="neon-title">{aviso.titulo}</h2>
          <p className="message-text">{aviso.mensaje}</p>
          
          {aviso.texto_boton && (
            <button onClick={closeOverlay} className="btn-aviso-action">
              {aviso.texto_boton}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementModal;