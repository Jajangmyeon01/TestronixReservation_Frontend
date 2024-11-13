import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './Page/Dashboard';
import Reservations from './Page/Reservations';
import Schedules from './Page/Schedules';
import Rooms from './Page/Rooms';
import Sidebar from './Page/Sidebar';
import { RoomsProvider } from './Page/RoomsContext';
import Login from './Components/Auth/Login';


const isAuthenticated = () => {
  return localStorage.getItem('access_token');
}


function App() {
  return (
    <RoomsProvider>
      <BrowserRouter>
        {isAuthenticated() && (
          <Sidebar />
        )}

        <Routes>


          {isAuthenticated() && (
            <>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/schedules" element={<Schedules />} />
              <Route path="/rooms" element={<Rooms />} />
            </>

          )}

          {!isAuthenticated() && (
            <Route path="/login" element={<Login />} />
          )}

          {/* 404 Not Found Route */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </RoomsProvider>
  );
}

export default App;
