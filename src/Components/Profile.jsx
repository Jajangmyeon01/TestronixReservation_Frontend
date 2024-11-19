import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const convertTo24HourFormat = (time12h) => {
  const [time, period] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  hours = parseInt(hours, 10);

  if (period === 'PM' && hours < 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  return `${hours.toString().padStart(2, '0')}:${minutes}`;
};

const Profile = ({ open, onClose, reservation }) => {
  if (!reservation) return null;

  const formattedTime = convertTo24HourFormat(reservation.originalTime);
  const rentalDateTime = new Date(`${reservation.originalDate}T${formattedTime}`);

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
        <Typography variant="body1">
          Rental Time: {rentalDateTime.toLocaleString()}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Profile;
