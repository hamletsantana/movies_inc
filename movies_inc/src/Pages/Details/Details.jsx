import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FavoritasPopup from "../../Components/FavoritasPopup/FavoritasPopup";
import ListaActores from "../../Components/ListaActores/ListaActores";
import DetallesPeliculas from "../../Components/DetallesPeliculas/DetallesPeliculas";
import CalificacionPelicula from "../../Components/CalificacionPelicula/CalificacionPelicula";
import "./Details.css";
import BotonesDetalles from "../../Components/BotonesDetalles/BotonesDetalles";
import PeliculasRecomendadas from "../../Components/PeliculasRecomendadas/PeliculasRecomendadas";
import { API_KEY } from "../../API/ApiKey";

const Details = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [actores, setActores] = useState([]);
  const [favorites, setFavoritas] = useState([]);
  const [mostrarFavoritas, setMostrarFavoritas] = useState(false);
  const [calificacionUsuarios, setCalificacionUsuarios] = useState(null);
  const [calificacionEnviada, setCalificacionEnviada] = useState(false);
  const [peliculasRecomendadas, setPeliculasRecomendadas] = useState([]);

  useEffect(() => {
    const fetchDetallesPeliculas = async () => {
      const opciones = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: API_KEY,
        },
      };

      try {
        const respuestaPeliculas = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          opciones
        );
        const movieData = await respuestaPeliculas.json();
        setMovie(movieData);

        const actoresResultado = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
          opciones
        );
        const actoresData = await actoresResultado.json();
        setActores(actoresData.cast);

        const recomendasResultado = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`,
          opciones
        );
        const recomendasData = await recomendasResultado.json();
        setPeliculasRecomendadas(recomendasData.results);
      } catch (error) {
        console.error("Error extrayendo detalles de la película:", error);
      }
    };

    fetchDetallesPeliculas();
  }, [id]);

  const handleFavoritas = async () => {
    const opciones = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: API_KEY,
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: id,
        favorite: true,
      }),
    };

    try {
      const resultado = await fetch(
        "https://api.themoviedb.org/3/account/21456160/favorite",
        opciones
      );
      const result = await resultado.json();
      if (result.success) {
        alert("Película añadida a favoritas!");
      }
    } catch (error) {
      console.error("Error añadiendo película a favoritas:", error);
    }
  };

  const fetchFavoritas = async () => {
    const opciones = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    };

    try {
      const resultado = await fetch(
        "https://api.themoviedb.org/3/account/21456160/favorite/movies?language=en-US&page=1&sort_by=created_at.asc",
        opciones
      );
      const data = await resultado.json();
      setFavoritas(data.results);
    } catch (error) {
      console.error("Error extrayendo películas favoritas:", error);
    }
  };

  const handleMostrarFavoritas = () => {
    setMostrarFavoritas(true);
    fetchFavoritas();
  };

  const handleCalificacion = async (rating) => {
    const opciones = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization: API_KEY,
      },
      body: JSON.stringify({
        value: rating,
      }),
    };

    try {
      const resultado = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/rating`,
        opciones
      );
      const result = await resultado.json();
      if (result.success) {
        setCalificacionUsuarios(rating);
        setCalificacionEnviada(true);
      }
    } catch (error) {
      console.error("Error enviando la califiación:", error);
    }
  };

  return (
    <div className="seccion-detalles-peliculas">
      {movie && (
        <>
          <DetallesPeliculas movie={movie} />
          <BotonesDetalles
            handleFavoritas={handleFavoritas}
            handleMostrarFavoritas={handleMostrarFavoritas}
          />
          <CalificacionPelicula
            calificacionUsuarios={calificacionUsuarios}
            handleCalificacion={handleCalificacion}
            calificacionEnviada={calificacionEnviada}
          />
          <ListaActores actores={actores} />

          <PeliculasRecomendadas
            peliculasRecomendadas={peliculasRecomendadas}
          />
        </>
      )}

      {mostrarFavoritas && (
        <FavoritasPopup
          favorites={favorites}
          onClose={() => setMostrarFavoritas(false)}
        />
      )}
    </div>
  );
};

export default Details;
