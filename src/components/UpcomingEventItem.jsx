import React from 'react';
import '../styles/UpcomingEventItem.css';
import eventPlaceholder from '../assets/sargam.png';

function UpcomingEventItem({ event, isExpanded, onClick }) {
  return (
    <div className="event-item-container">
      <div className="event-item-header" onClick={onClick}>
        <img src={event.image || eventPlaceholder} alt={event.title} />
        <div className="event-title-container">
          <h4>{event.title}</h4>
          {event.isUserCreated && (
            <span className="user-created-badge">Your Event</span>
          )}
        </div>
        <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>&#x25B8;</span>
      </div>
      
      {/* --- CHANGE IS HERE --- */}
      {/* We no longer use &&. We just apply a class. */}
      <div className={`event-item-details ${isExpanded ? 'expanded' : ''}`}>
        <p>{event.description}</p>
        <div className="details-footer">
          <span>Date: {event.date}</span>
          <button className="book-now-btn">Book Now</button>
        </div>
      </div>
      {/* --- END OF CHANGE --- */}
    </div>
  );
}

export default UpcomingEventItem;