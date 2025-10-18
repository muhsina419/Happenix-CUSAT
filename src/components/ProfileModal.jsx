import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import '../styles/ProfileModal.css';
import profileAvatar from '../assets/logo-h.png'; // Placeholder avatar

function ProfileModal({ isOpen, onClose, onSignOut }) {
  if (!isOpen) return null;

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="profile-modal-close-btn" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="profile-header">
          <img src={profileAvatar} alt="Profile" className="profile-avatar" />
          <div className="profile-info">
            <h3>{userData.fullname || 'Full name'}</h3>
            <p>{userData.email || 'Mail Address'}</p>
            <p>{userData.department || 'Department'}</p>
          </div>
        </div>

        <div className="profile-actions">
          <button className="profile-action-btn">My Events</button>
          <button className="profile-action-btn edit-btn">Edit Profile</button>
        </div>

        <button className="sign-out-btn" onClick={onSignOut}>
          <IoIosLogOut size={22} />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default ProfileModal;