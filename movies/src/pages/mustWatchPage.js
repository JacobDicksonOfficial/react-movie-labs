import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";

const MustWatchPage = () => {
  const { mustWatch } = useContext(MoviesContext); // Access mustWatch list

  return (
    <PageTemplate
      title="Must Watch Movies"
      movies={mustWatch} // Use full movie objects
      action={(movie) => <></>} // No action for now
    />
  );
};

export default MustWatchPage;

