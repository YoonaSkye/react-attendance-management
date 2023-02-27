import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/normalize.scss';
import './assets/styles/iconfont.scss';
import './assets/styles/common.scss';
// 路由
import { RouterProvider } from 'react-router-dom';
import router from './router';
// redux store
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loadinng</div>}>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </PersistGate>
    </Suspense>
  </React.StrictMode>
);
