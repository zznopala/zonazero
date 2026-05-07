import React, { useMemo } from 'react';

const CategoryBar = ({ menu, actual, setCategoria }) => {
  // Extraemos las categorías únicas dinámicamente, igual que en tu app.js
  const categoriasDinamicas = useMemo(() => {
    // Si no hay menú aún, no devolvemos nada
    if (!menu || menu.length === 0) return [];
    
    const unicas = [...new Set(menu.map(p => p.categoria.toUpperCase()))];
    return ["TODOS", ...unicas];
  }, [menu]);

  const handleSelect = (e, cat) => {
    setCategoria(cat);
    // Efecto de scroll suave que tenías en tu app.js
    e.target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  if (categoriasDinamicas.length === 0) return null;

  return (
    <nav className="category-bar" id="category-bar">
      {categoriasDinamicas.map((cat) => (
        <div 
          key={cat}
          // Cambiamos 'category-item' por 'cat-pill' para que carguen tus estilos de style.css
          className={`cat-pill ${actual === cat ? 'active' : ''}`}
          onClick={(e) => handleSelect(e, cat)}
        >
          {cat}
        </div>
      ))}
    </nav>
  );
};

export default CategoryBar;
/*import React from 'react';

const CategoryBar = ({ actual, setCategoria }) => {
  const categorias = ["TODOS", "BEBIDAS", "SNACKS", "JUEGOS", "SERVICIOS"];

  return (
    <nav className="category-bar">
      {categorias.map(cat => (
        <button 
          key={cat}
          className={`category-item ${actual === cat ? 'active' : ''}`}
          onClick={() => setCategoria(cat)}
        >
          {cat}
        </button>
      ))}
    </nav>
  );
};

export default CategoryBar;*/