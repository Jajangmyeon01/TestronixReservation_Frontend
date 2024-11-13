// import React, { useState } from 'react';
// import {
//     Button,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     TextField,
//     MenuItem,
//     Checkbox,
//     FormControlLabel,
//     Box,
// } from '@mui/material';
// import Swal from 'sweetalert2';

// const AddReservationModal = ({ open, onClose, onSubmit }) => {
//     const [formData, setFormData] = useState({
//         resource: 'Seminar room', // Fixed to 'Seminar room'
//         date: '',
//         start_time: '',
//         duration: '1 hour', // Default to 1 hour
//         repeat_count: 0, // Default no repeat
//         repeat_frequency: 'daily', // Default frequency
//         name: '',
//         email: '',
//         status: 'Confirmed', // Default status
//         notes: '',
//         send_email: true, // Default to true
//         color: 'Unassigned', // Default color
//     });

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleCheckboxChange = (e) => {
//         setFormData({
//             ...formData,
//             send_email: e.target.checked,
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Simulating form submission logic
//         Swal.fire({
//             title: 'Reservation Added!',
//             text: 'Your reservation has been successfully added.',
//             icon: 'success',
//             confirmButtonText: 'Close',
//         });

//         onSubmit(formData);
//         onClose(); // Close modal after submission
//     };

//     return (
//         <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//             <DialogTitle>Add Reservation</DialogTitle>
//             <form onSubmit={handleSubmit}>
//                 <DialogContent>
//                     {/* Resource (fixed to Seminar room) */}
//                     <TextField
//                         label="Resource"
//                         name="resource"
//                         value={formData.resource}
//                         fullWidth
//                         margin="dense"
//                         disabled
//                     />

//                     {/* Date */}
//                     <TextField
//                         label="Date"
//                         name="date"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         value={formData.date}
//                         onChange={handleChange}
//                         fullWidth
//                         margin="dense"
//                         required
//                     />

//                     {/* Start time */}
//                     <TextField
//                         label="Start time"
//                         name="start_time"
//                         type="time"
//                         InputLabelProps={{ shrink: true }}
//                         value={formData.start_time}
//                         onChange={handleChange}
//                         fullWidth
//                         margin="dense"
//                         required
//                     />

//                     {/* Duration */}
//                     <TextField
//                         label="Duration"
//                         name="duration"
//                         select
//                         value={formData.duration}
//                         onChange={handleChange}
//                         fullWidth
//                         margin="dense"
//                     >
//                         <MenuItem value="30 minutes">30 minutes</MenuItem>
//                         <MenuItem value="1 hour">1 hour</MenuItem>
//                         <MenuItem value="2 hours">2 hours</MenuItem>
//                     </TextField>

//                     {/* Repeat count */}
//                     <TextField
//                         label="Repeat this rental..."
//                         name="repeat_count"
//                         type="number"
//                         value={formData.repeat_count}
//                         onChange={handleChange}
//                         fullWidth
//                         margin="dense"
//                     />

//                     {/* Repeat frequency */}
//                     <TextField
//                         label="...more times"
//                         name="repeat_frequency"
//                         select
//                         value={formData.repeat_frequency}
//                         onChange={handleChange}
//                         fullWidth
//                         margin="dense"
//                     >
//                         <MenuItem value="daily">daily</MenuItem>
//                         <MenuItem value="weekly">weekly</MenuItem>
//                         <MenuItem value="monthly">monthly</MenuItem>
//                     </TextField>

//                     {/* Name */}
//                     <TextField
//                         label="Name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         fullWidth
//                         margin="dense"
//                         required
//                     />

//                     {/* Email */}
//                     <TextField
//                         label="Email address"
//                         name="email"
//                         type="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         fullWidth
//                         margin="dense"
//                         required
//                     />

//                     {/* Status */}
//                     <TextField
//                         label="Choose status for this reservation"
//                         name="status"
//                         select
//                         value={formData.status}
//                         onChange={handleChange}
//                         fullWidth
//                         margin="dense"
//                     >
//                         <MenuItem value="Confirmed">Confirmed</MenuItem>
//                         <MenuItem value="Pending">Pending</MenuItem>
//                         <MenuItem value="Cancelled">Cancelled</MenuItem>
//                     </TextField>

//                     {/* Send emails to client */}
//                     <FormControlLabel
//                         control={
//                             <Checkbox
//                                 checked={formData.send_email}
//                                 onChange={handleCheckboxChange}
//                                 name="send_email"
//                                 color="primary"
//                             />
//                         }
//                         label="Send emails to client"
//                     />

//                     {/* Private admin notes */}
//                     <TextField
//                         label="Private admin notes"
//                         name="notes"
//                         value={formData.notes}
//                         onChange={handleChange}
//                         fullWidth
//                         margin="dense"
//                         multiline
//                         rows={3}
//                     />

//                     {/* Color */}
//                     <TextField
//                         label="Color"
//                         name="color"
//                         select
//                         value={formData.color}
//                         onChange={handleChange}
//                         fullWidth
//                         margin="dense"
//                     >
//                         <MenuItem value="Unassigned">Unassigned</MenuItem>
//                         <MenuItem value="Blue">Blue</MenuItem>
//                         <MenuItem value="Grey">Grey</MenuItem>
//                         <MenuItem value="Green">Green</MenuItem>
//                     </TextField>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={onClose} color="secondary">
//                         Cancel
//                     </Button>
//                     <Button type="submit" variant="contained" color="primary">
//                         Continue
//                     </Button>
//                 </DialogActions>
//             </form>
//         </Dialog>
//     );
// };

// export default AddReservationModal;