import React from 'react';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { sidebarConfig } from '../constants/sidebarConfig';
import './MainLayout.scss';
import { Outlet } from 'react-router-dom';
import DashboardNav from '../pages/Dashboard/dashboardNav';


export const MainLayout = () => {
  return (
    <div className="main-layout">
      <Sidebar config={sidebarConfig} isOpen={true} />
      <DashboardNav />
      <main className="main-content">
      <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
