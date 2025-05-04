import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('Name, email, and password are required');
        }
        try {
            const response = await fetch(`http://localhost:5500/auth/signup`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => navigate('/login'), 1000);
            } else if (error) {
                handleError(error?.details[0]?.message);
            } else {
                handleError(message);
            }
        } catch (err) {
            handleError(err.message);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#fff'
        }}>
            <div style={{
                width: '300px',
                padding: '30px',
                borderRadius: '8px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                backgroundColor: '#fff',
                textAlign: 'left'
            }}>
                <h1 style={{
                    fontSize: '24px',
                    marginBottom: '20px',
                    fontWeight: 'bold'
                }}>Signup</h1>
                <form onSubmit={handleSignup}>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor='name' style={{ display: 'block', fontSize: '14px' }}>Name</label>
                        <input
                            onChange={handleChange}
                            type='text'
                            name='name'
                            placeholder='Enter your name...'
                            value={signupInfo.name}
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: 'none',
                                borderBottom: '1px solid #000',
                                outline: 'none',
                                fontSize: '14px'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor='email' style={{ display: 'block', fontSize: '14px' }}>Email</label>
                        <input
                            onChange={handleChange}
                            type='email'
                            name='email'
                            placeholder='Enter your email...'
                            value={signupInfo.email}
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: 'none',
                                borderBottom: '1px solid #000',
                                outline: 'none',
                                fontSize: '14px'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor='password' style={{ display: 'block', fontSize: '14px' }}>Password</label>
                        <input
                            onChange={handleChange}
                            type='password'
                            name='password'
                            placeholder='Enter your password...'
                            value={signupInfo.password}
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: 'none',
                                borderBottom: '1px solid #000',
                                outline: 'none',
                                fontSize: '14px'
                            }}
                        />
                    </div>
                    <button type='submit' style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#800080',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}>Signup</button>
                    <div style={{ marginTop: '15px', fontSize: '13px' }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: '#800080', textDecoration: 'none' }}>Login</Link>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Signup;
