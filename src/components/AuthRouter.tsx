import React from 'react';
import { Navigate, matchRoutes, useLocation } from 'react-router-dom';
import { routes } from '../router';

interface AuthRouterProps {
  children?: React.ReactNode;
}

export default function AuthRouter({ children }: AuthRouterProps) {
  const location = useLocation();
  const matchs = matchRoutes(routes, location);

  // if (Array.isArray(matchs)) {
  //   const meta = matchs[matchs.length - 1].route.meta;
  //   if (meta?.auth) {
  //     return <Navigate to="/login" />;
  //   }
  // }

  return <>{children}</>;
}
