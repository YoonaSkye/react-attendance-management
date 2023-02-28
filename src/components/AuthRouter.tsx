import React from 'react';
import { Navigate, matchRoutes, useLocation } from 'react-router-dom';
import { routes } from '../router';
import _ from 'lodash';
import { useAppSelector, useAppDispatch } from '../store';
import { infosAction, updateInfos } from '../store/modules/users';
import type { Infos } from '../store/modules/users';

interface AuthRouterProps {
  children?: React.ReactNode;
}

export default function AuthRouter({ children }: AuthRouterProps) {
  const token = useAppSelector((state) => state.users.token);
  const infos = useAppSelector((state) => state.users.infos);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const matchs = matchRoutes(routes, location);

  if (Array.isArray(matchs)) {
    const meta = matchs[matchs.length - 1].route.meta;
    if (meta?.auth && _.isEmpty(infos)) {
      if (token) {
        dispatch(infosAction()).then((action) => {
          const { errcode, infos } = (
            action.payload as { [index: string]: unknown }
          ).data as { [index: string]: unknown };
          if (errcode === 0) {
            dispatch(updateInfos(infos as Infos));
          }
        });
      } else {
        return <Navigate to="/login" />;
      }
      // return <Navigate to="/login" />;
    }
  }
  if (token && location.pathname === '/login') {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
