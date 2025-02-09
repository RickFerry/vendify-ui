import './index.css';

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

window.React = React;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
