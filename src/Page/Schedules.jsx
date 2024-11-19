  import React, { useState, useEffect, useRef } from 'react';
  import Sidebar from './Sidebar';
  import Box from '@mui/material/Box';
  import FullCalendar from '@fullcalendar/react';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import interactionPlugin from '@fullcalendar/interaction';
  import axios from 'axios';
  import { Typography, Container, ButtonGroup, Button } from '@mui/material';
  import Profile from '../Components/Profile';
  import StatusIndicators from '../Components/StatusIndicators'; // Assuming this component is for status legends

  function Schedules() {
    const [events, setEvents] = useState([]);
    const [currentMonth, setCurrentMonth] = useState('');
    const [openProfile, setOpenProfile] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const calendarRef = useRef(null);

    // Fetch reservations, adapting to the Reservations structure
   const getReservations = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/dashboard');
    console.log(response.data); // Debugging to verify the data structure
    const { data } = response.data;

    const mappedEvents = data.map((reservation) => {
      const reservationTime = reservation.customer.time; // Assuming this is 12-hour format, e.g., "1:00 PM"
      const [time, period] = reservationTime.split(' '); // Separate time and AM/PM
      let [hours, minutes] = time.split(':');
      hours = parseInt(hours, 10);
    
      // Convert to 24-hour time
      if (period === 'PM' && hours < 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes}`;
    
      return {
        title: `${reservation.customer.first_name} ${reservation.customer.last_name}`,
        start: `${reservation.customer.date}T${formattedTime}`, // ISO 8601 format
        extendedProps: {
          venue: reservation.venue,
          reservation_id: reservation.id,
          status: reservation.status,
          customer: reservation.customer,
          originalDate: reservation.customer.date, // Add original date
          originalTime: reservation.customer.time, // Add original time (12-hour format)
        },
        backgroundColor:
          reservation.status === 'S' ? '#198754' :
          reservation.status === 'R' ? '#0d6efd' :
          'rgba(108, 117, 125, 0.8)',
        opacity: new Date(`${reservation.customer.date}T${formattedTime}`) < new Date() ? '0.5' : '1',
      };
    });
    

    setEvents(mappedEvents);
  } catch (error) {
    console.error('Error fetching reservations:', error);
  }
};


    useEffect(() => {
      getReservations();
      updateCurrentMonth();
    }, []);

    const updateCurrentMonth = () => {
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        const currentDate = calendarApi.getDate();
        const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
        setCurrentMonth(monthName);
      }
    };

    const handlePrev = () => {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev();
      updateCurrentMonth();
    };

    const handleNext = () => {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next();
      updateCurrentMonth();
    };

    const handleToday = () => {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.today();
      updateCurrentMonth();
    };

    const handleEventClick = (info) => {
      const { extendedProps } = info.event;
      setSelectedReservation(extendedProps);
      setOpenProfile(true);
    };

    return (
      <>
        <Box sx={{ display: 'flex' }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '55px' }}>
            <Container maxWidth="lg">
              <Typography variant="h4" gutterBottom>
                Reservation Schedules
              </Typography>
              <div style={{ position: 'relative', height: '90vh' }}>
                <StatusIndicators />

                <Typography variant="h5" align="center" gutterBottom>
                  {currentMonth}
                </Typography>

                <FullCalendar
                  ref={calendarRef}
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  headerToolbar={false}
                  height={"90%"}
                  events={events}
                  eventClick={handleEventClick}
                  dayCellDidMount={(info) => {
                    const today = new Date().setHours(0, 0, 0, 0);
                    if (info.date < today) {
                      info.el.style.color = 'gray';
                      info.el.style.opacity = '0.5';
                    }
                  }}
                  dateClick={(info) => {
                    const selectedDate = info.dateStr;
                    if (new Date(selectedDate) < new Date().setHours(0, 0, 0, 0)) {
                      alert("You cannot make reservations for past dates.");
                    } else {
                      alert(`You selected ${selectedDate}. Proceed with reservation.`);
                    }
                  }}
                />

                <div style={{ position: 'absolute', top: '0px', right: '10px' }}>
                  <ButtonGroup sx={{ display: 'flex' }}>
                    <Button variant="contained" color="primary" onClick={handlePrev}>Previous</Button>
                    <Button variant="contained" color="primary" onClick={handleToday}>Today</Button>
                    <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
                  </ButtonGroup>
                </div>
              </div>
            </Container>
          </Box>
        </Box>

        {/* Profile Dialog */}
        {selectedReservation && (
          <Profile
            open={openProfile}
            onClose={() => setOpenProfile(false)}
            reservation={selectedReservation}
          />
        )}
      </>
    );
  }

  export default Schedules;
