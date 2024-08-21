import React from "react";
import { Link } from "react-router-dom";
import "./BotonesDetalles.css";

const BotonesDetalles = ({ handleFavoritas, handleMostrarFavoritas }) => {
  return (
    <div className="seccion-botones">
      <button className="boton-inicio">
        <Link to="/">Volver al Inicio</Link>
      </button>
      <button className="boton-favoritas" onClick={handleFavoritas}>
        Añadir a Favoritas
      </button>
      <button
        className="boton-mostrar-favoritas-detalles"
        onClick={handleMostrarFavoritas}
      >
        Mostrar Favoritas
      </button>
    </div>
  );
};

export default BotonesDetalles;
