// src/components/MovieCard.js
import React from "react";
import { Link } from "react-router-dom";
import "./CuadroPelicula.css";

const CuadroPelicula = ({ movie, onAddToFavoritas }) => {
  return (
    <div className="cuadro-peliculas">
      <Link to={`/pelicula/${movie.id}`} className="link-a-detalles">
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          className="poster-pelicula"
        />
        <div className="seccion-info-pelicula">
          <h2 className="titulo-pelicula">{movie.title}</h2>
          <p className="detalles-pelicula">
            Fecha de Estreno: {movie.release_date}
          </p>
          <p className="detalles-pelicula">
            Media de Votos: {movie.vote_average}
          </p>
        </div>
      </Link>
      <button
        onClick={() => onAddToFavoritas(movie.id)}
        className="favorite-button"
      >
        Añadir a Favoritas
      </button>
    </div>
  );
};

export default CuadroPelicula;
