import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
// import '../Dashboard.css';

const SidebarLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100dvh', height: '100dvh', overflow: 'hidden' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '2rem', minHeight: '100dvh', height: '100dvh', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;
