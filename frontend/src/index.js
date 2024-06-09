import React from 'react';
import ReactDOM from 'react-dom/client';
import init from './init';
import 'bootstrap/dist/css/bootstrap.min.css';

const run = async () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  const app = await init();
  root.render(<React.StrictMode>{app}</React.StrictMode>);
};

run();

window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});
