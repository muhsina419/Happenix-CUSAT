import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo-h.png';
import profilePic from '../assets/profilepic.png';
import '../styles/DashboardNavbar.css';
import { FaSearch, FaRegCommentDots } from 'react-icons/fa';

// 1. Accept the new props: searchTerm and setSearchTerm
function DashboardNavbar({ onProfileClick, searchTerm, setSearchTerm }) {
  return (
    <nav className="dashboard-nav">
      <div className="nav-left">
        <img src={logo} alt="Happenix Logo" className="nav-logo" />
        <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
        <NavLink to="/calendar" className="nav-link">Calendar</NavLink>
      </div>
      <div className="nav-center">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          {/* 2. Make the input controlled */}
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="nav-right">
        {/* ... (rest of the right side is unchanged) ... */}
        <button className="icon-button">
          <FaRegCommentDots size={22} />
        </button>
        <button className="icon-button profile-button" onClick={onProfileClick}>
          <img src={profilePic} alt="Profile" className="profile-pic" />
          <span className="notification-badge">2</span>
        </button>
      </div>
    </nav>
  );
}

export default DashboardNavbar;