import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ContextData from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextData>
    <App />
  </ContextData>
);
