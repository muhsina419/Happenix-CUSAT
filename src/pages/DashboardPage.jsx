import React, { useState } from 'react'; // 1. Import useState
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import EventDetailModal from '../components/EventDetailModal'; // 2. Import the new modal
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
];

function DashboardPage() {
  const navigate = useNavigate();
  // 3. Add state to track the selected event
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <> {/* 4. Wrap in a fragment */}
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
            <a href="#">View all &rarr;</a>
          </div>
          <div className="events-carousel">
            {recommendedEvents.map(event => (
              <EventCard 
                key={event.id} 
                title={event.title} 
                image={event.image}
                // 5. Pass the click handler to the card
                onClick={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        </section>
      </div>

      {/* 6. Conditionally render the modal outside the main content div */}
      <EventDetailModal 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />
    </>
  );
}

export default DashboardPage;