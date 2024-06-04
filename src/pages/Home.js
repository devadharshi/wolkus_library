import React, { useContext } from 'react';
import { MovieListContext } from '../context/MovieListContext';
import MovieList from '../components/Movie/MovieList';
import SearchMovies from '../components/Movie/SearchMovies';

const Home = () => {
    const { state } = useContext(MovieListContext);
    return (
        <div>
            <SearchMovies />
            {state.lists.map(list => (
                <MovieList key={list._id} list={list} />
            ))}
        </div>
    );
};

export default Home;
