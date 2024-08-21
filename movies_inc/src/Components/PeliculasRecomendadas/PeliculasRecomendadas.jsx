import React from "react";
import { Link } from "react-router-dom";
import "./PeliculasRecomendadas.css";

const PeliculasRecomendadas = ({ peliculasRecomendadas }) => {
  return (
    <div className="seccion-peliculas-recomendadas">
      <h2>Películas Recomendadas</h2>
      <div className="peliculas-recomendadas">
        {peliculasRecomendadas.map((movie) => (
          <Link
            to={`/pelicula/${movie.id}`}
            key={movie.id}
            className="cuadro-peliculas-recomendadas"
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PeliculasRecomendadas;
