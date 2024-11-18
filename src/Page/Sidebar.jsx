import React, { useState, useEffect, useContext } from 'react';
import { RoomsContext } from './RoomsContext';
import PropTypes from 'prop-types';
import {
    AppBar,
    Box,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Stack,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Select,
    MenuItem,
    Menu,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    AutoStories as AutoStoriesIcon,
    Schedule as ScheduleIcon,
    Add as AddIcon,
    Menu as MenuIcon,
    Notifications as NotificationsIcon,
    Mail as MailIcon,
    AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import Swal from 'sweetalert2';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';


const drawerWidth = 282;

function Sidebar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const { rooms } = useContext(RoomsContext); // Access rooms from context
    const [openReservationModal, setOpenReservationModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null); // State for menu
    const open = Boolean(anchorEl); // Control menu open/close
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        date: '',
        time: '',
        venue: '',
        notes: '',
    });
    const [status, setStatus] = useState('R');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const location = useLocation();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        const token = localStorage.getItem('access_token');

        if (!token) {
            Swal.fire('No Token Found', 'You are not logged in.', 'error');
            return;
        }

        try {
            await axios.post('http://127.0.0.1:8000/api/logout', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            Swal.fire('Logged Out', 'You have been successfully logged out.', 'success').then(() => {
                localStorage.removeItem('access_token'); // Remove only the token
                navigate('/login');
            
                
            });




        } catch (error) {
            const message = error.response?.data?.message;
            Swal.fire('Logout Error', message || 'Unable to log out. Please try again.', 'error')
                .then(() => {
                    if (message?.trim().toLowerCase() === 'token has expired') {
                        localStorage.removeItem('access_token');
                        location.href = '/login';
                    }
                });
        } finally {
            handleMenuClose();
        }
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        // Close the modal immediately if there are no rooms
        if (rooms.length === 0) {
            setOpenReservationModal(false); // Close the modal
            Swal.fire('No Rooms Available', 'Please create a room before adding a reservation.', 'warning');
            return;
        }
        const reservationData = { ...formData, status };


        const addReservation = async () => {
            if (rooms.length === 0) {
                Swal.fire('No Rooms Available', 'Please create a room before adding a reservation.', 'warning');
                return;
            }
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/dashboard', reservationData);
                console.log('Reservation added:', response.data);
                Swal.fire('Reservation Added!', 'Your reservation has been successfully added.', 'success');
                setOpenReservationModal(false);
                setFormData({ first_name: '', last_name: '', email: '', date: '', time: '', venue: '', notes: '' });
                setStatus('R');
            } catch (error) {
                console.error('Error adding reservation:', error);
                Swal.fire('Error Adding Reservation!', error.response?.data?.message || 'An error occurred.', 'error');
            }
        };

        addReservation();
    };

    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-based
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const getPageTitle = () => {
        switch (location.pathname) {
            case '/':
                return 'Dashboard Overview';
            case '/reservations':
                return 'Reservations Overview';
            case '/schedules':
                return 'Schedules Overview';
            case '/rooms':
                return 'Rooms Overview';
            default:
                return 'Activity Overview';
        }
    };

    const drawer = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                bgcolor: '#00389e', // Match drawer color with AppBar
                color: 'white',
                overflow: 'hidden', // Prevent overflow
            }}
        >
            <Toolbar />
            <Box
                display="flex"
                justifyContent="center"
                sx={{ marginBottom: 3, bgcolor: '#00389e', p: 2, cursor: 'pointer' }}
                onClick={() => navigate('/')}
            >
                <img
                    src="/src/assets/Screenshot_2024-10-22_224953-removebg-preview.png"
                    alt="TronixBook Logo"
                    style={{ maxWidth: '100%', height: 'auto', width: '250px' }}
                />
            </Box>
            <List sx={{ overflowY: 'auto', flexGrow: 1 }}>
                <ListItem disablePadding onClick={() => navigate('/')}>
                    <ListItemButton>
                        <ListItemIcon sx={{ color: 'white', pl: 2 }}>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" sx={{ color: 'white', pl: 2 }} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={() => navigate('/reservations')}>
                    <ListItemButton>
                        <ListItemIcon sx={{ color: 'white', pl: 2 }}>
                            <AutoStoriesIcon />
                        </ListItemIcon>
                        <ListItemText primary="Reservations" sx={{ color: 'white', pl: 2 }} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={() => navigate('/schedules')}>
                    <ListItemButton>
                        <ListItemIcon sx={{ color: 'white', pl: 2 }}>
                            <ScheduleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Schedules" sx={{ color: 'white', pl: 2 }} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={() => navigate('/rooms')}>
                    <ListItemButton>
                        <ListItemIcon sx={{ color: 'white', pl: 2 }}>
                            <AddBusinessIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add Rooms" sx={{ color: 'white', pl: 2 }} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Box sx={{ mt: 'auto', p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="white">
                    © {new Date().getFullYear()} Testronix <br /> All Rights Reserved.
                </Typography>
            </Box>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    bgcolor: '#00389e', // Set AppBar background color
                    boxShadow: 'none',
                    borderBottom: 'none', // Remove AppBar border
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap sx={{ color: 'white', pl: 2 }}>
                        {getPageTitle()}
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ ml: 'auto', alignItems: 'center' }}
                    >
                        {/* Icons */}
                        <IconButton color="inherit">
                            <NotificationsIcon />
                        </IconButton>
                        <IconButton color="inherit">
                            <MailIcon />
                        </IconButton>

                        {/* Account Circle with Menu */}
                        <IconButton color="inherit" onClick={handleMenuOpen}>
                            <AccountCircleIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl} 
                            open={open}
                            onClose={handleMenuClose}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        >
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>

                        {/* Make Reservation Button */}
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<AddIcon />}
                            onClick={() => setOpenReservationModal(true)}
                        >
                            Make Reservation
                        </Button>
                    </Stack>
                </Toolbar>

            </AppBar>

            <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginBottom: -10, bgcolor: '#00389e', p: 2 }}>
                <img
                    src="/src/assets/Screenshot_2024-10-22_224953-removebg-preview.png"
                    alt="TronixBook Logo"
                    style={{ width: '250px', height: 'auto' }}

                />
            </Box>

            {/* Drawer */}
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            border: 'none', // Remove Drawer border
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            border: 'none', // Remove Drawer border
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* Reservation Modal */}
            <Dialog
                open={openReservationModal}
                onClose={() => setOpenReservationModal(false)}
                fullWidth
                maxWidth="sm"
                disableEnforceFocus
                disableAutoFocus
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Add Reservation</DialogTitle>
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
                            type="date"  // Change "datetime-local" to "date"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                            value={formData.date}
                            onChange={handleChange}
                            inputProps={{
                                min: getCurrentDateTime().split('T')[0], // Set the minimum date only
                            }}
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
                            {/* Loop to create hour options from 9 AM to 4 PM */}
                            {[...Array(8)].map((_, index) => {
                                const hour = 9 + index; // 9 AM to 4 PM
                                const period = hour < 12 ? 'AM' : 'PM';
                                const displayHour = hour > 12 ? hour - 12 : hour; // Convert 13 to 1, 14 to 2, etc.
                                const label = `${displayHour} ${period}`;
                                const value = `${hour > 12 ? hour - 12 : hour}:00 ${period}`; // Set the value in 12-hour format

                                return (
                                    <MenuItem key={hour} value={value}>
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
                                rooms.map((room) => (
                                    <MenuItem key={room.id} value={room.venue}>
                                        {room.venue}
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
                        <Button onClick={() => setOpenReservationModal(false)}>Cancel</Button>
                        <Button type="submit" variant="contained" color="primary" >Add Reservation</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
}

Sidebar.propTypes = {
    window: PropTypes.func,
};

export default Sidebar;