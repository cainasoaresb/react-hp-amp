import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as amplitude from '@amplitude/analytics-browser';

const AmplitudeTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      amplitude.track('page_view', {
        page_title: document.title,
        path_name: location.pathname,
      });
    }, 300);

    return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
  }, [location]);

  return null;
};

export default AmplitudeTracker;