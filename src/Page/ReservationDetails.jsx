import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import '../printMedia.css';

const ReservationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map status codes to descriptive labels
  const statusLabels = {
    R: 'Reserved',
    S: 'Success',
    C: 'Cancelled',
  };

  const getReservationById = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api-tronix-reserve.supsofttech.tmc-innovations.com/api/dashboard/${id}`);
      setReservation(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch reservation details. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    getReservationById();
    document.title = 'Printed Reservation Details';
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleClose = () => {
    navigate('/reservations');
  };

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
    <Box
      sx={{
        p: 3,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 2,
        maxWidth: 600,
        mx: 'auto',
        mt: 4,
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <img
          src="/assets/original-logo.png"
          alt="Company Logo"
          style={{ width: '150px', height: 'auto' }}
        />
      </Box>
      <Typography variant="h5" gutterBottom textAlign="center" color="primary">
        Reservation Details
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" gutterBottom>
          <strong>Reservation ID:</strong> {reservation.customer.reservation_id}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Name:</strong> {reservation.customer.first_name} {reservation.customer.last_name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Email:</strong> {reservation.customer.email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Rental Time:</strong> {reservation.customer.date} {reservation.customer.time}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Venue:</strong> {reservation.customer.venue}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Status:</strong> {statusLabels[reservation.status] || 'Unknown Status'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Created At:</strong> {reservation.customer.created_at}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Updated At:</strong> {reservation.customer.updated_at}
        </Typography>
      </Box>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
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
