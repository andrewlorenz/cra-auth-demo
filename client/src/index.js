import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SiteContextProvider } from './context/SiteContext';

ReactDOM.render(
  <React.StrictMode>
    <SiteContextProvider>
      <App />
    </SiteContextProvider>
  </React.StrictMode>
  ,document.getElementById('root')
);
