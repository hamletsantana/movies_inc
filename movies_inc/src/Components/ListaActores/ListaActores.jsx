import React from "react";
import "./ListaActores.css";

const ListaActores = ({ actores }) => {
  return (
    <div className="seccion-actores">
      <h2>Actores y Personajes</h2>
      <ul className="lista-actores">
        {actores.map((actor) => (
          <li key={actor.cast_id}>
            <strong>{actor.name}</strong> como el personaje {actor.character}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaActores;
