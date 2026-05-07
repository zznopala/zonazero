import React, { useState } from 'react';

const BillarWidget = ({ estado }) => {
  const [collapsed, setCollapsed] = useState(true);

  // Verificamos si el valor existe. 
  // Usamos != null para que acepte el número 0 pero ignore null/undefined.
  if (estado == null) return null;

  // Lógica directa: si el valor que llega es 1, está disponible.
  const esDisponible = Number(estado) === 1;

  return (
    <div id="widget-billar" className={collapsed ? 'collapsed' : ''}>
      <div className="widget-header" onClick={() => setCollapsed(!collapsed)}>
        <div 
          className="estado-dot" 
          style={{ background: esDisponible ? 'var(--color-disponible)' : 'var(--color-ocupado)' }}
        ></div>
        <span id="texto-estado">
          {esDisponible ? 'Mesa De Billar Disponible' : 'Mesa De Billar Ocupada'}
        </span>
        <span id="widget-icon">{collapsed ? '▲' : '▼'}</span>
      </div>

      
      <div className="mini-footer-widget">
        <span>© 2026 <b>ZONAZERO</b></span>
        <span className="dot">•</span>
        <span>📍 Santos Reyes Nopala</span>
        <span className="dot">•</span>
        <span>Av. Hidalgo S/N BARRIO EL MIRADOR A 100M DEL PANTEÓN MUNICIPAL</span>
    </div>

      {!collapsed && (
        <div className="widget-content">
          <p className="horario-info">🕒 Horario Mesa: <b>7:00 AM - 8:00 PM</b></p>
          <button 
            className="btn-reservar" 
            onClick={() => window.open('https://wa.me/529541336440?text=Hola,%20quiero%20reservar%20la%20mesa%20de%20billar')}
          >
            RESERVAR MESA POR WHATSAPP
          </button>
        </div>
      )}
    </div>
  );
};

export default BillarWidget;

/*import React, { useState } from 'react';

const BillarWidget = ({ estado }) => {
  const [collapsed, setCollapsed] = useState(true);

  if (!estado) return null;
  const disponible = estado.estado === "Disponible";

  console.log(estado);

  return (
    <div id="widget-billar" className={collapsed ? 'collapsed' : ''}>
      <div className="widget-header" onClick={() => setCollapsed(!collapsed)}>
        <div className="estado-dot" style={{ background: disponible ? 'var(--color-disponible)' : 'var(--color-ocupado)' }}></div>
        <span id="texto-estado">{disponible ? 'Mesa Disponible' : 'Mesa Ocupada'}</span>
        <span>{collapsed ? '▲' : '▼'}</span>
      </div>

      <div className="mini-footer-widget">
        <span>© 2026 <b>ZONAZERO</b></span>
        <span className="dot">•</span>
        <span>📍 Santos Reyes Nopala</span>
      </div>

      {!collapsed && (
        <div className="widget-content">
          <p className="horario-info">🕒 Horario: <b>7:00 AM - 8:00 PM</b></p>
          <button className="btn-reservar" onClick={() => window.open('https://wa.me/529541336440?text=Hola,%20quiero%20reservar%20la%20mesa%20de%20billar')}>
            RESERVAR MESA POR WHATSAPP
          </button>
        </div>
      )}
    </div>
  );
};

export default BillarWidget;*/