import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
  condition: boolean | null | undefined;
}

export const PrivateRoute = ({ children, condition }: PrivateRouteProps) => {
  return condition ? children : <Navigate to="/" />;
};
