import React from 'react';
import '../styles/EventCard.css';

// 1. Accept the new 'onClick' prop
function EventCard({ image, title, onClick }) {
  return (
    // 2. Add the onClick handler to the main div
    <div className="event-card" onClick={onClick}>
      <img src={image} alt={title} className="event-card-image" />
      <p className="event-card-title">{title}</p>
    </div>
  );
}

export default EventCard;