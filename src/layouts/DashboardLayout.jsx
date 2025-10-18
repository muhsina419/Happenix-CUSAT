import React, { useState } from 'react'; // 1. Import useState
import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../components/DashboardNavbar';
import DashboardFooter from '../components/DashboardFooter';
import './DashboardLayout.css';

function DashboardLayout({ onSignOut, onProfileClick }) {
  // 2. Add state for the search term
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="dashboard-layout">
      <DashboardNavbar 
        onSignOut={onSignOut}
        onProfileClick={onProfileClick}
        // 3. Pass the state and setter to the navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="layout-content">
        {/* 4. Pass the searchTerm to the page via context */}
        <Outlet context={{ searchTerm }} />
      </div>
      <DashboardFooter />
    </div>
  );
}

export default DashboardLayout;