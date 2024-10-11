import React, { useState, useEffect } from "react";  // Import useState and useEffect
import { useParams } from 'react-router-dom';  // Import useParams to get the movie ID
import MovieHeader from "../components/headerMovie/";
import MovieDetails from "../components/movieDetails/";
import Grid from "@mui/material/Grid2";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const MoviePage = () => {  // Removed props as we are fetching data dynamically
  const { id } = useParams();  // Extract the movie ID from the URL
  const [movie, setMovie] = useState(null);  // State for movie details
  const [images, setImages] = useState([]);  // State for movie images

  // Fetch movie details when the component mounts or the ID changes
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((movie) => {
        // console.log(movie);  // For debugging
        setMovie(movie);  // Set the movie details in state
      });
  }, [id]);

  // Fetch movie images when the component mounts
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => json.posters)
      .then((images) => {
        // console.log(images);  // For debugging
        setImages(images);  // Set the images in state
      });
      // eslint-disable-next-line
  }, [id]);

  return (
    <>
      {movie ? (
        <>
          <MovieHeader movie={movie} />
          <Grid container spacing={5} style={{ padding: "15px" }}>
            <Grid item xs={3}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                }}
              >
                {/* Updated ImageList */}
                <ImageList
                  sx={{
                    height: "100vh",
                  }}
                  cols={1}
                >
                  {images.map((image) => (
                    <ImageListItem key={image.file_path} cols={1}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                        alt={image.file_path}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>
            </Grid>
            <Grid item xs={9}>
              <MovieDetails movie={movie} />
            </Grid>
          </Grid>
        </>
      ) : (
        <h2>Waiting for API data</h2>
      )}
    </>
  );
};

export default MoviePage;
