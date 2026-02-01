import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNav from '../components/Navbar/dashboardNav';
import './MainLayout.scss';
import TextInput from '../components/Form/TextInput';
import searchIcon from '../assets/icons/search.svg';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../redux/slices/usersSlice';
import Sidebar from '../components/Sidebar/Sidebar';

export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const dispatch = useDispatch<AppDispatch>();
    const searchTerm = useSelector((state: RootState) => state.users.searchTerm);

  return (
    <div className="main-layout">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <DashboardNav onMenuToggle={toggleSidebar} />

      <main className="main-content">
        <div className="dashboard-nav__search-wrapper mobile-only">
          <TextInput
            name="search"
            type="search"
            placeholder="Search for anything"
            inputClassName="dashboard-nav__search-input"
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
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
