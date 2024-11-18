import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './Components/Auth/AuthContext';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* Ensure AuthProvider wraps the entire App */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);