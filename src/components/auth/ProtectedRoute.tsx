//Route wrapper for å sjekke autentisering

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

type ProtectedRouteProps = {
  redirectPath?: string;
};

// ProtectedRoute-komponent som beskytter ruter som krever innlogging
export const ProtectedRoute = ({ redirectPath = '/login' }: ProtectedRouteProps) => {
  // Hent autentiseringsstatus fra auth context
  const { isAuthenticated } = useAuth();

  // Vis underkomponenter hvis innlogget, ellers omdiriger til innloggingssiden
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} replace />;
};
