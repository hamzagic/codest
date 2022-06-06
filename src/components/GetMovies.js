import React, { useContext } from 'react';
import MovieContext from '../store/movie-context';
import styles from './GetMovies.module.css';

const GetMovies = () => {
    const movieCtx = useContext(MovieContext);
    const movies = movieCtx.movies;
  
    const addMovieToWatchedHandler = (title, comment, image) => {
      movieCtx.addToWatched({
        title: title,
        image: image,
        comment: comment
      });
    }

    return (
      movies.map((movie, index) => 
      <div className={styles.container} key={index}>
          <div>
            <img src={movie.image} height="100px" alt={movie.title} />
          </div>
          <span>
            <a className={styles.watched} href="#" onClick={() => { addMovieToWatchedHandler(movie.title, movie.comment, movie.image) }}>
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