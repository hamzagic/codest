import React from 'react';
import './App.css';
import GetMovies from './components/GetMovies';
import GetWatchedMovies from './components/GetWatchedMovies';
import AddMovieForm from './components/AddMovieForm';

function App(props) {
  return (
    <div className="App">
     <AddMovieForm />

      <h1>Watchlist:</h1>
      <GetMovies onClick={props.addMovieHandler} />

      <h1>Already watched:</h1>
      <GetWatchedMovies />
    </div>
  );
}

export default App;
