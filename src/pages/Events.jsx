import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { eventsAPI } from '../api/events';
import '../styles/Events.css';

function Events() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch all events
        const allEventsResult = await eventsAPI.search('');
        let allEvents = allEventsResult.success ? allEventsResult.data : [];

        // Fetch user-created events
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        if (userData.email) {
          const userEventsResult = await eventsAPI.getUserEvents(userData.email);
          if (userEventsResult.success) {
            allEvents = [...allEvents, ...userEventsResult.data];
          }
        }

        // Convert events to FullCalendar format
        const calendarEvents = allEvents.map(event => {
          const startDate = new Date(`${event.startDate}T${event.startTime || '00:00:00'}`);
          const endDate = new Date(`${event.endDate}T${event.endTime || '23:59:59'}`);
          
          return {
            id: event.id,
            title: event.name,
            start: startDate.toISOString(),
            end: endDate.toISOString(),
            description: event.description,
            location: event.location,
            backgroundColor: event.organizerEmail === userData.email ? '#10B981' : '#3B82F6',
            borderColor: event.organizerEmail === userData.email ? '#059669' : '#2563EB',
            extendedProps: {
              isUserCreated: event.organizerEmail === userData.email,
              category: event.category,
              tickets: event.tickets,
              capacity: event.capacity
            }
          };
        });

        setEvents(calendarEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);
  
  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    const props = event.extendedProps;
    
    let message = `Event: ${event.title}\n`;
    message += `Description: ${event.extendedProps.description || 'No description'}\n`;
    message += `Location: ${event.extendedProps.location || 'No location'}\n`;
    message += `Category: ${props.category || 'No category'}\n`;
    if (props.isUserCreated) {
      message += `\n🎉 This is your event!`;
    }
    
    alert(message);
  };

  return (
    <div className="events-page">
      <div className="events-overlay"></div>
      <div className="events-content-wrapper">
        <h1 className="events-page-title">Event Calendar</h1>
        
        <div className="events-layout">
          <div className="calendar-container">
            {isLoading ? (
              <div className="calendar-loading">
                <p>Loading events...</p>
              </div>
            ) : (
              <>
                <div className="calendar-legend">
                  <div className="legend-item">
                    <div className="legend-color" style={{backgroundColor: '#3B82F6'}}></div>
                    <span>Other Events</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{backgroundColor: '#10B981'}}></div>
                    <span>Your Events</span>
                  </div>
                </div>
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                  }}
                  events={events}
                  eventClick={handleEventClick}
                  height="80vh"
                  selectable={true}
                  eventDisplay="block"
                  dayMaxEvents={3}
                  moreLinkClick="popover"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;