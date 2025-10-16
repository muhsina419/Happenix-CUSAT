import React from 'react';
import '../styles/EventCard.css';

function EventCard({ image, title }) {
  return (
    <div className="event-card">
      <img src={image} alt={title} className="event-card-image" />
      <p className="event-card-title">{title}</p>
    </div>
  );
}

export default EventCard;