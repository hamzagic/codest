import React from 'react';
import './App.css';

import { addWatchedMovie, add, removeWatchedMovie, getWatchedMovies, getAllMovies } from './index.js';

// You can create separate components for each part of the
// application to make the code reusable and better maintainable
// Style the application by importing css files to each component
const getMoviesComponents = (movies) => {
  var components = [];

  // you can make use of array.map to render this list
  // so that you don't need to create a new variable (components)
  // to render the list
  movies.forEach(function(movie) {
    components.push(
      <div className="all">
        <div>
          <img src={movie.image} height="100px" />
        </div>
        <span>
           {/* You could use arrow function here as well */}
          <a className="movie-watched" href="#" onClick={function() { addWatchedMovie(movie.title, movie.comment, movie.image) }}>
            {movie.title}
          </a>
        </span>
        <br />
        <span>
          {movie.comment}
        </span>
        <br />
        <br />
      </div>
    )
  })

  return components;
}

// You can create a separate component to handle the watched movies list
// Make use of arrow functions to keep a code pattern
function getWatchedMoviesComponents(movies) {
  var components = [];
  // you can make use of array.map to render this list
  // so that you don't need to create a new variable (components)
  // to render the list
  movies.forEach(function(movie) {
    components.push(movie && (
      <div className="watched">
        <div>
          <img src={movie.image} height="100px" />
        </div>
        <span>
          {/* Make use of arrow function here as well */}
          <a className="movie-watched" href="#" onClick={function() { removeWatchedMovie(movie.title) }}>
            {movie.title}
          </a>
        </span>
        <br />
        <span>
          {movie.comment}
        </span>
        <br />
        <br />
      </div>
    ))
  })

  return components;
}

function App(props) {
  return (
    <div className="App">
      <h1>Codest Movies!</h1>
      <h1>Add movie!</h1>
      {/* Make use of useState hook to better handle variable values. 
      You can also create handler functions to add some validation (e.g.)
      empty fields */}
      <b>TITLE:<br /><input type="text" onChange={function(e) { title = e.target.value; }} /></b><br />
      <b>IMAGE URL:<br /><input type="text" onChange={function(e) { image = e.target.value; }} /></b><br />
      <b>COMMENT:<br /><input type="text" onChange={function(e) { comment = e.target.value; }} /></b><br />
      {/* make sure to follow the arguments order in the add function
      otherwise the data will not be saved correctly (comment is the second
      argument, image is the third).
      */}
      <input type="button" onClick={function(e) { add(title, image, comment); }} value="ADD MOVIE" />

      <h1>Watchlist:</h1>
      {getMoviesComponents(getAllMovies())}

      <h1>Already watched:</h1>
      {getWatchedMoviesComponents(getWatchedMovies())}
    </div>
  );
}

var title = '';
var image = '';
var comment = '';

export default App;
