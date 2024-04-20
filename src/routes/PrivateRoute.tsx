import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
  userState: boolean | null | undefined;
}

export const PrivateRoute = ({ children, userState }: PrivateRouteProps) => {
  const location = useLocation();
  const path = location.pathname;

  if (path.startsWith('/seller')) {
    if (!(userState == true)) {
      return <Navigate to="/" />;
    }
  }

  if (path.startsWith('/customer') || path.startsWith('/cart')) {
    if (!(userState == false)) {
      return <Navigate to="/" />;
    }
  }

  if (path.startsWith('/signup') || path.startsWith('/login')) {
    if (!(userState == null)) {
      return <Navigate to="/" />;
    }
  }

  return children;
};
