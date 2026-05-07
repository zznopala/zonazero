import React from 'react';

const ProductModal = ({ producto, onClose }) => {
  if (!producto) return null;

  const mensajeWA = encodeURIComponent(`Hola, me interesa el producto: *${producto.nombre}*`);

  return (
    <div 
      id="modal-detalle" 
      className="modal" 
      style={{ display: 'flex' }} // Forzamos el display flex para que se vea
      onClick={onClose} // Cerrar al hacer clic fuera
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-modal" onClick={onClose}>&times;</span>
        <div id="modal-body">
          <img 
            src={producto.imagen} 
            className="modal-img" 
            alt={producto.nombre}
            onError={(e) => { e.target.src = 'https://placehold.co/400x300/111/fff?text=' + producto.nombre }} 
          />
          <div className="modal-info">
            <h2 className="modal-nombre">{producto.nombre}</h2>
            <p className="modal-descripcion">
              {producto.descripcion || 'Sin descripción disponible.'}
            </p>
            <p className="producto-precio" style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
              ${producto.precio}
            </p>
            <button 
              className="btn-whatsapp-pedido" 
              onClick={() => window.open(`https://wa.me/529541336440?text=${mensajeWA}`, '_blank')}
            >
              PEDIR POR WHATSAPP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;