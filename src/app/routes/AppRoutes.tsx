import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from '../../features/auth';
import { LoadingSpinner } from '../../shared/components';

// Lazy load pages to reduce initial bundle size
const LoginPage = lazy(() =>
  import('../../features/auth').then((module) => ({ default: module.LoginPage })),
);
const UsersPage = lazy(() =>
  import('../../features/users').then((module) => ({ default: module.UsersPage })),
);

const AppRoutes = () => (
  <BrowserRouter>
    <Suspense fallback={<LoadingSpinner />}>
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
              <UsersPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default AppRoutes;
