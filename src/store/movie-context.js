import React from 'react';

const MovieContext = React.createContext({
    movies: [],
    watchedMovies: [],
    addMovie: (movie) => {},
    addToWatched: (movie) => {},
    removeFromWatched: (movie) => {},
});

export default MovieContext;