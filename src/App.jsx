import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Ticker from './components/Ticker';
import CategoryBar from './components/CategoryBar';
import BillarWidget from './components/BillarWidget';
import ScrollTop from './components/ScrollTop';
import ProductModal from './components/ProductModal';
import PromoBanner from './components/PromoBanner';

import './App.css';

const URL_API = "https://script.google.com/macros/s/AKfycbyFrABEgidH67AkQ9SMOp5MFKARYqmlFgejMHqVO6a2GwppY_omfcOOn0Ne49X56szV/exec";

function App() {
  const [datos, setDatos] = useState({ menu: [], promos: [], estadoMesa: null });
  const [categoria, setCategoria] = useState('TODOS');
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [loading, setLoading] = useState(true);

  //instalar con qr pwa
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  // Este efecto se dispara CADA VEZ que la categoría cambia
useEffect(() => {
  // Le damos 100ms para que React termine de filtrar los productos
  // y luego hacemos el scroll suave.
  const timeoutId = setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, 100);

  return () => clearTimeout(timeoutId); // Limpiamos el timer al desmontar
}, [categoria]);

  useEffect(() => {
    // 1. Detectar si ya es standalone
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true);
    }

    // 2. Evento para capturar la instalación
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    // 3. Evento cuando ya se instaló
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      // Si no se puede instalar automáticamente (como en iPhone), 
      // mostramos un aviso de cómo hacerlo manualmente
      alert("Para instalar: Dale al botón 'Compartir' y luego 'Agregar a inicio' 📲");
    }
  }; // fin codigo para instalar pwa

  const fetchData = async () => {
    try {
      const res = await fetch(URL_API);
      const json = await res.json();
      setDatos(json);
      setLoading(false);
    } catch (e) { console.error("Error:", e); }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Actualiza cada minuto
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
  };

  const menuFiltrado = categoria === 'TODOS' 
    ? datos.menu 
    : datos.menu.filter(p => p.categoria === categoria);

  // Variable auxiliar para el control de títulos
  let ultimaCategoria = null;

  return (
    <>
    <div className="app-container">
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <Ticker />
      {!loading && (
          <>
            <CategoryBar 
              menu={datos.menu} 
              actual={categoria} 
              setCategoria={setCategoria} 
            />
            <PromoBanner promos={datos.promos} />
          </>
        )}
      <main className="container">
        <div className="grid-productos" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '15px' }}>
          {loading ? (
             <div style={{ 
                gridColumn: '1 / -1', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '200px',
                flexDirection: 'column' 
              }}>
                <div className="loader">Iniciando sistema...</div>
              </div>
          ) : (
            menuFiltrado.map((p, i) => {
              // --- LÓGICA DE TÍTULOS ---
              const mostrarTitulo = p.categoria !== ultimaCategoria;
              ultimaCategoria = p.categoria;
              // -------------------------
              return (
                <React.Fragment key={i}>
                  {mostrarTitulo && (
                    <h2 className="titulo-categoria-separador" style={{ gridColumn: '1 / -1', margin: '0px' }}>
                      {p.categoria}
                    </h2>
                  )}
                  <div 
                    key={i} 
                    className="producto-card" 
                    onClick={() => setProductoSeleccionado(p)} // 2. Al hacer clic, guardamos el producto
                    style={{ background: 'var(--surface)', borderRadius: '15px', overflow: 'hidden', cursor: 'pointer' }}
                  >
                    {/* ... Contenido de la card (imagen, nombre, precio) ... */}
                    <img src={p.imagen} alt={p.nombre} style={{ width: '100%', height: '140px', objectFit: 'cover' }}/>
                    <div style={{ padding: '10px' }}>
                      <h3 style={{ fontSize: '1rem', margin: '0' }}>{p.nombre}</h3>
                                  <span className="mas-info-link">Más información →</span>

                      <p style={{ color: 'var(--neon-cyan)', fontWeight: 'bold' }}>${p.precio}</p>
                    </div>
                  </div>
                </React.Fragment>
            )
            })
          )}
        </div>
      </main>
      <ProductModal 
        producto={productoSeleccionado} 
        onClose={() => setProductoSeleccionado(null)} 
      />
      <ScrollTop isDark={isDark} />
      <div className="fixed-bottom-area">
      
      {/* 1. Botón de Instalar (Aparece si no está instalada) */}
      {deferredPrompt && !isInstalled && (
        <div className="install-bar">
          <button onClick={handleInstallClick} className="btn-instalar-footer">
            ✨ INSTALAR APP ZONAZERO
          </button>
        </div>
      )}

      {/* 2. Widget de Billar (Aparecerá aquí cuando cargue) */}
      <BillarWidget estado={datos.estadoMesa} />
      
    </div>
    </div>
    </>
  );
}

export default App;