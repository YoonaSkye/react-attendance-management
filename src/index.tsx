import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// 路由
import { RouterProvider } from 'react-router-dom';
import router from './router';
// redux store
import { store } from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loadinng</div>}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Suspense>
  </React.StrictMode>
);
