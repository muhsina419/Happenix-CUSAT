import React, { useState, useRef } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import EventCard from '../components/EventCard';
import EventDetailModal from '../components/EventDetailModal';
import UpcomingEventItem from '../components/UpcomingEventItem';
import '../styles/Dashboard.css';

// Your mock data imports
import echoImg from '../assets/echo2025.png';
import techImg from '../assets/tech_confrence.png';
import sargamImg from '../assets/sargam.png';
import astraImg from '../assets/astra.png';
import opendefenceImg from '../assets/opendefence.png';

const recommendedEvents = [
  { id: 1, title: 'Echo 2025', image: echoImg },
  { id: 2, title: 'Tech Conference', image: techImg },
  { id: 3, title: 'Sargam 2025', image: sargamImg },
  { id: 4, title: 'Astra 2025', image: astraImg },
  { id: 5, title: 'Open Defense', image: opendefenceImg },
  { id: 6, title: 'Event 6', image: echoImg },
  { id: 7, title: 'Event 7', image: techImg },
  { id: 8, title: 'Event 8', image: sargamImg },
];

const upcomingEventsData = [
    { id: 101, title: 'AI Workshop', date: 'Oct 25, 2025', description: 'A deep dive into machine learning models.', image: techImg },
    { id: 102, title: 'Startup Pitch Night', date: 'Nov 02, 2025', description: 'Present your startup ideas to a panel of investors.', image: opendefenceImg },
    { id: 103, title: 'CUSAT Music Fest', date: 'Nov 15, 2025', description: 'An evening of live music from local bands and artists.', image: echoImg },
];

function DashboardPage() {
  const navigate = useNavigate();
  const { searchTerm } = useOutletContext();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const scrollContainerRef = useRef(null);
  const [expandedEventId, setExpandedEventId] = useState(null);

  // --- THIS FUNCTION WAS MISSING ---
  // This is the handler for the "View all" scroll button
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // --- THIS FUNCTION WAS MISSING ---
  // This is the handler for the upcoming event tabs
  const handleToggleEvent = (eventId) => {
    setExpandedEventId(prevId => (prevId === eventId ? null : eventId));
  };

  // Filter the lists based on the searchTerm
  const lowerSearchTerm = searchTerm.toLowerCase();
  const filteredRecommended = recommendedEvents.filter(event => 
    event.title.toLowerCase().includes(lowerSearchTerm)
  );
  const filteredUpcoming = upcomingEventsData.filter(event => 
    event.title.toLowerCase().includes(lowerSearchTerm)
  );

  return (
    <>
      <div className="dashboard-content">
        <div className="create-event-section">
          <button 
            className="create-event-btn" 
            onClick={() => navigate('/create-event')}
          >
            Create Your Own Event
          </button>
        </div>

        <section className="recommendations-section">
          <div className="section-header">
            <h2>Personalized Recommendations</h2>
            {/* This button now correctly calls handleScroll */}
            <button className="scroll-button" onClick={handleScroll}>
              View all &rarr;
            </button>
          </div>
          <div className="events-carousel" ref={scrollContainerRef}>
            {filteredRecommended.length > 0 ? (
              filteredRecommended.map(event => (
                <EventCard 
                  key={event.id} 
                  title={event.title} 
                  image={event.image} 
                  onClick={() => setSelectedEvent(event)}
                />
              ))
            ) : (
              <p className="no-results-text">No recommendations match your search.</p>
            )}
          </div>
        </section>

        <section className="upcoming-events-section">
          <div className="section-header">
            <h2>Upcoming Events</h2>
          </div>
          <div className="upcoming-events-list">
            {filteredUpcoming.length > 0 ? (
              filteredUpcoming.map(event => (
                <UpcomingEventItem
                  key={event.id}
                  event={event}
                  isExpanded={expandedEventId === event.id}
                  // This item now correctly calls handleToggleEvent
                  onClick={() => handleToggleEvent(event.id)}
                />
              ))
            ) : (
              <p className="no-results-text">No upcoming events match your search.</p>
            )}
          </div>
        </section>
      </div>

      <EventDetailModal 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />
    </>
  );
}

export default DashboardPage;