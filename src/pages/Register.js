import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Register = ({ history }) => {
    const { register } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        await register(formData); // Assuming you have a register function
        history.push('/');
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>Register</h2>
            <input type="email" name="email" value={formData.email} onChange={onChange} required />
            <input type="password" name="password" value={formData.password} onChange={onChange} required />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
