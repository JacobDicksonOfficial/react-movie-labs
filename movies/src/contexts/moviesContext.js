import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [mustWatch, setMustWatch] = useState([]); // New state for "Must Watch"
  const [myReviews, setMyReviews] = useState({}); // State for storing reviews

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)) {
      newFavorites = [...favorites, movie.id];
    } else {
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites);
  };

  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter((mId) => mId !== movie.id));
  };

  const addToMustWatch = (movie) => {
    if (!mustWatch.find((m) => m.id === movie.id)) { // Check by movie ID
      const newMustWatch = [...mustWatch, movie]; // Store the entire movie object
      setMustWatch(newMustWatch);
      console.log("Updated Must Watch List:", newMustWatch); // Debug log
    }
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        mustWatch, // Expose mustWatch state
        addToFavorites,
        removeFromFavorites,
        addToMustWatch, // Expose addToMustWatch function
        addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
