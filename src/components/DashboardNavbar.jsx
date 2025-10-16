import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo-h.png';
import profilePic from '../assets/logo.png';
import '../styles/DashboardNavbar.css';
import { FaSearch, FaRegCommentDots } from 'react-icons/fa';

function DashboardNavbar() {
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
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="nav-right">
        <NavLink to="/events" className="nav-link events-link">Events</NavLink>
        <button className="icon-button">
          <FaRegCommentDots size={22} />
        </button>
        <button className="icon-button profile-button">
          <img src={profilePic} alt="Profile" className="profile-pic" />
          <span className="notification-badge">2</span>
        </button>
      </div>
    </nav>
  );
}

export default DashboardNavbar;