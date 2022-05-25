import React from 'react';
import { removeWatchedMovie, getWatchedMovies } from '../index';
import styles from './GetWatchedMovies.module.css';

const GetWatchedMovies = () => {
    const movies = getWatchedMovies();
    return(
      movies.map((movie, index) => 
        <div className={styles.container} key={index}>
          <div>
            <img src={movie.image} height="100px" alt={movie.title} />
          </div>
          <span>
            <a className="movie-watched" href="#" onClick={() => { removeWatchedMovie(movie.title) }}>
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