import { useEffect } from 'react';

export const useStandaloneMode = () => {
  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isIOS) {
      let startY = 0;
      
      const handleTouchStart = (e: TouchEvent) => {
        startY = e.touches[0].pageY;
      };
      
      const handleTouchMove = (e: TouchEvent) => {
        const y = e.touches[0].pageY;
        const element = e.target as HTMLElement;
        const scrollable = element.closest('.scroll-container, .chat-list-container, .contacts-list-container, .users-list-container, .settings-container');
        
        if (!scrollable) {
          e.preventDefault();
          return;
        }
        
        const isAtTop = scrollable.scrollTop <= 0;
        if (isAtTop && y > startY) {
          e.preventDefault();
        }
      };

      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      
      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, []);
}; 