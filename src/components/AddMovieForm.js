import React, { useState, useContext } from 'react';
import MovieContext from '../store/movie-context';

import styles from './AddMovieForm.module.css';

const AddMovieForm = () => {
  const movieCtx = useContext(MovieContext);

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [comment, setComment] = useState('');

  const addMovieHandler = (title, comment, image) => {
    if(title.trim().length === 0 || comment.trim().length === 0 || image.trim().length === 0) {
        return;
    }
    movieCtx.addMovie({
        title: title,
        image: image,
        comment: comment
    });

    setTitle('');
    setImage('');
    setComment('');
  };

  return (
    <div className={styles.container}>
      <h1>Codest Movies!</h1>
      <div className={styles.card}>
        <h2>Add Movie</h2>
        <div className={styles.inputs}>
          <p>TITLE:</p>
          <input
            type='text'
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
        </div>
        <div className={styles.inputs}>
          <p>IMAGE URL:</p>
          <input
            type='text'
            onChange={(e) => {
              setImage(e.target.value);
            }}
            value={image}
          />
        </div>
        <div className={styles.inputs}>
          <p>COMMENT:</p>
          <input
            type='text'
            onChange={(e) => {
              setComment(e.target.value);
            }}
            value={comment}
          />
        </div>
        <div className={styles.submit}>
          <input
            type='button'
            onClick={() => {
              addMovieHandler(title, comment, image);
            }}
            value='ADD'
          />
        </div>
      </div>
    </div>
  );
};

export default AddMovieForm;
