import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage, ProtectedRoute, PublicRoute } from '../../features/auth';
import { HomePage } from '../../features/home';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
