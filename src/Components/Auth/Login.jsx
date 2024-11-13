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
                window.location.href = '/dashboard';
            });


        } catch {
            Swal.fire('Login Error', 'Invalid email or password.', 'error');
        }
    };

    return (
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 400, mx: 'auto', p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>Login</Typography>
            <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" />
            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Login</Button>
        </Box>
    );
}

export default Login;
