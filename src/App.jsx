import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './Page/Dashboard';
import Reservations from './Page/Reservations';
import Schedules from './Page/Schedules';
import Rooms from './Page/Rooms';
import Sidebar from './Page/Sidebar';
import ReservationDetails from './Page/ReservationDetails';
import { RoomsProvider } from './Page/RoomsContext';
import Login from './Components/Auth/Login';
import NotFound from './Components/NotFound';

// Reusable Protected Route Component
const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  }, [location]);

  return (
    <RoomsProvider>
      {/* Sidebar is only visible when authenticated */}
      {isAuthenticated && !location.pathname.startsWith('/reservation-details') && <Sidebar />}

      <Routes>
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservations"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Reservations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedules"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Schedules />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rooms"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Rooms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservation-details/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ReservationDetails />
            </ProtectedRoute>
          }
        />

        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Catch-All Route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </RoomsProvider>
  );
}

export default App;
