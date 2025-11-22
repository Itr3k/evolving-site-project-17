import { useEffect, useRef } from 'react';

export const useAutoSave = (data: any, enabled = true) => {
  const lastSaved = useRef<number>(Date.now());
  
  useEffect(() => {
    if (!enabled) return;
    
    const interval = setInterval(() => {
      localStorage.setItem('projectIntakeDraft', JSON.stringify({
        data,
        timestamp: Date.now(),
      }));
      lastSaved.current = Date.now();
      console.log('Auto-saved draft to localStorage');
    }, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, [data, enabled]);
  
  // Also save on unmount
  useEffect(() => {
    if (!enabled) return;
    
    return () => {
      localStorage.setItem('projectIntakeDraft', JSON.stringify({
        data,
        timestamp: Date.now(),
      }));
      console.log('Saved draft on unmount');
    };
  }, [data, enabled]);
};
