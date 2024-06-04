import React, { useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const SearchMovies = () => {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');

    const searchMovies = async (e) => {
        e.preventDefault();
        const res = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=your_api_key`);
        setMovies(res.data.Search);
    };

    return (
        <div>
            <form onSubmit={searchMovies}>
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
                <button type="submit">Search</button>
            </form>
            <div className="movie-list">
                {movies.map(movie => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default SearchMovies;
