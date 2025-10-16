import React, { useState } from 'react';
import { FaMapMarkerAlt, FaAlignLeft } from 'react-icons/fa';
import ToggleSwitch from '../components/ToggleSwitch';
import logo from '../assets/logo-h.png';
import placeholder from '../assets/sargam.png';
import '../styles/CreateEventPage.css';

function CreateEventPage() {
  const [requireApproval, setRequireApproval] = useState(true);

  return (
    <div className="create-event-page">
      <header className="create-event-header">
        <img src={logo} alt="Logo" className="header-logo" />
        <h1>Create Event</h1>
      </header>

      <div className="create-event-layout">
        <div className="image-uploader">
          <img src={placeholder} alt="Event Poster" />
          <label htmlFor="poster-upload" className="upload-button">
            Upload Poster
          </label>
          <input type="file" id="poster-upload" style={{ display: 'none' }} />
        </div>

        <form className="form-fields">
          <div className="form-section">
            <p className="form-label-alt">Personalized Calendar</p>
            <input type="text" placeholder="Event Name" className="event-name-input" />
            <button type="button" className="category-button">Category</button>
          </div>
          
          <div className="form-row">
            <label>Start At :</label>
            <input type="text" placeholder="dd/mm/yyyy" className="date-input" />
            <input type="text" placeholder="00:00 PM" className="time-input" />
          </div>
          <div className="form-row">
            <label>End At :</label>
            <input type="text" placeholder="dd/mm/yyyy" className="date-input" />
            <input type="text" placeholder="00:00 PM" className="time-input" />
          </div>

          <div className="form-input-with-icon">
            <FaMapMarkerAlt />
            <input type="text" placeholder="Add Event Location" />
          </div>
          <div className="form-input-with-icon">
            <FaAlignLeft />
            <textarea placeholder="Add Description" rows="3"></textarea>
          </div>

          <div className="form-section options-section">
            <h3 className="options-title">Event Option</h3>
            <div className="option-row">
              <label>Tickets</label>
              <select><option>Select</option></select>
            </div>
            <div className="option-row">
              <ToggleSwitch 
                label="Require Approval" 
                checked={requireApproval} 
                onChange={() => setRequireApproval(!requireApproval)} 
              />
            </div>
            <div className="option-row">
              <label>Capacity</label>
              <select><option>Select</option></select>
            </div>
            <div className="option-row">
              <label>Event Link</label>
              <input type="text" defaultValue="None" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEventPage;