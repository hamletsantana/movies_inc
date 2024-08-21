import React from "react";
import "./DetallesPeliculas.css";

const DetallesPeliculas = ({ movie }) => {
  return (
    <div className="detalles-peliculas">
      <h1 className="titulo-detalles">{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        className="poster-pelicula-detalles"
      />
      <p>
        <strong>Fecha de Estreno:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Calificación:</strong> {movie.vote_average}
      </p>
      <p>
        <strong>Descripción:</strong> {movie.overview}
      </p>
      <p>
        <strong>Género:</strong>{" "}
        {movie.genres.map((genre) => genre.name).join(", ")}
      </p>
    </div>
  );
};

export default DetallesPeliculas;
