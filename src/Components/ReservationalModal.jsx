import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';

const ReservationModal = ({
    open,
    onClose,
    formData,
    resources,
    handleChange,
    handleSubmit,
    title = 'Make a Reservation' // Default title if not provided
}) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle>{title}</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    {/* Reservation Table UI */}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Resource</TableCell>
                                <TableCell align="center">8:00</TableCell>
                                <TableCell align="center">9:00</TableCell>
                                <TableCell align="center">10:00</TableCell>
                                {/* Add more columns as needed */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* For now, you can render resources dynamically */}
                            {resources.map((resource, index) => (
                                <TableRow key={index}>
                                    <TableCell>{resource}</TableCell>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center"></TableCell>
                                    {/* Add more cells as needed */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    
                    {/* Form Fields */}
                    <FormControl fullWidth margin="dense" required>
                        <InputLabel id="resource-label">Resource</InputLabel>
                        <Select
                            labelId="resource-label"
                            name="venue"
                            value={formData.venue}
                            onChange={handleChange}
                            label="Resource"
                        >
                            {resources.map((resource) => (
                                <MenuItem key={resource} value={resource}>
                                    {resource}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        margin="dense"
                        label="First Name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Last Name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Rental Time"
                        name="rental_time"
                        type="datetime-local"
                        InputLabelProps={{ shrink: true }}
                        value={formData.rental_time}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={3}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ReservationModal;
