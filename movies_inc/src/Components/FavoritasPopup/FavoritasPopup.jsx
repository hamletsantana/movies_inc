// src/components/FavoritesPopup.js
import React from "react";
import { Link } from "react-router-dom";
import "./FavoritasPopup.css";

const FavoritasPopup = ({ favorites, onClose }) => {
  return (
    <div className="favoritas-popup">
      <button onClick={onClose} className="boton-cerrar-popup">
        Cerrar
      </button>
      <h3>Películas Favoritas</h3>
      <div className="favoritas-lista">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <div key={movie.id} className="favoritas-cuadro">
              <Link to={`/pelicula/${movie.id}`} className="movie-link">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="favoritas-poster"
                />
                <div className="favoritas-info">
                  <h4 className="favoritas-titulo">{movie.title}</h4>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No se encuentran películas favoritas.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritasPopup;
