import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MovieProvider from './store/MovieProvider';

ReactDOM.render(
	<MovieProvider>
		<App />
	</MovieProvider>,
	document.getElementById('root')
);
