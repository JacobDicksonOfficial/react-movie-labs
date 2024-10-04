import React, { useState, useEffect } from "react";  // Import useState and useEffect as instructed
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg';

const formControl = {
  margin: 1,
  minWidth: 220,
  backgroundColor: "rgb(255, 255, 255)"
};

export default function FilterMoviesCard(props) {
  // Replace the genres array with this state:
  const [genres, setGenres] = useState([{ id: '0', name: "All" }]);

  // Add the useEffect hook to fetch genres from the TMDB API
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
      .then(res => res.json())
      .then(json => {
        // console.log(json.genres);
        return json.genres;
      })
      .then(apiGenres => {
        setGenres([genres[0], ...apiGenres]);  // Update the genres with 'All' + fetched genres
      });
      // eslint-disable-next-line
  }, []);

  // Event handlers as instructed
  const handleChange = (e, type, value) => {
    e.preventDefault();
    // Completed later
  };

  const handleTextChange = e => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = e => {
    handleChange(e, "genre", e.target.value);
  };

  return (
    <Card 
      sx={{
        backgroundColor: "rgb(204, 204, 0)"
      }} 
      variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>
        
        {/* Replace the TextField with the updated version */}
        <TextField
          sx={{...formControl}}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}  // Updated to use props.titleFilter
          onChange={handleTextChange}  // Use the handleTextChange event handler
        />

        {/* Replace the Select component with the updated version */}
        <FormControl sx={{...formControl}}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            defaultValue=""  // Updated to default value
            value={props.genreFilter}  // Updated to use props.genreFilter
            onChange={handleGenreChange}  // Use the handleGenreChange event handler
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>
      
      <CardMedia
        sx={{ height: 300 }}
        image={img}
        title="Filter"
      />

      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}
