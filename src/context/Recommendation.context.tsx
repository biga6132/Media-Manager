import React, { createContext, useContext, useState } from "react";

interface Movie {
  id?: number | string;
  title?: string;
  name?: string;
  original_name?: string;
  poster_path?: string;
  genre_ids?: number[];
}

interface RecContextValue {
  rec: Movie[];
  updateRec: (genreId: number) => Promise<void>;
}

const RecContext = createContext<RecContextValue | undefined>(undefined);

export const RecProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [rec, setRec] = useState<Movie[]>([]);

  const updateRec = async (genreId: number) => {
    const API_KEY = "b0877c00335eefad69945322ac506e9d";
    try {
      //two API calls one for movies and one for TV shows
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=en-US`
      );
      const movieData = await movieResponse.json();
      //TV Show api call
      const tvResponse = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${genreId}&language=en-US`
      );
      const tvData = await tvResponse.json();

      setRec([...movieData.results, ...tvData.results]);
    } catch (error) {
      console.log("Error updating recommendations: ", error);
    }
  };

  const value: RecContextValue = {
    rec,
    updateRec,
  };

  return <RecContext.Provider value={value}>{children}</RecContext.Provider>;
};

export const useRec = (): RecContextValue => {
  const context = useContext(RecContext);
  if (!context) {
    throw new Error("useRec must be used within a RecProvider");
  }
  return context;
};
