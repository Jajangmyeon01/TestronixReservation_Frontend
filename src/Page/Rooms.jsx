import React, { useState, useContext } from 'react';
import Sidebar from '../Page/Sidebar';
import {
    Box,
    Typography,
    Container,
    TextField,
    Button,
    Grid,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    CardActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import { RoomsContext } from './RoomsContext';

function Rooms() {
    const { rooms, addRoom, deleteRoom, updateRoom } = useContext(RoomsContext);
    const [newRoom, setNewRoom] = useState({
        venue: '',
        location: '',
        capacity: '',
        image: '',
        features: '',
    });
    const [editingRoomId, setEditingRoomId] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRoom((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddRoom = async () => {
        if (!newRoom.venue.trim()) {
            Swal.fire('Missing Data', 'Please fill out the venue name.', 'warning');
            return;
        }

        const isDuplicate = rooms.some(room => room.venue?.toLowerCase() === newRoom.venue.toLowerCase());
        if (isDuplicate) {
            Swal.fire('Duplicate Room', 'A room with this venue name already exists!', 'warning');
            return;
        }

        try {
            await addRoom(newRoom);
            setNewRoom({ venue: '', location: '', capacity: '', image: '', features: '' });
            Swal.fire('Room Added', 'The room has been successfully added.', 'success');
        } catch (error) {
            console.error("Error adding room:", error);
            Swal.fire('Error', 'Failed to add the room.', 'error');
        }
    };

    const handleDeleteRoom = (roomId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This room will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteRoom(roomId);
                    Swal.fire('Deleted!', 'The room has been deleted.', 'success');
                } catch (error) {
                    console.error("Error deleting room:", error);
                    Swal.fire('Error', 'Failed to delete the room.', 'error');
                }
            }
        });
    };

    const handleEditRoom = (room) => {
        setEditingRoomId(room.id);  // Set editingRoomId to the room's unique id
        setNewRoom({
            venue: room.venue,
            location: room.location,
            capacity: room.capacity,
            image: room.image,
            features: room.features,
        });
    };

    const handleUpdateRoom = async () => {
        if (!newRoom.venue.trim()) return;

        try {
            await updateRoom(editingRoomId, newRoom);
            setEditingRoomId(null);
            setNewRoom({ venue: '', location: '', capacity: '', image: '', features: '' });
            Swal.fire('Room Updated', 'The room has been successfully updated.', 'success');
        } catch (error) {
            console.error("Error updating room:", error);
            Swal.fire('Error', 'Failed to update the room.', 'error');
        }
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '55px' }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" gutterBottom>
                        Manage Rooms
                    </Typography>

                    {/* Add/Edit Room Form */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                        <TextField
                            label="Room Venue"
                            variant="outlined"
                            size="small"
                            name="venue"
                            value={newRoom.venue}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            label="Room Location"
                            variant="outlined"
                            size="small"
                            name="location"
                            value={newRoom.location}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            label="Room Capacity"
                            variant="outlined"
                            size="small"
                            name="capacity"
                            value={newRoom.capacity}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            label="Room Image URL"
                            variant="outlined"
                            size="small"
                            name="image"
                            value={newRoom.image}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            label="Room Features"
                            variant="outlined"
                            size="small"
                            name="features"
                            value={newRoom.features}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={editingRoomId ? handleUpdateRoom : handleAddRoom}
                        >
                            {editingRoomId ? 'Update Room' : 'Add Room'}
                        </Button>
                        {editingRoomId && (
                            <Button
                                variant="text"
                                color="error"
                                onClick={() => {
                                    setEditingRoomId(null);
                                    setNewRoom({ venue: '', location: '', capacity: '', image: '', features: '' });
                                }}
                            >
                                Cancel
                            </Button>
                        )}
                    </Box>

                    {/* Rooms Card List */}
                    <Grid container spacing={3}>
                        {rooms.length === 0 ? (
                            <Typography color="textSecondary">Please create a room to get started.</Typography>
                        ) : (
                            rooms.map((room) => (
                                <Grid item xs={12} sm={6} md={4} key={room.id}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={room.image || 'placeholder-image-url.jpg'}
                                            alt={room.venue}
                                        />
                                        <CardContent>
                                            <Typography variant="h6">{room.venue}</Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Location: {room.location}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Capacity: {room.capacity}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Features: {room.features}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <IconButton onClick={() => handleEditRoom(room)}>
                                                <EditIcon color="primary" />
                                            </IconButton>
                                            <IconButton onClick={() => handleDeleteRoom(room.id)}>
                                                <DeleteIcon color="secondary" />
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))
                        )}
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

export default Rooms;
