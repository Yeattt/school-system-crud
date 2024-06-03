import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import './index.css';
import { QueryProvider } from './libs';
import { Providers } from './redux';
import ThemeRegistry from './themes/ThemeRegistry.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeRegistry>
      <QueryProvider>
        <Providers>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Providers>
      </QueryProvider>
    </ThemeRegistry>
  </React.StrictMode>,
)
