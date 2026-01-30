import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { sidebarConfig } from '../constants/sidebarConfig';
import DashboardNav from '../components/Navbar/dashboardNav';
import './MainLayout.scss';
import TextInput from '../components/Form/TextInput';
import searchIcon from '../assets/icons/search.svg';

export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 

   
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

    const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  
  return (
    <div className="main-layout">
      <Sidebar
        config={sidebarConfig}
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      <DashboardNav onMenuToggle={toggleSidebar} />

      <main className="main-content">
        <div className="dashboard-nav__search-wrapper mobile-only">
            <TextInput
              name="search"
              type="search"
              placeholder="Search for anything"
              inputClassName="dashboard-nav__search-input"
            />
             <div className="dashboard-nav__search-action">
              <img src={searchIcon} alt="search-icon" />
            </div>
          </div>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
