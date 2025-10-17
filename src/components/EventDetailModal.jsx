import React from 'react';
import { FaTimes } from 'react-icons/fa';
import '../styles/EventDetailModal.css';

function EventDetailModal({ event, onClose }) {
  if (!event) return null;

  return (
    // The overlay handles the background blur/dimming
    <div className="modal-overlay" onClick={onClose}>
      {/* This stops the modal from closing when you click inside it */}
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <FaTimes />
        </button>
        
        <img src={event.image} alt={event.title} className="modal-event-image" />
        
        <div className="modal-content">
          <h2>{event.title}</h2>
          <p>More event details would go here, such as date, time, and a full description.</p>

          {/* This is the "small tab" for booking tickets */}
          <div className="ticket-booking-section">
            <h3>Book Your Spot</h3>
            <div className="ticket-option">
              <label>Ticket Type:</label>
              <select>
                <option>General Admission</option>
                <option>VIP Pass</option>
              </select>
            </div>
            <div className="ticket-option">
              <label>Quantity:</label>
              <input type="number" defaultValue="1" min="1" />
            </div>
            <button className="book-ticket-btn">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailModal;