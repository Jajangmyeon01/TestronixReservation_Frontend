import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import '../printMedia.css';


const ReservationDetails = () => {
  const { id } = useParams(); // Get the reservation ID from the URL
  const navigate = useNavigate(); // For handling "Close" button navigation
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reservation details by ID
  const getReservationById = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/dashboard/${id}`);
      setReservation(response.data.data); // Assuming the reservation details are under "data"
      setLoading(false);
    } catch (err) {
        console.error(err)
      setError('Failed to fetch reservation details. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    getReservationById();
    document.title = 'Print Reservation Details';
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleClose = () => {
    navigate('/reservations'); // Navigate back to the reservations list
  };

  // Render loading spinner, error message, or reservation details
  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!reservation) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="error">
          No reservation found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 2, maxWidth: 600, mx: 'auto' }}>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        {/* Add your logo here */}
        <Typography variant="h4" gutterBottom>
          Company Logo
        </Typography>
      </Box>
      <Typography variant="h5" gutterBottom>
        Reservation Details
      </Typography>
      <Typography variant="body1">
        <strong>Reservation ID:</strong> {reservation.customer.reservation_id}
      </Typography>
      <Typography variant="body1">
        <strong>Name:</strong> {reservation.customer.first_name} {reservation.customer.last_name}
      </Typography>
      <Typography variant="body1">
        <strong>Email:</strong> {reservation.customer.email}
      </Typography>
      <Typography variant="body1">
        <strong>Rental Time:</strong> {reservation.customer.date} {reservation.customer.time}
      </Typography>
      <Typography variant="body1">
        <strong>Venue:</strong> {reservation.customer.venue}
      </Typography>
      <Typography variant="body1">
        <strong>Status:</strong> {reservation.status}
      </Typography>
      <Typography variant="body1">
        <strong>Created At:</strong> {reservation.customer.created_at}
      </Typography>
      <Typography variant="body1">
        <strong>Updated At:</strong> {reservation.customer.updated_at}
      </Typography>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" onClick={handlePrint}>
          Print Details
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default ReservationDetails;
