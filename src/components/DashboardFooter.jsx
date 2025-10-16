import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/DashboardFooter.css';
import { FaEnvelope, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

function DashboardFooter() {
  return (
    <footer className="dashboard-footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/discover">Discover</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/help">Help</Link>
        </div>
        <div className="footer-socials">
          <a href="mailto:contact@happenix.com" aria-label="Email"><FaEnvelope /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X"><FaXTwitter /></a>
        </div>
      </div>
      <p className="footer-tagline">Host Your Event with Happenix</p>
    </footer>
  );
}

export default DashboardFooter;