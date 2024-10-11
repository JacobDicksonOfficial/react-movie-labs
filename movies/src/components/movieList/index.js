import React from "react";
import Movie from "../movieCard";

const MovieList = (props) => {
  const movieCards = props.movies.map((m) => (
    <Movie key={m.id} movie={m} selectFavorite={props.selectFavorite} />
  ));

  return <div>{movieCards}</div>;
};

export default MovieList;
