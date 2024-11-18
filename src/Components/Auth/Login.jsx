// Login.js
import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { AuthContext } from './AuthContext';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
                email,
                password,
            });


            const { access_token } = response.data;
            localStorage.setItem('access_token', access_token);


            Swal.fire('Login Successful', 'You are now logged in!', 'success').then(() => {
                // Redirect to home page
                window.location.href = '/';
            });


        } catch {
            Swal.fire('Login Error', 'Invalid email or password.', 'error');
        }
    };

    return (
        <Box
        sx={{
            position: 'relative',
            minHeight: '100vh',
            minWidth: '100vw',
            overflow: 'auto', // Allow scrolling if necessary
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f2f5',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'url("https://source.unsplash.com/random/1920x1080")', // Replace with your image URL
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(5px) brightness(0.6)',
                zIndex: -1,
            },
        }}
    >
        <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
                zIndex: 1,
                p: 4,
                width: '90%',
                maxWidth: 400,
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: 6,
                borderRadius: 3,
                textAlign: 'center',
            }}
        >
            <Typography variant="h4" sx={{ color: '#00389e', mb: 3, fontWeight: 'bold' }}>
                Welcome to TronixBook
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', mb: 3 }}>
                Please sign in to continue
            </Typography>
            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                sx={{
                    bgcolor: '#f4f6f8',
                    borderRadius: 2,
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#cfd8dc' },
                        '&:hover fieldset': { borderColor: '#1976d2' },
                        '&.Mui-focused fieldset': { borderColor: '#1976d2' },
                    },
                }}
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                sx={{
                    bgcolor: '#f4f6f8',
                    borderRadius: 2,
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#cfd8dc' },
                        '&:hover fieldset': { borderColor: '#1976d2' },
                        '&.Mui-focused fieldset': { borderColor: '#1976d2' },
                    },
                }}
            />
            <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                    mt: 3,
                    py: 1.5,
                    borderRadius: 3,
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    bgcolor: '#00389e',
                }}
            >
                Sign In
            </Button>
            {/* <Typography variant="body2" sx={{ color: '#666', mt: 3 }}>
                Don’t have an account? <a href="#" style={{ color: '#1976d2' }}>Sign up</a>
            </Typography> */}
        </Box>
    </Box>
    
    
    );
}

export default Login;
