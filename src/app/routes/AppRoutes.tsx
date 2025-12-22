import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage, ProtectedRoute } from '../../features/auth';
import { HomePage } from '../../features/home';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
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
