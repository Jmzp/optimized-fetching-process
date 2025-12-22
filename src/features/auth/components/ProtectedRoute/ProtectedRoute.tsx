import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import { authStore } from '../../stores';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();

  if (!authStore.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default observer(ProtectedRoute);
