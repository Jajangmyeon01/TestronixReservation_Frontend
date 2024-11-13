// Profile.jsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const Profile = ({ open, onClose, reservation }) => {
  if (!reservation) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Reservation Profile</DialogTitle>
      <DialogContent>
        <Typography variant="h6">
          {reservation.customer.first_name} {reservation.customer.last_name}
        </Typography>
        <Typography variant="body1">Venue: {reservation.customer.venue}</Typography>
        <Typography variant="body1">Reservation ID: {reservation.customer.reservation_id}</Typography>
        <Typography variant="body1">Status: {reservation.status === 'S' ? 'Success' : reservation.status === 'R' ? 'Reserved' : 'Cancelled'}</Typography>
        <Typography variant="body1">Rental Time: {new Date(`${reservation.customer.date}T${reservation.customer.time}`).toLocaleString()}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Profile;
