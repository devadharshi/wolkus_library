import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const MovieCard = ({ movie }) => {
    const [details, setDetails] = useState({});
    const { imdbID } = movie;

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const res = await axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=your_api_key`);
            setDetails(res.data);
        };
        fetchMovieDetails();
    }, [imdbID]);

    return (
        <div className="movie-card">
            <img src={details.Poster} alt={`${details.Title} poster`} className="movie-poster" />
            <div className="movie-info">
                <h2 className="movie-title">{details.Title} ({details.Year})</h2>
                <p className="movie-description">{details.Plot}</p>
            </div>
        </div>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        imdbID: PropTypes.string.isRequired,
    }).isRequired,
};

export default MovieCard;

