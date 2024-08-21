import React, { useEffect, useState } from "react";
import FavoritasPopup from "../../Components/FavoritasPopup/FavoritasPopup";
import CuadroPelicula from "../../Components/CuadroPeliculas/CuadroPelicula";
import { API_KEY } from "../../API/ApiKey";
import "./Home.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [favoritas, setfavoritas] = useState([]);
  const [mostrarfavoritas, setmostrarfavoritas] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const opciones = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: API_KEY,
        },
      };

      try {
        const respuesta = await fetch(
          "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
          opciones
        );
        const data = await respuesta.json();

        const sortMovies = data.results.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setMovies(sortMovies);
      } catch (error) {
        console.error("Error extrayendo las películas:", error);
      }
    };

    fetchMovies();
  }, []);

  const addTofavoritas = async (movieId) => {
    const opciones = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: API_KEY,
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: movieId,
        favorite: true,
      }),
    };

    try {
      await fetch(
        "https://api.themoviedb.org/3/account/21456160/favorite",
        opciones
      );
      alert("Película añadida a favoritas!");
    } catch (error) {
      console.error("Error añadiendo a favoritas:", error);
    }
  };

  const fetchfavoritas = async () => {
    const opciones = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    };

    try {
      const respuesta = await fetch(
        "https://api.themoviedb.org/3/account/21456160/favorite/movies?language=en-US&page=1&sort_by=created_at.asc",
        opciones
      );
      const data = await respuesta.json();
      setfavoritas(data.results);
    } catch (error) {
      console.error("Error extrayendo favoritas:", error);
    }
  };

  return (
    <div className="seccion-peliculas">
      <h1>Movies INC</h1>
      <h2>Películas en Estreno</h2>
      <button
        onClick={() => {
          fetchfavoritas();
          setmostrarfavoritas(true);
        }}
        className="mostrar-favoritas-button"
      >
        Favoritas
      </button>
      <div className="listado-peliculas">
        {movies.map((movie) => (
          <CuadroPelicula
            key={movie.id}
            movie={movie}
            onAddToFavoritas={addTofavoritas}
          />
        ))}
      </div>
      {mostrarfavoritas && (
        <FavoritasPopup
          favorites={favoritas}
          onClose={() => setmostrarfavoritas(false)}
        />
      )}
    </div>
  );
};

export default Home;
