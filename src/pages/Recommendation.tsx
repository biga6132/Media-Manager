import React, { useEffect } from "react";
import { useRec } from "../context/Recommendation.context";
import { useMyList } from "../context/List.context";
import { Movie } from "../context/List.context";

const baseImageUrl = "https://image.tmdb.org/t/p/original";

//List of genres
const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

const getMostFrequentGenre = (movies: Movie[]): number => {
  // stores each genre id found in MyList and the number of times it appears
  const genreFrequency: { [key: number]: number } = {};
  movies.forEach((movie) => {
    // if genre_ids exists and length > 0
    if (movie.genre_ids && movie.genre_ids.length) {
      // itertate through each genreID
      movie.genre_ids.forEach((genre: number) => {
        // increase count for genre or set to 1 if doesn't exist yet
        genreFrequency[genre] = (genreFrequency[genre] || 0) + 1;
      });
    }
  });
  // default recommendation is action in maxfrequent
  let mostFrequent = 28;
  // holds maxCount from genres
  let maxCount = 0;
  // iterate over Object that holds genres with frequency
  Object.keys(genreFrequency).forEach((genreIdStr) => {
    const genreId = parseInt(genreIdStr, 10);
    // to see if current genre count is higher than previous maxCount
    if (genreFrequency[genreId] > maxCount) {
      // update maxCount if it is
      maxCount = genreFrequency[genreId];
      mostFrequent = genreId;
    }
  });
  return mostFrequent;
};

const Recommendation = () => {
  //Using global recs state
  const { rec, updateRec } = useRec();
  //Using global state of myList
  const { myList, addToList } = useMyList();

  //Find the most frequent genre
  const genreId = myList.length > 0 ? getMostFrequentGenre(myList) : 28;

  useEffect(() => {
    updateRec(genreId);
  }, [genreId, updateRec]);

  const handleOpenTrailer = (movie: Movie) => {
    window.open(
      `https://www.youtube.com/results?search_query=${movie.title || movie.name || movie.original_name} trailer`,
      "_blank"
    );
  };

  // Function to add a recommended movie to your list
  const handleAdd = async (
    movie: Movie,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    await addToList(movie);
  };

  return (
    // Similar code to Row.tsx
    <div className="pt-12">
      {/* Page Title */}
      <h1 className="text-center text-4xl font-bold mb-4">Recommendations</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4 p-5 justify-items-center">
        {rec.map((movie) => (
          // Each recommended movie is rendered in a card layout like in Row.tsx.
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
              onClick={(e) => handleAdd(movie, e)}
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
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendation;
