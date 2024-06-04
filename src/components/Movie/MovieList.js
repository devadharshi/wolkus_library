import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ list }) => {
    return (
        <div className="movie-list">
            <h2>{list.name}</h2>
            {list.movies.map(movieId => (
                <MovieCard key={movieId} movie={{ imdbID: movieId }} />
            ))}
        </div>
    );
};

export default MovieList;
