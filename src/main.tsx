import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register Service Worker for seamless Offline functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('Zebene World ServiceWorker registered for Offline mode:', registration.scope);
      })
      .catch((error) => {
        console.warn('ServiceWorker registration error:', error);
      });
  });
}

createRoot(document.getElementById('root')!).render(<App />);
