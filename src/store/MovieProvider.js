import React, { useReducer } from 'react';
import MovieContext from "./movie-context";

const getAllMovies = () => {
    let movies = localStorage.getItem('movies-all');

	if (!movies) {
        let movieData = [
		{
			title: 'The Avengers',
			image: 'http://d21lz9b0v8r1zn.cloudfront.net/wp-content/uploads//2012/03/detail.jpg',
			comment: 'New York blows up in this!'
		},
		{
			title: 'Dark City',
			image: 'https://i.chzbgr.com/full/5569379584/hA96709E0/',
			comment: 'This looks mysterious. Cool!'
		},
		{
			title: 'Hot Tub Time Machine',
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG7vNmphIcVhEcybvSvMgbTkV6EE2twHBNanKvgDx3ZS7Ivn6Dtg',
			comment: 'Someone said this was fun. Maybe!'
		},
		];
        localStorage.setItem('movies-all', JSON.stringify(movieData));
        return movieData;
	} else {
		return JSON.parse(movies);
	}
} 

const getWatchedMovies = () => {
    var movies = localStorage.getItem('movies-watched');
	if (!movies) {
		return [];
	} else {
		return JSON.parse(movies);
	}
}

const removeFromWatched = (movie, watchedMovies) => {
    let tempMovies = watchedMovies;
    for(let i = 0; i <tempMovies.length; i++) {
        if(tempMovies[i].title == movie.movie.title) {
            tempMovies.splice(tempMovies.indexOf(tempMovies[i]), 1);
        }
    } 

    if(tempMovies.length > 0) {
        localStorage.setItem('movies-watched', JSON.stringify(tempMovies)); 
        return tempMovies;
    } else {
        localStorage.removeItem('movies-watched');
        return [];
    }
}

const restoreToMovieList = (movie, movieList) => {
    let movies = movieList.concat(movie.movie);
    localStorage.setItem('movies-all', JSON.stringify(movies)); 
    return movies;
}

const removeFromMovieList = (movie, movieList) => {
    let tempMovies = movieList;
    if (tempMovies.length > 0) {
        for(let i = 0; i <tempMovies.length; i++) {
            if(tempMovies[i].title == movie.title) {
                tempMovies.splice(tempMovies.indexOf(tempMovies[i]), 1);
            }
        } 
    
        localStorage.setItem('movies-all', JSON.stringify(tempMovies)); 
        return tempMovies;        
    } else {
        localStorage.removeItem('movies-all');
        return [];
    }
}

const defaultMovieState = {
    movies: getAllMovies(),
    watchedMovies: getWatchedMovies()
};

const movieReducer = (state, action) => {
    let updatedMovieList;
    let updatedWatchedMovieList;
    switch (action.type) {
        case 'ADD-NEW':
            updatedMovieList = state.movies.concat(action.movie);
	        localStorage.setItem('movies-all', JSON.stringify(updatedMovieList));
            return {
                movies: getAllMovies(),
                watchedMovies: state.watchedMovies
            };
        case 'ADD-WATCHED':
            let isAlreadyWatched = false;
            const moviesList = state.watchedMovies;

	        moviesList.forEach(m => {
		        if (m.title === action.movie.title) isAlreadyWatched = true;
	        });
            if(!isAlreadyWatched) {
                updatedWatchedMovieList = state.watchedMovies.concat(action.movie);
                localStorage.setItem('movies-watched', JSON.stringify(updatedWatchedMovieList));
                updatedMovieList = removeFromMovieList(action.movie, state.movies)
                return {
                    movies: updatedMovieList,
                    watchedMovies: updatedWatchedMovieList
                };
            } else {
                return {
                    movies: state.movies,
                    watchedMovies: state.watchedMovies
                }
            }    
        case 'REMOVE-WATCHED':
            let watched = removeFromWatched(action.movie, state.watchedMovies);
            let movies = restoreToMovieList(action.movie, state.movies);
            return {
                movies: movies,
                watchedMovies: watched
            }
        default: 
            return defaultMovieState;
    }
};

const MovieProvider = props => {
    const [movieState, dispatchMovieAction] = useReducer(movieReducer, defaultMovieState);
    const addMovieHandler = movie => {
        dispatchMovieAction({type: 'ADD-NEW', movie: movie});
    };
    const addToWatchedHandler = movie => {
        dispatchMovieAction({type: 'ADD-WATCHED', movie: movie});
    };
    const removeFromWatchedHandler = movie => {
        dispatchMovieAction({type: 'REMOVE-WATCHED', movie: movie});
    };

    const movieContext = {
        movies: movieState.movies,
        watchedMovies: movieState.watchedMovies,
        addMovie: addMovieHandler,
        addToWatched: addToWatchedHandler,
        removeFromWatched: removeFromWatchedHandler,
    }
    return (
        <MovieContext.Provider value={movieContext}>
            {props.children}
        </MovieContext.Provider>
    );
}

export default MovieProvider;