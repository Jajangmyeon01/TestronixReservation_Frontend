// RoomsContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

// Create the RoomsContext
export const RoomsContext = createContext();

// RoomsProvider Component
export const RoomsProvider = ({ children }) => {
    const [rooms, setRooms] = useState([]);

    // Fetch rooms on component mount
    useEffect(() => {
        fetchRooms();
    }, []);

    // Function to fetch rooms from the backend
    const fetchRooms = async () => {
        try {
            const response = await axios.get('https://api-tronix-reserve.supsofttech.tmc-innovations.com/api/room');
            // console.log("API Response:", response.data); // Debugging
    
            // Ensure the response has the expected structure
            if (response.data && response.data.data) {
                // Map the rooms data
                let formattedRooms = response.data.data.map(room => ({
                    id: room.id,
                    venue: room['room-venue'],
                    location: room['room-location'],
                    capacity: room['room-capacity'],
                    image: room['room-image'],
                    features: room['room-features'],
                }));
    
                // Remove duplicates by room ID
                const uniqueRooms = formattedRooms.filter(
                    (room, index, self) =>
                        index === self.findIndex((r) => r.id === room.id)
                );
    
                setRooms(uniqueRooms);
                // console.log("Fetched unique rooms:", uniqueRooms); // Debugging
            } else {
                throw new Error('Unexpected API response structure');
            }
        } catch (error) {
            console.error("Error fetching rooms:", error);
            Swal.fire('Error', 'Failed to load rooms.', 'error');
        }
    };
    // Function to add a new room
    const addRoom = async (newRoom) => {
        const formattedRoomData = {
            'room-venue': newRoom.venue,
            'room-location': newRoom.location,
            'room-capacity': newRoom.capacity,
            'room-image': newRoom.image,
            'room-features': newRoom.features,
        };

        try {
            const response = await axios.post(
                'https://api-tronix-reserve.supsofttech.tmc-innovations.com/api/addRoom',
                formattedRoomData,
                { headers: { 'Content-Type': 'application/json' } }
            );

            // console.log("Add Room API Response:", response.data); // Debugging

            if (response.data?.data) {
                const addedRoom = {
                    id: response.data.data.id || Math.random().toString(36).substr(2, 9),
                    venue: response.data.data['room-venue'],
                    location: response.data.data['room-location'],
                    capacity: response.data.data['room-capacity'],
                    image: response.data.data['room-image'],
                    features: response.data.data['room-features'],
                };
                setRooms((prevRooms) => [...prevRooms, addedRoom]);
                Swal.fire('Success', 'Room added successfully!', 'success');
            } else {
                throw new Error('Unexpected API response structure');
            }
        } catch (error) {
            console.error("Error adding room:", error);
            const errorMessage = error.response?.data?.message || 
                                 error.message || 
                                 'Failed to add the room. Please try again.';
            Swal.fire('Error', errorMessage, 'error');
        }
    };

    // Function to delete a room
    const deleteRoom = async (roomId) => {
        try {
            await axios.delete(`https://api-tronix-reserve.supsofttech.tmc-innovations.com/api/deleteRoom/${roomId}`);
            setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));
            Swal.fire('Deleted!', 'The room has been deleted.', 'success');
        } catch (error) {
            console.error("Error deleting room:", error);
            Swal.fire('Error', 'Failed to delete the room. Please try again.', 'error');
        }
    };

    // Function to update a room
        const updateRoom = async (roomId, updatedRoom) => {
            const formattedRoomData = {
                'room-venue': updatedRoom.venue,
                'room-location': updatedRoom.location,
                'room-capacity': updatedRoom.capacity,
                'room-image': updatedRoom.image,
                'room-features': updatedRoom.features,
            };
        
            try {
                const response = await axios.put(
                    `https://api-tronix-reserve.supsofttech.tmc-innovations.com/api/updateRoom/${roomId}`,
                    formattedRoomData,
                    { headers: { 'Content-Type': 'application/json' } }
                );
        
                console.log("Response data after update:", response.data); // Updated API log
        
                let updatedRoomData;
        
                // Check if the response contains valid data
                if (response.data && response.data.data && response.data.data.length > 0) {
                    const roomData = response.data.data[0]; // Assuming `data` is an array with room details
                    updatedRoomData = {
                        id: roomId,
                        venue: roomData['room-venue'],
                        location: roomData['room-location'],
                        capacity: roomData['room-capacity'],
                        image: roomData['room-image'],
                        features: roomData['room-features'],
                    };
                } else {
                    // Fallback if data is missing or structure is unexpected
                    console.warn("Response contained no valid room data, using provided updatedRoom:");
                    updatedRoomData = { id: roomId, ...updatedRoom };
                }
        
                setRooms((prevRooms) =>
                    prevRooms.map((room) => (room.id === roomId ? updatedRoomData : room))
                );
        
                Swal.fire('Updated!', 'The room has been updated.', 'success');
            } catch (error) {
                console.error("Error updating room:", error);
                Swal.fire('Error', 'Failed to update the room. Please try again.', 'error');
            }
        };
        

    

    return (
        <RoomsContext.Provider value={{ rooms, addRoom, deleteRoom, updateRoom }}>
            {children}
        </RoomsContext.Provider>
    );
};
