import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Button,
    LinearProgress,
    CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import useMediaQuery from '@mui/material/useMediaQuery';

function Dashboard() {
    const [reservations, setReservations] = useState([]);
    const [stats, setStats] = useState({ today: 0, yesterday: 0, last7Days: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const reservationsPerPage = 5;
    const totalPages = Math.ceil(reservations.length / reservationsPerPage);
    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('https://api-tronix-reserve.supsofttech.tmc-innovations.com/api/dashboard');
                const sortedReservations = response.data.data.sort(
                    (a, b) => new Date(b.customer.created_at) - new Date(a.customer.created_at)
                );
                setReservations(sortedReservations);
                setLoading(false);
            } catch (err) {
                setError('Error fetching reservations');
                setLoading(false);
            }
        };
        fetchReservations();
    }, []);

    useEffect(() => {
        if (reservations.length > 0) {
            calculateStatistics();
        }
    }, [reservations]);

    const calculateStatistics = () => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const last7Days = new Date(today);
        last7Days.setDate(today.getDate() - 7);

        const todayCount = reservations.filter(reservation => 
            new Date(reservation.customer.created_at).toDateString() === today.toDateString()
        ).length;

        const yesterdayCount = reservations.filter(reservation => 
            new Date(reservation.customer.created_at).toDateString() === yesterday.toDateString()
        ).length;

        const last7DaysCount = reservations.filter(reservation => {
            const date = new Date(reservation.customer.created_at);
            return date >= last7Days && date <= today;
        }).length;

        setStats({ today: todayCount, yesterday: yesterdayCount, last7Days: last7DaysCount });
    };

    const chartData = reservations.reduce((acc, reservation) => {
        const date = new Date(reservation.customer.created_at).toLocaleDateString();
        const existing = acc.find(item => item.date === date);
        if (existing) {
            existing.count += 1;
        } else {
            acc.push({ date, count: 1 });
        }
        return acc;
    }, []).slice(-7);

    const getStatusLabel = (status) => {
        switch (status) {
            case 'S': return 'Success';
            case 'R': return 'Reserved';
            case 'C': return 'Cancelled';
            default: return 'Unknown';
        }
    };

    const displayedReservations = reservations.slice(
        (currentPage - 1) * reservationsPerPage,
        currentPage * reservationsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <Sidebar collapsible={true} />
            <Box component="main" sx={{ flexGrow: 1, p: 2, marginTop: '50px' }}>
                <Typography variant="h5" color="secondary" sx={{ fontWeight: 'bold', mb: 3 }}>
       
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Activity Statistics
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ backgroundColor: '#e3f2fd', boxShadow: 2 }}>
                            <CardContent sx={{ p: 1 }}>
                                <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold' }}>
                                    Today So Far
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                    {stats.today} reservations
                                </Typography>
                                <LinearProgress variant="determinate" value={stats.today * 10} sx={{ mt: 1 }} />
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ backgroundColor: '#fff3e0', boxShadow: 2 }}>
                            <CardContent sx={{ p: 1 }}>
                                <Typography variant="body1" color="orange" sx={{ fontWeight: 'bold' }}>
                                    Yesterday
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                    {stats.yesterday} reservations
                                </Typography>
                                <LinearProgress variant="determinate" value={stats.yesterday * 10} sx={{ mt: 1 }} />
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ backgroundColor: '#e8f5e9', boxShadow: 2 }}>
                            <CardContent sx={{ p: 1 }}>
                                <Typography variant="body1" color="green" sx={{ fontWeight: 'bold' }}>
                                    Last 7 Days
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                    {stats.last7Days} reservations
                                </Typography>
                                <LinearProgress variant="determinate" value={stats.last7Days * 10} sx={{ mt: 1 }} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3, mb: 1 }}>
                    Reservations Over the Last 7 Days
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>

                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3, mb: 1 }}>
                    Recent Reservations
                </Typography>
                <Card>
                    <CardContent sx={{ p: 1 }}>
                        <Grid container spacing={1}>
                            {displayedReservations.map(reservation => (
                                <Grid item xs={12} key={reservation.customer.reservation_id}>
                                    <Card sx={{ marginBottom: 1 }}>
                                        <CardContent sx={{ p: 1 }}>
                                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                                Reservation ID: {reservation.customer.reservation_id}
                                            </Typography>
                                            <Typography variant="body2">
                                                Date: {new Date(reservation.customer.created_at).toLocaleString()}
                                            </Typography>
                                            <Typography variant="body2">
                                                Status: {getStatusLabel(reservation.status)}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Pagination */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <Button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    variant={currentPage === index + 1 ? 'contained' : 'outlined'}
                                    color="primary"
                                    sx={{ mx: 0.5 }}
                                >
                                    {index + 1}
                                </Button>
                            ))}
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

export default Dashboard;
