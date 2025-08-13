// src/App.jsx

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HouseDetailPage from './pages/HouseDetailPage';
import './index.css';
import * as amplitude from '@amplitude/analytics-browser';

// Inicialização do Amplitude
const AMPLITUDE_API_KEY = import.meta.env.VITE_AMPLITUDE_API_KEY;

if (AMPLITUDE_API_KEY) {
  amplitude.init(AMPLITUDE_API_KEY, {
    autocapture: {
      pageViews: true,
      sessions: true,
      formInteractions: true,
      fileDownloads: true,
      elementInteractions: false,
      attribution: true,
    }
  });
}

// Componente para rastrear as rotas
const AnalyticsWrapper = () => {
  const location = useLocation();

  useEffect(() => {
    if (AMPLITUDE_API_KEY) {
      // Envia um evento "Page View" com a rota atual
      amplitude.track('Page View', {
        pathname: location.pathname,
      });
    }
  }, [location]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter basename="/react-hp-amp">
      <div className="min-h-screen bg-gray-950 from-neutral-300 text-neutral-300 font-sans">
        <AnalyticsWrapper />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/houses/:id" element={<HouseDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;