import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const MovieListContext = createContext();

const movieListReducer = (state, action) => {
    switch (action.type) {
        case 'GET_LISTS':
            return { ...state, lists: action.payload };
        case 'ADD_LIST':
            return { ...state, lists: [action.payload, ...state.lists] };
        case 'DELETE_LIST':
            return { ...state, lists: state.lists.filter(list => list._id !== action.payload) };
        default:
            return state;
    }
};

const MovieListProvider = ({ children }) => {
    const initialState = {
        lists: [],
    };

    const [state, dispatch] = useReducer(movieListReducer, initialState);

    useEffect(() => {
        getLists();
    }, []);

    const getLists = async () => {
        try {
            const res = await axios.get('/api/movielists');
            dispatch({ type: 'GET_LISTS', payload: res.data });
        } catch (err) {
            console.error(err);
        }
    };

    const addList = async (list) => {
        try {
            const res = await axios.post('/api/movielists', list);
            dispatch({ type: 'ADD_LIST', payload: res.data });
        } catch (err) {
            console.error(err);
        }
    };

    const deleteList = async (id) => {
        try {
            await axios.delete(`/api/movielists/${id}`);
            dispatch({ type: 'DELETE_LIST', payload: id });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <MovieListContext.Provider value={{ state, addList, deleteList }}>
            {children}
        </MovieListContext.Provider>
    );
};

export { MovieListProvider, MovieListContext };
