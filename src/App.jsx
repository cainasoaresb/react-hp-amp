import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HouseDetailPage from './pages/HouseDetailPage';
import AmplitudeTracker from './components/AmplitudeTracker';
import './index.css';
import * as amplitude from '@amplitude/analytics-browser';

const AMPLITUDE_API_KEY = import.meta.env.VITE_AMPLITUDE_API_KEY;

if (AMPLITUDE_API_KEY) {
  amplitude.init(AMPLITUDE_API_KEY, {
    autocapture: {
      pageViews: false,
      sessions: true,
      formInteractions: true,
      fileDownloads: true,
      elementInteractions: false,
      attribution: true,
    }
  });
}

const App = () => {
  return (
    <BrowserRouter basename="/react-hp-amp">
      <div className="min-h-screen bg-gray-950 from-neutral-300 text-neutral-300 font-sans">
        <AmplitudeTracker />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/houses/:houseName" element={<HouseDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;