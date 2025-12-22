import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import { authStore } from '../../stores';

interface PublicRouteProps {
  children: ReactNode;
}

interface LocationState {
  from?: {
    pathname: string;
  };
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const location = useLocation();
  const state = location.state as LocationState;

  if (authStore.isAuthenticated) {
    // If user came from a protected route, redirect back there
    const from = state?.from?.pathname || '/home';
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};

export default observer(PublicRoute);
