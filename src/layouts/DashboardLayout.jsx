import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../components/DashboardNavbar';
import DashboardFooter from '../components/DashboardFooter';
import './DashboardLayout.css';

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <DashboardNavbar />
      <div className="layout-content">
        <Outlet />
      </div>
      <DashboardFooter />
    </div>
  );
}

export default DashboardLayout;