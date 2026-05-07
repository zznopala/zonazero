import React from 'react';

const Ticker = () => {
  const items = [
    "🚫 ZERO ALCOHOL", "🎱 JUEGA LIMPIO", "🧊 ZERO BRONCAS",
    "⚡ ZERO FILAS", "🌡️ ZERO CALOR", "🚭 ZERO HUMO"
  ];

  return (
    <div className="zz-ticker-wrapper">
      <div className="zz-ticker">
        {[...items, ...items].map((text, i) => (
          <div key={i} className="zz-ticker-item">{text}</div>
        ))}
      </div>
    </div>
  );
};

export default Ticker;