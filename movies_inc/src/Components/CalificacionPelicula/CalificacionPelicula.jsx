import React from "react";
import "./CalificacionPelicula.css";

const CalificacionPelicula = ({
  calificacionUsuarios,
  handleCalificacion,
  calificacionEnviada,
}) => {
  return (
    <div className="seccion-calificacion">
      <div className="estrellas-container">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`estrella ${
              calificacionUsuarios && i < calificacionUsuarios ? "relleno" : ""
            }`}
            onClick={() => handleCalificacion(i + 1)}
          >
            ★
          </span>
        ))}
      </div>
      {calificacionEnviada && (
        <p className="mensaje-califiacion">
          Gracias por calificar esta película en {calificacionUsuarios}{" "}
          estrellas!
        </p>
      )}
    </div>
  );
};

export default CalificacionPelicula;
