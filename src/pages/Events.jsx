import { useState } from 'react';
import '../styles/Events.css'; // Import our new styles

// Mock data for the events. In a real app, this would come from an API.
const mockEvents = [
  {
    id: 1,
    title: 'Tech Conference 2025',
    description: 'The annual conference for leading tech innovators and professionals. Join us for three days of talks, workshops, and networking.',
    date: '2025-11-15',
  },
  {
    id: 2,
    title: 'CUSAT Arts Festival',
    description: 'A vibrant celebration of student talent in music, dance, and drama. Don\'t miss the grand finale on the main stage.',
    date: '2025-11-22',
  },
  {
    id: 3,
    title: 'Alumni Homecoming',
    description: 'Welcome back, graduates! Reconnect with old friends and faculty at this special homecoming event.',
    date: '2025-12-05',
  },
  {
    id: 4,
    title: 'Entrepreneurship Summit',
    description: 'A full-day summit featuring talks from successful startup founders and a pitch competition for students.',
    date: '2025-12-12',
  },
];


function Events() {
  // This state keeps track of which event is currently open. `null` means all are closed.
  const [openEventId, setOpenEventId] = useState(null);

  // This function toggles the accordion
  const handleToggle = (eventId) => {
    // If the clicked event is already open, close it. Otherwise, open it.
    setOpenEventId(openEventId === eventId ? null : eventId);
  };

  return (
    <div className="events-page">
      <div className="events-overlay"></div>
      <div className="events-content-wrapper">
        <h1 className="events-page-title">Upcoming Events</h1>
        
        <div className="events-layout">
          <div className="events-list">
            {mockEvents.map((event) => (
              <div key={event.id} className="event-item" onClick={() => handleToggle(event.id)}>
                <div className="event-summary">{event.title}</div>
                <div className={`event-details ${openEventId === event.id ? 'active' : ''}`}>
                  <p>{event.description}</p>
                  <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>Date: {event.date}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="filter-section">
            <button className="filter-dropdown">
              <span>Filter</span>
              <span>&#9662;</span> {/* Down arrow character */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;