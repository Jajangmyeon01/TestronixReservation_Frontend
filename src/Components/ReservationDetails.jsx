// ReservationDetails.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const ReservationDetails = ({ reservation, onClose }) => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <Box sx={{ p: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 2 }}>
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
                <strong>Rental Time:</strong> {reservation.customer.rental_time}
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
            {/* <Button variant="contained" color="primary" onClick={handlePrint} sx={{ mt: 2 }}>
                Print Details
            </Button> */}
            <Button variant="outlined" color="secondary" onClick={onClose} sx={{ mt: 2, ml: 1 }}>
                Close
            </Button>
        </Box>
    );
};

export default ReservationDetails;
