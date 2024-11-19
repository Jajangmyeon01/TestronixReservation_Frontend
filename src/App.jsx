import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './Page/Dashboard';
import Reservations from './Page/Reservations';
import Schedules from './Page/Schedules';
import Rooms from './Page/Rooms';
import Sidebar from './Page/Sidebar';
import ReservationDetails from './Page/ReservationDetails'; 
import { RoomsProvider } from './Page/RoomsContext';
import Login from './Components/Auth/Login';
import NotFound from './Components/NotFound';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);

    // Redirect to login only if accessing a protected route without authentication
    if (!token && window.location.pathname !== '/login' && !window.location.pathname.startsWith('/404')) {
      navigate('/404');
    }
  }, [isAuthenticated, navigate]);

  return (
    <RoomsProvider>
      {isAuthenticated && (!window.location.pathname.startsWith('/reservation-details')) && <Sidebar />}
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/schedules" element={<Schedules />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/reservation-details/:id" element={<ReservationDetails />} />
          </>
        ) : (
          <Route path="/login" element={<Login />} />
        )}

        {/* Ensure 404 Not Found Route is always reachable */}
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </RoomsProvider>
  );
}

export default App;
