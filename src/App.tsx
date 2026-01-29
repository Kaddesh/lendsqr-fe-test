import React from 'react'
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks';
import { restoreAuth } from './redux/slices/authSlice';
import { localStorageUtils } from './utils/storage';

import LoginPage from './pages/Login/Login';
import DashboardPage from './pages/Dashboard/Dashboard';
import UsersPage from './pages/Users/Users';
import UserDetailsPage from './components/card/UserDetails/UserDetails';

import './styles/App.scss';
import MainLayout from './layouts/MainLayout';
import DetailsPage from './pages/DetailsPage';

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Restore authentication state from localStorage on app load
    const savedUser = localStorageUtils.getItem('authUser');
    if (savedUser) {
      dispatch(restoreAuth(savedUser));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/userdetail" element={<DetailsPage />} />
        <Route path="/user/:userId" element={<UserDetailsPage />} />
      </Route>
        <Route path="/login" element={<LoginPage />} />
        
        <Route
          path="/users"
          element={isAuthenticated ? <UsersPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/user/:userId"
          element={isAuthenticated ? <UserDetailsPage /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
      </Routes>
    </Router>
  );
}

export default App;
