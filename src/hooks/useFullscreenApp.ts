import { useEffect } from 'react';

export const useFullscreenApp = () => {
  useEffect(() => {
    const enableFullscreen = () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    };

    // Solo fullscreen su tap
    document.addEventListener('touchend', enableFullscreen, { once: true });

    return () => {
      document.removeEventListener('touchend', enableFullscreen);
    };
  }, []);
}; 