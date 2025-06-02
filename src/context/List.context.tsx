import React, { createContext, useContext, useEffect, useState } from "react";

export interface Movie {
  id?: number | string;
  title?: string;
  name?: string;
  original_name?: string;
  poster_path?: string;
  genre_ids?: number[];
}

interface ListContextValue {
  myList: Movie[];
  addToList: (movie: Movie) => Promise<void>;
  removeFromList: (id: number | string) => void;
}

const ListContext = createContext<ListContextValue | undefined>(undefined);

export const MyListProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [myList, setList] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchList() {
      try {
        const response = await fetch("http://localhost:3000/list");
        const data = await response.json();
        setList(data);
        console.log("Intial List fetched: ", data);
      } catch (error) {
        console.log("Error fetching initial list: ", error);
      }
    }
    fetchList();
  }, []);

  const addToList = async (movie: Movie) => {
    try {
      const response = await fetch("http://localhost:3000/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure JSON data is sent correctly
        },
        body: JSON.stringify(movie),
      });
      if (response.ok) {
        setList((prevList) => [...prevList, movie]);
        console.log(
          "Added movie: ",
          movie.title || movie.name || movie.original_name
        );
      } else {
        console.log(
          "Couldn't add movie: ",
          movie.title || movie.name || movie.original_name
        );
      }
    } catch (error) {
      console.log("Error adding movie: ", error);
    }
  };

  const removeFromList = async (id: number | string) => {
    try {
      // Send a DELETE request to the JSON server for the specific movie
      const response = await fetch(`http://localhost:3000/list/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // If deletion was successful, update the state by filtering out the movie
        console.log("Movie removed successfully");
      } else {
        console.error("Failed to remove movie. Status:", response.status);
      }
    } catch (error) {
      console.error("Error removing movie:", error);
    }
    setList((prevList) => prevList.filter((movie) => movie.id !== id));
  };

  // const removeFromList = (id: number) => {
  //   setList((prevList) => prevList.filter((movie) => movie.id !== id));
  // };

  const value: ListContextValue = {
    myList,
    addToList,
    removeFromList,
  };

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

export const useMyList = (): ListContextValue => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("useMyList must be used within a MyListProvider");
  }
  return context;
};
