import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaAlignLeft } from 'react-icons/fa';
import ToggleSwitch from '../components/ToggleSwitch';
import logo from '../assets/logoX.png';
import placeholder from '../assets/sargam.png';
import '../styles/CreateEventPage.css';
import { eventsAPI } from '../api/events';

function CreateEventPage() {
  const [requireApproval, setRequireApproval] = useState(true);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [posterPreview, setPosterPreview] = useState(placeholder);
  const [posterFile, setPosterFile] = useState(null);
  const [form, setForm] = useState({
    name: '',
    category: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: '',
    description: '',
    tickets: 'no',
    capacity: '',
    eventLink: 'none',
  });

  const categories = [
    'Cultural',
    'Arts',
    'Sports',
    'Open Defense',
    'Conference',
    'Tech Fest',
    'Comedy',
    'Dance',
    'Literacy',
    'Education',
    'Others'
  ];

  useEffect(() => {
    const run = async () => {
      const res = await eventsAPI.search(search);
      if (res.success) setResults(res.data);
    };
    const t = setTimeout(run, 300);
    return () => clearTimeout(t);
  }, [search]);

  const onPosterChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setPosterFile(f);
    const url = URL.createObjectURL(f);
    setPosterPreview(url);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries({
      ...form,
      requireApproval: String(requireApproval),
    }).forEach(([k, v]) => fd.append(k, v ?? ''));
    if (posterFile) fd.append('poster', posterFile);
    const res = await eventsAPI.create(fd);
    if (res.success) {
      alert('Event created');
      setSearch('');
    } else {
      alert(res.error || 'Failed to create event');
    }
  };

  return (
    <div className="create-event-page">
      <header className="create-event-header">
        <h1>Create Event</h1>
      </header>

      <div className="create-event-layout">
        <div className="image-uploader">
          <img src={posterPreview} alt="Event Poster" />
          <label htmlFor="poster-upload" className="upload-button">
            Upload Poster
          </label>
          <input type="file" id="poster-upload" style={{ display: 'none' }} accept="image/*" onChange={onPosterChange} />
        </div>

        <form className="form-fields" onSubmit={onSubmit}>
          <div className="form-section">
            <p className="form-label-alt">Personalized Calendar</p>
            <input type="text" placeholder="Event Name" className="event-name-input" name="name" value={form.name} onChange={onChange} />
            <select 
              className="category-select" 
              name="category" 
              value={form.category} 
              onChange={onChange}
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="form-row">
            <label>Start At :</label>
            <input type="date" className="date-input" name="startDate" value={form.startDate} onChange={onChange} />
            <input type="time" className="time-input" name="startTime" value={form.startTime} onChange={onChange} />
          </div>
          <div className="form-row">
            <label>End At :</label>
            <input type="date" className="date-input" name="endDate" value={form.endDate} onChange={onChange} />
            <input type="time" className="time-input" name="endTime" value={form.endTime} onChange={onChange} />
          </div>

          <div className="form-input-with-icon">
            <FaMapMarkerAlt />
            <input type="text" placeholder="Add Event Location" name="location" value={form.location} onChange={onChange} />
          </div>
          <div className="form-input-with-icon">
            <FaAlignLeft />
            <textarea placeholder="Add Description" rows="3" name="description" value={form.description} onChange={onChange}></textarea>
          </div>

          <div className="form-section options-section">
            <h3 className="options-title">Event Option</h3>
            <div className="option-row">
              <label>Tickets</label>
              <select name="tickets" value={form.tickets} onChange={onChange}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
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
              <input type="number" min="0" name="capacity" value={form.capacity} onChange={onChange} />
            </div>
            <div className="option-row">
              <label>Event Link</label>
              <input type="text" name="eventLink" value={form.eventLink} onChange={onChange} />
            </div>

            <button type="submit" className="create-button">Create Event</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEventPage;