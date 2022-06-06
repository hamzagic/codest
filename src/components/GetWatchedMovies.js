import React, { useContext } from 'react';
import MovieContext from '../store/movie-context';
import styles from './GetWatchedMovies.module.css';

const GetWatchedMovies = () => {
    const movieCtx = useContext(MovieContext);
    const movies = movieCtx.watchedMovies;
  
    const removeWatchedMovieHander = (movie) => {
      movieCtx.removeFromWatched({
        movie: movie
      });
    }

    return(
      movies.length > 0 && movies.map((movie, index) => 
        <div className={styles.container} key={index}>
          <div>
            <img src={movie.image} height="100px" alt={movie.title} />
          </div>
          <span>
            <a className="movie-watched" href="#" onClick={() => { removeWatchedMovieHander(movie) }}>
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
    ); 
  }

  export default GetWatchedMovies;