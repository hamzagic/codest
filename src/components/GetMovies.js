import React from 'react';
import { addWatchedMovie, getAllMovies } from '../index';
import styles from './GetMovies.module.css';

const GetMovies = () => {
    const movies = getAllMovies();
    const addMovieHandler = (title, comment, image) => {
      addWatchedMovie(title, comment, image)
    }

    return (
      movies.map((movie, index) => 
      <div className={styles.container} key={index}>
          <div>
            <img src={movie.image} height="100px" alt={movie.title} />
          </div>
          <span>
            <a className={styles.watched} href="#" onClick={() => { addMovieHandler(movie.title, movie.comment, movie.image) }}>
              {movie.title}
            </a>
          </span>
          <br />
          <span>
            {movie.comment}
          </span>
          <br />
          <br />
        </div>)
    );
  }

  export default GetMovies;