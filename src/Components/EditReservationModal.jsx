import React, { useState, useEffect, useContext } from 'react';
import { RoomsContext } from '../Page/RoomsContext';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Select,
    MenuItem,
    Button
} from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';
import Swal from 'sweetalert2';

function EditReservationModal({ open, onClose, reservationData, onRefresh }) {
    const { rooms } = useContext(RoomsContext);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        date: '',
        time: '',
        venue: rooms.length > 0 ? rooms[0].rooms : '',
        notes: '',
    });
    const [status, setStatus] = useState('R');

    useEffect(() => {
        // console.log("Reservation data received:", reservationData); // Debugging line
        if (reservationData && reservationData.customer) {
            setFormData({
                first_name: reservationData.customer.first_name || '',
                last_name: reservationData.customer.last_name || '',
                email: reservationData.customer.email || '',
                date: reservationData.customer.date || '',
                time: reservationData.customer.time || '',
                venue: reservationData.customer.venue || (rooms.length > 0 ? rooms[0].rooms : ''),
                notes: reservationData.customer.notes || '',
            });
            setStatus(reservationData.status || 'R');
        }
    }, [reservationData, rooms]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = { ...formData, status };
        // console.log("Sending updated data:", updatedData); // Debugging
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/dashboard/${reservationData.id}`,
                updatedData
            );
            // console.log("Response from API:", response.data); 
            Swal.fire('Reservation Updated!', 'Your reservation has been successfully updated.', 'success');
            onClose();

            // Trigger the refresh callback to reload the data
            if (onRefresh) {
                onRefresh();
            }
        } catch (error) {
            console.error('Error updating reservation:', error);
            Swal.fire('Error Updating Reservation!', error.response?.data?.message || 'An error occurred.', 'error');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <DialogTitle>Edit Reservation</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="first_name"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="last_name"
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="date"
                        label="Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        variant="standard"
                        value={formData.date}
                        onChange={handleChange}
                    />
                    <TextField
                        select
                        margin="dense"
                        name="time"
                        label="Select Hour"
                        fullWidth
                        variant="standard"
                        value={formData.time}
                        onChange={handleChange}
                    >
                        {[...Array(8)].map((_, index) => {
                            const hour = 9 + index;
                            const isNoon = hour === 12;
                            const label = isNoon ? "12 PM" : (hour < 12 ? `${hour} AM` : `${hour - 12} PM`);
                            return (
                                <MenuItem key={hour} value={`${hour}:00`}>
                                    {label}
                                </MenuItem>
                            );
                        })}
                    </TextField>
                    <TextField
                        select
                        margin="dense"
                        name="venue"
                        label="Venue"
                        fullWidth
                        variant="standard"
                        value={formData.venue}
                        onChange={handleChange}
                    >
                        {rooms.length === 0 ? (
                            <MenuItem disabled value="">
                                Please create a room
                            </MenuItem>
                        ) : (
                            rooms.map((room, index) => (
                                <MenuItem key={index} value={room.rooms}>
                                    {room.rooms}
                                </MenuItem>
                            ))
                        )}
                    </TextField>
                    <TextField
                        margin="dense"
                        name="notes"
                        label="Notes"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.notes}
                        onChange={handleChange}
                    />
                    <Select
                        fullWidth
                        margin="dense"
                        value={status}
                        onChange={handleStatusChange}
                    >
                        <MenuItem value="S">Success</MenuItem>
                        <MenuItem value="R">Reserve</MenuItem>
                        <MenuItem value="C">Cancel</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        Update Reservation
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

EditReservationModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    reservationData: PropTypes.object.isRequired,
    onRefresh: PropTypes.func.isRequired,
};

export default EditReservationModal;
