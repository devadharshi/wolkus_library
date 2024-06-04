import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { state, logout } = useContext(AuthContext);

    return (
        <nav>
            <h1>Movie Library</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                {state.isAuthenticated ? (
                    <>
                        <li><Link to="#" onClick={logout}>Logout</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
