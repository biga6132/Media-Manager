import React, { useState, useEffect } from "react";
import { useMyList } from "../context/List.context";

//base url for
const baseImageUrl = "https://image.tmdb.org/t/p/original";
// title: movie category, fetchUrl: type of requests (eg. NetflixOriginals), isPoster: boolean
const Row = ({ title, fetchUrl }) => {
  // movies: array of movies pulled from the fetchUrl
  const [movies, setMovies] = useState([]);

  const { addToList } = useMyList();

  // fetching movies from API
  useEffect(() => {
    async function fetchData() {
      try {
        // fetch data with the fetchUrl which has type of requests (eg. NetflixOriginals)
        const request = await fetch("https://api.themoviedb.org/3" + fetchUrl);
        const response = await request.json();
        // setMovies to the response results
        setMovies(response.results);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [fetchUrl]);

  const handleOpenTrailer = (movie) => {
    window.open(
      `https://www.youtube.com/results?search_query=${
        movie.title || movie.name || movie.original_name
      } trailer`
    );
  };

  const handleAdd = async (movie, e) => {
    e.preventDefault(); // Prevent default button behavior
    e.stopPropagation(); // Stop the click event from bubbling
    await addToList(movie);
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4 ml-4">{title}</h2>
      <div className="flex space-x-4 overflow-x-scroll px-4 hide-scrollbar">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="card w-64 h-96 flex-shrink-0 bg-base-100 shadow-xl relative cursor-pointer"
          >
            <figure
              onClick={() => handleOpenTrailer(movie)}
              className="h-full cursor-pointer"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                src={`${baseImageUrl}${movie.poster_path}`}
                alt={movie.title || movie.name || movie.original_name}
              />
            </figure>

            <button
              type="button"
              className="btn btn-soft btn-lg btn-primary btn-circle absolute bottom-2 right-2"
              onClick={(e) => {
                handleAdd(movie, e);
              }}
            >
              {/* from https://composeicons.com/icons/vscode-codicon/add */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 10.5v1.5H12v9H10.5v-9H1.5v-1.5h9V1.5h1.5v9h9z"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Row;
