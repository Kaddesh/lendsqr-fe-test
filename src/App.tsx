import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks';
import { restoreAuth } from './redux/slices/authSlice';
import LoginPage from './pages/Login/Login';
import DashboardPage from './pages/Dashboard/Dashboard';
import MainLayout from './layouts/MainLayout';
import DetailsPage from './pages/userDetail/DetailsPage';
import { localStorageUtils } from './utils/storage';
import { User } from './types/index';

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Restore authentication state from localStorage on app load
    const savedUser = localStorageUtils.getItem<User>('authUser');

    if (savedUser) {
      dispatch(restoreAuth(savedUser)); // ✅ User type guaranteed
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/users" element={<DashboardPage />} />
          <Route path="/users/:userId" element={<DetailsPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? '/users' : '/login'} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
