import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'USER_LOADED':
            return { ...state, isAuthenticated: true, user: action.payload };
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return { ...state, isAuthenticated: true, token: action.payload.token };
        case 'AUTH_ERROR':
        case 'LOGOUT':
            localStorage.removeItem('token');
            return { ...state, isAuthenticated: false, user: null, token: null };
        default:
            return state;
    }
};

const AuthProvider = ({ children }) => {
    const initialState = {
        isAuthenticated: null,
        user: null,
        token: localStorage.getItem('token'),
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        if (state.token) {
            loadUser();
        }
    }, [state.token]);

    const loadUser = async () => {
        try {
            const res = await axios.get('/api/auth', { headers: { 'x-auth-token': state.token } });
            dispatch({ type: 'USER_LOADED', payload: res.data });
        } catch (err) {
            dispatch({ type: 'AUTH_ERROR' });
        }
    };

    const register = async (formData) => {
        try {
            const res = await axios.post('/api/auth/register', formData);
            dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
        } catch (err) {
            dispatch({ type: 'AUTH_ERROR' });
        }
    };

    const login = async (formData) => {
        try {
            const res = await axios.post('/api/auth/login', formData);
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
        } catch (err) {
            dispatch({ type: 'AUTH_ERROR' });
        }
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider value={{ state, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
