import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../styles/Events.css';

const mockEvents = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    start: '2025-11-15T10:00:00',
    description: 'The annual conference for leading tech innovators.'
  },
  {
    id: '2',
    title: 'CUSAT Arts Festival',
    start: '2025-11-22',
    allDay: true,
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6'
  },
  {
    id: '3',
    title: 'Alumni Homecoming',
    start: '2025-12-05T18:00:00',
  },
  {
    id: '4',
    title: 'Entrepreneurship Summit',
    start: '2025-12-12',
    end: '2025-12-14'
  },
];


function Events() {
  
  const handleEventClick = (clickInfo) => {
    alert(`Event: ${clickInfo.event.title}`);
  };

  return (
    <div className="events-page">
      <div className="events-overlay"></div>
      <div className="events-content-wrapper">
        <h1 className="events-page-title">Upcoming Events</h1>
        
        <div className="events-layout">
          <div className="calendar-container">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              events={mockEvents}
              eventClick={handleEventClick}
              height="80vh"
              selectable={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;