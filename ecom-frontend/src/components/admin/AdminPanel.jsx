import React from 'react';
import { Outlet } from 'react-router-dom';
import '../../styles/AdminPanel.css';  // Import the CSS file
import AdminSideBar from './AdminSideBar';  // Import the new sidebar component

const AdminPanel = () => {
  return (
    <div className="admin-container">
      <AdminSideBar />  {/* Sidebar component */}
      <main className="admin-content">
        <Outlet /> {/* This will render the corresponding child route */}
      </main>
    </div>
  );
};

export default AdminPanel;
