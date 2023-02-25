import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// 路由
import { RouterProvider } from 'react-router-dom';
import router from './router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loadinng</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
