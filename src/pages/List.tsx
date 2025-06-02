import React, { useState, useEffect } from "react";
import { useMyList } from "../context/List.context";

// Base URL for images (from TMDB)
const baseImageUrl = "https://image.tmdb.org/t/p/original";

const List = () => {
  const { myList, removeFromList } = useMyList();
  console.table(myList[0]);

  const handleOpenTrailer = (movie: any) => {
    window.open(
      `https://www.youtube.com/results?search_query=${
        movie.title || movie.name || movie.original_name
      } trailer`
    );
  };

  const handleRemove = (movie: any, e: React.MouseEvent<HTMLButtonElement>) => {
    // e.preventDefault();
    removeFromList(movie.id);
  };

  return (
    <div className="pt-12">
      {/* Page title */}
      <h1 className="text-center text-4xl font-bold mb-4">My List</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4 p-5 justify-items-center">
        {myList.map((movie) => (
          <div
            key={movie.id}
            className="card w-64 h-96 flex-shrink-0 bg-base-100 shadow-xl relative cursor-pointer"
          >
            {/* Clicking the figure opens the trailer */}
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
            {/* Remove button in the bottom-right corner */}
            <button
              type="button"
              className="btn btn-soft btn-lg btn-primary btn-circle absolute bottom-2 right-2"
              onClick={(e) => handleRemove(movie, e)}
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
                  d="M5 12h14"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
