import React from 'react';
import { Outlet } from 'react-router-dom';

export default function HomeMain() {
  return (
    <div>
      HomeMain
      <Outlet />
    </div>
  );
}
