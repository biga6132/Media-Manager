import React, { useEffect, useState } from "react";
import requests from "../requests";

const baseImageUrl = "https://image.tmdb.org/t/p/original";

const Banner = () => {
  // We'll fetch trending movies and pick 5 random movies for the carousel.
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const req = await fetch(
          "https://api.themoviedb.org/3" + requests.fetchTrending
        );
        const res = await req.json();
        // Shuffle the results and pick 5 random movies.
        const shuffled = res.results.sort(
          () => Math.random() - 0.5 - Math.random()
        );
        const selected = shuffled.slice(0, 5);
        setMovies(selected);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [requests.fetchTrending]);

  const handleOpenTrailer = (movie) => {
    window.open(
      `https://www.youtube.com/results?search_query=${movie.title || movie.name || movie.original_name} trailer`,
      "_blank"
    );
  };

  const handleAdd = async (movie) => {
    // do a POST request to the local db.json server
    try {
      const response = await fetch("http://localhost:3000/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure JSON data is sent correctly
        },
        body: JSON.stringify(movie), // Send only the movie data as JSON
      });
      if (response.ok) {
        console.log(
          "Movie added:",
          movie.title || movie.name || movie.original_name
        );
      } else {
        console.error("Failed to add movie. Status:", response.status);
      }
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  return (
    <div className="carousel w-full">
      {movies.map((movie, index) => {
        // Create slide IDs for navigation
        const slideId = `slide${index + 1}`;
        return (
          <div
            id={slideId}
            key={movie.id}
            className="carousel-item relative w-full"
          >
            <div
              className="w-full h-[450px] bg-cover bg-center object-contain relative"
              style={{
                backgroundImage: `url(${baseImageUrl}${movie.backdrop_path})`,
              }}
            >
              {/* Banner title, positioned as before */}
              <h1 className="absolute text-5xl font-extrabold pb-1 bottom-48 left-9">
                {movie.title || movie.name || movie.original_name}
              </h1>

              {/* Banner buttons container, positioned at bottom-left */}
              <div className="absolute bottom-[2.4rem] left-[2rem] flex gap-2 ">
                <button
                  type="button"
                  className="btn btn-soft btn-lg btn-primary btn-rounded cursor-pointer font-bold"
                  onClick={handleOpenTrailer}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 3.5v17l15-8.5-15-8.5z"
                    />
                  </svg>
                  Play
                </button>

                <button
                  type="button"
                  className="btn btn-soft btn-lg btn-primary btn-rounded cursor-pointer font-bold"
                  onClick={() => handleAdd(movie)}
                >
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
                  Add
                </button>
              </div>

              {/* Banner description, positioned as before */}
              <h1 className="absolute leading-1.3 pt-4 text-sm max-w-sm h-20 bottom-28 left-8">
                {movie.overview && movie.overview.length > 200
                  ? movie.overview.substr(0, 200) + "..."
                  : movie.overview}
              </h1>

              {/* Banner fade overlay at the bottom */}
              <div
                className="absolute w-full h-12 left-0 bottom-0"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, transparent, rgba(37, 37, 37, 0.61), #111)",
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Banner;
