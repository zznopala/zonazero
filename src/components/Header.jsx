import React from 'react';

const Header = ({ isDark, toggleTheme }) => {
  return (
    <header>
      <div className="brand">
        <span className="zona-text">Z<span className="bola-ocho">8</span>NA</span>
        <span className="zero-text">ZER<span className="hielo">🧊</span></span>
      </div>
      <button onClick={toggleTheme} className="theme-btn">
        {isDark ? '☀️' : '🌙'}
      </button>
    </header>
  );
};

export default Header;